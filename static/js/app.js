// city selection
d3.select("#selCity")
    .enter()

optionChanged(d3.select("#selCity"));

// master function to grab data and display charts based on value input
function optionChanged(val) {
    console.log(val);
    url = `/city/${val}`;
    d3.json(url).then((data) => {
        var addyInfo = data.response_json.homes[0].homeData.addressInfo
        var lat = addyInfo.centroid.centroid.latitude
        var lon = addyInfo.centroid.centroid.longitude
        setView(lat,lon)
        createMarkers(data)
        console.log(data.response_json.homes[0].homeData.daysOnMarket.daysOnMarket.value)
    });
};

optionChanged(29470);