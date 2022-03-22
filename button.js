import { html, LitElement } from 'lit';
import { FetchSomething } from './fetcher.js';

export class RequestButton extends LitElement {
  static properties = {
    url: {
      type: String,
    },
    label: {
      type: String,
    },
  };

  constructor() {
    super();
    this.url = '';
  }

  sendRequest(e) {
    const fetcher = new FetchSomething();
    fetcher.fetch(this.url);
  }

  render() {
    return html`
      <button @click="${this.sendRequest}">${this.label}</button>
    `;
  }
}

if (!customElements.get('send-btn')) {
  customElements.define('send-btn', RequestButton);
}
