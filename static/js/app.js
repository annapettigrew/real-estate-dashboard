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
    var time = [];

    d3.json(url).then((data) => {
        let homes = data.response_json.homes;
        for (let i = 0; i < data.response_json.homes.length; i++) {
            var addyInfo = homes[i].homeData.addressInfo;
            var homePrice = homes[i].homeData.priceInfo.amount;
            var bed = homes[i].homeData.beds;
            var bath = homes[i].homeData.baths;
            var sqFt = homes[i].homeData.sqftInfo.amount;
            var timeOnMarket = homes[i].homeData.daysOnMarket.daysOnMarket;
            
            if ((timeOnMarket) !== undefined){
                time.push(timeOnMarket.value)
            };

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
        var meanPrice = Math.round(d3.mean(homePrices)).toLocaleString()
        var medianPrice = Math.round(d3.median(homePrices))
        // price dif from natl avg
        var priceDif = (medianPrice - 428379)
        var meanBeds = Math.round(d3.mean(beds))
        var meanBaths = Math.round(d3.mean(baths))
        var meanSqft = Math.round(d3.mean(sqFeet))
        // var meanSqftPrice = d3.mean(pricePerSqft)

        cityInfo(cityState, meanPrice, meanBeds, meanBaths, meanSqft, medianPrice, priceDif)
        setView(meanLat,meanLon)
        createMarkers(data)
        bar(homePrices, time);

    });
};

function cityInfo(cityState, meanPrice, meanBeds, meanBaths, meanSqft, medianPrice, priceDif) {
    d3.select("#header").html(`
        <h4>${cityState}</h4><br />
    `)
    
    var color = ""
    if (priceDif > 0){
        color = "green"
    };
    if (priceDif < 0){
        color = "red"
    };

    d3.select("#cityInfo").html(`
        <table>
            <tbody id="statTable">
                <tr>
                    <td></td>
                    <td></td>
                    <td>National Average</td>
                </tr>
                <tr>
                    <td>Median Price</td>
                    <td>$${medianPrice}</td>
                    <td>$428,379</td>
                    <td style="color:${color}">$${priceDif.toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Mean Price</td>
                    <td>$${meanPrice}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Mean Beds</td>
                    <td>${meanBeds}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Mean Baths</td>
                    <td>${meanBaths}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Mean sqft</td>
                    <td>${meanSqft}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    `)
};

optionChanged(29470);