// city selection
d3.select("#selCity")
    .enter()

optionChanged(d3.select("#selCity"));

// master function to grab data and display charts based on value input
function optionChanged(val) {
    console.log(val);
    url = `/city/${val}`;
    d3.json(url).then((data) => {
        lat = data.response_json['homes'][0]['homeData']['addressInfo']['centroid']['centroid']['latitude']
        lon = data.response_json['homes'][0]['homeData']['addressInfo']['centroid']['centroid']['longitude']
        setView(lat,lon)
        createMarkers(data)
    });
};

optionChanged(29470);