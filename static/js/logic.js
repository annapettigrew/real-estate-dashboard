function createMarkers(data) {
  let homes = data.response_json['homes'];
  for (let i = 0; i < homes.length; i++) {
    let lat = homes[i]['homeData']['addressInfo']['centroid']['centroid']['latitude']
    let lon = homes[i]['homeData']['addressInfo']['centroid']['centroid']['longitude']
    var homeMarker = L.marker([lat, lon])
        .bindPopup("<h3>" + lat + "</h3");
    homeMarker.addTo(map)
  }
}

var map = null;

document.getElementById('map').innerHTML = "<div id='map'></div>";
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                osmAttribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
                    ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
osmLayer = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
map = new L.Map('map');
map.addLayer(osmLayer);
var validatorsLayer = new OsmJs.Weather.LeafletLayer({lang: 'en'});
map.addLayer(validatorsLayer);

function setView(lat, lon) {
  map.setView(new L.LatLng(lat,lon), 9 );
}