import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class SmallCard extends DDDSuper(LitElement) {
  
  constructor() {
    super();
    this.title = 'Title';
    this.lastUpdated = 'Last Updated';
    this.description = 'Description';
    this.logo = '';
    this.slug = 'Slug';
    this.source = 'Source';
    this.id = '';
  }

  static get properties() {
    return {
      title: { type: String },
      lastUpdated: { type: String },
      description: { type: String },
      logo: { type: String },
      slug: { type: String },
      source: { type: String },
      domain: { type: String },
      id: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1 1 calc(33.33% - 8px);
        max-width: 600px;
        min-width: 250px;
        max-height: 650px;
        padding: var(--ddd-spacing-5);
        box-sizing: border-box;
        border: var(--ddd-border-md) solid var(--ddd-theme-default-oceanBlue);
        border-radius: var(--ddd-radius-md);
        box-shadow: var(--ddd-boxShadow-lg);
        background-color: var(--ddd-theme-default-creamWhite);
      }

      .text-wrapper {
        display: flex;
        flex-direction: column;
        padding: var(--ddd-spacing-4);
        width: 100%;
        max-width: 320px;
        overflow-wrap: break-word;
        color: var(--ddd-theme-default-deepBlue);
      }

      h4 {
        margin: var(--ddd-spacing-1) 0;
        font-size: var(--ddd-font-size-xs);
      }

      p {
        margin: var(--ddd-spacing-1) 0;
        font-size: var(--ddd-font-size-4xs);
      }

      img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: var(--ddd-radius-sm);
      }

      a {
        color: inherit;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }

      button {
  height: 80px;
  width: 160px;
  background-color: var(--ddd-theme-default-forestGreen);
  color: var(--ddd-theme-default-white);
  font-weight: var(--ddd-font-weight-bold);
  font-size: var(--ddd-spacing-5);
  cursor: pointer;
  margin-top: var(--ddd-spacing-2);
  display: flex;
  align-items: center;
  justify-content: center; /* Centers text/icon inside the button */
  
}

      button:hover, button:focus {
        background-color: var(--ddd-theme-default-emeraldGreen);
      }
    `;
  }

  convertUnixToDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    return date.toLocaleString('en-US', options);
  }

  render() {
    return html`
      <a href="${this.domain}/${this.slug}" target="_blank">
        <img src="${this.logo}" alt="${this.title}" />
        <div class="text-wrapper">
          <h4>${this.title}</h4>
          <p>${this.description}</p>
          <button @click="${this.openLink}">Go to Page</button>
          <button @click="${this.openSource}">Go to Source</button>
          <p>Last Updated: ${this.convertUnixToDate(this.lastUpdated)}</p>
          <p>Site ID: ${this.id}</p>
        </div>
      </a>
    `;
  }

  openLink(event) {
    event.stopPropagation();
    event.preventDefault();
    window.open(`${this.domain}/${this.slug}`, '_blank');
  }

  openSource(event) {
    event.stopPropagation();
    event.preventDefault();
    window.open(`${this.domain}/${this.source}`, '_blank');
  }

  static get tag() {
    return "small-card";
  }
}

customElements.define(SmallCard.tag, SmallCard);
