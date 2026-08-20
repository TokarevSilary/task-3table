// import "./render.css";
//
// export class RenderPage {
//   constructor(container) {
//     if (typeof container === "string") {
//       container = document.querySelector(container);
//     }
//     this.container = container;
//     this.body = global.window.document.body;
//   }
//   popoverStructure() {
//     return `
//       <div class="popover-arrow"></div>
//
//       <h3 class="popover-header">
//         Popover title
//       </h3>
//
//       <div class="popover-body">
//         And here's some amazing content. It's very engaging. Right?
//       </div>
//     `;
//   }
//
//   render() {
//     const btn = document.createElement("button");
//     btn.innerText = "Click to toggle  popover";
//     btn.classList.add("popover-trigger");
//     this.container.appendChild(btn);
//     btn.addEventListener("click", (e) => this.clickListener(e));
//   }
//
//   clickListener(e) {
//     if (this.div) {
//       this.div.remove();
//       this.div = null;
//       return;
//     }
//     this.div = document.createElement("div");
//     this.div.classList.add("popover");
//     this.div.innerHTML = this.popoverStructure();
//     this.body.appendChild(this.div);
//     const btnCoord = e.target.getBoundingClientRect();
//     const poppeterCoord = this.div.getBoundingClientRect();
//     this.div.style.top = btnCoord.top - poppeterCoord.height - 9 + "px";
//     this.div.style.left =
//       btnCoord.left + btnCoord.width / 2 - poppeterCoord.width / 2 + "px";
//   }
// }
