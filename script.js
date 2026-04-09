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
