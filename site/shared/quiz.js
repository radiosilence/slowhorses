// One engine for both quizzes. Each quiz page passes in its own data module:
// { id, title, kicker, form, intro, verdict, stampWord, secondLabel, axes, questions, results, art, shareText }

const $ = (s) => document.querySelector(s);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const pause = (ms) => wait(reduced.matches ? 0 : ms);
const pad = (n, w = 2) => String(n).padStart(w, "0");
const sum = (xs) => xs.reduce((a, b) => a + b, 0);

const CUTOFF = "Safe up to the end of season 5";
const DISCLAIMER = "A non-commercial fan project. Not affiliated with or endorsed by Apple, See-Saw Films or Mick Herron. Characters belong to their owners; all illustrations are original and drawn in code.";

// ---------- Preferences ----------

const prefs = (() => {
  try { return JSON.parse(localStorage.getItem("sh-quiz-prefs")) ?? {}; } catch { return {}; }
})();
const savePrefs = () => { try { localStorage.setItem("sh-quiz-prefs", JSON.stringify(prefs)); } catch {} };

// ---------- Sound ----------

let audio;
const ctx = () => (audio ??= new (window.AudioContext || window.webkitAudioContext)());
function noise(dur, freq, gain = 0.3, q = 1) {
  if (prefs.muted) return;
  try {
    const a = ctx();
    const buf = a.createBuffer(1, Math.ceil(a.sampleRate * dur), a.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** 3;
    const src = a.createBufferSource();
    const f = a.createBiquadFilter();
    const g = a.createGain();
    src.buffer = buf;
    f.type = "bandpass";
    f.frequency.value = freq;
    f.Q.value = q;
    g.gain.value = gain;
    src.connect(f).connect(g).connect(a.destination);
    src.start();
  } catch {}
}
const sfx = {
  key: () => noise(0.035, 2400 + Math.random() * 800, 0.22, 2),
  carriage: () => { noise(0.18, 700, 0.3, 0.8); setTimeout(() => noise(0.05, 3200, 0.15), 160); },
  stamp: () => { noise(0.25, 90, 1.2, 0.7); noise(0.08, 1800, 0.25); },
};
const buzz = (p) => navigator.vibrate?.(p);
const SPEAKER = (on) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/>${on ? '<path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>' : '<path d="M17 9l5 6M22 9l-5 6"/>'}</svg>`;

// ---------- Scoring ----------

function axisRange(quiz, key) {
  const vals = quiz.questions.map((q) => q.options.map((o) => o.axes?.[key] ?? 0));
  return [sum(vals.map((v) => Math.min(...v))), sum(vals.map((v) => Math.max(...v)))];
}

export function score(quiz, picks) {
  const totals = Object.fromEntries(Object.keys(quiz.results).map((k) => [k, 0]));
  const axes = Object.fromEntries(quiz.axes.map((a) => [a.key, 0]));
  picks.forEach((i, qi) => {
    const o = quiz.questions[qi].options[i];
    for (const [k, v] of Object.entries(o.results)) totals[k] += v;
    for (const [k, v] of Object.entries(o.axes ?? {})) axes[k] += v;
  });
  // Ties go to whichever result the final answer favoured, then to data order.
  const last = quiz.questions.at(-1).options[picks.at(-1)].results;
  const ranked = Object.keys(totals).sort((a, b) => totals[b] - totals[a] || (last[b] ?? 0) - (last[a] ?? 0));
  const stats = quiz.axes.map((a) => {
    const [lo, hi] = axisRange(quiz, a.key);
    return Math.round(((axes[a.key] - lo) / (hi - lo || 1)) * 100);
  });
  const best = totals[ranked[0]] || 1;
  return { first: ranked[0], second: ranked[1], stats, match: Math.max(0, Math.round((totals[ranked[1]] / best) * 100)) };
}

// #<first>/<second>/<stat.stat.stat>/<match>
const encode = (r) => `#${r.first}/${r.second}/${r.stats.join(".")}/${r.match}`;
function decode(quiz, hash) {
  const [first, second, stats, match] = hash.replace(/^#/, "").split("/");
  if (!quiz.results[first] || !quiz.results[second] || first === second) return null;
  const nums = (stats ?? "").split(".").map(Number);
  if (nums.length !== quiz.axes.length || nums.some((n) => !Number.isInteger(n) || n < 0 || n > 100)) return null;
  const m = Number(match);
  return { first, second, stats: nums, match: Number.isInteger(m) && m >= 0 && m <= 100 ? m : 80 };
}

// ---------- Page ----------

function skeleton(quiz) {
  document.body.insertAdjacentHTML("afterbegin", `
  <a class="back-link" href="../">← All games</a>
  <button class="icon-btn mute" id="mute" aria-label="Toggle sound"></button>

  <main id="title" class="screen">
    <div class="sheet cover">
      <p class="ref"><span id="form-no"></span><span class="rubber cover-stamp">Confidential</span></p>
      <div class="title-art" id="title-art"></div>
      <p class="kicker" id="kicker"></p>
      <h1 id="title-h"></h1>
      <p class="intro" id="intro"></p>
      <ul class="facts">
        <li><b id="q-count"></b> questions, four answers each</li>
        <li>${CUTOFF}; nothing from season 6</li>
      </ul>
      <button class="btn primary" id="begin">Open the file</button>
      <a class="previous" id="previous" hidden></a>
    </div>
    <p class="site-foot">${DISCLAIMER}</p>
  </main>

  <main id="quiz" class="screen" hidden>
    <header class="q-bar">
      <button class="btn small" id="back" aria-label="Previous question">← Back</button>
      <div class="progress"><span id="q-num"></span><div class="track"><i id="q-track"></i></div></div>
      <button class="btn small" id="quit">Abandon</button>
    </header>
    <div class="deck" id="deck"></div>
  </main>

  <div id="processing" class="processing" hidden>
    <div class="proc-sheet">
      <p class="proc-title">Vetting in progress</p>
      <div class="proc-lines">${Array.from({ length: 7 }, (_, i) => `<i style="--i:${i};--w:${55 + ((i * 37) % 40)}%"></i>`).join("")}</div>
    </div>
  </div>

  <main id="result" class="screen" hidden>
    <article class="sheet dossier">
      <p class="shared-note" id="r-shared" hidden>A colleague has passed you their file. <a href="#" id="r-take">Take the quiz</a> to get your own.</p>
      <header class="r-head">
        <span class="ref" id="r-serial"></span>
        <span class="ref">${CUTOFF}</span>
      </header>
      <div class="r-top">
        <div class="r-art" id="r-art"></div>
        <div class="r-id">
          <p class="kicker" id="r-kicker"></p>
          <h2 id="r-name"></h2>
          <p class="r-sub" id="r-sub"></p>
        </div>
        <div class="r-stamp rubber" id="r-stamp"></div>
      </div>
      <div class="r-body" id="r-body"></div>
      <section class="r-people" id="r-people-wrap" hidden><h3>Also posted here</h3><ul id="r-people"></ul></section>
      <section class="r-axes"><h3>Assessment</h3><ol id="r-axes"></ol></section>
      <section class="r-second"><h3 id="r-second-h"></h3><div id="r-second"></div></section>
      <div class="r-actions">
        <button class="btn primary" id="share">Share this file</button>
        <button class="btn" id="retake">Take it again</button>
      </div>
      <p class="site-foot">${DISCLAIMER} <a href="../">More games</a></p>
    </article>
  </main>
  <div id="toast" class="toast" role="status"></div>`);
}

export function run(quiz) {
  skeleton(quiz);
  let picks = [];
  let busy = false;
  let at = 0;

  const screens = ["title", "quiz", "result"];
  const show = (id) => {
    for (const s of screens) $(`#${s}`).hidden = s !== id;
    document.body.dataset.screen = id;
    window.scrollTo(0, 0);
  };

  const renderMute = () => ($("#mute").innerHTML = SPEAKER(!prefs.muted));
  $("#mute").addEventListener("click", () => {
    prefs.muted = !prefs.muted;
    savePrefs();
    renderMute();
  });
  renderMute();

  function renderTitle() {
    $("#title-art").innerHTML = quiz.titleArt();
    $("#form-no").textContent = quiz.form;
    $("#kicker").textContent = quiz.kicker;
    $("#title-h").textContent = quiz.title;
    $("#intro").textContent = quiz.intro;
    $("#q-count").textContent = quiz.questions.length;
    const last = prefs.last?.[quiz.id];
    const r = last && decode(quiz, last);
    const prev = $("#previous");
    prev.hidden = !r;
    if (r) {
      prev.innerHTML = `On file: <b>${quiz.results[r.first].name}</b>`;
      prev.href = last;
    }
  }

  function start() {
    picks = [];
    history.replaceState(null, "", location.pathname + location.search);
    show("quiz");
    $("#deck").replaceChildren();
    renderQuestion(0, true);
  }

  function renderQuestion(i, first = false) {
    at = i;
    const q = quiz.questions[i];
    const n = quiz.questions.length;
    $("#q-num").textContent = `${pad(i + 1)} / ${pad(n)}`;
    $("#q-track").style.width = `${((i + 1) / n) * 100}%`;
    $("#back").disabled = i === 0;

    const card = document.createElement("article");
    card.className = "qcard sheet";
    card.innerHTML = `
      <header><span class="q-tag">Section ${String.fromCharCode(65 + i)}</span><span class="q-loc">${q.where}</span></header>
      <h2 id="q-text">${q.text}</h2>
      <div class="options" role="radiogroup" aria-labelledby="q-text">
        ${q.options.map((o, j) => `
          <button class="opt" role="radio" aria-checked="${picks[i] === j}" data-i="${j}" style="--d:${j}">
            <span class="box" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 13 L10 19 L21 4"/></svg></span>
            <span class="txt"><b>${"ABCD"[j]}.</b> ${o.text}</span>
          </button>`).join("")}
      </div>`;
    const deck = $("#deck");
    const old = deck.querySelector(".qcard:not(.leaving)");
    if (old) {
      old.classList.add("leaving");
      old.addEventListener("animationend", () => old.remove(), { once: true });
      setTimeout(() => old.remove(), 1200);
    }
    if (!first) card.classList.add("entering");
    deck.append(card);
    card.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => choose(i, Number(b.dataset.i), b)));
    if (!reduced.matches) [0, 70, 130, 210, 260].forEach((t) => setTimeout(sfx.key, t + 120));
    requestAnimationFrame(() => card.querySelector(".opt")?.focus({ preventScroll: true }));
  }

  async function choose(i, j, btn) {
    if (busy) return;
    busy = true;
    picks[i] = j;
    picks.length = i + 1;
    btn.closest(".options").querySelectorAll(".opt").forEach((b) => b.setAttribute("aria-checked", String(b === btn)));
    btn.classList.add("picked");
    sfx.key();
    buzz(8);
    await pause(520);
    if (i + 1 < quiz.questions.length) {
      sfx.carriage();
      renderQuestion(i + 1);
    } else {
      await finish();
    }
    busy = false;
  }

  function back() {
    if (busy || at === 0) return;
    picks.length = at - 1;
    renderQuestion(at - 1);
  }

  async function finish() {
    const r = score(quiz, picks);
    const hash = encode(r);
    prefs.last = { ...prefs.last, [quiz.id]: hash };
    savePrefs();
    history.replaceState(null, "", hash);
    $("#processing").hidden = false;
    await pause(1500);
    $("#processing").hidden = true;
    renderResult(r, false);
  }

  function renderResult(r, shared) {
    const d = quiz.results[r.first];
    const s = quiz.results[r.second];
    const root = $("#result");
    root.style.setProperty("--accent", d.colour);
    $("#r-shared").hidden = !shared;
    $("#retake").textContent = shared ? "Take the quiz" : "Take it again";
    $("#r-art").innerHTML = quiz.art(r.first, d);
    $("#r-kicker").textContent = quiz.verdict;
    $("#r-name").textContent = d.name;
    $("#r-sub").textContent = d.sub;
    $("#r-body").innerHTML = d.body.map((p) => `<p>${p}</p>`).join("");
    $("#r-people-wrap").hidden = !d.people;
    $("#r-people").innerHTML = (d.people ?? []).map(([n, w]) => `<li><b>${n}</b> ${w}</li>`).join("");
    $("#r-axes").innerHTML = quiz.axes.map((a, i) => `
      <li style="--v:${r.stats[i]};--i:${i}">
        <span class="ax-lab">${a.label}</span>
        <span class="ax-bar"><i></i></span>
        <span class="ax-val">${r.stats[i]}</span>
        <small>${r.stats[i] >= 50 ? a.hi : a.lo}</small>
      </li>`).join("");
    $("#r-second-h").textContent = quiz.secondLabel;
    $("#r-second").innerHTML = `<div class="mini">${quiz.art(r.second, s)}</div><div><b>${s.name}</b><span>${s.sub}</span><small>${r.match}% as good a fit</small></div>`;
    $("#r-stamp").textContent = quiz.stampWord;
    $("#r-serial").textContent = `${quiz.form} · No. ${serial(r)}`;
    show("result");
    root.classList.remove("in");
    void root.offsetWidth;
    root.classList.add("in");
    if (!reduced.matches && !shared) setTimeout(() => { sfx.stamp(); buzz([0, 20, 40, 30]); }, 900);
  }

  const serial = (r) => {
    let h = 7;
    for (const c of encode(r)) h = (h * 31 + c.charCodeAt(0)) % 99991;
    return pad(h, 5);
  };

  async function share() {
    const r = decode(quiz, location.hash);
    if (!r) return;
    const url = location.href;
    const text = quiz.shareText(quiz.results[r.first]);
    if (navigator.share) {
      try { await navigator.share({ title: document.title, text, url }); return; } catch (e) { if (e.name === "AbortError") return; }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      toast("Link copied to clipboard");
    } catch {
      prompt("Copy this link", url);
    }
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("on"), 2200);
  }

  function route() {
    const hit = decode(quiz, location.hash);
    renderTitle();
    if (hit) renderResult(hit, prefs.last?.[quiz.id] !== location.hash);
    else show("title");
  }

  $("#begin").addEventListener("click", () => { ctx().resume?.(); start(); });
  $("#back").addEventListener("click", back);
  $("#quit").addEventListener("click", () => { history.replaceState(null, "", location.pathname); renderTitle(); show("title"); });
  $("#retake").addEventListener("click", start);
  $("#r-take").addEventListener("click", (e) => { e.preventDefault(); start(); });
  $("#share").addEventListener("click", share);
  window.addEventListener("hashchange", route);
  document.addEventListener("keydown", (e) => {
    if (document.body.dataset.screen !== "quiz" || e.metaKey || e.ctrlKey || e.altKey) return;
    const j = "1234".indexOf(e.key) >= 0 ? "1234".indexOf(e.key) : "abcd".indexOf(e.key.toLowerCase());
    if (j >= 0) document.querySelector(`.qcard:not(.leaving) .opt[data-i="${j}"]`)?.click();
    else if (e.key === "Backspace") back();
  });
  route();
}
