import Order from "src/models/order";
import Config from "src/config";

function fetchData() {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${Config.fieldbookApiUrl}?exclude=id,record_url,order_id`, true);
    xhr.responseType = 'json';

    xhr.onload = function(e) {
      if (this.status == 200) {
        resolve(this.response);
      } else{
        reject(this.status);
      }
    };

    xhr.send();
  });
}

let fetch = null;

if(Config.mockData || process.env.NODE_ENV === "development")
  fetch = require("./fetch-mock-data").default;
else
  fetch = fetchData;

export default function() {
  return fetch().then((orders) => orders.map(json => new Order(json)))
};
