// city selection
d3.select("#selCity")
    .enter()

optionChanged(d3.select("#selCity"));

// master function to grab data and display maps based on value input
function optionChanged(val) {
    url = `/city/${val}`;
    var lats = [];
    var lons = [];
    var homePrices = [];
    var beds = [];
    var baths = [];
    var sqFeet = [];
    var pricePerSqft = [];

    d3.json(url).then((data) => {
        let homes = data.response_json.homes;
        for (let i = 0; i < data.response_json.homes.length; i++) {
            var addyInfo = homes[i].homeData.addressInfo;
            var homePrice = homes[i].homeData.priceInfo.amount;
            var bed = homes[i].homeData.beds;
            var bath = homes[i].homeData.baths;
            var sqFt = homes[i].homeData.sqftInfo.amount;

            if ((homePrice / sqFt) !== undefined){
                pricePerSqft.push(homePrice / sqFt)
            };

            if (bed !== undefined){
                beds.push(bed.value);
            };
            if (bath !== undefined){
                baths.push(bath.value);
            };
            if (sqFt !== undefined){
                sqFeet.push(sqFt.value);
            };
            if (homePrice !== undefined){
                homePrices.push(homePrice.value);
            };

            lats.push(addyInfo.centroid.centroid.latitude);
            lons.push(addyInfo.centroid.centroid.longitude);
            
        };

        var cityState = homes[0].homeData.addressInfo.city + ", " + homes[0].homeData.addressInfo.state
        var meanLat = d3.mean(lats)
        var meanLon = d3.mean(lons)
        var meanPrice = d3.mean(homePrices)
        var meanBeds = d3.mean(beds)
        var meanBaths = d3.mean(baths)
        var meanSqft = d3.mean(sqFeet)
        var meanSqftPrice = d3.mean(pricePerSqft)

        cityInfo(cityState, meanPrice, meanBeds, meanBaths, meanSqft, meanSqftPrice)
        setView(meanLat,meanLon)
        createMarkers(data)

    });
};

function cityInfo(cityState, meanPrice, meanBeds, meanBaths, meanSqft, meanSqftPrice) {
    d3.select("#header").html(`
        <h3>${cityState}</h3><br />
    `)
    d3.select("#cityInfo").html(`
        <h5>Mean Price: $${meanPrice}</h5>
        <h5>Mean Beds: ${meanBeds}</h5>
        <h5>Mean Baths: ${meanBaths}</h5>
        <h5>Mean sqft: ${meanSqft}</h5>
        <h5>Mean Price per sqft: ${meanSqftPrice}</h5>
    `)
};

optionChanged(29470);