const container = document.querySelector(".container");
const render = (text, taskContainer) => {
  const div = document.createElement("div");
  div.innerHTML = `
          ${text}<button class="card-close disappear" >x</button>
`;
  div.classList.add("card");
  taskContainer.appendChild(div);
};

const drawChangeIcon = (event) => {
  const taskType = event.target.closest(".task-type");
  if (event.target.classList.contains("task-add")) {
    taskType.innerHTML = `
      <form class="task-form">
        <textarea id="random"  class="task-textarea"></textarea>
        <div class="task-buttons">
          <button type="submit" class="card-submit">Add</button>
          <button type="button" class="task-cancel">x</button>
        </div>
      </form>
    `;
  }

  if (event.target.classList.contains("task-cancel")) {
    taskType.innerHTML = `
      <div class="task-add">+ Add Task</div>
    `;
  }
};

container.addEventListener("submit", (event) => {
  event.preventDefault();
  const ourText = document.querySelector(".task-textarea");
  const taskType = event.target.parentNode;
  const taskList = event.target.parentNode.closest(".task-list");
  const taskContainer = taskList.querySelector(".cards-container");
  if (ourText.value.trim() !== "") {
    render(ourText.value, taskContainer);
  }
  taskType.innerHTML = `
      <div class="task-add">+ Add Task</div>
    `;
});

container.addEventListener("mouseover", (event) => {
  if (event.target.closest(".card")) {
    const card = event.target.closest(".card");

    card.querySelector(".card-close").classList.remove("disappear");
  }
});

container.addEventListener("mouseout", (event) => {
  const card = event.target.closest(".card");

  if (card && !card.contains(event.relatedTarget)) {
    card.querySelector(".card-close").classList.add("disappear");
  }
});

const mouseDownHandler = (event) => {
  document.body.style.userSelect = "none";
  const phantomCard = document.createElement("div");
  phantomCard.classList.add("phantom");
  const card = event.target.closest(".card");

  if (!card) return;
  if (event.target.classList.contains("card-close")) {
    card.remove();
  }
  card.classList.add("dragging");
  const rect = card.getBoundingClientRect();
  phantomCard.style.width = `${rect.width}px`;
  phantomCard.style.height = `${rect.height}px`;
  card.style.width = rect.width + "px";
  card.style.height = rect.height + "px";

  const shiftY = event.clientY - rect.top;
  const shiftX = event.clientX - rect.left;

  const mouseMoveHandler = (event) => {
    event.preventDefault();
    card.style.position = "fixed";
    card.style.left = `${event.clientX - shiftX}px`;
    card.style.top = `${event.clientY - shiftY}px`;
    card.style.pointerEvents = "none";
    const elementUnder = document.elementFromPoint(
      event.clientX,
      event.clientY,
    );
    const middle = rect.top + rect.height / 2;
    const targetCard = elementUnder?.closest(".card");
    const cardsContainer = elementUnder.closest(".cards-container");
    if (cardsContainer) {
      cardsContainer.appendChild(phantomCard);
    }
    if (!targetCard || targetCard === card) {
      return;
    }

    const taskList = targetCard.parentNode;

    if (event.clientY < middle) {
      taskList.insertBefore(phantomCard, targetCard);
    } else {
      taskList.insertBefore(phantomCard, targetCard.nextSibling);
    }
  };
  const mouseUpHandler = (e) => {
    card.classList.remove("dragging");
    card.style.position = "relative";
    card.style.left = "";
    card.style.top = "";
    card.style.pointerEvents = "none";
    const elementUnder = document.elementFromPoint(e.clientX, e.clientY);
    const targetCard = elementUnder?.closest(".card");
    if (targetCard && targetCard !== card) {
      const taskList = targetCard.parentNode;

      if (phantomCard !== targetCard.previousElementSibling) {
        taskList.insertBefore(phantomCard, targetCard);
      }
    }

    phantomCard.replaceWith(card);

    document.body.style.userSelect = "";

    card.style.pointerEvents = "";
    card.style.width = "";
    card.style.height = "";
    document.removeEventListener("pointermove", mouseMoveHandler);
    document.removeEventListener("pointerup", mouseUpHandler);
  };

  document.addEventListener("pointermove", mouseMoveHandler);
  document.addEventListener("pointerup", mouseUpHandler);
};

container.addEventListener("pointerdown", mouseDownHandler);

container.addEventListener("pointerdown", drawChangeIcon);
