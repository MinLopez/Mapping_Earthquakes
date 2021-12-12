// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the streets view tile layer that will be an option for our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the streets view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Dark: dark,
    Streets: streets,
    Satellite: satelliteStreets
  };
  

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [light]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/MinLopez/Mapping_Earthquakes/main/static/js/majorAirports.json";


// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/MinLopez/Mapping_Earthquakes/main/static/js/torontoRoutes.json";


// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/MinLopez/Mapping_Earthquakes/main/static/js/torontoNeighborhoods.json";

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

let hoodStyle = {
  color: "blue",
  weight: 1,
  fillColor: "yellow"
}
// Grabbing our GeoJSON data for airports
d3.json(airportData, function(data) {
    console.log(data);
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      onEachFeature: function(features, layer){
        layer.bindPopup("<h3> Airport Code: " + features.properties.faa + "</h3><hr> <h4>Airport name: " + features.properties.name + "</h4>")  
      }
    }).addTo(map);
});

// Grabbing our GeoJSON data for routes
d3.json(torontoData, function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(features, layer){
      layer.bindPopup("<h3> Airline:" + features.properties.airline + "</h3><hr><h4> Destination:" + features.properties.dst + "</h4>");
    }
  }).addTo(map);
});


// Grabbing our GeoJSON data for neighborhoods
d3.json(torontoHoods, function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style: hoodStyle,
    onEachFeature: function(features, layer){
      layer.bindPopup("<h3> Neighborhood:" + features.properties.AREA_NAME + "</h3>");
    }
  }).addTo(map);
});
