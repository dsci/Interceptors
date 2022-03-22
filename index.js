// Import stylesheets
import './style.css';
import './log-table.js';
import './button.js';

const maxCount = 2;
let initCount = 0;

const getLogTable = () => {
  return document.querySelector('log-table');
};

const updateTable = (request, info) => {
  const table = getLogTable();
  table.addInformation({
    code: request.status,
    info: info ? info.description : 'Request worked fine',
  });
  table.requestUpdate();
};

const extendAuthToken = () => {};
const doNothing = () => {};

const everythingIsOkay = (req) => {
  updateTable(req);
};

const nothingFound = (req) => {
  console.log('resend request');
  console.log(req.getAllResponseHeaders());
  console.log(req.responseURL);
  console.log(req);
  initCount++;
  updateTable(req, { description: `${initCount} attempt` });
  if (initCount <= maxCount) {
    req.open(req.callMethod, req.callUrl);
    req.send();
  }
};

const interceptorMap = {
  0: doNothing,
  401: extendAuthToken,
  200: everythingIsOkay,
  404: nothingFound,
};

function RequestGuard(interceptors, cfg = {}) {
  const interceptorCalls = { ...interceptorMap, ...cfg.map };
  (function (open, interceptors) {
    XMLHttpRequest.prototype.open = function (XMLHttpRequest) {
      const para = Array.prototype.slice.call(arguments);
      this.callMethod = para[0];
      this.callUrl = para[1];
      this.addEventListener(
        'readystatechange',
        () => {
          if (this.readyState === 4) {
            for (let interceptor of interceptors) {
              interceptor(this);
            }
            if (interceptorCalls.hasOwnProperty(this.status)) {
              interceptorCalls[this.status](this);
            }
          }
        },
        false
      );
      console.log(open);
      open.apply(this, arguments);
    };
  })(XMLHttpRequest.prototype.open, interceptors);
}

const interceptor = (req) => {
  console.log('Hello from interceptor');
};

const anotherInterceptor = (req) => {
  console.log('another one');
};

/* desired API would be 

RequestGuard([interceptors], guardConfig);

guardConfig allows to override interceptorMap of default interceptors

*/

const customMap = {
  200: () => {
    console.log('hello');
  },
};
RequestGuard([interceptor, anotherInterceptor]);

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Request Information Logging</h1>
                    <send-btn label="Send 200"
                              url="https://jsonplaceholder.typicode.com/todos/1"></send-btn>
                    <send-btn label="Send failure"
                              url="https://jsonplaceholder.typicode.com/telco"></send-btn>
                    <log-table></log-table>
                   `;
