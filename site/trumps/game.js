import "../shared/idle.js";
import { CARDS, STATS, FACTIONS } from "./cards.js";
import { portrait, crest } from "../shared/portraits.js";

const $ = (s) => document.querySelector(s);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const W = 300;
const H = 500;

const OPPONENTS = {
  roddy: {
    card: "roddy", name: "Roddy Ho", short: "Roddy", sub: "Easy",
    pick: (card) => STATS[Math.floor(Math.random() * STATS.length)].key,
    lose: "Beaten by Roddy Ho. He is already telling Slough House it was a masterclass.",
  },
  diana: {
    card: "taverner", name: "Diana Taverner", short: "Taverner", sub: "Shrewd",
    pick: (card) => (Math.random() < 0.25 ? STATS[Math.floor(Math.random() * STATS.length)].key : bestRaw(card)),
    lose: "Diana Taverner takes the lot. This game never happened, and you were never here.",
  },
  lamb: {
    card: "lamb", name: "Jackson Lamb", short: "Lamb", sub: "Ruthless",
    pick: (card) => bestRanked(card),
    lose: "Lamb takes the lot, puts his feet back on the desk and lights another. You are, as he has always said, a disappointment.",
  },
};

const bestRaw = (card) => STATS.reduce((a, s) => (card.stats[s.key] > card.stats[a] ? s.key : a), STATS[0].key);

// Rank each stat against the whole deck, so a 60 in a stat where most cards score 10 is worth more than a 70 where most score 80.
const RANKS = Object.fromEntries(
  STATS.map(({ key }) => [key, CARDS.map((c) => c.stats[key]).sort((a, b) => a - b)])
);
const bestRanked = (card) => {
  const score = (key) => RANKS[key].filter((v) => v < card.stats[key]).length + RANKS[key].filter((v) => v === card.stats[key]).length / 2;
  return STATS.reduce((a, s) => (score(s.key) > score(a) ? s.key : a), STATS[0].key);
};

// ---------- Preferences ----------

const prefs = (() => {
  try { return JSON.parse(localStorage.getItem("sh-trumps-prefs")) ?? {}; } catch { return {}; }
})();
const savePrefs = () => { try { localStorage.setItem("sh-trumps-prefs", JSON.stringify(prefs)); } catch {} };

// ---------- Sound ----------

let audio;
const ctx = () => (audio ??= new (window.AudioContext || window.webkitAudioContext)());
function noise(dur, freq, gain = 0.25) {
  if (prefs.muted) return;
  const a = ctx();
  const buf = a.createBuffer(1, a.sampleRate * dur, a.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** 2;
  const src = a.createBufferSource();
  const f = a.createBiquadFilter();
  const g = a.createGain();
  src.buffer = buf;
  f.type = "bandpass";
  f.frequency.value = freq;
  f.Q.value = 0.8;
  g.gain.value = gain;
  src.connect(f).connect(g).connect(a.destination);
  src.start();
}
function tones(notes, type = "triangle", gain = 0.12) {
  if (prefs.muted) return;
  const a = ctx();
  notes.forEach(([freq, at, len]) => {
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = type;
    o.frequency.value = freq;
    const t = a.currentTime + at;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    o.connect(g).connect(a.destination);
    o.start(t);
    o.stop(t + len + 0.05);
  });
}
const sfx = {
  deal: () => noise(0.09, 2600, 0.18),
  flip: () => noise(0.14, 1500, 0.3),
  pick: () => tones([[660, 0, 0.12]], "sine", 0.08),
  win: () => tones([[523, 0, 0.3], [659, 0.09, 0.3], [784, 0.18, 0.5]]),
  lose: () => tones([[330, 0, 0.35], [262, 0.14, 0.6]], "sawtooth", 0.05),
  draw: () => tones([[440, 0, 0.25], [440, 0.14, 0.3]], "sine", 0.08),
};
const buzz = (p) => navigator.vibrate?.(p);

// ---------- Card DOM ----------

const backURL = `url("data:image/svg+xml,${encodeURIComponent(crest().replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" '))}")`;
document.documentElement.style.setProperty("--back", backURL);

// Face-down cards in flight only ever show their back, so skip the face entirely.
function backEl() {
  const el = document.createElement("div");
  el.className = "card down";
  el.innerHTML = `<div class="card-inner"><div class="face back">${crest()}</div></div>`;
  return el;
}

function cardEl(card, { down = false } = {}) {
  const el = document.createElement("div");
  el.className = "card" + (down ? " down" : "");
  const faction = FACTIONS[card.faction];
  el.style.setProperty("--faction", faction.color);
  el.innerHTML = `<div class="card-inner">
    <div class="face front">
      <div class="card-head">
        <div class="card-no"><small>FILE</small>${card.no}</div>
        <h3>${card.name}</h3>
        <p>${card.role}</p>
        <span class="card-series">Seen in ${card.series.map((s) => "S" + s).join(" · ")}</span>
      </div>
      <div class="dossier">
        <div class="portrait">${portrait(card, faction.color)}</div>
        <div class="side"><span class="rubber">${faction.stamp}</span><p class="blurb">${card.blurb}</p></div>
      </div>
      <ol class="stats">${STATS.map((s) => `<li><button class="stat" data-stat="${s.key}" style="--v:${card.stats[s.key]}" tabindex="-1"><span>${s.label}</span><i></i><b>${card.stats[s.key]}</b></button></li>`).join("")}</ol>
      <div class="card-foot"><span>${faction.name}</span><span>Unofficial fan card</span></div>
      <div class="stamp"></div>
    </div>
    <div class="face back">${crest()}</div>
  </div>`;
  return el;
}

// ---------- Layout ----------

const stage = $("#stage");

function rectOf(sel) {
  const r = $(sel).getBoundingClientRect();
  return { x: r.left, y: r.top, s: r.width / W };
}
function slots() {
  const t = $("#table").getBoundingClientRect();
  const one = Math.min((t.width - 32) / W, (t.height - 16) / H, 1.3);
  const gap = Math.max(8, t.width * 0.02);
  const two = Math.min((t.width - 24 - gap) / (2 * W), (t.height - 16) / H, 1.15);
  const pairW = 2 * W * two + gap;
  const out = {
    choose: { x: t.left + (t.width - W * one) / 2, y: t.top + (t.height - H * one) / 2, s: one },
    left: { x: t.left + (t.width - pairW) / 2, y: t.top + (t.height - H * two) / 2, s: two, r: -2 },
    right: { x: t.left + (t.width - pairW) / 2 + W * two + gap, y: t.top + (t.height - H * two) / 2, s: two, r: 2 },
    you: rectOf("#pile-you"),
    cpu: rectOf("#pile-cpu"),
    pot: rectOf("#pot .pile"),
  };
  for (const k in out) out[k].name = k;
  return out;
}

function place(el, { x, y, s, r = 0, name }, dur = 0.7) {
  if (name) el.dataset.slot = name;
  el.style.setProperty("--dur", dur + "s");
  el.style.transform = `translate(${x}px, ${y}px) scale(${s}) rotate(${r}deg)`;
}
function jump(el, pos) {
  el.style.transition = "none";
  place(el, pos);
  el.offsetWidth;
  el.style.transition = "";
}

// ---------- Game state ----------

const state = { you: [], cpu: [], pot: [], lead: "you", opp: null, rounds: 0, wins: 0, active: [], token: 0 };

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function updateCounts() {
  $("#count-you").textContent = state.you.length;
  $("#count-cpu").textContent = state.cpu.length;
  $("#count-pot").textContent = state.pot.length;
  $("#pile-you").classList.toggle("empty", !state.you.length);
  $("#pile-cpu").classList.toggle("empty", !state.cpu.length);
  $("#pot").hidden = !state.pot.length;
  $("#lead-you").classList.toggle("on", state.lead === "you");
  $("#lead-cpu").classList.toggle("on", state.lead === "cpu");
  $("#score").textContent = state.rounds ? `Hand ${state.rounds}` : "";
}
const bump = (sel) => {
  const el = $(sel);
  el.classList.remove("bump");
  el.offsetWidth;
  el.classList.add("bump");
};
const say = (html) => ($("#prompt").innerHTML = html);

function show(id) {
  for (const s of document.querySelectorAll(".screen")) s.hidden = s.id !== id;
}

async function newGame() {
  const token = ++state.token;
  clearStage();
  const opp = OPPONENTS[prefs.opp ?? "lamb"];
  const size = Number(prefs.length ?? 24);
  const deck = shuffle([...CARDS]).slice(0, size);
  Object.assign(state, { you: [], cpu: [], pot: [], opp, rounds: 0, wins: 0, lead: Math.random() < 0.5 ? "you" : "cpu" });
  $("#cpu-name").textContent = opp.name;
  $("#cpu-sub").textContent = opp.sub;
  show("game");
  updateCounts();
  say("Shuffling the files…");
  await wait(250);
  await deal(deck, token);
  if (token !== state.token) return;
  say(state.lead === "you" ? "You won the cut. <b>You lead.</b>" : `${opp.short} won the cut.`);
  await wait(900);
  loop(token);
}

async function deal(deck, token) {
  const sl = slots();
  const t = $("#table").getBoundingClientRect();
  const centre = { x: t.left + t.width / 2 - W * 0.18, y: t.top + t.height / 2 - H * 0.18, s: 0.36 };
  const flying = [];
  for (let i = 0; i < deck.length; i++) {
    if (token !== state.token) return;
    const toYou = i % 2 === 0;
    const el = backEl();
    stage.append(el);
    jump(el, { ...centre, r: Math.random() * 10 - 5 });
    flying.push(el);
    requestAnimationFrame(() => place(el, { ...(toYou ? sl.you : sl.cpu), r: toYou ? 4 : -4 }, 0.45));
    sfx.deal();
    setTimeout(() => {
      (toYou ? state.you : state.cpu).push(deck[i]);
      updateCounts();
      bump(toYou ? "#pile-you" : "#pile-cpu");
      el.remove();
    }, 450);
    await wait(70);
  }
  await wait(500);
}

function clearStage() {
  stage.replaceChildren();
}

async function loop(token) {
  while (token === state.token) {
    if (!state.you.length || !state.cpu.length) return finish();
    await round(token);
  }
}

function tapToContinue(token, ms) {
  return new Promise((resolve) => {
    const timer = ms && setTimeout(() => (cleanup(), resolve()), ms);
    const go = (e) => {
      if (e.type === "keydown" && !["Enter", " "].includes(e.key)) return;
      cleanup();
      resolve();
    };
    const cleanup = () => {
      window.removeEventListener("pointerup", go);
      window.removeEventListener("keydown", go);
      clearInterval(guard);
      clearTimeout(timer);
    };
    const guard = setInterval(() => token !== state.token && (cleanup(), resolve()), 200);
    setTimeout(() => {
      window.addEventListener("pointerup", go);
      window.addEventListener("keydown", go);
    }, 350);
  });
}

function playerPick(el, token) {
  return new Promise((resolve) => {
    el.classList.add("choosing");
    const buttons = [...el.querySelectorAll(".stat")];
    buttons.forEach((b) => (b.tabIndex = 0));
    const onClick = (e) => {
      const b = e.target.closest(".stat");
      if (!b) return;
      done(b.dataset.stat);
    };
    const onKey = (e) => {
      const n = Number(e.key);
      if (n >= 1 && n <= STATS.length) done(STATS[n - 1].key);
    };
    const done = (key) => {
      el.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
      clearInterval(guard);
      el.classList.remove("choosing");
      buttons.forEach((b) => (b.tabIndex = -1));
      resolve(key);
    };
    const guard = setInterval(() => token !== state.token && done(null), 200);
    el.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    buttons[0].focus({ preventScroll: true });
  });
}

function stamp(el, text, blue) {
  const s = el.querySelector(".stamp");
  s.innerHTML = text;
  s.classList.toggle("blue", !!blue);
  s.classList.add("show");
}

async function round(token) {
  const yc = state.you[0];
  const cc = state.cpu[0];
  const opp = state.opp;
  const first = opp.short;
  state.rounds++;
  updateCounts();

  let sl = slots();
  const yEl = cardEl(yc, { down: true });
  stage.append(yEl);
  jump(yEl, sl.you);
  state.you.shift();
  updateCounts();
  requestAnimationFrame(() => {
    place(yEl, sl.choose, 0.65);
    yEl.classList.remove("down");
    yEl.classList.add("shine");
  });
  sfx.flip();
  await wait(700);
  if (token !== state.token) return;

  let key;
  if (state.lead === "you") {
    say(`Your lead. <b>Choose a category.</b>`);
    key = await playerPick(yEl, token);
    if (!key) return;
    sfx.pick();
  } else {
    say(`${first}'s lead. ${first} picks the category…`);
    await wait(900 + Math.random() * 700);
    if (token !== state.token) return;
    key = opp.pick(cc);
    say(`${first} calls <b>${STATS.find((s) => s.key === key).label}</b> against you.`);
    sfx.pick();
  }
  yEl.querySelector(`[data-stat="${key}"]`).classList.add("picked");
  await wait(state.lead === "you" ? 250 : 900);
  if (token !== state.token) return;

  sl = slots();
  const cEl = cardEl(cc, { down: true });
  stage.append(cEl);
  jump(cEl, sl.cpu);
  state.cpu.shift();
  updateCounts();
  place(yEl, sl.left, 0.6);
  requestAnimationFrame(() => {
    place(cEl, sl.right, 0.65);
    setTimeout(() => {
      cEl.classList.remove("down");
      cEl.classList.add("shine");
      sfx.flip();
    }, 220);
  });
  cEl.querySelector(`[data-stat="${key}"]`).classList.add("picked");
  await wait(1100);
  if (token !== state.token) return;

  const label = STATS.find((s) => s.key === key).label;
  const a = yc.stats[key];
  const b = cc.stats[key];
  const outcome = a > b ? "win" : a < b ? "lose" : "draw";
  const [yRow, cRow] = [yEl, cEl].map((el) => el.querySelector(`[data-stat="${key}"]`));
  yRow.classList.add(outcome === "win" ? "won" : outcome === "lose" ? "lost" : "drew");
  cRow.classList.add(outcome === "lose" ? "won" : outcome === "win" ? "lost" : "drew");
  if (outcome === "win") {
    stamp(yEl, "Won");
    sfx.win();
    buzz(30);
    say(`${label} <b>${a}</b> beats <b>${b}</b>. Your hand.`);
  } else if (outcome === "lose") {
    stamp(cEl, "Won");
    sfx.lose();
    buzz([40, 60, 40]);
    say(`${label} <b>${b}</b> beats <b>${a}</b>. ${first}'s hand.<span class="tap">Tap to continue</span>`);
  } else {
    stamp(yEl, "Stand&#8209;off", true);
    stamp(cEl, "Stand&#8209;off", true);
    sfx.draw();
    say(`${label} <b>${a}</b> apiece. Both cards to the pot.`);
  }

  // Wins and stand-offs collect themselves; a loss waits so the opponent's card can be read.
  await tapToContinue(token, outcome === "lose" ? 0 : 1600);
  if (token !== state.token) return;
  say("");

  sl = slots();
  if (outcome === "draw") {
    place(yEl, { ...sl.pot, r: -8 }, 0.55);
    place(cEl, { ...sl.pot, r: 8 }, 0.55);
    yEl.classList.add("down");
    cEl.classList.add("down");
    sfx.deal();
    await wait(560);
    state.pot.push(yc, cc);
    bump("#pot .pile");
  } else {
    const dest = outcome === "win" ? sl.you : sl.cpu;
    const pile = outcome === "win" ? state.you : state.cpu;
    if (state.pot.length) {
      const potEl = backEl();
      stage.append(potEl);
      jump(potEl, sl.pot);
      requestAnimationFrame(() => place(potEl, dest, 0.6));
      $("#pot").hidden = true;
      setTimeout(() => potEl.remove(), 620);
    }
    place(yEl, dest, 0.55);
    place(cEl, dest, 0.6);
    yEl.classList.add("down");
    cEl.classList.add("down");
    sfx.deal();
    await wait(620);
    pile.push(...(outcome === "win" ? [yc, cc] : [cc, yc]), ...shuffle(state.pot));
    state.pot = [];
    state.lead = outcome === "win" ? "you" : "cpu";
    if (outcome === "win") state.wins++;
    bump(outcome === "win" ? "#pile-you" : "#pile-cpu");
  }
  yEl.remove();
  cEl.remove();
  updateCounts();
}

function finish() {
  const won = state.you.length > 0;
  const stalemate = !state.you.length && !state.cpu.length;
  const seal = $("#end-seal");
  seal.textContent = won ? "Cleared" : stalemate ? "No further action" : "Slow";
  seal.classList.toggle("won", won);
  $("#end-title").textContent = won ? "Back to Regent's Park" : stalemate ? "Mutually assured deniability" : "Sent to Slough House";
  $("#end-text").textContent = stalemate
    ? "The last cards tied and everything went into the pot. Nobody walks away with it, and the paperwork is lost."
    : won
    ? `You took every card from ${state.opp.name} in ${state.rounds} hands. Lamb will still call you useless.`
    : state.opp.lose;
  if (won) tones([[523, 0, 0.3], [659, 0.12, 0.3], [784, 0.24, 0.3], [1047, 0.36, 0.8]]);
  else tones([[392, 0, 0.4], [349, 0.2, 0.4], [262, 0.4, 0.9]], "sawtooth", 0.05);
  $("#end").showModal();
}

function leave() {
  state.token++;
  clearStage();
  show("title");
}

// ---------- Title, gallery, dialogs ----------

const oppBox = $("#opponents");
for (const [key, o] of Object.entries(OPPONENTS)) {
  const card = CARDS.find((c) => c.id === o.card);
  oppBox.insertAdjacentHTML(
    "beforeend",
    `<label><input type="radio" name="opp" value="${key}"><span><div class="mini">${portrait(card, FACTIONS[card.faction].color)}</div><b>${o.short}</b><small>${o.sub}</small></span></label>`
  );
}
for (const name of ["opp", "length"]) {
  const val = prefs[name] ?? (name === "opp" ? "lamb" : "24");
  const input = document.querySelector(`input[name="${name}"][value="${val}"]`) ?? document.querySelector(`input[name="${name}"]`);
  input.checked = true;
  prefs[name] = input.value;
  document.querySelectorAll(`input[name="${name}"]`).forEach((i) =>
    i.addEventListener("change", () => {
      prefs[name] = i.value;
      savePrefs();
    })
  );
}

$("#title-crest").innerHTML = crest();
$("#stat-help").innerHTML = STATS.map((s) => `<dt>${s.label}</dt><dd>${s.hint}</dd>`).join("");

const SPEAKER = (on) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/>${on ? '<path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>' : '<path d="M17 9l5 6M22 9l-5 6"/>'}</svg>`;
const renderMute = () => ($("#mute").innerHTML = SPEAKER(!prefs.muted));
renderMute();
$("#mute").addEventListener("click", (e) => {
  e.stopPropagation();
  prefs.muted = !prefs.muted;
  savePrefs();
  renderMute();
});

$("#deal").addEventListener("click", () => {
  ctx().resume?.();
  newGame();
});
$("#quit").addEventListener("click", (e) => {
  e.stopPropagation();
  leave();
});
$("#again").addEventListener("click", () => {
  $("#end").close();
  newGame();
});
$("#to-title").addEventListener("click", () => {
  $("#end").close();
  leave();
});
$("#open-rules").addEventListener("click", () => $("#rules").showModal());

let galleryBuilt = false;
$("#open-gallery").addEventListener("click", () => {
  if (!galleryBuilt) {
    $("#gallery-grid").innerHTML = "";
    // Build in small batches so opening the deck never stalls a frame.
    const add = (from) => {
      CARDS.slice(from, from + 2).forEach((card, j) => {
        const i = from + j;
        const b = document.createElement("button");
        b.className = "thumb";
        b.style.setProperty("--i", i);
        b.setAttribute("aria-label", card.name);
        b.append(cardEl(card));
        b.addEventListener("click", () => {
          const z = $("#zoom-card");
          z.style.setProperty("--s", Math.min(1, (innerWidth - 32) / W, (innerHeight - 100) / H));
          z.replaceChildren(cardEl(card));
          $("#zoom").showModal();
        });
        $("#gallery-grid").append(b);
      });
      if (from + 2 < CARDS.length) requestAnimationFrame(() => add(from + 2));
    };
    add(0);
    galleryBuilt = true;
  }
  show("gallery");
});
$("#close-gallery").addEventListener("click", () => show("title"));
for (const d of document.querySelectorAll("dialog:not(#end)")) {
  d.addEventListener("click", (e) => e.target === d && d.close());
}

addEventListener("resize", () => {
  const sl = slots();
  for (const el of stage.children) {
    const slot = el.dataset.slot;
    if (slot && sl[slot]) jump(el, { ...sl[slot], r: 0 });
  }
});
