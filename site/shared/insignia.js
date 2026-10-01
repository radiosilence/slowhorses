// Rubber-stamp insignia for each posting: a double ring, the post's name set
// round the top, and a line-drawn emblem in the middle. 200×250 to sit where a mugshot would.

const ICON = {
  horseshoe: `<path d="M-22 30 C-36 -4 -26 -32 0 -32 C26 -32 36 -4 22 30 L10 30 C20 2 14 -18 0 -18 C-14 -18 -20 2 -10 30 Z"/><g fill="currentColor" stroke="none">${[[-22, 14], [-25, -2], [-18, -18], [22, 14], [25, -2], [18, -18]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6"/>`).join("")}</g>`,
  screen: `<rect x="-32" y="-26" width="64" height="42" rx="3"/><path d="M-12 26 H12 M0 16 V26 M-24 -2 L-14 -2 L-8 -14 L0 8 L6 -6 L12 -2 L24 -2"/>`,
  collar: `<path d="M-30 -10 C-30 -30 30 -30 30 -10 C30 6 -30 6 -30 -10 Z M-24 -10 C-24 -22 24 -22 24 -10"/><circle cx="0" cy="18" r="11"/><path d="M0 4 V7 M-4 18 H4"/>`,
  binoculars: `<circle cx="-15" cy="12" r="13"/><circle cx="15" cy="12" r="13"/><path d="M-26 6 L-20 -22 H-8 L-4 4 M26 6 L20 -22 H8 L4 4 M-4 -8 H4"/>`,
  one: `<path d="M-26 -30 H26 V8 C26 26 0 36 0 36 C0 36 -26 26 -26 8 Z"/><path d="M-6 -14 L4 -20 V20 M-8 20 H14"/>`,
  two: `<path d="M-26 -30 H26 V8 C26 26 0 36 0 36 C0 36 -26 26 -26 8 Z"/><path d="M-10 -10 C-10 -24 12 -24 12 -10 C12 2 -10 10 -12 20 H14"/>`,
  cabinet: `<rect x="-24" y="-32" width="48" height="64" rx="2"/><path d="M-24 -10 H24 M-24 12 H24 M-8 -22 H8 M-8 0 H8 M-8 22 H8"/>`,
  chair: `<path d="M-24 30 V-6 C-24 -30 24 -30 24 -6 V30 M-30 0 H-18 V18 H18 V0 H30 V30 M-18 18 V30 M18 18 V30"/>`,
  scales: `<path d="M0 -30 V28 M-16 30 H16 M-28 -18 H28 M-28 -18 L-36 6 H-20 Z M28 -18 L20 6 H36 Z"/>`,
  pound: `<path d="M-28 -30 H28 V6 C28 24 0 34 0 34 C0 34 -28 24 -28 6 Z"/><path d="M10 -14 C8 -22 -6 -22 -6 -10 V16 M-14 2 H6 M-14 16 H12"/>`,
  globe: `<circle r="30"/><ellipse rx="13" ry="30"/><path d="M-30 0 H30 M-26 -15 H26 M-26 15 H26"/>`,
  eye: `<path d="M-34 0 C-20 -22 20 -22 34 0 C20 22 -20 22 -34 0 Z"/><circle r="10"/><circle r="3.5" fill="currentColor"/>`,
  ballot: `<path d="M-26 -6 H26 V30 H-26 Z M-12 -6 V-30 H12 V-6 M-8 -18 L-2 -12 L10 -26"/>`,
};

export function insignia(key, d) {
  const id = `arc-${key}`;
  return `<svg viewBox="0 0 200 250" class="insignia-svg" aria-hidden="true">
  <g transform="translate(100 125) rotate(-6)" fill="none" stroke="${d.colour}" color="${d.colour}" stroke-linecap="round" stroke-linejoin="round">
    <circle r="88" stroke-width="5"/>
    <circle r="78" stroke-width="1.5"/>
    <circle r="54" stroke-width="1.5" stroke-dasharray="3 4"/>
    <path id="${id}" d="M-66 0 A66 66 0 0 1 66 0" stroke="none"/>
    <text font-family="Courier Prime, monospace" font-weight="700" font-size="14" letter-spacing="2.4" fill="${d.colour}" stroke="none"><textPath href="#${id}" startOffset="50%" text-anchor="middle">${d.ring}</textPath></text>
    <text y="74" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="10" letter-spacing="3" fill="${d.colour}" stroke="none">${d.code}</text>
    <g stroke-width="4.5">${ICON[d.icon]}</g>
  </g>
</svg>`;
}

// A Regent's Park pass on a lanyard, grade unknown.
export const pass = () => `<svg viewBox="0 0 220 160" width="220" height="160" aria-hidden="true">
  <path d="M96 0 L104 52 M124 0 L116 52" stroke="#2c7aa0" stroke-width="6"/>
  <g transform="rotate(-6 110 100)">
    <rect x="50" y="48" width="120" height="96" rx="8" fill="#f3ecd9" stroke="#1b1a17" stroke-width="2"/>
    <rect x="50" y="48" width="120" height="24" rx="8" fill="#13293a"/>
    <rect x="50" y="64" width="120" height="8" fill="#13293a"/>
    <text x="110" y="64" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="10" letter-spacing="2" fill="#63c6ea">PARK · PASS</text>
    <rect x="60" y="82" width="40" height="50" fill="#d9d2bd" stroke="#1b1a17" stroke-width="1.5"/>
    <circle cx="80" cy="100" r="9" fill="#9d968a"/><path d="M64 132 C66 116 94 116 96 132 Z" fill="#9d968a"/>
    <rect x="108" y="86" width="52" height="7" fill="#1b1a17"/>
    <rect x="108" y="100" width="40" height="5" fill="#4a453a"/>
    <rect x="108" y="110" width="46" height="5" fill="#4a453a"/>
    <text x="108" y="132" font-family="Special Elite, monospace" font-size="13" fill="#b8322a">GRADE ?</text>
  </g>
</svg>`;
