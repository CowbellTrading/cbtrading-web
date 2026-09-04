const fs = require('fs');
const path = require('path');

const items = [
  { id: 'stretch-film', title: 'Stretch & Shrink Film', cat: 'Industrial Packaging', icon: 'roll' },
  { id: 'pe-sacks', title: 'Heavy-Duty PE Sacks', cat: 'Bulk Packaging', icon: 'bag' },
  { id: 'pp-woven-bags', title: 'PP Woven Sacks', cat: 'Agri & Industrial', icon: 'woven' },
  { id: 'pallet-wrap', title: 'Pallet Protection & Wrap', cat: 'Transit Packaging', icon: 'pallet' },
  { id: 'edge-protectors', title: 'Edge & Corner Protectors', cat: 'Load Stabilization', icon: 'edge' },
  { id: 'shrink-covers', title: 'Thermal Shrink Covers', cat: 'Machinery Packaging', icon: 'cover' },
  { id: 'barrier-film', title: 'Food-Grade Barrier Film', cat: 'Flexible Packaging', icon: 'film' },
  { id: 'eco-mailers', title: 'Biodegradable Mailers', cat: 'Sustainable Packaging', icon: 'mailer' },
  { id: 'vci-bags', title: 'VCI Anti-Corrosion Bags', cat: 'Protective Packaging', icon: 'vci' },
  { id: 'fibc-bags', title: 'FIBC Jumbo Bulk Bags', cat: 'Chemical & Bulk', icon: 'fibc' },
  { id: 'cushioning-rolls', title: 'Bubble & Cushioning Rolls', cat: 'Surface Protection', icon: 'bubble' },
  { id: 'custom-poly-bags', title: 'Custom Printed Poly Bags', cat: 'Commercial Packaging', icon: 'print' },
];

const dir = path.join(__dirname, '..', 'public', 'images', 'packaging');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

items.forEach(item => {
  const titleClean = item.title.replace(/&/g, '&amp;');
  const catClean = item.cat.replace(/&/g, '&amp;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <rect width="400" height="300" fill="#F7F8F6" rx="8"/>
  <rect x="12" y="12" width="376" height="276" fill="none" stroke="#D9E3DF" stroke-width="1.5" stroke-dasharray="4 4" rx="6"/>
  <g transform="translate(200, 110)">
    <circle r="36" fill="#E3F3EC" />
    <path d="M-12,-12 L12,-12 L12,12 L-12,12 Z M-6,-6 L6,-6 L6,6 L-6,6 Z" fill="#163F35" opacity="0.85" />
    <path d="M-20,0 L20,0 M0,-20 L0,20" stroke="#1FA77A" stroke-width="2" stroke-linecap="round" />
  </g>
  <text x="200" y="185" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#17201E" text-anchor="middle">${titleClean}</text>
  <text x="200" y="208" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="#1FA77A" text-anchor="middle">${catClean}</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${item.id}.svg`), svg, 'utf8');
});
console.log('Successfully generated 12 packaging SVG graphics.');
