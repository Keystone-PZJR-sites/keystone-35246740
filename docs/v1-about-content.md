# V1 about pages — content archive

Recovered from git commit `b0e6af3` (last commit before the old-brand purge in `bfdf778`).

Sources:

- `data/our-story-page.tsx` → `/about`
- `data/leadership-page.tsx` → `/about/team`
- `data/careers-page.tsx` → `/about/careers`
- `data/investors.ts` → investor grid on team + careers

Team member names, roles, and bios on `/about/team` and the careers leadership grid came from `getTeamMembers()` (live API), not from these modules. Portraits lived under `public/media/team/`.

---

## `/about` — Our story

**Meta title:** Our story | Keystone
**Meta description:** How Keystone started, what drives us, and where we are headed — the growth team built to help local businesses win.

### Hero

- **Eyebrow:** Our story
- **Title:** Helping local businesses grow and win
- **Lede:** Learn how Keystone started, what keeps us going, and why local operators trust us with their growth.
- **Media caption:** Keystone in action
- **Media:** `/media/social-proof/stills/socialproof-01.webp`

### Mission

**Heading:** Inspired by the grit, determination, and talent of local business owners.

They risk everything — years of their lives, their savings, their families — to build something of their own. They are the heart of every neighborhood and the source of most new jobs.

But the deck is stacked against them. The big chains have whole teams for marketing, sales, and technology. Independent operators get agencies that overpromise, DIY tools they never have time to learn, and generic software that leaves money on the table and leads unanswered.

Keystone exists to change that: an AI-native sales and marketing team that builds the brand, drives the traffic, works every lead, and keeps customers coming back — all on autopilot, for a fraction of what it used to cost.

**Mission photo strip:** Rahul Jaswa, Amanjot Singh, Sreenivasan AC, Pawan Kumar, Gaurav Labhane, Gaurav Grover, Manikya Singh, Aasawari Vaidya (`/media/team/*.jpg`)

### Stats

**Eyebrow:** By the numbers
**Title:** Local businesses need tech that helps them, not hurts them — and we have the track record to prove it.

> Note from source: figures are rounded / representative (not audited Keystone metrics).

| Value | Label | Description |
| --- | --- | --- |
| $550B | market we serve | annual spend across the self-care and service economy |
| 1,000+ | businesses served | local operators the founding team has worked with firsthand |
| ~80% | lower acquisition cost | CAC reductions delivered with a better funnel and relentless follow-up |
| 2–3x | more leads converted | agentic follow-up versus a typical local funnel |

### Origin

**Eyebrow:** How it started
**Title:** Keystone began on the front lines of local business.

Our founders spent years doing this work by hand — building the websites, running the ads, chasing the leads, and winning back customers for hundreds of local operators, one funnel at a time.

It worked: a better digital front door and relentless follow-up brought in customers at a fraction of the usual cost. But doing it manually was expensive and fragile — the moment attention slipped, funnels broke and leads went cold.

So we built Keystone to own that work end to end with AI agents, giving every operator the same growth team without the cost or the upkeep. We have been building for operators like them ever since.

**Origin photos:** Atley Kasky, Amanjot Singh, Rahul Jaswa

### Vision

**Eyebrow:** Where we're going
**Title:** Our long-term vision goes beyond today.
**Description:** We are building toward a future where every local business can grow like the biggest companies in the world.

#### Today — We run sales and marketing for service businesses.

Operators use Keystone as their always-on team — brand and website, social and content, ads, and lead follow-up, all in one place.

*Starting with the service businesses we know best.*

#### In 3 years — We automate more of what slows operators down.

Keystone expands across the service economy and reaches beyond marketing into more of the daily work of running a business.

*A multi-billion-dollar opportunity as we scale.*

#### In 10 years — We power every winning local business.

Keystone becomes the agentic workforce and system of record behind independent operators of every kind, worldwide.

*The platform local businesses everywhere rely on.*

### Join us (careers band)

**Eyebrow:** Join us
**Title:** Help local businesses win in the AI era.
**Description:** Keystone is for mission-driven, craft-obsessed people who care about local operators and want to put AI to work for them. Come build with us.

- Primary: Careers → `/about/careers`
- Secondary: View open roles → `/about/careers`
- Photos: Amanjot Singh, Sreenivasan AC, Pawan Kumar, Gaurav Labhane, Gaurav Grover, Manikya Singh

### Closing

**Title:** Want Keystone in your corner?
**CTA:** Get in touch → `/get-in-touch`

---

## `/about/team` — Leadership & Team

**Meta title:** Leadership & Team | Keystone
**Meta description:** Meet the engineers, marketers, and designers behind Keystone, and the investors and advisors on the journey with us.

### Hero

- **Eyebrow:** Leadership
- **Title:** Meet our leadership team
- **Subtitle:** We've spent our careers building local businesses and category-defining technology companies.

### Team band

- **Eyebrow:** The team
- **Title:** A small, passionate group of builders.
- **Description:** We are a small, passionate group of builders that love what we do.
- **Grid:** live `getTeamMembers()` API (not authored in git)

### Quotes — A bit about us

**Eyebrow:** In their words
**Description:** Perspective from some of the leaders on this journey with us.

> Note from source: quote wording is authored representative copy until each investor supplies a final approved quote.

- **Adeyemi Ajao** — Managing Partner - Base10 Partners
  “Keystone is automating the real economy from the ground up by giving local businesses the expertise and resources that used to be reserved for the biggest companies.”

- **John Gleeson** — Managing Partner - Success Venture Partners
  “Local is not for the faint of heart. The Keystone team is tenacious.”

- **Tanuj Thapliyal** — Founding CEO - Spot.ai & Kos.ai
  “This makes a ton of sense.”

- **Praveen Ramineni** — Founding CEO - Portrait
  “I wish we had Keystone when we started launching MedSpas.”

### Backed by

**Eyebrow:** Investors
**Title:** Backed by some of the leading AI and software investors of the last 20 years.
**Description:** The founders, operators, and investors who have supported us from the very beginning.

See [Investor roster](#investor-roster) below.

### Closing

**Title:** Want this team in your corner?
**CTA:** Get in touch → `/get-in-touch`

---

## `/about/careers` — Careers

**Meta title:** Careers | Keystone
**Meta description:** Join Keystone and help great local businesses succeed in a competitive world. We are building the growth engine independent operators never had.

### Hero

- **Eyebrow:** Careers
- **Title:** Help great local businesses succeed in a competitive world
- **Subtitle:** We're building the automated sales and marketing team every independent business needs to succeed in the hypercompetitive local internet. Keystone does the work and owns the results, helping millions of entrepeneurs along the way. Come build it with us.
- Primary: View open roles → `#open-roles`
- Secondary: Meet the team → `/about/team`

### Hero collage

| Label | Asset |
| --- | --- |
| Engineering | `/media/careers/engineering.jpg` |
| Sales | `/media/careers/sales.jpg` |
| Design | `/media/careers/design.jpg` |
| Forward Deployed Growth Engineers | `/media/careers/fde.jpg` |

### Who you'll work with

**Eyebrow:** Leadership
**Title:** Who you'll work with
**Description:** Operators, marketers, and engineers who have spent their careers building multi-billion dollar, category-defining technology for local businesses.

**Grid:** live `getTeamMembers()` API

### Life at Keystone

**Eyebrow:** Life at Keystone
**Title:** We are passionate and committed to our mission of rebuilding the local economy.
**Description:** We are building a lean, committed team that takes risks, has intense autonomy, and takes joy in their work.

> Note from source: quotes are representative sample copy until real testimonials exist.

- **Sreenivasan AC** — Founding Engineer
  “I get to leverage cutting-edge AI models to ship work that helps one of the most challenged, and tech-averse populations. It is an incredible opportunity and challenge.”

- **Aasawari Vaidya** — Founding Forward Deployed Growth Engineer
  “We take great care to ensure the actual outcomes for our customers are world-class. Bringing technology and human judgment together to deliver results we are proud of.”

- **Ishttartha Pujar** — Founding Forward Deployed Growth Engineer
  “I am learning so much, so fast. I am feeling deep intrinsic motivation.”

- **Amanjot Singh** — Founding Head of Engineering
  “We get to build a great team and a great product from the ground up, embracing technical expertise and experience alongside the novelty of AI.”

- **Atley Kasky** — Founding Head of Design & Brand
  “The bar for success is high and I feel excited to fight to be above it every month. I've grown tremendously during my short time here.”

### Values

**Eyebrow:** What we believe
**Title:** What motivates us to build the best growth engine for local businesses
**Description:** These aren't posters on a wall. They decide who we bring on and how we work, together and with every client.

- **Built for the underdog** — Local operators deserve the same growth machinery the big chains take for granted. We make it accessible.
- **One accountable team** — No hand-offs or finger-pointing. Strategy, execution, and results all sit with the same people.
- **Results over vanity** — We optimize for booked, paying customers — not impressions, likes, or dashboards nobody reads.
- **Move fast, with care** — Speed is our advantage, but we never ship at the expense of the businesses that trust us.
- **Own the outcome** — Everyone here acts like an owner. We chase the result, not the task, and we sign our name to the work.
- **Always be learning** — The system gets better with every interaction, and so do we. Curiosity compounds.

### Values band

**Eyebrow:** Sound like you?
**Title:** See if our values resonate
**Description:** If this is the kind of team you want to do your best work with, we should talk.
**CTA:** View open roles → `#open-roles`

### Backed by

**Eyebrow:** In good company
**Title:** Backed by operators who've built it
**Description:** The founders, operators, and investors behind some of the most iconic companies, now investing in and advising Keystone.

See [Investor roster](#investor-roster) below.

### Open roles

**Eyebrow:** Open roles
**Title:** Find your next opportunity
**Description:** We hire for character and craft. If you don't see a perfect fit, introduce yourself anyway.

**List:** live `getJobPostings()` API

### Closing

**Title:** Not sure where you fit?
**CTA:** Get in touch → `/get-in-touch`

---

## Investor roster

Shared by `/about/team` and `/about/careers`. Portrait + name only (`firm` omitted in source). Assets under `/media/investors/`.

- Adeyemi Ajao — `adeyemi-ajao.jpg`
- Anthony Saleh — `anthony-saleh.jpg`
- Caroline Broder — `caroline-broder.jpg`
- Chenli Wang — `chenli-wang.jpg`
- Colin Evans — `colin-evans.jpg`
- Dan Gill — `dan-gill.jpg`
- Ilya Fushman — `ilya-fushman.jpg`
- Jai Ranganathan — `jai-ranganathan.jpg`
- John Gleeson — `john-gleeson.jpg`
- Nick Tippman — `nick-tippman.jpg`
- Obaid Khan — `obaid-khan.jpg`
- Olivia Benjamin — `olivia-benjamin.jpg`
- Praveen Ramineni — `praveen-ramineni.jpg`
- Rexhi Dollaku — `rexhi-dollaku.jpg`
- Shoaib Makani — `shoaib-makani.jpg`
- Siva Gurumurthy — `siva-gurumurthy.jpg`
- Somesh Dash — `somesh-dash.jpg`
- Sujay Jaswa — `sujay-jaswa.jpg`
- Tanuj Thapliyal — `tanuj-thapliyal.jpg`
- Ted Gill — `ted-gill.jpg`
- Thomas Buley — `thomas-buley.jpg`
- Zach Goldstein — `zach-goldstein.jpg`

---

## Team portraits (media registry)

From `data/media.ts` at `b0e6af3`. Files under `/media/team/`.

| File | Registry alt |
| --- | --- |
| `rahul-jaswa.jpg` | Rahul Jaswa, Founder & CEO |
| `amanjot-singh.jpg` | Amanjot Singh, Head of Engineering |
| `sreenivasan-ac.jpg` | Sreenivasan AC, Founding AI Engineer |
| `pawan-kumar.jpg` | Pawan Kumar, Backend Engineer |
| `gaurav-labhane.jpg` | Gaurav Labhane, Senior Software Development Engineer |
| `gaurav-grover.jpg` | Gaurav Grover, Lead Software Engineer |
| `manikya-singh.jpg` | Manikya Singh, Founding Engineer |
| `aasawari-vaidya.jpg` | Aasawari Vaidya, Strategy & Operations Lead |
| `ishttartha-pujar.jpg` | Ishttartha Pujar, Growth Partner |
| `atley-kasky.jpg` | Atley Kasky, Brand & Design Lead |

Restore assets from git without touching this clone:

```bash
git archive b0e6af3 \
  public/media/team public/media/careers public/media/investors \
  public/media/social-proof/stills/socialproof-01.webp \
  | tar -x -C /tmp/v1-about-assets
```
