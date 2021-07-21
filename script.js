function getSongs() {
  var user = document.getElementById("username").value;
  var time = document.getElementById("time").value;
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
    api_key: "bb6fe7de42275bee541146a3a1b84ece"
  };

  endpoint.search = new URLSearchParams(params).toString();

  xhr.open("GET", endpoint, true);
  xhr.send();

  function topTen(data) {
    var xmlDoc = new DOMParser().parseFromString(data, "text/xml");
    var names = xmlDoc.documentElement.getElementsByTagName("name");
    var artists = [], songs = [], count = 0;
    for (var i = 0; i < names.length; i+=2) {
      songs[count] = names[i].childNodes[0].nodeValue;
      artists[count] = names[i + 1].childNodes[0].nodeValue;
      count++;
    }
    for (var i = 0; i < 10; i++) {
      document.getElementById("songs").innerHTML +=
        ((i + 1) + ". " + songs[i] + " by " + artists[i] + "<br>");
    }
  }

}
