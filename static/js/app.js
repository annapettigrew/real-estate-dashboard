// city selection
d3.select("#selCity")
    .enter()

optionChanged(d3.select("#selCity"));

// master function to grab data and display charts based on value input
function optionChanged(val) {
    console.log(val);
};

optionChanged("29470");