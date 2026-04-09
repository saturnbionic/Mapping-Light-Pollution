// Initialize the map centered on Philadelphia
const map = L.map('map').setView([39.9526, -75.1652], 10);

// Base map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Marker for Havertown, PA
L.circleMarker([39.9837, -75.3105], {
  radius: 8,
  color: 'yellow',
  fillColor: 'yellow',
  fillOpacity: 0.7
})
.addTo(map)
.bindPopup("Havertown, PA<br>Suburban focus area");


// Example data points
//2ND STEP

const lightData = [
  {lat: 39.9526, lng: -75.1652, brightness: 90}, // Philly city center
  {lat: 39.9837, lng: -75.3105, brightness: 60}, // Havertown
  {lat: 40.0, lng: -75.2, brightness: 30}       // Suburb example
];

// Add circles
lightData.forEach(point => {
  let color;
  if (point.brightness > 80) color = "yellow";
  else if (point.brightness > 50) color = "orange";
  else color = "red";

  L.circleMarker([point.lat, point.lng], {
    radius: 8,
    color: color,
    fillColor: color,
    fillOpacity: 0.7
  }).addTo(map)
    .bindPopup(`Brightness: ${point.brightness}`);
});
