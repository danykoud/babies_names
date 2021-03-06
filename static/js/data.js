// Store our API endpoint inside queryUrl

// Perform a GET request to the query URL
d3.json("../static/Resources/Names.geojson").then(function(data) {

  FeatureCollection(data.features);

  console.log(data)

});

function FeatureCollection(usnames) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) { 
    layer.bindPopup("<h3>"+feature.properties.state +"</h3><hr><p>"  + feature.properties.Name +"</p><hr><p>" + "year: 1980 to 2018" + "</p><hr><p>"+ "Number:" + feature.properties.Number  +"</p>");
  }

  // Create a GeoJSON layer containing the features array on the usnames object
  // Run the onEachFeature function once for each piece of data in the array
  var BabiesNames = L.geoJSON(usnames, {
    pointToLayer: function(usnames, lonlat) {
      return L.marker(lonlat, {
        con: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue",
    shape: "circle"
      });
    },
    
    onEachFeature: onEachFeature
  });

  // Sending our BabiesNames layer to the createMap function
  createMap(BabiesNames);
}

function createMap(BabiesNames) {

  // Adding tile layer
  const streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v10",
    accessToken: API_KEY
  })

  const darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  })
  // Create the faultline layer
  var faultLine = new L.LayerGroup();
  
  // Define a baseMaps object 
  const baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object
  var overlayMaps = {
    BabiesNames: BabiesNames,
    state: faultLine
  };

  // Create our map
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [ streetmap , BabiesNames, faultLine]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}