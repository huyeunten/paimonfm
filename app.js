const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

var data;
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    data = xhr.responseText;
    topTen(data);
    }
};

const endpoint = new URL("http://ws.audioscrobbler.com/2.0/");
var params = {
  method: "user.gettopartists",
  user: "up10ticns",
  period: "7day",
  limit: "15",
  api_key: process.env.API_KEY
};

endpoint.search = new URLSearchParams(params).toString();

console.log(endpoint);

xhr.open("GET", endpoint, true);
xhr.send();

function topTen(data) {
  var DOMParser = require('xmldom').DOMParser;
  var xmlDoc = new DOMParser().parseFromString(data, "text/xml");
  var names = xmlDoc.documentElement.getElementsByTagName("name");
  for (var i = 0; i < names.length; i++) {
    console.log(names[i].childNodes[0].nodeValue);
  }
}
