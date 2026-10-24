# FLIGHT — sell the empty leg

FLIGHT is a two-sided marketplace for **empty-leg private jet flights**: the repositioning sectors
an aircraft flies with nobody on board before it picks up its paying passenger. Operators list a leg
they are already flying, FLIGHT prices it per seat, verified travellers book, and money moves
through escrow. Operators recover cost on a flight that was leaving anyway; travellers fly private
for 60–80% less than a charter.

**Live site:** `index.html` (this repo, open it in a browser or serve the folder)

## The problem this site is built around

An empty leg burns full fuel, crew and handling for ₹0 revenue. It is a large, recurring, invisible
loss that nobody has productised in India. FLIGHT turns that dead inventory into sellable seats —
and the operator keeps 92% of every seat sold.

## What's inside

| File | What it is |
| --- | --- |
| `index.html` | The full marketing site: hero, problem breakdown, how it works, live empty-leg board, earnings calculator, trust/compliance, pricing, waitlist, FAQ |
| `assets/styles.css` | Hand-written design system — dark aviation palette, gold accent, no framework or build step |
| `assets/app.js` | Board rendering and filters, interactive earnings model, seat-request modal, form validation, scroll reveals, animated counters |
| `assets/hero-jet.jpg`, `assets/cabin.jpg`, `assets/crew.jpg` | Generated imagery used across the page |
| `BUSINESS-PLAN.md` | Market sizing, unit economics, revenue model, the first-₹1 plan, risks — read this before spending time on marketing |

## Highlighted features

- **Empty-leg board** with route filters, per-seat pricing, strike-through full-charter price and
  savings percentage; every row opens a seat-request modal.
- **Earnings calculator** — four sliders (legs, seats filled, fare, fill rate) drive live monthly
  and annual revenue, with the 8% platform fee shown transparently.
- **Operator / traveller tabs** so the same three-step flow is explained from both sides.
- **Waitlist form** with role selection, validation and a success state. Submissions are stored in
  `localStorage` — demo behaviour, no server.
- Fully responsive, keyboard focusable, `prefers-reduced-motion` aware, and built with zero
  dependencies so it deploys anywhere static.

## Run it locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Or just double-click `index.html`.

## Deploy

Any static host works. For GitHub Pages: **Settings → Pages → Source: Deploy from a branch →
`main` / root**. The site needs no build step.

## Honest limitations

This is a front-end concept build. No bookings are real, no payments are taken, and no data leaves
your browser. Selling individual seats on a charter in India is regulated — the compliance and
risk section of `BUSINESS-PLAN.md` explains what has to be verified with aviation counsel before
this becomes a transacting business.

---

*Built for the flight that didn't have to be empty.*
