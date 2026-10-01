// Ink-sketch mugshots pinned to a height chart, facing the camera.
// Composed from parts on a 200×250 canvas. Every outline is drawn twice, the
// second pass offset and faint, so the line reads as a hurried pen.

const INK = "#1b1a17";
const PAPER = "#efe6cc";
const CHART = "#cfc6ad";
const RED = "#b8322a";

const SKIN = ["#f2dcc3", "#e6c39e", "#cf9f73", "#a2714a", "#704b30"];
const HAIRTONE = { black: "#211d19", brown: "#5a3f27", grey: "#9d968a", blonde: "#c9a85a", red: "#9a4a24", white: "#d9d4c8" };

const sketch = (d, extra = "") =>
  `<path d="${d}" ${extra}/><path d="${d}" transform="translate(1.4 -1)" fill="none" stroke-width=".9" opacity=".45"/>`;

// Head outlines centred on (100, 118).
const FACE = {
  oval: "M100 64 C126 64 142 84 142 114 C142 146 124 170 100 170 C76 170 58 146 58 114 C58 84 74 64 100 64 Z",
  round: "M100 66 C130 66 146 86 146 116 C146 146 126 168 100 168 C74 168 54 146 54 116 C54 86 70 66 100 66 Z",
  long: "M100 60 C124 60 138 80 138 112 C138 150 122 176 100 176 C78 176 62 150 62 112 C62 80 76 60 100 60 Z",
  square: "M100 64 C128 64 144 80 144 110 C144 136 140 156 124 166 C114 172 86 172 76 166 C60 156 56 136 56 110 C56 80 72 64 100 64 Z",
  heavy: "M100 64 C130 64 148 84 148 114 C148 140 146 160 128 170 C116 178 84 178 72 170 C54 160 52 140 52 114 C52 84 70 64 100 64 Z",
  narrow: "M100 64 C122 64 136 82 136 112 C136 146 120 170 100 170 C80 170 64 146 64 112 C64 82 78 64 100 64 Z",
};

const BUILD = {
  m: "M30 250 C30 214 52 200 84 194 L116 194 C148 200 170 214 170 250 Z",
  f: "M40 250 C40 218 58 204 86 198 L114 198 C142 204 160 218 160 250 Z",
  big: "M14 250 C14 210 44 194 82 190 L118 190 C156 194 186 210 186 250 Z",
  thin: "M44 250 C44 216 62 202 88 198 L112 198 C138 202 156 216 156 250 Z",
};

// Hair drawn behind the head (long styles) and over it (fringes, crowns).
const HAIR = {
  bald: {},
  crop: { front: "M58 108 C56 76 74 60 100 60 C126 60 144 76 142 108 C138 90 126 80 100 80 C76 80 64 90 58 108 Z" },
  buzz: { front: "M60 100 C60 76 76 64 100 64 C124 64 140 76 140 100 C132 86 120 80 100 80 C80 80 68 86 60 100 Z", thin: true },
  slick: { front: "M57 110 C54 72 76 56 104 57 C130 58 146 76 143 108 C138 88 126 76 112 75 L106 68 C94 78 72 84 57 110 Z" },
  messy: { front: "M56 108 C52 80 64 62 82 58 L88 52 L94 58 L102 50 L108 58 L118 54 L120 62 C138 66 148 84 144 108 C140 96 132 88 122 84 L116 90 L110 82 L100 90 L92 82 L84 90 L78 84 C68 88 60 96 56 108 Z" },
  lank: {
    back: "M54 110 C52 66 78 52 100 52 C124 52 148 66 146 110 L150 176 C144 186 132 186 128 176 L126 116 L74 116 L72 176 C68 186 56 186 50 176 Z",
    front: "M56 114 C54 74 76 56 100 56 C126 56 146 74 144 114 C140 94 130 84 116 80 C106 90 90 88 80 82 C68 88 60 100 56 114 Z",
  },
  receding: { front: "M58 112 C56 92 62 80 70 74 C66 86 64 98 66 116 Z M142 112 C144 92 138 80 130 74 C134 86 136 98 134 116 Z" },
  bob: {
    back: "M54 116 C50 70 76 54 100 54 C126 54 152 70 146 116 L148 160 C138 166 130 164 128 156 L128 116 L72 116 L72 156 C70 164 62 166 52 160 Z",
    front: "M56 114 C54 72 78 56 102 56 C128 56 148 74 144 112 C134 92 118 80 96 82 C80 86 66 96 56 114 Z",
  },
  long: {
    back: "M54 116 C48 68 76 52 100 52 C126 52 154 68 146 116 L152 200 C140 210 128 206 126 196 L126 116 L74 116 L74 196 C72 206 60 210 48 200 Z",
    front: "M56 116 C54 72 78 56 100 56 C124 56 146 72 144 116 C140 90 124 78 106 80 C100 90 92 96 82 96 C70 100 60 106 56 116 Z",
  },
  curly: { curls: [[62, 104, 12], [62, 84, 13], [74, 68, 14], [92, 58, 15], [110, 58, 15], [128, 66, 14], [140, 82, 13], [140, 102, 12], [100, 70, 14], [80, 76, 10], [120, 76, 10]] },
  afro: { curls: [[54, 112, 14], [52, 88, 16], [62, 66, 17], [82, 52, 18], [104, 48, 18], [126, 54, 17], [142, 70, 16], [148, 92, 15], [146, 114, 13], [100, 66, 16]] },
  bun: { front: "M58 108 C56 76 74 60 100 60 C126 60 144 76 142 108 C138 90 126 78 100 78 C76 78 64 90 58 108 Z", knot: [100, 50, 14] },
  ponytail: {
    back: "M128 92 C156 100 160 140 150 178 C144 160 140 132 130 116 Z",
    front: "M58 108 C56 76 74 60 100 60 C126 60 144 76 142 108 C136 88 122 76 98 78 C76 80 64 90 58 108 Z",
  },
  undercut: { front: "M58 98 C58 74 76 60 102 60 C130 60 144 78 140 98 C124 82 104 84 86 92 C76 96 66 98 58 98 Z" },
  parted: { front: "M56 112 C54 74 76 58 100 58 C126 58 146 74 144 112 C140 92 128 80 112 78 L96 68 L92 80 C76 84 62 94 56 112 Z" },
};

const BEARD = {
  stubble: "stubble",
  full: "M60 120 C60 160 80 180 100 180 C120 180 140 160 140 120 C136 140 126 150 118 150 C110 146 90 146 82 150 C74 150 64 140 60 120 Z",
  goatee: "M90 150 C90 166 96 172 100 172 C104 172 110 166 110 150 C106 154 94 154 90 150 Z",
  moustache: "M84 140 C90 134 96 134 100 137 C104 134 110 134 116 140 C110 142 104 141 100 140 C96 141 90 142 84 140 Z",
};

const BROW = {
  flat: "M76 100 L92 100 M108 100 L124 100",
  arched: "M75 102 C80 96 88 96 92 99 M108 99 C112 96 120 96 125 102",
  frown: "M76 97 L92 102 M108 102 L124 97",
  raised: "M76 98 C82 92 88 92 92 96 M108 100 L124 101",
  heavy: "M74 101 C82 96 88 97 93 100 M107 100 C112 97 118 96 126 101",
};

const MOUTH = {
  flat: "M88 148 L112 148",
  smirk: "M88 149 C98 150 106 148 113 143",
  frown: "M88 151 C94 146 106 146 112 151",
  smile: "M86 145 C94 154 106 154 114 145",
  grim: "M86 148 L114 148 M90 151 L110 151",
  open: "M88 146 C94 144 106 144 112 146 C108 154 92 154 88 146 Z",
};

// Collars, coats and the like, laid over the shoulders.
const ATTIRE = {
  mac: () => `<path d="M30 250 C30 214 52 200 84 194 L100 230 L116 194 C148 200 170 214 170 250 Z" fill="#8a7a55"/>
    <path d="M84 194 L72 222 L92 214 M116 194 L128 222 L108 214" fill="#6e5f3e"/>
    <path d="M86 196 L100 230 L114 196 Z" fill="#d9d2bd"/>`,
  suit: (c) => `<path d="M84 194 L100 238 L116 194 Z" fill="#f2efe6"/><path d="M97 204 L103 204 L106 242 L100 250 L94 242 Z" fill="${c}"/>
    <path d="M84 194 L76 226 L100 250 M116 194 L124 226 L100 250" fill="none"/>`,
  shirt: () => `<path d="M86 194 L100 214 L114 194 L120 206 L100 222 L80 206 Z" fill="#f2efe6"/>`,
  jumper: (c) => `<path d="M82 194 C88 206 112 206 118 194" fill="none" stroke-width="5" stroke="${c}"/>`,
  polo: (c) => `<path d="M86 194 L100 210 L114 194 L122 204 L100 216 L78 204 Z" fill="${c}"/>`,
  hoodie: (c) => `<path d="M58 206 C60 184 74 176 84 180 C84 194 92 204 100 206 C108 204 116 194 116 180 C126 176 140 184 142 206" fill="${c}"/>
    <path d="M94 210 L92 236 M106 210 L108 236" fill="none" stroke-width="1.5"/>`,
  blouse: (c) => `<path d="M84 196 C90 214 110 214 116 196" fill="${c}"/>`,
  pearls: () => `<g fill="#f6f2e8">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="${82 + i * 6}" cy="${200 + Math.sin((i / 6) * Math.PI) * 9}" r="2.4"/>`).join("")}</g>`,
  tactical: () => `<path d="M48 214 L152 214 L156 250 L44 250 Z" fill="#3a3f38"/><path d="M58 222 h22 v10 h-22z M120 222 h22 v10 h-22z" fill="#2a2e29"/>`,
  overcoat: (c) => `<path d="M30 250 C30 214 52 200 84 194 L100 236 L116 194 C148 200 170 214 170 250 Z" fill="${c}"/>
    <path d="M86 196 L100 236 L114 196 Z" fill="#f2efe6"/><path d="M84 194 L70 216 L94 220 M116 194 L130 216 L106 220" fill="none"/>`,
  cardigan: (c) => `<path d="M84 196 L100 250 L116 196" fill="none" stroke="${c}" stroke-width="8"/><g fill="${INK}">${[214, 228, 242].map((y) => `<circle cx="${100 + (y - 196) * 0.03}" cy="${y}" r="1.6"/>`).join("")}</g>`,
};

const EXTRA = {
  cigarette: `<path d="M112 149 L136 156" stroke="#f6f2e8" stroke-width="4" stroke-linecap="round"/><path d="M134 155.5 L137 156.5" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>
    <path d="M140 150 C146 140 136 132 144 120 C150 110 142 102 148 92" fill="none" stroke="#9d968a" stroke-width="1.6" opacity=".7"/>`,
  earpiece: `<path d="M144 118 C150 120 150 128 146 132 L140 196" fill="none" stroke="${INK}" stroke-width="1.6"/>`,
  scar: `<path d="M118 108 L130 132" stroke="#a2453a" stroke-width="2.2" stroke-linecap="round"/><path d="M120 116 L126 114 M123 122 L129 120" stroke="#a2453a" stroke-width="1.2"/>`,
  plaster: `<path d="M114 124 L134 116 L136 122 L116 130 Z" fill="#e8c9a4" stroke="${INK}" stroke-width="1"/>`,
  headset: `<path d="M56 112 C56 60 144 60 144 112" fill="none" stroke="${INK}" stroke-width="5"/><rect x="50" y="104" width="10" height="20" rx="4" fill="${INK}"/><path d="M58 122 C64 146 78 150 88 150" fill="none" stroke="${INK}" stroke-width="2.4"/>`,
  lanyard: `<path d="M82 196 L96 236 M118 196 L104 236" stroke="#3a6ea5" stroke-width="3"/><rect x="88" y="234" width="24" height="16" rx="2" fill="#f6f2e8" stroke="${INK}" stroke-width="1.2"/>`,
};

let uid = 0;

export function portrait(card, tint = "#6b5a2c") {
  const l = card.look;
  const id = `pt${++uid}`;
  const skin = SKIN[l.skin ?? 0];
  const hair = HAIR[l.hair ?? "bald"];
  const hairFill = HAIRTONE[l.tone ?? "black"];
  const face = FACE[l.face ?? "oval"];
  const height = 64 + ((card.id.length * 7) % 5) * 3;
  const chart = [40, 70, 100, 130, 160, 190, 220]
    .map((y, i) => `<path d="M0 ${y} H200" stroke="${CHART}" stroke-width="${i % 2 ? 0.8 : 1.6}"/><text x="6" y="${y - 3}" font-size="9" fill="#a39a7f" font-family="Courier Prime, monospace">${7 - i * 0.5}</text>`)
    .join("");
  const curls = hair.curls?.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("") ?? "";
  // Stubble is a five-o'clock shadow over the jaw, the way an ink sketch would wash it in.
  const beard = l.beard === "stubble"
    ? `<path d="M58 124 C66 134 76 136 86 134 C94 140 106 140 114 134 C124 136 134 134 142 124 L150 190 L50 190 Z" clip-path="url(#${id}-face)" fill="${hairFill === HAIRTONE.white ? HAIRTONE.grey : hairFill}" opacity=".26" stroke="none"/>`
    : l.beard ? `<g fill="${hairFill}" stroke="${INK}" stroke-width="1.6">${sketch(BEARD[l.beard])}</g>` : "";

  return `<svg viewBox="0 0 200 250" class="portrait-svg" aria-hidden="true">
  <defs>
    <clipPath id="${id}-face"><path d="${face}"/></clipPath>
    <clipPath id="${id}-frame"><rect width="200" height="250"/></clipPath>
    <pattern id="${id}-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <path d="M0 0 V5" stroke="${INK}" stroke-width="1.1"/>
    </pattern>
  </defs>
  <g clip-path="url(#${id}-frame)">
  <rect width="200" height="250" fill="${PAPER}"/>
  ${chart}
  <rect width="200" height="250" fill="${tint}" opacity=".08"/>
  <g stroke="${INK}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" transform="translate(0 ${height - 64})">
    <g fill="${hairFill}">${hair.back ? sketch(hair.back) : ""}</g>
    <g fill="${l.coat ?? "#4a4740"}">${sketch(BUILD[l.build ?? "m"])}</g>
    <path d="M86 160 L86 198 C94 204 106 204 114 198 L114 160 Z" fill="${skin}"/>
    <path d="M86 186 C94 192 106 192 114 186 L114 160 L86 160 Z" fill="url(#${id}-hatch)" opacity=".35" stroke="none"/>
    ${(ATTIRE[l.attire]?.(l.accent ?? "#7a2a24") ?? "")}
    <ellipse cx="57" cy="120" rx="7" ry="11" fill="${skin}"/><ellipse cx="143" cy="120" rx="7" ry="11" fill="${skin}"/>
    <g fill="${skin}">${sketch(face)}</g>
    <g clip-path="url(#${id}-face)" stroke="none">
      <path d="M118 60 C150 80 150 160 110 180 L160 180 L160 60 Z" fill="url(#${id}-hatch)" opacity=".28"/>
    </g>
    ${beard}
    <path d="${BROW[l.brow ?? "flat"]}" fill="none" stroke-width="${l.brow === "heavy" ? 4 : 2.6}"/>
    <g fill="${INK}" stroke="none"><ellipse cx="84" cy="112" rx="3.4" ry="${l.tired ? 2 : 3}"/><ellipse cx="116" cy="112" rx="3.4" ry="${l.tired ? 2 : 3}"/></g>
    ${l.tired ? `<path d="M77 118 C82 121 88 121 92 118 M108 118 C112 121 118 121 123 118" fill="none" stroke-width="1.2" opacity=".7"/>` : ""}
    <path d="M100 110 C99 120 96 128 94 133 C98 136 103 136 106 133" fill="none" stroke-width="1.8"/>
    <path d="${MOUTH[l.mouth ?? "flat"]}" fill="${l.mouth === "open" ? INK : "none"}"/>
    <g fill="${hairFill}">${hair.front ? sketch(hair.front, hair.thin ? 'opacity=".75"' : "") : ""}${curls}${hair.knot ? `<circle cx="${hair.knot[0]}" cy="${hair.knot[1]}" r="${hair.knot[2]}"/>` : ""}</g>
    ${l.glasses ? `<g fill="${l.glasses === "dark" ? INK : "rgba(255,255,255,.18)"}" stroke-width="2.4"><rect x="72" y="103" width="24" height="18" rx="6"/><rect x="104" y="103" width="24" height="18" rx="6"/><path d="M96 110 L104 110 M72 110 L60 106 M128 110 L140 106" fill="none"/></g>` : ""}
    ${(l.extra ?? []).map((e) => EXTRA[e]).join("")}
  </g>
  ${l.redact ? `<g transform="rotate(-3 100 ${height + 48})"><rect x="40" y="${height + 34}" width="124" height="22" fill="#0b0b0b"/><rect x="40" y="${height + 34}" width="124" height="22" fill="url(#${id}-hatch)" opacity=".25"/></g>` : ""}
  ${card.placard ? `<g transform="translate(46 210)"><rect width="108" height="34" fill="#141414" stroke="#3a3a3a" stroke-width="2"/><text x="54" y="15" text-anchor="middle" font-size="11" letter-spacing="1.5" fill="#f2efe6" font-family="Courier Prime, monospace" font-weight="700">${card.placard}</text><text x="54" y="28" text-anchor="middle" font-size="8" letter-spacing="1" fill="#bdb6a2" font-family="Courier Prime, monospace">${card.ref ?? ""}</text></g>` : ""}
  </g>
  <rect x="1" y="1" width="198" height="248" fill="none" stroke="${INK}" stroke-width="2"/>
</svg>`;
}

// A manila file cover with a rubber-stamped horseshoe: the back of every card.
export function crest() {
  const id = `cr${++uid}`;
  return `<svg viewBox="0 0 200 310" class="crest-svg" aria-hidden="true">
  <defs>
    <pattern id="${id}-fibre" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
      <path d="M0 3 H12 M0 9 H7" stroke="#b39c5c" stroke-width=".6" opacity=".5"/>
    </pattern>
  </defs>
  <rect width="200" height="310" fill="#d9c58c"/>
  <rect width="200" height="310" fill="url(#${id}-fibre)"/>
  <path d="M0 0 H120 L132 18 H200 V310 H0 Z" fill="#e2cf98" opacity=".6"/>
  <rect x="12" y="28" width="176" height="270" fill="none" stroke="#8f7a3a" stroke-width="1.2" stroke-dasharray="4 3"/>
  <g transform="translate(100 150) rotate(-8)" fill="none" stroke="${RED}" opacity=".85">
    <circle r="62" stroke-width="3.5"/>
    <circle r="54" stroke-width="1.2"/>
    <path id="${id}-arc" d="M-46 0 A46 46 0 0 1 46 0" stroke="none"/>
    <text font-family="Courier Prime, monospace" font-weight="700" font-size="12.5" letter-spacing="2.6" fill="${RED}" stroke="none"><textPath href="#${id}-arc" startOffset="50%" text-anchor="middle">SLOUGH HOUSE</textPath></text>
    <path d="M-20 26 C-30 -2 -24 -24 0 -24 C24 -24 30 -2 20 26 L10 26 C18 4 14 -12 0 -12 C-14 -12 -18 4 -10 26 Z" fill="${RED}" stroke="none"/>
    <g fill="#d9c58c" stroke="none">${[[-17, 10], [-19, -4], [-13, -16], [17, 10], [19, -4], [13, -16]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2"/>`).join("")}</g>
    <text y="46" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="9" letter-spacing="2" fill="${RED}" stroke="none">FILE COPY</text>
  </g>
  <g transform="translate(100 270) rotate(-3)">
    <rect x="-70" y="-14" width="140" height="22" fill="#141414"/>
    <text y="2" text-anchor="middle" font-family="Courier Prime, monospace" font-weight="700" font-size="11" letter-spacing="3" fill="#d9c58c">NOT FOR CIRCULATION</text>
  </g>
  <text x="24" y="20" font-family="Courier Prime, monospace" font-size="10" fill="#6b5a2c" letter-spacing="1">PF/SH</text>
</svg>`;
}
