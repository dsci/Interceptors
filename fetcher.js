export class FetchSomething {
  async fetch(url) {
    const http = new XMLHttpRequest();
    const response = http.open('get', url);
    http.addEventListener('load', (resp) => {});
    http.send();
  }
}
