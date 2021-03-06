// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("../static/Resources/namb.json").then( importedData => {
    console.log(importedData);
    var data = importedData;
  
    // Sort the data array using the greekSearchResults value
    data.sort(function(a, b) {
      return parseFloat(b.Number) - parseFloat(a.Number);
    });
  
    // Slice the first 10 objects for plotting
    data = data.slice(0, 500);
  
    // Reverse the array due to Plotly's defaults
    data = data.reverse();
  
    // Trace1 for the Greek Data
    var trace1 = {
      x: data.map(row => row.Number),
      y: data.map(row => row.Name),
      text: data.map(row => row.Name),
      name: "US most popular Babies' Names",
      type: "bar",
      orientation: "h"
    };
  
    // data
    var chartData = [trace1];
  
    // Apply the group bar mode to the layout
    var layout = {
      title: "US most populas babies' names",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
  
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", chartData, layout);
  });
  