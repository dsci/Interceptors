import { html, css, LitElement } from 'lit';

export class LogTable extends LitElement {
  static properties = {
    logs: {},
    message: {
      type: String,
    },
  };

  static styles = css`
    table{
      border: 1px solid;
    }
    :host {
      color: blue;
    }
  `;

  constructor() {
    super();
    this.logs = [];
    this.message = 'foo';
  }

  addInformation(obj) {
    console.log('get called');
    this.logs.push(obj);
  }

  render() {
    return html`
     
      <table>
        <thead>
          <tr>
            <td>Status code</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          ${this.logs.map(
            (log) =>
              html`
              <tr>
                <td>${log.code}</td>
                <td>${log.info}</td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }
}

if (!customElements.get('log-table')) {
  customElements.define('log-table', LogTable);
}
