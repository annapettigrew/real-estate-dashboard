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

            if ((sqFt) !== undefined){
                pricePerSqft.push(homePrice.value / sqFt.value)
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
        var medianSqFt = Math.round(d3.median(pricePerSqft))
        // price dif from natl avg
        var priceDif = (medianPrice - 428379)
        var meanBeds = Math.round(d3.median(beds))
        var meanBaths = Math.round(d3.median(baths))
        var meanSqft = Math.round(d3.median(sqFeet))

        cityInfo(cityState, meanPrice, meanBeds, meanBaths, meanSqft, medianPrice, priceDif, medianSqFt)
        setView(meanLat,meanLon)
        createMarkers(data)
        bar(homePrices, time);
        // scatter(homePrices, time);

    });
};

function cityInfo(cityState, meanPrice, meanBeds, meanBaths, meanSqft, medianPrice, priceDif, medianSqFt) {
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
                    <td class="row-label"></td>
                    <td class="row-label"></td>
                    <td class="row-label">Nat'l Average</td>
                    <td class="row-label">Price Difference</td>
                </tr>
                <tr>
                    <td class="row-label">Median Price</td>
                    <td>$${medianPrice.toLocaleString()}</td>
                    <td>$428,379</td>
                    <td style="color:${color}">$${priceDif.toLocaleString()}</td>
                </tr>
                <tr>
                    <td class="row-label">Mean Price</td>
                    <td>$${meanPrice}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="row-label">Median Beds</td>
                    <td>${meanBeds}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="row-label">Median Baths</td>
                    <td>${meanBaths}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="row-label">Median sqft</td>
                    <td>${meanSqft}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="row-label">Median Price per Sqft</td>
                    <td>$${medianSqFt.toLocaleString()}</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    `)
};

optionChanged(29470);