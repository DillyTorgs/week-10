import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./large-card.js";
import "./small-card.js";

export class SiteSearch extends DDDSuper(LitElement) {

  constructor() {
    super();
    this.value = null;
    this.data = [];
  }

  static get properties() {
    return {
      data: { type: Array },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .search {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--ddd-spacing-1);
      }
      #input {
        font-size: var(--ddd-font-size-xxs);
        line-height: 40px;
        width: 70%;
        padding-left: var(--ddd-spacing-2);
      }
      button {
        height: 46px;
        width: 10%;
        background-color: var(--ddd-theme-default-nittanyNavy);
        color: var(--ddd-theme-default-white);
        font-weight: var(--ddd-font-weight-bold, 700);
        font-size: var(--ddd-spacing-4);
      }
      button:hover, button:focus {
        background-color: var(--ddd-theme-default-navy60);
      }
      large-card {
        margin: var(--ddd-spacing-6) auto;
      }
      #results {
        margin: var(--ddd-spacing-6) auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--ddd-spacing-2);
        width: 80%;
      }
      h3 {
        font-size: var(--ddd-font-size-m);
      }
    `;
  }

  render() {
    return html`
      <h3>Enter Hax</h3>
      <div class="search">
        <input id="input" placeholder="Input a Hax website URL" />
        <button type="button" @click="${this.buttonPressed}">Analyze Site</button>
      </div>
      <large-card id="largeCard"></large-card>
      <div id="results"></div>
    `;
  }

  buttonPressed() {
    this.value = this.shadowRoot.querySelector('#input').value;
    if (this.value) {
      this.fetchResults();
    } else {
      this.resetCards();
    }
  }

  async fetchResults() {
    try {
      const response = await fetch(this.addSiteJson(this.value));
      if (!response.ok) throw new Error('Could not reach website');
      
      const data = await response.json();
      this.handleData(data);
    } catch (error) {
      this.displayError();
    }
  }

  handleData(data) {
    if (data) {
      this.resetCards();
      this.data = data;
      const { title, metadata, items } = data;
      this.updateLargeCard(title, metadata);
      this.updateSmallCards(items);
    }
  }

  updateLargeCard(title, metadata) {
    const largeCard = this.shadowRoot.getElementById('largeCard');
    largeCard.setAttribute('title', title);
    largeCard.setAttribute('description', this.data.description);
    largeCard.setAttribute('logo', `${this.removeSlug(this.value)}/${metadata.site.logo}`);
    largeCard.setAttribute('theme', metadata.theme.name);
    largeCard.setAttribute('created', metadata.site.created);
    largeCard.setAttribute('lastUpdated', metadata.site.updated);
    largeCard.setAttribute('icon', metadata.theme.variables.icon);
  }

  updateSmallCards(items) {
    const resultsContainer = this.shadowRoot.getElementById("results");
    items.forEach(item => {
      const smallCard = document.createElement('small-card');
      smallCard.setAttribute('title', item.title);
      smallCard.setAttribute('lastUpdated', item.metadata.updated);
      smallCard.setAttribute('description', item.description);
      smallCard.setAttribute('logo', `${this.removeSlug(this.value)}/${item.metadata.images[0]}`);
      smallCard.setAttribute('slug', item.slug);
      smallCard.setAttribute('source', item.location);
      smallCard.setAttribute('domain', this.removeSlug(this.value));
      smallCard.setAttribute('id', item.id);
      resultsContainer.appendChild(smallCard);
    });
  }

  displayError() {
    this.resetCards();
    const largeCard = this.shadowRoot.getElementById('largeCard');
    largeCard.setAttribute('title', 'URL is not valid');
    largeCard.setAttribute('description', 'Make sure your URL has "https://" at the beginning');
    largeCard.setAttribute('theme', 'N/A');
    largeCard.setAttribute('created', 'N/A');
    largeCard.setAttribute('lastUpdated', 'N/A');
  }

  resetCards() {
    const largeCard = this.shadowRoot.getElementById('largeCard');
    largeCard.setAttribute('title', '');
    largeCard.setAttribute('description', '');
    largeCard.setAttribute('logo', '');
    largeCard.setAttribute('theme', '');
    largeCard.setAttribute('created', '');
    largeCard.setAttribute('lastUpdated', '');
    this.shadowRoot.getElementById('results').innerHTML = '';
  }

  addSiteJson(url) {
    return url.replace(/(\/site\.json)?$/, "/site.json");
  }

  removeSlug(url) {
    const match = url.match(/^(https?:\/\/[^\/]+)\/?.*/);
    return match ? match[1] : null;
  }

  static get tag() {
    return 'site-search';
  }
}

customElements.define(SiteSearch.tag, SiteSearch);
