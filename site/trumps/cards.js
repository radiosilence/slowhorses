export const STATS = [
  { key: "tradecraft", label: "Tradecraft", hint: "Fieldcraft, cover stories and spotting a tail" },
  { key: "clearance", label: "Clearance", hint: "How far into Regent's Park their pass still works" },
  { key: "ruthlessness", label: "Ruthlessness", hint: "What they will do to win, and to whom" },
  { key: "hygiene", label: "Hygiene", hint: "Personal, not operational" },
  { key: "luck", label: "Luck", hint: "Still standing, against the odds" },
  { key: "loyalty", label: "Loyalty", hint: "To the people beside them, not to the Service" },
];

export const FACTIONS = {
  slough: { name: "Slough House", stamp: "Slow", color: "#7a5f1c" },
  park: { name: "Regent's Park", stamp: "The Park", color: "#1f4e6e" },
  dogs: { name: "The Dogs", stamp: "Dogs", color: "#3d4a36" },
  westminster: { name: "Westminster", stamp: "Westminster", color: "#5a2f4f" },
  retired: { name: "Retired", stamp: "Retired", color: "#5b5348" },
  hostile: { name: "Hostile", stamp: "Hostile", color: "#8b2420" },
  civilian: { name: "Civilian", stamp: "Civilian", color: "#4f5f6b" },
};

// p: [tradecraft, clearance, ruthlessness, hygiene, luck, loyalty]
// look: sketch spec, see shared/portraits.js
const RAW = [
  {
    id: "lamb", name: "Jackson Lamb", role: "Head of Slough House", faction: "slough", series: [1, 2, 3, 4, 5],
    blurb: "Flatulent, unwashed and rude, and still the best spy in London. Protects his joes while insulting every one of them.",
    p: [98, 55, 92, 3, 82, 86],
    look: { face: "heavy", hair: "lank", tone: "grey", beard: "stubble", brow: "heavy", mouth: "smirk", tired: true, attire: "mac", coat: "#8a7a55", build: "big", extra: ["cigarette"] },
  },
  {
    id: "river", name: "River Cartwright", role: "Slow horse", faction: "slough", series: [1, 2, 3, 4, 5],
    blurb: "Sent to Slough House after a botched training exercise at Stansted. Has been trying to run back to the Park ever since.",
    p: [70, 22, 42, 74, 68, 90],
    look: { face: "long", hair: "messy", tone: "blonde", brow: "frown", mouth: "flat", attire: "shirt", coat: "#2f3a4a" },
  },
  {
    id: "standish", name: "Catherine Standish", role: "Office manager", faction: "slough", series: [1, 2, 3, 4, 5],
    blurb: "Sober, meticulous and the only adult in the building. Keeps the files, the accounts and a Glock in her desk.",
    p: [62, 32, 34, 94, 44, 96],
    look: { face: "narrow", hair: "bob", tone: "grey", brow: "arched", mouth: "flat", build: "f", attire: "cardigan", accent: "#7d7a6a", coat: "#c8c0aa" },
  },
  {
    id: "louisa", name: "Louisa Guy", role: "Slow horse", faction: "slough", series: [1, 2, 3, 4, 5],
    blurb: "Exiled after losing a target on a tail. Lost Min, kept going, and put Nick Duffy down with a rock.",
    p: [72, 20, 70, 82, 46, 78],
    look: { face: "oval", hair: "curly", tone: "black", skin: 3, brow: "flat", mouth: "flat", build: "f", attire: "blouse", accent: "#3b4a5a", coat: "#2c2a28" },
  },
  {
    id: "min", name: "Min Harper", role: "Slow horse", faction: "slough", series: [1, 2],
    blurb: "Louisa's partner, at work and after it, and the kindest man in Slough House. His death was staged as a drunken cycling accident.",
    p: [55, 18, 28, 70, 4, 82],
    look: { face: "oval", hair: "crop", tone: "brown", beard: "stubble", brow: "raised", mouth: "smile", attire: "shirt", coat: "#4c4436" },
  },
  {
    id: "roddy", name: "Roddy Ho", role: "Self-appointed genius", faction: "slough", series: [1, 2, 3, 4, 5],
    blurb: "Can get into any database in the country. Cannot tell when a glamorous woman is a honeytrap.",
    p: [28, 20, 14, 38, 74, 48],
    look: { face: "round", hair: "slick", tone: "black", skin: 1, brow: "raised", mouth: "smirk", attire: "hoodie", accent: "#2b2b30", coat: "#2b2b30", extra: ["headset"] },
  },
  {
    id: "shirley", name: "Shirley Dander", role: "Slow horse", faction: "slough", series: [2, 3, 4, 5],
    blurb: "Short temper, quick fists. Picks fights with strangers and wins most of them.",
    p: [62, 15, 80, 42, 72, 84],
    look: { face: "square", hair: "buzz", tone: "brown", brow: "frown", mouth: "grim", build: "thin", attire: "overcoat", accent: "#1b1a17", coat: "#2a2522" },
  },
  {
    id: "struan", name: "Struan Loy", role: "Slow horse", faction: "slough", series: [1],
    blurb: "Picked up by the Dogs during the Hassan affair, and leaned on by Taverner to give false testimony against Lamb.",
    p: [24, 14, 18, 52, 38, 16],
    look: { face: "round", hair: "receding", tone: "brown", glasses: true, brow: "raised", mouth: "open", attire: "shirt", coat: "#5a5446" },
  },
  {
    id: "sid", name: "Sid Baker", role: "Slow horse", faction: "slough", series: [1],
    blurb: "Too good for Slough House, and nobody quite explained why she was there. Shot in the head on a tail; her records vanished.",
    p: [82, 60, 44, 88, 12, 72],
    look: { face: "oval", hair: "long", tone: "brown", brow: "arched", mouth: "flat", build: "f", attire: "blouse", accent: "#6b6b70", coat: "#2c3038" },
  },
  {
    id: "moody", name: "Jed Moody", role: "Slow horse", faction: "slough", series: [1],
    blurb: "Took off-book work from Taverner and shot Sid on a job. It ended at the bottom of the Slough House stairs.",
    p: [70, 26, 82, 30, 2, 5],
    look: { face: "heavy", hair: "bald", beard: "full", tone: "brown", brow: "heavy", mouth: "grim", build: "big", attire: "jumper", accent: "#3a3a3a", coat: "#3a3a3a" },
  },
  {
    id: "marcus", name: "Marcus Longridge", role: "Slow horse", faction: "slough", series: [2, 3, 4],
    blurb: "Exiled for a gambling habit he never quite kicked. The man you want beside you when the shooting starts.",
    p: [78, 18, 72, 76, 3, 82],
    look: { face: "square", hair: "buzz", tone: "black", skin: 4, beard: "full", brow: "flat", mouth: "smirk", attire: "shirt", coat: "#3a2f28" },
  },
  {
    id: "coe", name: "J.K. Coe", role: "Slow horse", faction: "slough", series: [4, 5],
    blurb: "Quiet, haunted and very good with a knife. Saw the pattern in the attacks on London before anyone else did.",
    p: [60, 15, 86, 46, 62, 62],
    look: { face: "narrow", hair: "lank", tone: "brown", beard: "stubble", brow: "flat", mouth: "flat", tired: true, build: "thin", attire: "hoodie", accent: "#5a5a52", coat: "#5a5a52" },
  },
  {
    id: "moira", name: "Moira Tregorian", role: "Standish's replacement", faction: "slough", series: [4, 5],
    blurb: "One of the Park's Queens of the Database, banished to Slough House to replace Standish. Brought a great many rules with her.",
    p: [10, 28, 26, 86, 54, 36],
    look: { face: "round", hair: "bob", tone: "brown", glasses: true, brow: "raised", mouth: "frown", build: "f", attire: "cardigan", accent: "#6b4a5a", coat: "#b8a98a" },
  },
  {
    id: "taverner", name: "Diana Taverner", role: "Second Desk, then First", faction: "park", series: [1, 2, 3, 4, 5],
    blurb: "Staged a kidnapping, toppled a Director General and outlasted another. Usually the cleverest person in the room.",
    p: [90, 97, 96, 96, 90, 8],
    look: { face: "narrow", hair: "bob", tone: "blonde", brow: "arched", mouth: "smirk", build: "f", attire: "overcoat", accent: "#1b1a17", coat: "#232a33" },
  },
  {
    id: "tearney", name: "Ingrid Tearney", role: "First Desk", faction: "park", series: [1, 3],
    blurb: "Director General of the Service. Approved a disastrous secret trial and was forced out when the file leaked.",
    p: [76, 100, 88, 96, 22, 14],
    look: { face: "oval", hair: "buzz", tone: "black", skin: 3, brow: "arched", mouth: "flat", build: "f", attire: "suit", accent: "#1b1a17", coat: "#26282e" },
  },
  {
    id: "webb", name: "James \"Spider\" Webb", role: "Taverner's errand boy", faction: "park", series: [1, 2, 3],
    blurb: "River's old rival. Fed him false intel at Stansted, and never stopped feeling pleased about it.",
    p: [34, 68, 52, 98, 6, 10],
    look: { face: "long", hair: "slick", tone: "blonde", brow: "raised", mouth: "smirk", attire: "suit", accent: "#4a6a8a", coat: "#2a3340" },
  },
  {
    id: "whelan", name: "Claude Whelan", role: "First Desk", faction: "park", series: [4, 5],
    blurb: "Took the top job, then helped Taverner bury the cold-body files. A tape in Lamb's hands forced him out.",
    p: [42, 98, 54, 92, 14, 40],
    look: { face: "oval", hair: "parted", tone: "black", beard: "stubble", brow: "frown", mouth: "flat", attire: "suit", accent: "#5a2f2f", coat: "#2b2e36" },
  },
  {
    id: "molly", name: "Molly Doran", role: "Keeper of records", faction: "park", series: [2, 3, 4, 5],
    blurb: "Knows where every secret in the building is filed. Not inclined to share them with anyone from Slough House.",
    p: [58, 86, 32, 74, 50, 58],
    look: { face: "round", hair: "bob", tone: "grey", glasses: true, brow: "arched", mouth: "smirk", build: "f", attire: "blouse", accent: "#3a5a4a", coat: "#4a3a52" },
  },
  {
    id: "dunn", name: "Alison Dunn", role: "Officer, Istanbul station", faction: "park", series: [3],
    blurb: "Found out what the Footprint file covered up and tried to get it out. She did not make it home.",
    p: [70, 56, 30, 76, 2, 88],
    look: { face: "long", hair: "ponytail", tone: "brown", brow: "flat", mouth: "flat", build: "f", attire: "shirt", coat: "#4a4f55" },
  },
  {
    id: "duffy", name: "Nick Duffy", role: "Head of the Dogs", faction: "dogs", series: [1, 2, 3],
    blurb: "Taverner's enforcer. Beat River half to death in a Park cell, then led the strike team that came for him.",
    p: [70, 74, 92, 82, 10, 38],
    look: { face: "square", hair: "bald", brow: "heavy", beard: "stubble", tone: "black", mouth: "grim", build: "big", attire: "tactical", coat: "#2f342e", extra: ["earpiece"] },
  },
  {
    id: "flyte", name: "Emma Flyte", role: "Head of the Dogs", faction: "dogs", series: [4, 5],
    blurb: "Duffy's successor and far straighter. Lost four officers when Patrice ambushed her convoy, and kept going.",
    p: [80, 80, 60, 88, 58, 72],
    look: { face: "oval", hair: "ponytail", tone: "red", brow: "flat", mouth: "flat", build: "f", attire: "tactical", coat: "#2f342e", extra: ["earpiece"] },
  },
  {
    id: "judd", name: "Peter Judd", role: "Politician", faction: "westminster", series: [1, 2, 3, 5],
    blurb: "Home Secretary, then out, then advising an arms firm. Has never once been where the blame landed.",
    p: [48, 90, 86, 86, 84, 2],
    look: { face: "oval", hair: "parted", tone: "brown", brow: "arched", mouth: "smile", attire: "suit", accent: "#6b1d22", coat: "#22252c" },
  },
  {
    id: "jaffrey", name: "Zafar Jaffrey", role: "Mayor of London", faction: "westminster", series: [5],
    blurb: "Earnest, decent and up for re-election, which made him a target for people who wanted London on fire.",
    p: [10, 44, 28, 92, 72, 64],
    look: { face: "round", hair: "crop", tone: "black", skin: 2, brow: "raised", mouth: "smile", attire: "suit", accent: "#7a2a24", coat: "#2a2f3a" },
  },
  {
    id: "gimball", name: "Dennis Gimball", role: "Mayoral candidate", faction: "westminster", series: [5],
    blurb: "Populist challenger with a hidden family history. Killed at his own rally by a falling tin of paint.",
    p: [6, 32, 72, 70, 1, 8],
    look: { face: "heavy", hair: "parted", tone: "grey", brow: "frown", mouth: "open", attire: "suit", accent: "#2a3f6b", coat: "#24262c" },
  },
  {
    id: "david", name: "David Cartwright", role: "The O.B., River's grandfather", faction: "retired", series: [1, 2, 3, 4, 5],
    blurb: "A legend of the old Service with more buried than anyone knew. Shot an intruder in his own house and fled.",
    p: [94, 78, 90, 76, 62, 48],
    look: { face: "long", hair: "parted", tone: "white", brow: "heavy", mouth: "flat", tired: true, attire: "cardigan", accent: "#5a4a3a", coat: "#8a7e6a" },
  },
  {
    id: "bough", name: "Dickie Bough", role: "Retired joe", faction: "retired", series: [2],
    blurb: "Old Cold War joe who spotted the man who once tortured him and followed him onto a rail replacement bus. Poisoned.",
    p: [56, 8, 20, 34, 1, 62],
    look: { face: "heavy", hair: "receding", tone: "grey", brow: "raised", mouth: "open", tired: true, attire: "overcoat", accent: "#5a3a2a", coat: "#4a3e30" },
  },
  {
    id: "chapman", name: "Sam Chapman", role: "\"Bad Sam\", ex-Dog", faction: "retired", series: [2, 3, 4],
    blurb: "Did David Cartwright's dirty work in France thirty years ago. Refused to give him up, and paid for it.",
    p: [70, 8, 46, 32, 3, 80],
    look: { face: "square", hair: "messy", tone: "grey", beard: "full", brow: "heavy", mouth: "grim", attire: "jumper", accent: "#4a4a40", coat: "#4a4a40" },
  },
  {
    id: "curly", name: "Curly", role: "Sons of Albion", faction: "hostile", series: [1],
    blurb: "The most unhinged of Hassan's kidnappers. Determined to go through with the beheading; floored by a rock.",
    p: [14, 0, 86, 20, 34, 8],
    look: { face: "square", hair: "buzz", tone: "brown", brow: "frown", mouth: "open", attire: "jumper", accent: "#2f3a2a", coat: "#2f3a2a" },
  },
  {
    id: "chernitsky", name: "Andrei Chernitsky", role: "Cicada assassin", faction: "hostile", series: [2],
    blurb: "Poisoned Bough and arranged Min's death. Later hunted River's grandfather, which was a mistake.",
    p: [88, 4, 95, 72, 4, 72],
    look: { face: "long", hair: "crop", tone: "grey", brow: "flat", mouth: "grim", attire: "overcoat", accent: "#1b1a17", coat: "#2a2a2a", redact: true },
  },
  {
    id: "katinsky", name: "Nikolai Katinsky", role: "Former KGB", faction: "hostile", series: [2],
    blurb: "Posed as a harmless old defector while running Cicada. Lamb worked it out at the end.",
    p: [96, 34, 82, 62, 8, 30],
    look: { face: "long", hair: "lank", tone: "grey", beard: "full", brow: "heavy", mouth: "smirk", attire: "overcoat", accent: "#5a1d1d", coat: "#3a3530" },
  },
  {
    id: "tropper", name: "Alex Tropper", role: "Sleeper agent", faction: "hostile", series: [2],
    blurb: "Duncan's wife, settled in sleepy Upshott, and a Russian sleeper the whole time.",
    p: [80, 0, 74, 84, 30, 58],
    look: { face: "oval", hair: "bob", tone: "brown", brow: "flat", mouth: "flat", build: "f", attire: "jumper", accent: "#5a6a5a", coat: "#5a6a5a", redact: true },
  },
  {
    id: "pashkin", name: "Arkady Pashkin", role: "Oligarch's fixer", faction: "hostile", series: [2],
    blurb: "Brought to the Glasshouse as an oligarch's envoy. The oligarch was already dead.",
    p: [58, 4, 74, 92, 3, 18],
    look: { face: "square", hair: "slick", tone: "black", brow: "flat", mouth: "smirk", attire: "suit", accent: "#1b1a17", coat: "#1f2128" },
  },
  {
    id: "donovan", name: "Sean Donovan", role: "Rogue security officer", faction: "hostile", series: [3],
    blurb: "Kidnapped Standish to find out who killed Alison Dunn. Gave his life so River and Louisa could get the file out.",
    p: [86, 38, 80, 82, 5, 96],
    look: { face: "square", hair: "bald", skin: 4, beard: "full", tone: "black", brow: "frown", mouth: "flat", build: "big", attire: "shirt", coat: "#2a2f2a" },
  },
  {
    id: "harkness", name: "Frank Harkness", role: "Ex-CIA, River's father", faction: "hostile", series: [4],
    blurb: "Raised a family of assassins in the south of France. Got himself arrested on purpose, then walked out again.",
    p: [97, 12, 98, 84, 88, 4],
    look: { face: "long", hair: "crop", tone: "grey", beard: "stubble", brow: "arched", mouth: "smirk", attire: "overcoat", accent: "#2a2a2a", coat: "#3a3a36" },
  },
  {
    id: "patrice", name: "Patrice", role: "Harkness's son", faction: "hostile", series: [4],
    blurb: "Killed his way across London on his father's orders, all the way to the stairs of Slough House.",
    p: [86, 0, 99, 58, 3, 92],
    look: { face: "narrow", hair: "buzz", tone: "blonde", brow: "flat", mouth: "flat", build: "thin", attire: "hoodie", accent: "#2b2b2b", coat: "#2b2b2b", redact: true },
  },
  {
    id: "tara", name: "Tara Younis", role: "Roddy's girlfriend", faction: "hostile", series: [5],
    blurb: "Too glamorous for Roddy, which everyone but Roddy noticed. Captured, questioned, and still a step ahead of the Park.",
    p: [86, 0, 88, 94, 66, 20],
    look: { face: "oval", hair: "long", tone: "black", skin: 2, brow: "arched", mouth: "smirk", build: "f", attire: "blouse", accent: "#7a1f2f", coat: "#1b1a17", redact: true },
  },
  {
    id: "hassan", name: "Hassan Ahmed", role: "Kidnapped student", faction: "civilian", series: [1],
    blurb: "Snatched off the street and threatened with a beheading on livestream. Saved himself in the end, with a rock.",
    p: [6, 0, 14, 58, 70, 52],
    look: { face: "oval", hair: "crop", tone: "black", skin: 2, brow: "raised", mouth: "open", attire: "hoodie", accent: "#5a6a7a", coat: "#5a6a7a", extra: ["plaster"] },
  },
  {
    id: "hobden", name: "Robert Hobden", role: "Disgraced journalist", faction: "civilian", series: [1],
    blurb: "Columnist with far-right friends and a USB stick everyone wanted. The stick turned out to have nothing on it.",
    p: [40, 0, 34, 24, 22, 6],
    look: { face: "long", hair: "receding", tone: "brown", glasses: true, beard: "stubble", brow: "frown", mouth: "frown", attire: "overcoat", accent: "#4a3a2a", coat: "#4a4236" },
  },
];

export const CARDS = RAW.map((c, i) => ({
  ...c,
  no: String(i + 1).padStart(2, "0"),
  placard: c.placard ?? c.name.split(" ").pop().replace(/[".]/g, "").toUpperCase(),
  ref: `SH/${String(i + 1).padStart(3, "0")}`,
  stats: Object.fromEntries(STATS.map((s, j) => [s.key, c.p[j]])),
}));
