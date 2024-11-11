import { html, fixture, expect } from '@open-wc/testing';
import "../week-10.js";

describe("Week10 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <week-10
        title="title"
      ></week-10>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
