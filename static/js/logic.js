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
          fillOpacity: 0.5,
          color: "white",
          fillColor: "red",
          // Adjust the radius.
          radius: (price)/750,
          weight: 1
          }).bindPopup(`
            <h4>${addy}</h4><br /> 
            Days on Market: ${daysOnMarket}<br />
            Price: $${price}`)
    );

    dayMarkers.push(
      L.circle([lat,lon], {
          fillOpacity: 0.3,
          color: "white",
          fillColor: "blue",
          radius: (daysOnMarket)*100,
          weight:0.5,
      }).bindPopup(`
          <h4>${addy}</h4><br /> 
          Days on Market: ${daysOnMarket}<br />
          Price: $${price}`)
    );
    
    homeMarkers.push(
      L.marker([lat,lon])
        .bindPopup(`
            <h4>${addy}</h4><br /> 
            Days on Market: ${daysOnMarket}<br />
            Price: $${price}
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
};

function bar(x, y) {
  var data = [{
      type: "bar",
      x: x,
      y: y,
      margin: {
          l: 10,
          r: 10,
          t: 10,
          b: 10
      },
      marker: {
          size: y,
      }
  }];

  var layout = {
      plot_bgcolor: "rgba(0,0,0,0)",
      paper_bgcolor: "rgba(0,0,0,0)",
      title: {
        text: 'Price by Time on Market',
        font: {
            family: 'Courier New, monospace',
            size: 24
        },
        xref: 'paper',
        x: 0.05,
      },
      xaxis: {
        title: {
            text: 'Home Price',
            font: {
                family: 'Courier New, monospace',
                size: 18,
            }
        },
      },
      yaxis: {
        title: {
            text: 'Time on Market',
            font: {
                family: 'Courier New, monospace',
                size: 18,
            }
        },
      },
  };

  Plotly.newPlot('bar', data, layout);
};

function prepData(x,y) {
  let data = [];
  
  for (let i = 0; i < x.length; i++) {
    data.push({x:x[i], y:y[i]})
  }
  return data;
}

function scatter(x,y) {
  let myChart = document.getElementById('scatter');
  const data = {
    datasets: [{
      label: 'Scatter Dataset',
      data: prepData(x,y)
    }]
  }
  
  const config = {
    type: 'scatter',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Home Prices vs. Time on Market'
        }
      }
    }
  }
  
  let newChart = new Chart(myChart, config);
};