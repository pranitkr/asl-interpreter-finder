// Front end, kept as plain strings so the Worker needs no build step and no wrangler rules.
// Rule for this file: no backticks and no dollar-brace inside the strings.

export const HTML = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ASL Interpreter Finder · ACDHH demo</title>
<link rel="stylesheet" href="/app.css">
<script src="/app.js" defer></script>
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
<header class="top">
  <div class="brand"><strong>Interpreter Finder</strong><span class="demo">Demo · fake data · no real people</span></div>
  <nav aria-label="Main">
    <a href="#/" data-nav="find">Find</a>
    <a href="#/status" data-nav="status">My status</a>
    <a href="#/staff" data-nav="staff">Staff</a>
  </nav>
  <div class="tools" role="group" aria-label="Display options">
    <button type="button" id="t-large" aria-pressed="false">Large text</button>
    <button type="button" id="t-contrast" aria-pressed="false">High contrast</button>
  </div>
</header>
<main id="main" tabindex="-1"></main>
<div id="live" class="sr" role="status" aria-live="polite"></div>
<footer>Built for a hackathon with the Arizona Commission for the Deaf and the Hard of Hearing (ACDHH). Demo only: no logins, no real contact details. Contact is always by text or email.</footer>
</body>
</html>`;

export const CSS = String.raw`
:root{--bg:#f4f6f9;--fg:#14202e;--card:#fff;--line:#5b6b7d;--soft:#d5dce5;--brand:#0b4f8a;--brandfg:#fff;--mute:#44546a;
--ok-bg:#dff3e4;--ok:#0a5c27;--warn-bg:#fff1cc;--warn:#6b4600;--bad-bg:#fde3e3;--bad:#8a1212;--off-bg:#e8ecf1;--off:#33435a}
html[data-contrast=high]{--bg:#000;--fg:#fff;--card:#000;--line:#fff;--soft:#fff;--brand:#ffe600;--brandfg:#000;--mute:#fff;
--ok-bg:#000;--ok:#7dff9a;--warn-bg:#000;--warn:#ffe600;--bad-bg:#000;--bad:#ff9a9a;--off-bg:#000;--off:#fff}
html{font-size:100%}
html[data-text=large]{font-size:125%}
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;line-height:1.5;background:var(--bg);color:var(--fg)}
a{color:var(--brand)}
html[data-contrast=high] a{color:#7fd0ff}
:focus-visible{outline:3px solid #ff8a00;outline-offset:2px}
html[data-contrast=high] :focus-visible{outline-color:#fff;box-shadow:0 0 0 6px #000}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.skip{position:absolute;left:-999px;top:0;background:#fff;color:#000;padding:12px;z-index:50}
.skip:focus{left:8px;top:8px}
.top{background:var(--card);border-bottom:2px solid var(--line);padding:10px 14px;display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center}
.brand{display:flex;flex-direction:column}
.demo{font-size:.85rem;color:var(--mute)}
nav{display:flex;gap:6px;flex:1}
nav a{display:inline-flex;align-items:center;min-height:44px;padding:0 14px;border-radius:8px;text-decoration:none;font-weight:600;border:2px solid transparent}
nav a[aria-current=page]{border-color:var(--brand);background:var(--brand);color:var(--brandfg)}
.tools{display:flex;gap:6px}
main{max-width:980px;margin:0 auto;padding:14px 14px 110px}
main:focus,h1:focus{outline:none}
h1{font-size:1.6rem;margin:.4em 0}
h2{font-size:1.25rem;margin:.2em 0 .5em}
h3{font-size:1.15rem;margin:0}
footer{max-width:980px;margin:0 auto;padding:12px 14px 30px;color:var(--mute);font-size:.9rem}
.card{background:var(--card);border:2px solid var(--soft);border-radius:12px;padding:14px;margin:0 0 12px}
html[data-contrast=high] .card{border-color:#fff}
.ai{border-color:var(--brand)}
label,legend{display:block;font-weight:600;margin:8px 0 4px}
input,select,textarea{width:100%;min-height:44px;padding:8px 10px;font:inherit;color:var(--fg);background:var(--card);border:2px solid var(--line);border-radius:8px}
textarea{resize:vertical}
input[type=checkbox]{width:24px;height:24px;min-height:0;margin:0 8px 0 0;accent-color:var(--brand)}
.check{display:flex;align-items:center;min-height:44px;font-weight:400;margin:0}
.grid{display:grid;grid-template-columns:1fr;gap:0 14px}
@media(min-width:640px){.grid{grid-template-columns:1fr 1fr}.grid3{grid-template-columns:1fr 1fr 1fr}}
fieldset{border:2px solid var(--soft);border-radius:10px;margin:10px 0;padding:6px 12px}
.btn,.tools button{min-height:44px;min-width:44px;padding:8px 16px;font:inherit;font-weight:600;border-radius:8px;border:2px solid var(--brand);background:var(--card);color:var(--brand);cursor:pointer}
html[data-contrast=high] .btn,html[data-contrast=high] .tools button{color:#ffe600;border-color:#ffe600}
.tools button[aria-pressed=true]{background:var(--brand);color:var(--brandfg)}
.btn.primary{background:var(--brand);color:var(--brandfg)}
.btn.danger{border-color:var(--bad);color:var(--bad)}
.btn.big{min-height:64px;font-size:1.2rem;flex:1}
.btn[aria-pressed=true]{background:var(--brand);color:var(--brandfg)}
.btn:disabled{opacity:.6;cursor:not-allowed}
.row{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;justify-content:space-between}
.chips{list-style:none;display:flex;flex-wrap:wrap;gap:6px;padding:0;margin:8px 0}
.chip{display:inline-flex;align-items:center;gap:6px;min-height:32px;padding:2px 10px;border:2px solid var(--line);border-radius:999px;background:var(--card);font-size:.95rem}
button.chip{min-height:44px;cursor:pointer;font:inherit;color:var(--fg)}
.badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-weight:700;border:2px solid;font-size:.95rem}
.badge.now{background:var(--ok-bg);color:var(--ok);border-color:var(--ok)}
.badge.today{background:var(--warn-bg);color:var(--warn);border-color:var(--warn)}
.badge.booked{background:var(--bad-bg);color:var(--bad);border-color:var(--bad)}
.badge.off{background:var(--off-bg);color:var(--off);border-color:var(--off)}
.warn{background:var(--warn-bg);color:var(--warn);border:2px solid var(--warn);border-radius:8px;padding:6px 10px;margin:8px 0;font-weight:600}
.bad{background:var(--bad-bg);color:var(--bad);border:2px solid var(--bad);border-radius:8px;padding:6px 10px;margin:8px 0;font-weight:600}
.good{background:var(--ok-bg);color:var(--ok);border:2px solid var(--ok);border-radius:8px;padding:10px 12px;margin:8px 0;font-weight:600}
.msg{min-height:1.5em;margin:6px 0 0}
.muted,.note{color:var(--mute)}
.meta{margin:4px 0;color:var(--mute)}
.bar{position:fixed;left:0;right:0;bottom:0;background:var(--card);border-top:3px solid var(--brand);padding:10px 14px;display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;z-index:20}
.bar[hidden]{display:none}
dialog{max-width:560px;width:calc(100% - 24px);border:3px solid var(--brand);border-radius:12px;background:var(--card);color:var(--fg);padding:16px}
dialog::backdrop{background:rgba(0,0,0,.6)}
.tiles{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px}
@media(min-width:640px){.tiles{grid-template-columns:repeat(4,1fr)}}
.tile{background:var(--card);border:2px solid var(--soft);border-radius:12px;padding:10px 12px}
.tile b{display:block;font-size:2rem;line-height:1.1}
.tile.alert{border-color:var(--bad);color:var(--bad)}
.rbar{display:block;height:12px;background:var(--brand);border-radius:6px;min-width:2px}
table{width:100%;border-collapse:collapse}
th,td{text-align:left;padding:8px;border-bottom:1px solid var(--soft);vertical-align:top}
.wrap{overflow-x:auto}
.plain{list-style:none;padding:0;margin:0}
.statusbtns{display:flex;flex-direction:column;gap:10px;margin:10px 0}
@media(min-width:640px){.statusbtns{flex-direction:row}}
.skeleton{color:var(--mute);padding:20px 0}
@media (prefers-reduced-motion:no-preference){.btn{transition:background-color .15s}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;

export const JS = String.raw`
(function () {
"use strict";
var REGIONS = ["Phoenix Metro","Tucson","Flagstaff/Northern","Yuma/Western","Prescott","Eastern/White Mountains","Statewide remote"];
var SERVICES = ["ASL interpreter","CDI/Deaf interpreter","Captioner/CART","Tactile/ProTactile"];
var SPECS = ["Medical","Legal","Educational","Mental health","VR/remote","Emergency","Performing arts","DeafBlind"];
var LEVELS = ["Provisional","Standard","Advanced","Master"];
var TZ = "America/Phoenix";
var state = { caps: { ai: false }, filters: blank(), minLevel: "", results: [], selected: [], timer: null, lastJson: "" };
var main = document.getElementById("main");

function blank() { return { service: null, specialties: [], region: null, when: null, durationMins: null, remote: null, locationType: null, city: null }; }

// ---- tiny helpers ----
function h(tag, attrs) {
  var e = document.createElement(tag);
  attrs = attrs || {};
  for (var k in attrs) {
    var v = attrs[k];
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") e.className = v;
    else if (k === "text") e.textContent = v;
    else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v === true ? "" : v);
  }
  for (var i = 2; i < arguments.length; i++) add(e, arguments[i]);
  return e;
}
function add(e, c) {
  if (c === null || c === undefined || c === false) return;
  if (Array.isArray(c)) { c.forEach(function (x) { add(e, x); }); return; }
  e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
}
function $(s, r) { return (r || document).querySelector(s); }
function say(msg) { var l = document.getElementById("live"); l.textContent = ""; setTimeout(function () { l.textContent = msg; }, 50); }
function api(path, body) {
  var init = { method: "GET", headers: {} };
  if (body !== undefined) { init.method = "POST"; init.headers["content-type"] = "application/json"; init.body = JSON.stringify(body); }
  return fetch(path, init).then(function (r) {
    return r.json().catch(function () { return {}; }).then(function (d) {
      if (!r.ok) { var e = new Error(d.error || "Something went wrong."); e.status = r.status; throw e; }
      return d;
    });
  }, function () { throw new Error("Cannot reach the server. Check your connection and try again."); });
}
function startPolling(fn, ms) { stopPolling(); state.timer = setInterval(fn, ms); }
function stopPolling() { if (state.timer) clearInterval(state.timer); state.timer = null; }
function fmtWhen(iso) {
  if (iso === "now") return "Now";
  if (iso === "today") return "Today";
  var d = new Date(iso);
  if (!iso || isNaN(d)) return "";
  return d.toLocaleString("en-US", { timeZone: TZ, weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}
function fmtDate(s) { return new Date(s + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", month: "short", day: "numeric", year: "numeric" }); }
function localInput(iso) {
  var d = new Date(iso);
  if (isNaN(d)) return "";
  return new Intl.DateTimeFormat("sv-SE", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(d).replace(" ", "T").slice(0, 16);
}
function opts(list, first) {
  var out = first ? [h("option", { value: "", text: first })] : [];
  list.forEach(function (x) { out.push(h("option", { value: Array.isArray(x) ? x[0] : x, text: Array.isArray(x) ? x[1] : x })); });
  return out;
}
function errBox(e, retry) {
  return h("div", { class: "bad", role: "alert" }, e.message || "Something went wrong.", " ", retry ? h("button", { class: "btn", type: "button", onclick: retry, text: "Try again" }) : null);
}

// ---- display options (large text, high contrast) ----
function pref(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
function applyPrefs() {
  var t = pref("text") === "large", c = pref("contrast") === "high";
  document.documentElement.setAttribute("data-text", t ? "large" : "normal");
  document.documentElement.setAttribute("data-contrast", c ? "high" : "normal");
  document.getElementById("t-large").setAttribute("aria-pressed", String(t));
  document.getElementById("t-contrast").setAttribute("aria-pressed", String(c));
}
document.getElementById("t-large").addEventListener("click", function () { pref("text", pref("text") === "large" ? "normal" : "large"); applyPrefs(); });
document.getElementById("t-contrast").addEventListener("click", function () { pref("contrast", pref("contrast") === "high" ? "normal" : "high"); applyPrefs(); });

// ================= FIND VIEW =================
function viewFind() {
  document.title = "Find an interpreter · ACDHH demo";
  var f = state.filters;
  var aiBox = state.caps.ai
    ? h("section", { class: "card ai", "aria-labelledby": "ai-h" },
        h("h2", { id: "ai-h", text: "✨ Describe what you need" }),
        h("label", { for: "ai-text", text: "Write it in your own words. We fill in the filters for you." }),
        h("textarea", { id: "ai-text", rows: "3", maxlength: "1000", placeholder: "Example: I need an interpreter at a Tucson hospital tomorrow at 2 PM for about an hour." }),
        h("p", null, h("button", { class: "btn primary", id: "ai-go", type: "button", onclick: doParse, text: "Find matches" })),
        h("p", { id: "ai-msg", class: "msg", role: "status" }))
    : h("p", { class: "note", text: "Smart search is off right now. Use the filters below." });

  var specBoxes = SPECS.map(function (s, i) {
    return h("label", { class: "check", for: "sp" + i }, h("input", { type: "checkbox", id: "sp" + i, value: s, onchange: readForm }), s);
  });
  var form = h("section", { class: "card", "aria-labelledby": "filt-h" },
    h("h2", { id: "filt-h", text: "Filters" }),
    h("div", { class: "grid" },
      h("div", null, h("label", { for: "f-service", text: "Type of help" }), h("select", { id: "f-service", onchange: readForm }, opts(SERVICES, "Any type"))),
      h("div", null, h("label", { for: "f-region", text: "Region" }), h("select", { id: "f-region", onchange: readForm }, opts(REGIONS, "Anywhere in Arizona"))),
      h("div", null, h("label", { for: "f-when", text: "When" }),
        h("select", { id: "f-when", onchange: readForm }, opts([["", "Any time"], ["now", "Available now"], ["today", "Available today"], ["at", "Pick a date and time"]]))),
      h("div", { id: "at-wrap", hidden: true }, h("label", { for: "f-at", text: "Date and time (Arizona time)" }), h("input", { id: "f-at", type: "datetime-local", onchange: readForm })),
      h("div", null, h("label", { for: "f-remote", text: "Remote or on-site" }),
        h("select", { id: "f-remote", onchange: readForm }, opts([["", "Either"], ["1", "Remote (video) is OK"], ["0", "On-site only"]]))),
      h("div", null, h("label", { for: "f-level", text: "Lowest license level" }), h("select", { id: "f-level", onchange: readForm }, opts(LEVELS, "Any level")))),
    h("fieldset", null, h("legend", { text: "Specialty (pick any)" }), h("div", { class: "grid grid3" }, specBoxes)));

  main.replaceChildren(
    h("h1", { tabindex: "-1", text: "Find an interpreter or captioner" }),
    aiBox,
    h("div", { id: "understood" }),
    form,
    h("h2", { id: "res-h", text: "Matches" }),
    h("div", { id: "results", "aria-live": "polite" }, h("p", { class: "skeleton", text: "Loading…" })),
    h("div", { class: "bar", id: "bar", hidden: true }),
    h("dialog", { id: "dlg", "aria-labelledby": "dlg-h" })
  );
  syncForm();
  renderChips();
  loadResults(false);
  startPolling(function () { loadResults(true); }, 5000); // statuses refresh every 5 seconds
  renderBar();
}

function syncForm() {
  var f = state.filters;
  $("#f-service").value = f.service || "";
  $("#f-region").value = f.region || "";
  var w = "";
  if (f.when === "now" || f.when === "today") w = f.when; else if (f.when) w = "at";
  $("#f-when").value = w;
  $("#at-wrap").hidden = w !== "at";
  $("#f-at").value = w === "at" ? localInput(f.when) : "";
  $("#f-remote").value = f.remote === true ? "1" : f.remote === false ? "0" : "";
  $("#f-level").value = state.minLevel || "";
  SPECS.forEach(function (s, i) { $("#sp" + i).checked = f.specialties.indexOf(s) >= 0; });
}

function readForm() {
  var f = state.filters;
  f.service = $("#f-service").value || null;
  f.region = $("#f-region").value || null;
  var w = $("#f-when").value;
  $("#at-wrap").hidden = w !== "at";
  if (w === "at") { var v = $("#f-at").value; f.when = v ? v + ":00-07:00" : null; } else f.when = w || null;
  var r = $("#f-remote").value;
  f.remote = r === "1" ? true : r === "0" ? false : null;
  state.minLevel = $("#f-level").value;
  f.specialties = SPECS.filter(function (s, i) { return $("#sp" + i).checked; });
  renderChips();
  loadResults(false);
}

function doParse() {
  var text = $("#ai-text").value.trim();
  var msg = $("#ai-msg"), btn = $("#ai-go");
  if (!text) { msg.textContent = "Please write what you need first."; $("#ai-text").focus(); return; }
  btn.disabled = true; msg.textContent = "Reading your request…";
  api("/api/ai/parse", { text: text }).then(function (d) {
    state.filters = Object.assign(blank(), d.filters);
    msg.textContent = "Done. " + d.understood + " You can change anything below.";
    syncForm(); renderChips(); loadResults(false);
  }).catch(function (e) {
    msg.textContent = e.message + " You can use the filters below.";
  }).then(function () { btn.disabled = false; });
}

function renderChips() {
  var f = state.filters, chips = [];
  function chip(label, clear) {
    chips.push(h("li", null, h("button", { class: "chip", type: "button", "aria-label": "Remove filter: " + label, onclick: function () { clear(); syncForm(); renderChips(); loadResults(false); } }, label + " ✕")));
  }
  if (f.service) chip(f.service, function () { f.service = null; });
  f.specialties.forEach(function (s) { chip(s, function () { f.specialties = f.specialties.filter(function (x) { return x !== s; }); }); });
  if (f.region) chip(f.region, function () { f.region = null; });
  if (f.city && f.city !== f.region) chip("City: " + f.city, function () { f.city = null; });
  if (f.locationType) chip("At: " + f.locationType, function () { f.locationType = null; });
  if (f.when) chip(fmtWhen(f.when), function () { f.when = null; });
  if (f.durationMins) chip(f.durationMins >= 60 && f.durationMins % 60 === 0 ? f.durationMins / 60 + " h" : f.durationMins + " min", function () { f.durationMins = null; });
  if (f.remote !== null) chip(f.remote ? "Remote OK" : "On-site", function () { f.remote = null; });
  if (state.minLevel) chip("License: " + state.minLevel + " or higher", function () { state.minLevel = ""; });
  var box = $("#understood");
  if (!box) return;
  box.replaceChildren(chips.length ? h("section", { "aria-label": "What we are searching for" }, h("p", { class: "meta", text: "What we are searching for. Select one to remove it:" }), h("ul", { class: "chips" }, chips)) : h("span"));
}

function query() {
  var f = state.filters, p = [];
  if (f.region) p.push("region=" + encodeURIComponent(f.region));
  if (f.specialties.length) p.push("specialty=" + encodeURIComponent(f.specialties.join(",")));
  if (f.service) p.push("service=" + encodeURIComponent(f.service));
  if (f.when) p.push("when=" + encodeURIComponent(f.when));
  if (f.remote === true) p.push("remote=1");
  return "/api/interpreters" + (p.length ? "?" + p.join("&") : "");
}

function loadResults(silent) {
  api(query()).then(function (d) {
    var list = d.interpreters;
    if (state.minLevel) { var min = LEVELS.indexOf(state.minLevel); list = list.filter(function (i) { return LEVELS.indexOf(i.level) >= min; }); }
    if (state.filters.remote === false) list = list.filter(function (i) { return i.region !== "Statewide remote"; });
    var sig = JSON.stringify(list.map(function (i) { return [i.id, i.avail.text]; })) + state.selected.join();
    if (silent && sig === state.lastJson) return; // nothing changed: do not disturb focus
    state.lastJson = sig;
    state.results = list;
    renderResults(!silent);
  }).catch(function (e) {
    if (!silent) { var r = $("#results"); if (r) r.replaceChildren(errBox(e, function () { loadResults(false); })); }
  });
}

function renderResults(announce) {
  var box = $("#results");
  if (!box) return;
  var list = state.results;
  var head = h("p", { class: "meta", text: list.length + (list.length === 1 ? " person matches." : " people match.") });
  if (!list.length) {
    box.replaceChildren(h("div", { class: "card" }, h("p", null, h("strong", { text: "No one matches all of these filters." })), h("p", { text: "Try removing a filter above, or choose a different time." }),
      h("button", { class: "btn", type: "button", text: "Clear all filters", onclick: function () { state.filters = blank(); state.minLevel = ""; syncForm(); renderChips(); loadResults(false); } })));
    if (announce) say("No one matches. Try removing a filter.");
    return;
  }
  var top3 = list.filter(function (i) { return i.avail.state === "now"; }).slice(0, 3);
  box.replaceChildren(head,
    top3.length > 1 ? h("p", null, h("button", { class: "btn", type: "button", text: "Select the top " + top3.length + " available now", onclick: function () { state.selected = top3.map(function (i) { return i.id; }); state.lastJson = ""; renderResults(false); renderBar(); say(top3.length + " people selected."); } })) : null,
    list.map(card));
  if (announce) say(list.length + (list.length === 1 ? " person matches." : " people match."));
}

function icon(s) { return s === "now" ? "✔" : s === "today" ? "◔" : s === "booked" ? "✖" : "–"; }

function card(i) {
  var sel = state.selected.indexOf(i.id) >= 0;
  return h("article", { class: "card", "aria-label": i.name },
    h("div", { class: "row" }, h("h3", { text: i.name }), h("span", { class: "badge " + i.avail.state }, icon(i.avail.state) + " " + i.avail.text)),
    h("p", { class: "meta", text: i.level + " · AZ licensed · expires " + fmtDate(i.expires) }),
    i.expiresSoon ? h("p", { class: "warn", text: "⚠ License expires in " + Math.max(i.daysToExpiry, 0) + " days (staff will check)" }) : null,
    h("ul", { class: "chips", "aria-label": "Services and specialties" },
      i.services.map(function (s) { return h("li", { class: "chip", text: s }); }),
      i.specialties.map(function (s) { return h("li", { class: "chip", text: s }); })),
    h("p", { class: "meta", text: i.region + (i.remote ? " · Remote OK" : " · On-site") + " · Contact: text or email" }),
    h("button", { class: "btn" + (sel ? "" : " primary"), type: "button", "data-id": i.id, "aria-pressed": sel ? "true" : "false", onclick: function () { toggle(i); } }, sel ? "✔ Added to request (remove)" : "Request " + i.name));
}

function toggle(i) {
  var at = state.selected.indexOf(i.id);
  if (at >= 0) state.selected.splice(at, 1);
  else if (state.selected.length >= 3) { say("You can ask up to 3 people at once."); alert("You can ask up to 3 people at once. Remove one first."); return; }
  else state.selected.push(i.id);
  state.lastJson = "";
  renderResults(false); renderBar();
  var b = $('[data-id="' + i.id + '"]'); if (b) b.focus();
}

function renderBar() {
  var bar = $("#bar");
  if (!bar) return;
  bar.hidden = state.selected.length === 0;
  bar.replaceChildren(
    h("span", { role: "status", text: state.selected.length + " of 3 selected" }),
    h("button", { class: "btn primary", type: "button", text: "Send request", onclick: openDialog }),
    h("button", { class: "btn", type: "button", text: "Clear", onclick: function () { state.selected = []; state.lastJson = ""; renderResults(false); renderBar(); } }));
}

function openDialog() {
  var dlg = $("#dlg");
  var names = state.selected.map(function (id) { var x = state.results.filter(function (r) { return r.id === id; })[0]; return x ? x.name : id; });
  var msg = h("p", { class: "msg", role: "alert" });
  var go = h("button", { class: "btn primary", type: "submit", text: "Send request" });
  var form = h("form", { method: "dialog", onsubmit: function (ev) {
    ev.preventDefault();
    go.disabled = true; msg.textContent = "Sending…";
    api("/api/requests", { filters: state.filters, note: $("#rq-note").value, requesterName: $("#rq-name").value, contact: $("#rq-contact").value, interpreterIds: state.selected })
      .then(function (r) { dlg.close(); state.selected = []; location.hash = "#/request/" + r.id; })
      .catch(function (e) { msg.textContent = e.message; go.disabled = false; });
  } },
    h("h2", { id: "dlg-h", text: "Send your request" }),
    h("p", { text: "This goes to: " + names.join(", ") + ". The first person to accept gets the job." }),
    h("label", { for: "rq-name", text: "Your first name" }), h("input", { id: "rq-name", required: true, maxlength: "40", autocomplete: "given-name" }),
    h("label", { for: "rq-contact", text: "How can we text or email you? (use a fake one in this demo)" }), h("input", { id: "rq-contact", required: true, maxlength: "80", autocomplete: "email" }),
    h("label", { for: "rq-note", text: "Anything else they should know? (optional)" }), h("textarea", { id: "rq-note", rows: "3", maxlength: "500" }),
    msg,
    h("div", { class: "row" }, go, h("button", { class: "btn", type: "button", text: "Cancel", onclick: function () { dlg.close(); } })));
  dlg.replaceChildren(form);
  dlg.showModal();
  $("#rq-name").focus();
}

// ================= REQUEST TRACKING VIEW =================
function viewRequest(id) {
  document.title = "Your request · ACDHH demo";
  var status = h("div", { role: "status", "aria-live": "polite" }, h("p", { class: "skeleton", text: "Loading…" }));
  var msgBox = h("div");
  main.replaceChildren(h("h1", { tabindex: "-1", text: "Your request" }), status, msgBox);
  var last = "", prev = "";
  function render(r) {
    var kids = [h("div", { class: "card" },
      h("p", null, h("strong", { text: r.summary }), r.filters.when ? " · " + fmtWhen(r.filters.when) : ""),
      h("p", { class: "meta", text: "Sent to: " + r.interpreters.map(function (x) { return x.name + (x.response === "decline" ? " (declined)" : x.response === "accept" ? " (accepted)" : " (waiting)"); }).join(", ") }))];
    if (r.status === "confirmed") {
      kids.unshift(h("div", { class: "good" }, "✔ Confirmed: " + r.confirmed.name + " accepted."));
      kids.push(h("div", { class: "card" }, h("h2", { text: "Next steps" }),
        h("ol", null, h("li", { text: r.confirmed.name + " will contact you by text or email: " + r.contact + "." }), h("li", { text: "Share the time and place with the Deaf client." }), h("li", { text: "If plans change, send a new request." }))));
      msgBox.replaceChildren(msgPanel(r));
    } else if (r.status === "declined") {
      kids.unshift(h("div", { class: "bad" }, "✖ No one can take this request."));
      kids.push(h("a", { class: "btn primary", href: "#/", text: "Choose other interpreters" }));
    } else {
      kids.unshift(h("div", { class: "warn" }, "◔ Waiting for the first person to accept. This page updates by itself."));
    }
    status.replaceChildren(kids);
    if (prev && prev !== r.status) say(r.status === "confirmed" ? "Confirmed. " + r.confirmed.name + " accepted your request." : "Your request was declined by everyone.");
    prev = r.status;
  }
  function load() {
    api("/api/requests/" + encodeURIComponent(id)).then(function (r) {
      var s = JSON.stringify(r);
      if (s !== last) { last = s; render(r); }
      if (r.status !== "pending") stopPolling();
    }).catch(function (e) { if (!last) status.replaceChildren(errBox(e, load)); });
  }
  load();
  startPolling(load, 5000);
}

function msgPanel(r) {
  var out = h("div");
  var btn = h("button", { class: "btn primary", type: "button", text: state.caps.ai ? "✨ Write a message for the Deaf client" : "Write a message for the Deaf client", onclick: function () {
    btn.disabled = true;
    var fallback = function () {
      var when = r.filters.when && r.filters.when.length > 8 ? fmtWhen(r.filters.when) : "as soon as possible";
      show("An interpreter is booked. Name: " + r.confirmed.name + ". Time: " + when + ". Place: " + (r.filters.locationType || "to be shared") + (r.filters.city ? " in " + r.filters.city : "") + ". We will text or email you if anything changes.");
    };
    if (!state.caps.ai) { fallback(); return; }
    api("/api/ai/confirmation", { requestId: r.id }).then(function (d) { show(d.text); }).catch(function () { fallback(); });
  } });
  function show(text) {
    var ta = h("textarea", { id: "cm", rows: "6", readonly: true }, text);
    ta.value = text;
    out.replaceChildren(h("label", { for: "cm", text: "Message in plain language" }), ta,
      h("p", null, h("button", { class: "btn", type: "button", text: "Copy message", onclick: function () {
        ta.select();
        (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(function () { say("Copied."); }, function () { document.execCommand("copy"); say("Copied."); });
      } })));
    btn.disabled = false;
  }
  return h("div", { class: "card" }, h("h2", { text: "Message for the Deaf client" }), h("p", { class: "meta", text: "Short sentences, no jargon. Copy it and send it by text or email." }), btn, out);
}

// ================= INTERPRETER STATUS VIEW =================
function viewStatus() {
  document.title = "My status · ACDHH demo";
  var picker = h("select", { id: "who" });
  var panel = h("div");
  main.replaceChildren(h("h1", { tabindex: "-1", text: "My status (interpreter page)" }),
    h("p", { class: "note", text: "Demo: there are no logins. Pick a made-up interpreter." }),
    h("label", { for: "who", text: "I am" }), picker, panel);
  api("/api/interpreters").then(function (d) {
    var all = d.interpreters.slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
    var saved = sessionStorageGet("who");
    picker.replaceChildren(all.map(function (i) { return h("option", { value: i.id, text: i.name + " (" + i.region + ")" }); }));
    if (saved) picker.value = saved;
    picker.addEventListener("change", function () { sessionStorageSet("who", picker.value); draw(); });
    draw();
    startPolling(draw, 5000);
  }).catch(function (e) { panel.replaceChildren(errBox(e, viewStatus)); });

  var forSel = null, lastSig = "";
  function draw() {
    var id = picker.value;
    Promise.all([api("/api/interpreters"), api("/api/interpreters/" + id + "/requests")]).then(function (res) {
      var me = res[0].interpreters.filter(function (i) { return i.id === id; })[0];
      var reqs = res[1].requests;
      var sig = JSON.stringify([me && me.status, reqs]);
      if (sig === lastSig) return;
      lastSig = sig;
      if (!forSel) forSel = h("select", { id: "for" }, opts([["", "Until I change it"], ["60", "For 1 hour"], ["120", "For 2 hours"]]));
      var setS = function (s) {
        var until = s !== "off" && forSel.value ? new Date(Date.now() + Number(forSel.value) * 60000).toISOString() : undefined;
        api("/api/interpreters/" + id + "/status", { status: s, until: until }).then(function () { lastSig = ""; draw(); say("Status changed to " + s + "."); }).catch(function (e) { say(e.message); });
      };
      var btn = function (s, label) { return h("button", { class: "btn big", type: "button", "aria-pressed": String(me.status === s), onclick: function () { setS(s); } }, (me.status === s ? "● " : "○ ") + label); };
      panel.replaceChildren(
        h("section", { class: "card", "aria-labelledby": "st-h" },
          h("h2", { id: "st-h", text: "My status now: " + ({ available: "Available now", busy: "Busy", off: "Off" })[me.status] }),
          h("div", { class: "statusbtns", role: "group", "aria-label": "Set my status" }, btn("available", "Available now"), btn("busy", "Busy"), btn("off", "Off")),
          h("label", { for: "for", text: "How long? (for Available or Busy)" }), forSel),
        h("section", { "aria-labelledby": "inc-h" }, h("h2", { id: "inc-h", text: "Requests for me" }),
          reqs.length ? reqs.map(function (r) { return reqCard(r, id); }) : h("p", { class: "card", text: "No requests yet. New ones show up here by themselves." })));
    }).catch(function (e) { panel.replaceChildren(errBox(e, draw)); });
  }
  function reqCard(r, id) {
    var act = function (a) { api("/api/requests/" + r.id + "/respond", { interpreterId: id, action: a }).then(function () { lastSig = ""; draw(); say(a === "accept" ? "You accepted." : "You declined."); }).catch(function (e) { say(e.message); lastSig = ""; draw(); }); };
    var tail;
    if (r.myResponse === "accept") tail = h("p", { class: "good", text: "✔ You accepted. Contact " + r.requesterName + " by text or email: " + r.contact });
    else if (r.myResponse === "decline") tail = h("p", { class: "meta", text: "You declined." });
    else if (r.filledByOther || r.status === "confirmed") tail = h("p", { class: "bad", text: "✖ Already filled by someone else." });
    else tail = h("div", { class: "row" }, h("button", { class: "btn primary big", type: "button", text: "Accept", onclick: function () { act("accept"); } }), h("button", { class: "btn big", type: "button", text: "Decline", onclick: function () { act("decline"); } }));
    return h("article", { class: "card" }, h("h3", { text: r.summary }),
      h("p", { class: "meta", text: "From " + r.requesterName + (r.when ? " · " + fmtWhen(r.when) : "") + (r.durationMins ? " · " + r.durationMins + " min" : "") }),
      r.note ? h("p", { text: "Note: " + r.note }) : null, tail);
  }
}
function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

// ================= STAFF VIEW =================
function viewStaff() {
  document.title = "Staff dashboard · ACDHH demo";
  var box = h("div", null, h("p", { class: "skeleton", text: "Loading…" }));
  var resetMsg = h("p", { class: "msg", role: "status" });
  main.replaceChildren(h("h1", { tabindex: "-1", text: "ACDHH staff dashboard" }), box, resetMsg,
    h("p", null, h("button", { class: "btn danger", type: "button", text: "Reset demo data", onclick: function () {
      if (!confirm("Reset all demo data?")) return;
      api("/api/_reset", {}).then(function () { resetMsg.textContent = "Demo data was reset."; last = ""; load(); }).catch(function (e) { resetMsg.textContent = e.message; });
    } })));
  var last = "";
  function load() {
    api("/api/dashboard").then(function (d) {
      var s = JSON.stringify(d);
      if (s === last) return;
      last = s;
      draw(d);
    }).catch(function (e) { if (!last) box.replaceChildren(errBox(e, load)); });
  }
  function draw(d) {
    var max = Math.max.apply(null, REGIONS.map(function (r) { return d.availableByRegion[r]; }).concat([1]));
    var tile = function (n, label, alert) { return h("div", { class: "tile" + (alert ? " alert" : "") }, h("b", { text: String(n) }), label); };
    box.replaceChildren(
      h("div", { class: "tiles" },
        tile(d.availableNow, "available now"), tile(d.requestsToday.length, "requests today"),
        tile(d.avgMinutesToConfirm === null ? "–" : d.avgMinutesToConfirm, "avg. minutes to confirm"),
        tile(d.unfilledOld, d.unfilledOld ? "⚠ unfilled over 15 min" : "unfilled over 15 min", d.unfilledOld > 0)),
      h("section", { class: "card", "aria-labelledby": "s1" }, h("h2", { id: "s1", text: "Available now, by region" }),
        h("ul", { class: "plain", style: null }, REGIONS.map(function (r) {
          var bar = h("span", { class: "rbar", "aria-hidden": "true" });
          bar.style.width = Math.round((d.availableByRegion[r] / max) * 100) + "%";
          return h("li", { class: "card" }, h("div", { class: "row" }, h("strong", { text: r }), h("span", { text: d.availableByRegion[r] + " available" })), bar);
        }))),
      h("section", { class: "card", "aria-labelledby": "s2" }, h("h2", { id: "s2", text: "Coverage gaps right now" }),
        d.gaps.length ? d.gaps.map(function (g) { return h("p", { class: "bad" }, "⚠ 0 " + g.specialty + " interpreters available in: " + g.regions.join(", ")); }) : h("p", { class: "good", text: "✔ Every region has someone available for every specialty." })),
      h("section", { class: "card", "aria-labelledby": "s3" }, h("h2", { id: "s3", text: "Licenses expiring in 30 days" }),
        d.expiring.length ? h("ul", null, d.expiring.map(function (e) { return h("li", { text: e.name + " (" + e.region + ") · expires " + fmtDate(e.expires) + " · " + e.daysToExpiry + " days" }); })) : h("p", { text: "None." })),
      h("section", { class: "card", "aria-labelledby": "s4" }, h("h2", { id: "s4", text: "Today's requests" }),
        d.requestsToday.length ? h("div", { class: "wrap" }, h("table", null,
          h("thead", null, h("tr", null, ["Time", "Request", "Status", "Time to confirm"].map(function (x) { return h("th", { scope: "col", text: x }); }))),
          h("tbody", null, d.requestsToday.map(function (r) {
            var st = r.status === "confirmed" ? "✔ Confirmed" : r.status === "declined" ? "✖ Declined" : r.overdue ? "⚠ Unfilled " + r.ageMins + " min" : "◔ Waiting " + r.ageMins + " min";
            return h("tr", null,
              h("td", { text: new Date(r.createdAt).toLocaleTimeString("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" }) }),
              h("td", { text: r.summary }), h("td", null, h("span", { class: r.overdue ? "bad" : "", text: st })),
              h("td", { text: r.minutesToConfirm === null ? "–" : r.minutesToConfirm + " min" }));
          })))) : h("p", { text: "No requests yet today." })));
  }
  load();
  startPolling(load, 5000);
}

// ================= ROUTER + START =================
function route() {
  stopPolling();
  state.lastJson = "";
  var hash = location.hash || "#/";
  var cur = "find";
  if (hash.indexOf("#/request/") === 0) { viewRequest(hash.slice(10)); cur = "find"; }
  else if (hash === "#/status") { viewStatus(); cur = "status"; }
  else if (hash === "#/staff") { viewStaff(); cur = "staff"; }
  else viewFind();
  document.querySelectorAll("nav a").forEach(function (a) { if (a.getAttribute("data-nav") === cur) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  var h1 = $("h1", main); if (h1) { h1.focus(); window.scrollTo(0, 0); }
}
window.addEventListener("hashchange", route);
applyPrefs();
api("/api/capabilities").then(function (c) { state.caps = c; }, function () {}).then(route);
})();
`;
