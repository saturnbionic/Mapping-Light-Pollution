// Initialize the map centered on Philadelphia
const map = L.map('map').setView([39.9526, -75.1652], 11);

// Dark mode tiles (Carto Dark)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// Light pollution points (brightness in nW/cm²/sr)
const lightData = [
  {lat: 39.9526, lng: -75.1652, brightness: 125}, // Philly Center
  {lat: 39.9500, lng: -75.2000, brightness: 110},
  {lat: 39.9700, lng: -75.1500, brightness: 100},
  {lat: 39.9800, lng: -75.3105, brightness: 87},  // Havertown
  {lat: 39.9900, lng: -75.3500, brightness: 60},
  {lat: 39.9850, lng: -75.2500, brightness: 75},
  {lat: 40.0000, lng: -75.2000, brightness: 42},
  {lat: 39.9400, lng: -75.1800, brightness: 90},
  {lat: 39.9600, lng: -75.2500, brightness: 55},
  {lat: 39.9550, lng: -75.3000, brightness: 35}
];

// Gradient color function for realistic light pollution visualization
const getColor = brightness => {
  if (brightness <= 20) return '#2b1d0e';
  if (brightness <= 40) return '#4b2e0c';
  if (brightness <= 60) return '#7a4415';
  if (brightness <= 80) return '#a45d1f';
  if (brightness <= 100) return '#d1862f';
  if (brightness <= 120) return '#f2b55e';
  if (brightness <= 140) return '#fff2b2';
  return '#ffffff';
};

// Add circle markers
lightData.forEach(point => {
  L.circleMarker([point.lat, point.lng], {
    radius: 10,
    color: getColor(point.brightness),
    fillColor: getColor(point.brightness),
    fillOpacity: 0.9,
    weight: 2
  }).addTo(map)
    .bindPopup(`Brightness: ${point.brightness} nW/cm²/sr`);
});

// Add legend
const legend = L.control({position: 'bottomright'});

legend.onAdd = function(map) {
  const div = L.DomUtil.create('div', 'info legend');
  const grades = [0, 20, 40, 60, 80, 100, 120, 140];
  const labels = [];

  for (let i = 0; i < grades.length; i++) {
    const from = grades[i];
    const to = grades[i + 1] || '+';
    const color = getColor(from + 1);
    labels.push(
      `<i style="background:${color}; width: 18px; height: 18px; display:inline-block; margin-right:5px;"></i> ${from}–${to}`
    );
  }

  div.innerHTML = labels.join('<br>');
  return div;
};

legend.addTo(map);
