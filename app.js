function getSongs(user, time) {
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
    method: "user.gettoptracks",
    user: user,
    period: time,
    limit: "10",
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
    var artists = [], songs = [], count = 0;
    for (var i = 0; i < names.length; i+=2) {
      songs[count] = names[i].childNodes[0].nodeValue;
      artists[count] = names[i + 1].childNodes[0].nodeValue;
      count++;
    }
    for (var i = 0; i < 10; i++) {
      console.log((i + 1) + ". " + songs[i] + " by " + artists[i]);
    }
  }

}
