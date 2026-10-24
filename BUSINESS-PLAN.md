# FLIGHT — the money plan

**The one problem:** private aircraft fly empty on repositioning (“empty leg”) flights. The operator
pays for fuel, crew, handling and landing, and earns ₹0 on that sector. In India that waste is
routine, invisible and completely unsold.

**The business:** a marketplace where an operator lists a leg it is *already* flying, FLIGHT prices
seats, verified travellers book, money is escrowed, and the operator keeps 92% of every seat sold.
FLIGHT's revenue is the 8% success fee — charged only when a seat actually sells.

This document is deliberately blunt. It is a plan, not a forecast.

---

## 1. Why this can actually make money

Three things make an empty leg the easiest inventory in aviation to sell:

| Property | Why it matters |
| --- | --- |
| **Marginal cost of a seat ≈ ₹0** | The flight is already departing. An extra passenger adds paperwork and a sandwich, not a sector. |
| **The alternative is zero** | An operator cannot discount a leg it never listed. 92% of something beats 100% of nothing. |
| **The discount is real** | A ₹4.2 lakh charter sold as 4 seats at ₹34,000 is ₹1.36 lakh recovered **and** 70% cheaper per traveller. Buyer and seller both win on day one. |

There is no subscription theatre here, no affiliate links, no ads. The revenue is a take rate on a
transaction that did not exist before.

## 2. Market, bottom-up (change these numbers to reality-check them)

```
NSOP / charter permit holders in India            ~150–200
Private jets + turboprops on the register         ~450–500
Average sectors flown per aircraft per month      ~20
Share of sectors that are positioning legs        ~35%
→ empty legs available per month                  ~3,300

Seats sellable per empty leg (cabin aircraft)     ~5
Realistic occupancy on a good day                 ~50%
Average fare per seat                             ₹25,000

→ Gross seat value per month                      ~₹20.6 crore
→ FLIGHT take at 8%                               ~₹1.65 crore / month
```

That last line is **100% penetration**, which nobody gets. A 3% share of that inventory is
roughly **₹50 lakh of gross seat value a month → ₹4 lakh a month of platform revenue** — a
one- or two-person business. A 10% share is a venture-scale company. Both start with the same
first leg.

## 3. Revenue model

| Stream | Rate | When it triggers |
| --- | --- | --- |
| Success fee (Starter) | 8% of seat value | Seat sold, flight departs |
| Success fee (Operator Pro) | 5% + ₹4,999/mo | Fleet accounts, unlimited legs |
| Partner desk | 4% commission retained by the reseller; FLIGHT takes the remaining 4% | Agency/corporate resale |
| Crew bonus pool | 3% of seat value | Paid to the operating crew (a retention weapon, not revenue) |

Blended expectation in year one: **~₹2,200 of platform revenue per seat sold** (8% of a ₹28,000
fare). Everything below scales off that single number.

## 4. Unit economics per seat

| Line | Amount |
| --- | --- |
| Fare paid by traveller | ₹28,000 |
| Payment gateway (~2%) | −₹560 |
| KYC + document checks | −₹120 |
| Support allocation | −₹180 |
| **Contribution margin** | **≈ ₹1,340 (62% of the fee)** |

Break-even is therefore about **4 seats a month** plus hosting. The variable cost base is
deliberately tiny; the expensive part is supply acquisition, not technology.

## 5. What it takes to hit ₹3.5 crore a year

The calculator on the site, at its defaults, models **one** operator:

```
12 empty legs × 5 seats × 55% fill = 33 seats/month
33 × ₹28,000                     = ₹9.24 lakh gross seat value
FLIGHT fee at 8%                 = ₹73,920/month per operator
40 operators at that run rate    = ₹3.55 crore/year
```

Forty operator accounts is a sales problem, not a product problem. India has 150–200 permit
holders; forty is a realistic 24-month target with two field reps calling on fleet managers.

## 6. The first ₹1 (do this before writing more code)

The site is a pitch. The revenue starts offline, and you can test it in ten days:

1. **Get 10 empty legs.** Call/WhatsApp 15 charter operators and 10 contract pilots. Ask one
   question: *“What are your positioning legs next week?”* Empty legs are already being shared in
   WhatsApp groups — you are formalising an existing behaviour, not inventing one.
2. **Broker three by hand.** Price the leg at 25–35% of the charter value, post it in premium
   travel communities, take payment against a signed cost-share letter, and split with the operator.
   A ₹1.4 lakh gross leg at a 5% broker fee is **₹7,000 for one phone call.**
3. **Only then automate.** Anything you did twice by hand is a feature. Everything else is a guess.

This is the honest answer to "how does this definitely make me money": *the marketplace is the
scale-up; manual brokering is the proof.*

## 7. Go-to-market, sequenced

**Phase 1 — supply (weeks 1–6).** 15 operators, one document vault, one pricing sheet. Give the
first five a 0% fee for one month. Your only KPI is *empty legs listed per week*.

**Phase 2 — demand (weeks 4–12).** Three channels, in order of conversion:
- Corporate travel desks in Delhi/Mumbai/Bengaluru (they already buy business-class seats at
  ₹40,000+; your fare is competitive and the time saving is the pitch)
- Wedding and event planners in Jaipur, Goa and Udaipur (seasonal, high-value, repeat)
- Premium leisure communities, targeted at fixed routes, not broad ads

**Phase 3 — lock-in (month 4+).** Operator Pro subscriptions, crew bonus dashboard, white-label
links for agencies. This is when a competitor can no longer copy you with a landing page.

## 8. Risks, stated plainly

| Risk | Reality | Mitigation |
| --- | --- | --- |
| **Regulatory** | Selling individual seats on a charter in India is restricted; commercial transport needs an NSOP holder to operate the flight. | Launch around operator-approved manifests and cost-share structures reviewed by aviation counsel. If a structure isn't compliant, don't ship it. This is the single biggest gate and should be checked before spending on marketing. |
| **Reliability** | Empty legs move or cancel. | Escrow with automatic refunds, re-accommodation on other legs, and fares priced with that risk included. |
| **Supply concentration** | A few operators control most aircraft. | Stay fleet-agnostic; contract pilots can list independently with operator consent. |
| **Demand density** | A marketplace with one seat per route feels empty. | Launch city-pair by city-pair (DEL–BOM, BOM–GOI) instead of nationally. |
| **Copycats** | A broker can clone the site in a week. | They cannot clone 40 operator relationships and a document vault. Supply is the moat. |

## 9. What is actually built here

A working, responsive, dependency-free marketing site:

- `index.html` — hero, problem, how it works (operator/traveller tabs), empty-leg board, live
  earnings calculator, trust/compliance, pricing, waitlist, FAQ
- `assets/styles.css` — hand-written design system (dark aviation palette, gold accent, no framework)
- `assets/app.js` — board rendering + filters, calculator, modal seat request, form validation,
  scroll reveals, counters; demo data persisted to `localStorage`
- `assets/*.jpg` — generated hero and cabin imagery

Everything is front-end only. Nothing is charged, no booking is real, and no data leaves the browser.
Wiring a backend (Supabase, Firebase or a small Node API) is step two after the manual brokering test.

---

*Figures in this document are modelled estimates with stated assumptions, not audited market data or
a guarantee of income. Verify the regulatory position with Indian aviation counsel before transacting.*
