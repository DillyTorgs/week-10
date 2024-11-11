import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import '@haxtheweb/simple-icon/simple-icon.js';

export class LargeCard extends DDDSuper(LitElement) {

  constructor() {
    super();
    this.title = 'Type in a URL';
    this.description = '';
    this.logo = '';
    this.theme = '';
    this.created = 'N/A';
    this.lastUpdated = 'N/A';
    this.icon = '';
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      logo: { type: String },
      theme: { type: String },
      created: { type: String },
      lastUpdated: { type: String },
      icon: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: center;
        width: 90%;
        max-width: 850px;
        border: 2px solid var(--ddd-theme-default-seafoamGreen);
        border-radius: var(--ddd-radius-md);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: var(--ddd-spacing-5);
        background-color: var(--ddd-theme-default-lightBlue);
        color: var(--ddd-theme-default-deepNavy);
        box-sizing: border-box;
        margin: var(--ddd-spacing-6) auto;
      }

      .content {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        width: 100%;
        gap: var(--ddd-spacing-5);
      }

      .image-wrapper {
        flex-shrink: 0;
        width: 160px;
        height: 160px;
        border-radius: var(--ddd-radius-sm);
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .text-content {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-3);
        justify-content: flex-start;
        width: 100%;
      }

      .title-section {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-3);
        color: var(--ddd-theme-default-darkNavy);
      }

      h3 {
        margin: 0;
        font-size: var(--ddd-font-size-xxl);
        color: var(--ddd-theme-default-deepNavy);
      }

      p {
        margin: 0;
        font-size: var(--ddd-font-size-md);
        line-height: 1.4;
      }

      .description {
        font-size: var(--ddd-font-size-lg);
        color: var(--ddd-theme-default-darkGray);
      }

      .details {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-1);
      }

      strong {
        font-weight: bold;
        color: var(--ddd-theme-default-seafoamGreen);
      }
    `;
  }

  formatDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }

  render() {
    return html`
      <div class="content">
        <div class="image-wrapper">
          <img src="${this.logo}" alt="Logo" />
        </div>
        <div class="text-content">
          <div class="title-section">
            <h3>${this.title}</h3>
            <simple-icon icon="${this.icon}"></simple-icon>
          </div>
          <p class="description">${this.description}</p>
          <div class="details">
            <p><strong>Theme:</strong> ${this.theme}</p>
            <p><strong>Created:</strong> ${this.formatDate(this.created)}</p>
            <p><strong>Last Updated:</strong> ${this.formatDate(this.lastUpdated)}</p>
          </div>
        </div>
      </div>
    `;
  }

  static get tag() {
    return "large-card";
  }
}

customElements.define(LargeCard.tag, LargeCard);
