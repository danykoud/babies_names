// Store our API endpoint inside queryUrl

// Perform a GET request to the query URL
d3.json("../static/Resources/Names.geojson").then(function(data) {

  // FeatureCollection(data.features);

  console.log(data)

});

function FeatureCollection(usnames) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) { 
    layer.bindPopup("<h3>"+ feature.Geomatry.coordinates +"</h3><hr><p>" + feature.properties.Name +
      "</p><hr><p>" + "year:"+feature.properties.year + "</p><hr><p>"+ "Number:" + feature.properties.Number  +"</p>");
  }

//   Define function to create the circle radius based on the number
  function radiuslength(Number) {
    return Number * 20000;
  }

  /// Function that will determine the color of a neighborhood based on the borough it belongs to
function  circleColor(Number) {
  switch (true) {
  case Number < 1500:
    return "#ccff33";
  case Number < 2000:
    return "#ffff33";
  case Number < 2500:
    return "#ffcc33";
  case Number < 3000:
    return "#ff9933";
  case Number < 3500:
    return "#ff6633";
  default:
    return "#ff3333";
  }
}

  // Create a GeoJSON layer containing the features array on the usnames object
  // Run the onEachFeature function once for each piece of data in the array
  var BabiesNames = L.geoJSON(usnames, {
    pointToLayer: function(usnames, lonlat) {
      return L.circle(lonlat, {
        radius: radiuslength(usnames.properties.Number),
        color: circleColor(usnames.properties.Number),
        fillOpacity: .5
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
    Fault: faultLine
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