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
    method: "user.gettopartists",
    user: user,
    period: time,
    limit: "15",
    api_key: "bb6fe7de42275bee541146a3a1b84ece"
  };

  endpoint.search = new URLSearchParams(params).toString();

  xhr.open("GET", endpoint, true);
  xhr.send();

  function topTen(data) {
    var xmlDoc = new DOMParser().parseFromString(data, "text/xml");
    var artists = xmlDoc.documentElement.getElementsByTagName("name");
    if (artists[0].childNodes[0].nodeValue == null) {
      document.getElementById("error").innerHTML = "Something went wrong" +
      " getting artists.";
    }
    for (var i = 0; i < 3; i++) {
      document.getElementById("topThree").innerHTML +=
        (artists[i].childNodes[0].nodeValue + "! ");
    }
    for (var i = 3; i < 15; i++) {
      document.getElementById("rest").innerHTML +=
        (artists[i].childNodes[0].nodeValue + "! ");
    }
    var img;
    switch(time) {
      case "1month":
        img = '<img src="paimon_month.png"/>';
        document.getElementById("color").style.backgroundColor = "#ff7070";
        break;
      case "6month":
        img = '<img src="paimon_6month.png"/>';
        document.getElementById("color").style.backgroundColor = "#68abff";
        break;
      case "overall":
        img = '<img src="paimon_alltime.png"/>';
        document.getElementById("color").style.backgroundColor = "#c3a501";
        break;
    }
    if (img == null) {
      document.getElementById("error").innerHTML = "Something went wrong" +
      " displaying images.";
    }
    document.getElementById("bg").innerHTML = img;
    document.getElementById("results").style.display = "block";
  }
}
