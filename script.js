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

const maxBrightness = 140; // your brightest value for normalization

// Convert lightData to [lat, lng, normalizedIntensity]
const heatData = lightData.map(d => [d.lat, d.lng, d.brightness / maxBrightness]);

const heat = L.heatLayer(heatData, {
  radius: 25,
  blur: 15,
  maxZoom: 17,
  gradient: {
    0.0: '#0b1a36',   // darkest blue
    0.1: '#0000ff',   // blue
    0.2: '#0080ff',   // blue-green
    0.3: '#00ff80',   // green
    0.4: '#ffff00',   // yellow
    0.6: '#ffa500',   // orange
    0.7: '#ff0000',   // red
    0.85: '#ff69b4',  // pink
    1.0: '#ffffff'    // brightest white
  }
}).addTo(map);
// Add legend
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
  const div = L.DomUtil.create('div', 'legend');

  div.innerHTML = `
    <strong>Radiance (nW/cm²/sr)</strong><br>
    <i style="background:#0b1a36"></i> Very Dark Sky<br>
    <i style="background:#0000ff"></i> Rural<br>
    <i style="background:#0080ff"></i> Suburban<br>
    <i style="background:#00ff80"></i> Urban<br>
    <i style="background:#ffff00"></i> Bright Urban<br>
    <i style="background:#ffa500"></i> City Core<br>
    <i style="background:#ff0000"></i> Very Bright<br>
    <i style="background:#ff69b4"></i> Extreme<br>
    <i style="background:#ffffff"></i> Maximum Light
  `;

  return div;
};

legend.addTo(map);
