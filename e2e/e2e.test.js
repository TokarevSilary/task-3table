import puppeteer from "puppeteer";
import { fork } from "child_process";
import { jest } from "@jest/globals";

jest.setTimeout(30000);

describe("test of puppeter", () => {
  let browser = null;
  let page = null;
  let server = null;
  const browserUrl = "http://localhost:8087";
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    browser = browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();
    await new Promise((resolve) => {
      server.on("message", (msg) => {
        if (msg === "server-ready") {
          resolve();
        }
      });
    });
  });
  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("render button", async () => {
    await page.goto(browserUrl);
    const btnText = await page.$eval(
      ".popover-trigger",
      (button) => button.textContent,
    );

    expect(btnText).toBe("Click to toggle  popover");
  });

  test("render puppeter", async () => {
    await page.goto(browserUrl);
    const button = await page.$(".popover-trigger");
    await button.click();
    const popover = await page.$(".popover");

    expect(popover).not.toBeNull();
  });

  test("delete puppeter", async () => {
    await page.goto(browserUrl);
    const button = await page.$(".popover-trigger");
    await button.click();
    await button.click();
    const popover = await page.$(".popover");

    expect(popover).toBeNull();
  });

  test("popover has title and body", async () => {
    await page.goto(browserUrl);

    const button = await page.$(".popover-trigger");
    await button.click();

    const title = await page.$(".popover-header");
    const body = await page.$(".popover-body");

    expect(title).not.toBeNull();
    expect(body).not.toBeNull();
  });
});
