# ASL Interpreter Finder

- **Team:** TODO: add your name
- **Nonprofit:** Arizona Commission for the Deaf and the Hard of Hearing (ACDHH)
- **Live app:** https://asl-interpreter-finder.pranit-807.workers.dev
- **Video:** TODO: add your 3:00 or shorter demo link

## The problem
When a community member, event organizer or emergency responder needs a qualified ASL interpreter or captioner, finding one fast is hard. Specialties vary and availability changes all the time. Today people use static directories, phone calls and long email lists. That is slow, creates work for staff, and delays critical appointments.

## How it works
1. **Describe what you need.** Type a plain sentence. Workers AI turns it into filters you can edit.
2. **Smart directory.** Filter by service, specialty (any of the ones you pick, best matches first), region, time, remote or on-site, and license level. If nothing matches, it shows close matches and says which filter it relaxed. Cards show live availability, license date and contact by text or email.
3. **One request, up to 3 people.** The first interpreter to accept wins. The requester's page updates every 5 seconds.
4. **My status page.** An interpreter sets Available, Busy or Off, and accepts or declines requests.
5. **Staff dashboard.** Availability by region, coverage gaps, licenses expiring in 30 days, today's requests, time to confirm, and unfilled requests older than 15 minutes.
6. **Plain-language confirmation.** After a match, AI writes a short message for the Deaf client.

![Directory](screenshots/directory.png)
![Staff dashboard](screenshots/dashboard.png)

Accessibility: WCAG 2.2 AA goals, keyboard use, visible focus, 44 px targets, live regions, status never shown by color alone, large-text toggle, high-contrast theme, reduced motion. No feature needs audio or phone calls. The app works fully with AI off.

## Tech stack
- **Cloudflare Workers**: one Worker (`src/worker.js`) serves the page and the JSON API. Vanilla JS, no build step, no runtime dependencies.
- **Design**: dark glass look with a gold palette, Playfair Display (italic headings) and Inter (body) from Google Fonts, with system-font fallbacks. Contrast, focus rings, 44 px targets, reduced motion, large text and a high-contrast theme are kept.
- **Front end**: `src/ui.js` holds the HTML, CSS and JavaScript of the page as strings. The Worker serves them at `/`, `/app.css` and `/app.js`.
- **Workers KV** (binding `DATA`): interpreters, requests, status, rate-limit counters.
- **Workers AI** (binding `AI`), called only from the Worker:
  - `@cf/meta/llama-3.3-70b-instruct-fp8-fast` for request parsing and the confirmation message.
  - AI output is parsed, then checked against allowlists of regions, specialties and services.
  - Service and remote/on-site are kept only if the user's own words mention them, and the "what we understood" sentence is built by the Worker from the cleaned filters, not from model text.
  - Fixed system prompts, same-origin check on every POST, 1000-character limit, 10 AI calls per minute per IP.

## How to run
```bash
npm install
npx wrangler kv namespace create DATA      # paste the id into wrangler.toml
npm test                                   # prints ALL TESTS PASSED
npm run dev                                # local, http://localhost:8787
npm run deploy                             # live on *.workers.dev
```
Demo data seeds itself on first run. Before recording, reset it from the Staff page ("Reset demo data"), or:
`curl -X POST -H "Origin: https://asl-interpreter-finder.pranit-807.workers.dev" https://asl-interpreter-finder.pranit-807.workers.dev/api/_reset`
Reset also deletes any requests made while testing.

Note: Workers AI usually needs `wrangler login` and, in local dev, runs against your Cloudflare account.

## Status: Finished / Mocked up / Next
**Finished**
- Directory and filters, AI request parsing, broadcast to 3, first-accept-wins, staff dashboard, confirmation message, accessibility options, tests.

**Mocked up (be honest)**
- No real logins. "My status" is a demo picker.
- Interpreters and requests are 100% fake.
- Notifications are in-app polling every 5 seconds, not SMS or email.
- First-accept-wins uses KV read-then-write. KV is not atomic, so two accepts at the exact same moment could both succeed.

**Next**
- Real logins using the ACDHH licensure roster.
- SMS and email push (for example Cloudflare Email).
- Calendar availability.
- VRI video links.
- A Durable Object per request for strict first-accept-wins.

## Privacy note
The demo has no logins and uses only made-up data. It stores a requester's first name, a contact method (fake in the demo), the type of place (hospital, court, school, event) and the city. No full addresses. Request text typed into the AI box is sent to Workers AI to be parsed and is not stored.

AI coding assistance was used to build this project.
