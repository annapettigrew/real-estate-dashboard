function createMarkers(data) {
  let homes = data.response_json.homes;
  let priceMarkers = [];
  let homeMarkers = [];
  let dayMarkers = [];

  for (let i = 0; i < homes.length; i++) {
    let lat = homes[i].homeData.addressInfo.centroid.centroid.latitude
    let lon = homes[i].homeData.addressInfo.centroid.centroid.longitude
    let addy = homes[i].homeData.addressInfo.formattedStreetLine
    let daysOnMarket = homes[i].homeData.daysOnMarket.daysOnMarket.value
    let price = homes[i].homeData.priceInfo.amount.value
    
    priceMarkers.push(
      L.circle([lat,lon], {
          fillOpacity: 0.75,
          color: "white",
          fillColor: "red",
          // Adjust the radius.
          radius: (price)/750,
          weight: 1
          }).bindPopup(`<h4>${addy}</h4><br /> Days on Market: ${daysOnMarket}`)
    );

    dayMarkers.push(
      L.circle([lat,lon], {
          fillOpacity: 1,
          color: "white",
          fillColor: "blue",
          radius: (daysOnMarket)*100,
          weight:0.5,
      })
    );
    
    homeMarkers.push(
      L.marker([lat,lon])
        .bindPopup(`
            <h4>${addy}</h4><br /> Days on Market: ${daysOnMarket}
        `)
    );
  }
  
  var homeLayer = L.layerGroup(homeMarkers);
  var dayLayer = L.layerGroup(dayMarkers);
  var priceLayer = L.layerGroup(priceMarkers);
  map.addLayer(homeLayer);
  
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var baseMaps = {
    "Street": street,
  };

  var overlayMaps = {
    "Prices":priceLayer,
    "Homes":homeLayer,
    "Days on Market":dayLayer
  };

  L.control.layers(baseMaps,overlayMaps).addTo(map);
}

var map = null;

document.getElementById('map').innerHTML = "<div id='map'></div>";
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                osmAttribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
                    ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
osmLayer = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
map = new L.Map('map');
map.addLayer(osmLayer);

function setView(lat, lon) {
  map.setView(new L.LatLng(lat,lon), 10);
}