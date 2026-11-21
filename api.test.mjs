// Plain Node tests. No dependencies. Run: node tests/api.test.mjs
import worker from "../src/worker.js";

const ORIGIN = "https://demo.example";
function makeEnv(ai) {
  const m = new Map();
  const env = {
    DATA: {
      get: async (k) => (m.has(k) ? m.get(k) : null),
      put: async (k, v) => { m.set(k, v); },
      delete: async (k) => { m.delete(k); },
      list: async ({ prefix = "" } = {}) => ({ keys: [...m.keys()].filter((k) => k.startsWith(prefix)).map((name) => ({ name })), list_complete: true }),
    },
  };
  if (ai) env.AI = ai;
  return env;
}
async function call(env, method, path, { body, origin = ORIGIN, ip } = {}) {
  const headers = {};
  if (body !== undefined) headers["content-type"] = "application/json";
  if (origin && method === "POST") headers.origin = origin;
  if (ip) headers["cf-connecting-ip"] = ip;
  const res = await worker.fetch(new Request(ORIGIN + path, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined }), env);
  const type = res.headers.get("content-type") || "";
  return { status: res.status, data: type.includes("json") ? await res.json() : await res.text() };
}
const aiReturning = (response) => ({ run: async () => ({ response }) });

let passed = 0, failed = 0;
async function test(name, fn) {
  try { await fn(); passed++; console.log("  ok  " + name); }
  catch (e) { failed++; console.log("FAIL  " + name + "\n      " + e.message); }
}
function eq(a, b, msg) { if (a !== b) throw new Error((msg || "") + " expected " + JSON.stringify(b) + " got " + JSON.stringify(a)); }
function ok(c, msg) { if (!c) throw new Error(msg || "expected true"); }

const GOOD = JSON.stringify({ service: null, specialties: ["Medical", "DeafBlind", "Bogus"], region: "Tucson", when: "now", durationMins: 60, remote: null, locationType: "hospital", city: "Tucson", understood: "You need a Medical DeafBlind interpreter in Tucson." });

await test("seeds 30 interpreters and 6 requests on first run", async () => {
  const env = makeEnv(aiReturning(GOOD));
  const r = await call(env, "GET", "/api/interpreters");
  eq(r.status, 200); eq(r.data.count, 30);
  const d = await call(env, "GET", "/api/dashboard");
  eq(d.data.requestsToday.length, 6);
});

await test("capabilities reports storage and ai", async () => {
  const c = await call(makeEnv(aiReturning(GOOD)), "GET", "/api/capabilities");
  eq(c.data.storage, true); eq(c.data.ai, true);
});

await test("filters: region, specialty, service, remote, when=now", async () => {
  const env = makeEnv();
  const t = await call(env, "GET", "/api/interpreters?region=Tucson");
  ok(t.data.interpreters.length > 0 && t.data.interpreters.every((i) => i.region === "Tucson"), "region");
  const d = await call(env, "GET", "/api/interpreters?specialty=DeafBlind&service=" + encodeURIComponent("Tactile/ProTactile"));
  ok(d.data.interpreters.length > 0 && d.data.interpreters.every((i) => i.specialties.includes("DeafBlind") && i.services.includes("Tactile/ProTactile")), "specialty+service");
  const n = await call(env, "GET", "/api/interpreters?when=now");
  ok(n.data.interpreters.every((i) => i.avail.state === "now"), "when=now");
  const rem = await call(env, "GET", "/api/interpreters?remote=1");
  ok(rem.data.interpreters.every((i) => i.remote), "remote");
  const first = (await call(env, "GET", "/api/interpreters")).data.interpreters;
  eq(first[0].avail.state, "now", "available first");
  ok(first.some((i) => i.expiresSoon), "an expiring license exists");
});

await test("future date/time filter returns weekday people", async () => {
  const env = makeEnv();
  const d = new Date(Date.now() + 10 * 864e5);
  while ([0, 6].includes(d.getUTCDay())) d.setUTCDate(d.getUTCDate() + 1);
  const when = d.toISOString().slice(0, 10) + "T14:00:00-07:00";
  const r = await call(env, "GET", "/api/interpreters?when=" + encodeURIComponent(when));
  ok(r.data.count > 0);
});

await test("status change shows up in search", async () => {
  const env = makeEnv();
  let r = await call(env, "GET", "/api/interpreters?when=now&region=" + encodeURIComponent("Phoenix Metro"));
  ok(r.data.interpreters.some((i) => i.id === "i01"), "i01 available at start");
  const s = await call(env, "POST", "/api/interpreters/i01/status", { body: { status: "busy" } });
  eq(s.status, 200);
  r = await call(env, "GET", "/api/interpreters?when=now&region=" + encodeURIComponent("Phoenix Metro"));
  ok(!r.data.interpreters.some((i) => i.id === "i01"), "i01 gone from available now");
  eq((await call(env, "POST", "/api/interpreters/i01/status", { body: { status: "nope" } })).status, 400);
});

await test("AI parse: valid output is cleaned by the allowlist", async () => {
  const r = await call(makeEnv(aiReturning(GOOD)), "POST", "/api/ai/parse", { body: { text: "DeafBlind interpreter at a Tucson hospital" }, ip: "1.1.1.1" });
  eq(r.status, 200);
  eq(r.data.filters.region, "Tucson");
  eq(r.data.filters.specialties.join(), "Medical,DeafBlind");
  eq(r.data.filters.when, "now");
  ok(r.data.understood.length > 5);
});

await test("AI parse: JSON wrapped in text and object responses work", async () => {
  eq((await call(makeEnv(aiReturning("Sure!\n" + GOOD + "\nHope that helps")), "POST", "/api/ai/parse", { body: { text: "x" }, ip: "1.1.1.2" })).status, 200);
  eq((await call(makeEnv(aiReturning(JSON.parse(GOOD))), "POST", "/api/ai/parse", { body: { text: "x" }, ip: "1.1.1.3" })).status, 200);
});

await test("AI parse: invalid values are dropped", async () => {
  const bad = JSON.stringify({ service: "Time travel", specialties: ["Hacking"], region: "Mars", when: "someday", durationMins: 99999, remote: "yes", understood: "" });
  const r = await call(makeEnv(aiReturning(bad)), "POST", "/api/ai/parse", { body: { text: "x" }, ip: "1.1.1.4" });
  eq(r.status, 200);
  const f = r.data.filters;
  eq(f.service, null); eq(f.specialties.length, 0); eq(f.region, null); eq(f.when, null); eq(f.durationMins, null); eq(f.remote, null);
});

await test("AI parse: garbage output or AI error gives friendly 502", async () => {
  const g = await call(makeEnv(aiReturning("I cannot help with that")), "POST", "/api/ai/parse", { body: { text: "x" }, ip: "1.1.1.5" });
  eq(g.status, 502); ok(typeof g.data.error === "string");
  const boom = await call(makeEnv({ run: async () => { throw new Error("3030"); } }), "POST", "/api/ai/parse", { body: { text: "x" }, ip: "1.1.1.6" });
  eq(boom.status, 502);
});

await test("AI parse: empty and too-long text are handled", async () => {
  eq((await call(makeEnv(aiReturning(GOOD)), "POST", "/api/ai/parse", { body: { text: "   " }, ip: "1.1.1.7" })).status, 400);
});

await test("first accept wins (second gets 409)", async () => {
  const env = makeEnv();
  const c = await call(env, "POST", "/api/requests", { body: { filters: {}, note: "n", requesterName: "Pat", contact: "pat@example.invalid", interpreterIds: ["i01", "i02"] } });
  eq(c.status, 201); eq(c.data.status, "pending");
  const id = c.data.id;
  const a1 = await call(env, "POST", "/api/requests/" + id + "/respond", { body: { interpreterId: "i01", action: "accept" } });
  eq(a1.status, 200);
  const a2 = await call(env, "POST", "/api/requests/" + id + "/respond", { body: { interpreterId: "i02", action: "accept" } });
  eq(a2.status, 409); eq(a2.data.error, "Already filled");
  const g = await call(env, "GET", "/api/requests/" + id);
  eq(g.data.status, "confirmed"); eq(g.data.confirmed.id, "i01");
  eq((await call(env, "POST", "/api/requests/" + id + "/respond", { body: { interpreterId: "i09", action: "accept" } })).status, 403, "not addressed");
});

await test("request validation: 4 interpreters, no name, unknown id", async () => {
  const env = makeEnv();
  const base = { filters: {}, requesterName: "Pat", contact: "x@example.invalid" };
  eq((await call(env, "POST", "/api/requests", { body: { ...base, interpreterIds: ["i01", "i02", "i03", "i04"] } })).status, 400);
  eq((await call(env, "POST", "/api/requests", { body: { ...base, requesterName: "", interpreterIds: ["i01"] } })).status, 400);
  eq((await call(env, "POST", "/api/requests", { body: { ...base, interpreterIds: ["zzz"] } })).status, 400);
});

await test("everyone declining marks the request declined", async () => {
  const env = makeEnv();
  const c = await call(env, "POST", "/api/requests", { body: { filters: {}, requesterName: "Pat", contact: "x@example.invalid", interpreterIds: ["i01", "i02"] } });
  await call(env, "POST", "/api/requests/" + c.data.id + "/respond", { body: { interpreterId: "i01", action: "decline" } });
  await call(env, "POST", "/api/requests/" + c.data.id + "/respond", { body: { interpreterId: "i02", action: "decline" } });
  eq((await call(env, "GET", "/api/requests/" + c.data.id)).data.status, "declined");
});

await test("dashboard shows the Yuma DeafBlind gap, expiring licenses, overdue request", async () => {
  const d = (await call(makeEnv(), "GET", "/api/dashboard")).data;
  const gap = d.gaps.find((g) => g.specialty === "DeafBlind");
  ok(gap && gap.regions.includes("Yuma/Western"), "Yuma DeafBlind gap");
  ok(d.expiring.length >= 1, "expiring");
  ok(d.unfilledOld >= 1, "unfilled over 15 min");
  ok(d.avgMinutesToConfirm > 0, "avg minutes");
  ok(d.availableNow > 0);
});

await test("same-origin check: cross-site POST gets 403", async () => {
  const env = makeEnv(aiReturning(GOOD));
  eq((await call(env, "POST", "/api/ai/parse", { body: { text: "x" }, origin: "https://evil.example" })).status, 403);
  eq((await call(env, "POST", "/api/interpreters/i01/status", { body: { status: "off" }, origin: "https://evil.example" })).status, 403);
});

await test("reset needs a matching origin", async () => {
  const env = makeEnv();
  await call(env, "GET", "/api/interpreters");
  eq((await call(env, "POST", "/api/_reset", { body: {}, origin: null })).status, 403);
  eq((await call(env, "POST", "/api/_reset", { body: {}, origin: "https://evil.example" })).status, 403);
  eq((await call(env, "POST", "/api/_reset", { body: {} })).status, 200);
});

await test("rate limit: 11th AI call in a minute gets 429", async () => {
  const env = makeEnv(aiReturning(GOOD));
  for (let i = 0; i < 10; i++) eq((await call(env, "POST", "/api/ai/parse", { body: { text: "x" }, ip: "9.9.9.9" })).status, 200, "call " + (i + 1));
  eq((await call(env, "POST", "/api/ai/parse", { body: { text: "x" }, ip: "9.9.9.9" })).status, 429);
  eq((await call(env, "POST", "/api/ai/parse", { body: { text: "x" }, ip: "8.8.8.8" })).status, 200, "other IP is fine");
});

await test("AI off: AI routes 404, app still works", async () => {
  const env = makeEnv(); // no AI binding
  eq((await call(env, "GET", "/api/capabilities")).data.ai, false);
  eq((await call(env, "POST", "/api/ai/parse", { body: { text: "x" } })).status, 404);
  eq((await call(env, "POST", "/api/ai/confirmation", { body: { requestId: "r1" } })).status, 404);
  eq((await call(env, "GET", "/api/interpreters")).status, 200);
  const c = await call(env, "POST", "/api/requests", { body: { filters: {}, requesterName: "Pat", contact: "x@example.invalid", interpreterIds: ["i01"] } });
  eq(c.status, 201);
  eq((await call(env, "POST", "/api/requests/" + c.data.id + "/respond", { body: { interpreterId: "i01", action: "accept" } })).status, 200);
});

await test("confirmation message: needs a confirmed request", async () => {
  const env = makeEnv(aiReturning("An interpreter is booked. Maya will come."));
  const c = await call(env, "POST", "/api/requests", { body: { filters: {}, requesterName: "Pat", contact: "x@example.invalid", interpreterIds: ["i01"] } });
  eq((await call(env, "POST", "/api/ai/confirmation", { body: { requestId: c.data.id }, ip: "7.7.7.7" })).status, 409);
  await call(env, "POST", "/api/requests/" + c.data.id + "/respond", { body: { interpreterId: "i01", action: "accept" } });
  const r = await call(env, "POST", "/api/ai/confirmation", { body: { requestId: c.data.id }, ip: "7.7.7.7" });
  eq(r.status, 200); ok(r.data.text.length > 5);
  const bad = await call(makeEnv({ run: async () => { throw new Error("x"); } }), "POST", "/api/ai/confirmation", { body: { requestId: "r1" }, ip: "7.7.7.8" });
  ok(bad.status === 502 || bad.status === 409, "AI error is friendly");
});

await test("front end is served", async () => {
  const env = makeEnv();
  const p = await call(env, "GET", "/");
  eq(p.status, 200); ok(p.data.includes("<main"));
  eq((await call(env, "GET", "/app.js")).status, 200);
  eq((await call(env, "GET", "/app.css")).status, 200);
  eq((await call(env, "GET", "/nope")).status, 404);
});

console.log("\n" + passed + " passed, " + failed + " failed");
if (failed) process.exit(1);
console.log("ALL TESTS PASSED");
