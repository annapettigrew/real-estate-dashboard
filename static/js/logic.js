var myMap = L.map("map", {
  center: [45.52, -122.67],
  zoom: 13
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function createMarkers(data) {
  var homeMarkers = [];
  let homes = data.response_json['homes'];
  for (let i = 0; i < homes.length; i++) {
      let lat = homes[i]['homeData']['addressInfo']['centroid']['centroid']['latitude']
      let lon = homes[i]['homeData']['addressInfo']['centroid']['centroid']['longitude']
      var homeMarker = L.marker([lat, lon])
          .bindPopup("<h3>" + lat + "</h3");
      homeMarker.addTo(myMap)
  }
}