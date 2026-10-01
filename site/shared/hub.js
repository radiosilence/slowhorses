import "./idle.js";
import { CARDS } from "../trumps/cards.js";
import { portrait, crest } from "./portraits.js";
import { pass } from "./insignia.js";

const byId = (id) => CARDS.find((c) => c.id === id);
const slow = CARDS.filter((c) => c.faction === "slough");
const pick = slow[Math.floor(Math.random() * slow.length)];

document.getElementById("cover-mug").innerHTML = portrait(byId("lamb"));
document.getElementById("art-trumps").innerHTML = `<div class="art-cards"><div>${crest()}</div><div>${portrait(byId("taverner"))}</div><div>${crest()}</div></div>`;
document.getElementById("art-character").innerHTML = `<div class="art-mug">${portrait(pick)}</div>`;
document.getElementById("art-role").innerHTML = pass();
