# Service Page — writing template

Give this file to an LLM along with a service name, and it produces content that
drops straight into the Webflow `Services` collection.

Every block below is **one CMS field**. The field name in `BACKTICKS` is the
Webflow field it fills. Do not invent sections: the page template renders these
fields and nothing else, so extra prose has nowhere to go, and a missing
required field blocks the item from saving.

Output the fields in the order given, under the exact headings used here, so the
result can be copied field by field without hunting.

---

## Before writing: the facts you may use

The Social Atelier is a content studio and event space at **Plot 59 Chuks
Onyebuchi Drive, Lekki Phase 1, Lagos, Nigeria**. Eight rooms, rented by the
hour, in one building. Enquiries and bookings run over WhatsApp
(**+234 903 118 9697**) and email (**hello@thesocialatelierng.com**).

Open **Tuesday–Saturday 10:00–18:00** and **Sunday 13:00–18:00**. Closed Monday.
Bookings come in **2-hour, 4-hour and full-day (8-hour)** blocks. The two event
spaces are by appointment rather than on those fixed hours.

### The eight rooms

| Slug | Room | Type | Rate/hr |
| --- | --- | --- | --- |
| `the-archway` | The Archway | Photo | ₦50,000 |
| `the-creperie` | The Creperie | Photo | ₦75,000 |
| `maison-paris` | Maison Paris | Photo | ₦80,000 |
| `nue-ville` | Nue Ville | Photo | ₦90,000 |
| `bain-bubbles` | Bain & Bubbles | Photo | ₦95,000 |
| `the-piano-room` | The Piano Room | Photo | ₦150,000 |
| `miguel-moss-garden` | Miguel & Moss Garden | Event | ₦250,000 |
| `lauren-fair` | Lauren Fair | Event | ₦400,000 |

What each room actually is, so you assign them honestly:

- **The Archway** — a vaulted, dome-like hallway reading as European
  architecture. Dramatic full-length and movement shots.
- **The Creperie** — a working, photogenic kitchen with a marble island. Food is
  cooked and shot in the same room.
- **Maison Paris** — a vintage Parisian lounge. The best window light in the
  building, holding until roughly 2pm. Seated portraits, interviews.
- **Nue Ville** — minimalist, nude-toned, neutral walls. The default for
  product, beauty and e-commerce, because nothing in frame competes with the
  product.
- **Bain & Bubbles** — a designer bathroom with jacuzzi and walk-in closet.
  Vanity lighting built for beauty close-ups.
- **The Piano Room** — ballroom scale, grand piano, chandelier. The hero set.
- **Miguel & Moss Garden** — an outdoor flower-dressed gazebo. Daytime and
  golden-hour events; string lights after dark.
- **Lauren Fair** — the indoor event room. ~40 seated for dinner, ~60 standing.

The building faces east, so Maison Paris, Nue Ville and The Creperie hold
natural window light through the morning into early afternoon. Bain & Bubbles
and The Piano Room are interior rooms, lit for shooting at any hour.

### Rules that override everything else here

1. **Never invent a number.** Rates come from the table above. If you need a
   figure that is not in this document — a guest count, a square footage, a
   turnaround time — leave a `[CONFIRM: …]` marker instead of guessing.
2. **Never invent a case study.** Case studies describe real bookings. Write
   them only from details supplied to you; otherwise output the case study
   section as `[NEEDS REAL EXAMPLES]` and move on.
3. **No superlatives without evidence.** "Lagos' premier luxury destination" is
   unfalsifiable filler. "Six rooms in one building" is a fact and does the
   persuading better.
4. **British English**, matching the rest of the site. Naira as `₦80,000`.
5. **Second person.** "You book the room", not "clients book the room".

---

## `Name`

The short service name, 2–4 words. Appears in the nav dropdown, the footer and
cross-links between service pages, so it has to read on its own.

Title Case. No location, no tagline.

> Photoshoot Studio Rental

---

## `Slug`

The URL. Lowercase, hyphenated, **ending in the location** — this page competes
for "<service> in lekki" and "<service> lagos" searches.

Keep it under about 60 characters. Never change it after publishing; a changed
slug is a new URL and loses whatever ranking the old one earned.

> photoshoot-studio-rental-lekki

---

## `Heading`

The page's `<h1>`. The service, then the location, as a plain noun phrase.

This is the single most important line for search. It should read like the
phrase someone would type, not like a slogan — so no "That Fill Your Pipeline"
outcome hooks, and no wordplay.

> Photoshoot Studio Rental in Lekki, Lagos

---

## `Intro`

One or two sentences under the h1, reused verbatim as the meta description.

**Hard limit: 155 characters**, or Google truncates it mid-sentence. Count them.

Lead with the most concrete, differentiating fact — usually the number of rooms
or the capacity, not an adjective. Answer "what is this and why here" in a
breath.

> Six individually designed shoot rooms in one building on Lekki Phase 1 — book
> by the hour and shoot a full campaign without changing location.

---

## `Noun Phrase`

The service as it reads in the middle of a sentence, **including the article**.
The page writes "Ready to book **{Noun Phrase}**?" and "N rooms you can book for
**{Noun Phrase}**", so it must survive both.

Lowercase. Two or three words.

> a photoshoot

Good: `a photoshoot`, `an event`, `a baby shower`, `a podcast recording`.
Wrong: `Photoshoot Studio Rental` (gives "Ready to book Photoshoot Studio
Rental?"), `photoshoots` (gives "Ready to book photoshoots?").

---

## `Hero Image`

Not written — chosen. Name which room's photo to use and why.

It renders behind the dark page header at 20% opacity, so it reads as texture,
not as a picture. Pick an atmospheric wide shot; anything detailed turns to mud.

> Nue Ville wide shot — neutral tones sit quietly behind white type.

---

## `Body`

The long-form section, and the only rich-text field. **300–600 words.**

Use `H2` for section breaks and never `H1` — the page already has one. Plain
paragraphs under each. No bullet lists here; the `Use Cases` and `Inclusions`
fields are the lists, and repeating them wastes the reader's attention.

Write three or four H2 sections. These four work for most services:

**`H2` What you are booking** — the literal transaction. What the hour buys,
what is already in the room, how long people typically book, and what booking
multiple rooms gets them. Kill the fear of a hidden catch.

**`H2` A practical constraint, handled** — the thing a first-time client gets
wrong, and the advice that fixes it. For shoots that is light: which rooms hold
window light, until when, and how to sequence a day around it. For events it is
weather, or catering access. This section is what makes the page worth reading
rather than worth skimming, and it is the part an AI assistant is most likely to
quote.

**`H2` Who books this** — concrete client types with the job they are doing.
Not personas with company sizes; that is B2B SaaS framing and does not fit a
studio. "Beauty brands shooting product and model work in one session" is
right. "Series-A marketing leads" is not.

**`H2` What it costs, roughly** *(optional)* — the shape of pricing in prose:
the range across rooms, what a typical booking runs to, what pushes it up. The
sidebar shows "from ₦X/hr", so this is the paragraph that stops that number
being read as the whole story.

---

## `Price From`

The **lowest** hourly rate across the rooms listed in `Room Slugs`, as digits
only. No currency symbol, no separators.

Read it off the rate table. Do not average, do not round.

> 50000

For the photoshoot example the cheapest listed room is The Archway at ₦50,000,
so `Price From` is `50000` — even though most rooms cost more. The page renders
it as "From ₦50,000/hr" and the body copy carries the fuller picture.

---

## `Capacity Min` / `Capacity Max`

Realistic smallest and largest group for this service, as plain integers. Both
must be filled or the page hides the capacity figure entirely.

These are people in the room including crew and talent, not a fire-code maximum.
If you have not been given real numbers, write `[CONFIRM: capacity]` rather than
inventing a figure — an inflated capacity produces a wasted enquiry and a
disappointed client.

> 2
> 15

---

## `Duration Range`

Typical booking length as free text, using an en dash.

> 2–8 hours

---

## `Room Slugs`

Comma-separated slugs from the rate table, in the order they should appear.

Only rooms that genuinely serve this service. A photoshoot page listing Lauren
Fair, an event room, wastes the reader's time and dilutes the page.

**Order matters** — it is the order of the cards. Lead with the room most people
book for this service, not the cheapest or the grandest.

A slug that matches nothing is dropped with a build warning, so spelling counts.

> nue-ville, maison-paris, the-archway, the-creperie, bain-bubbles, the-piano-room

---

## `Use Cases`

**One per line.** No bullets, no numbering — the page adds the markers. Renders
as the "Ideal For" list.

**5–8 lines.** Each is a noun phrase naming a job someone books this for, 2–5
words. Specific beats broad: "Beauty and skincare campaigns" tells a reader more
than "Photography".

Order by how often they actually happen.

> Beauty and skincare campaigns
> Fashion lookbooks and editorial
> Product and e-commerce photography
> Portrait and headshot days
> Food and beverage photography
> Content batching for creators
> Pre-wedding and bridal portraits

---

## `Inclusions`

**One per line**, same format. Renders as "What's Included".

**6–8 lines.** What the rate covers, in the order a client worries about it.
Concrete facilities and access, not benefits: "Power on every wall for strobes"
answers a real question; "A seamless creative experience" answers none.

Include the mundane things people ring up to ask — parking, changing space,
WiFi, whether someone is on site.

> Exclusive use of the room for your booked block
> All existing furniture, styling and props in the room
> Power on every wall for strobes and continuous lighting
> Fast WiFi for tethered shooting and live client review
> Changing area and mirror
> Climate control in every interior room
> Parking for up to four vehicles on site
> A member of the team on site throughout

---

## `Case Studies` → separate `Service Case Studies` items

**2–3 per service.** Each is its own CMS item, then referenced from the service.
Reference order is page order.

Only real bookings. If you have not been given real examples, output
`[NEEDS REAL EXAMPLES]` for this whole section — a fabricated case study is the
one error on this page that could actually damage the business.

For each, produce all six fields:

### `Name` — the case study title

The outcome as a sentence, not a label. 8–14 words. "A skincare launch shot
across three rooms in one day" earns a read; "Skincare Project" does not.

### `Client`

Who it was for, anonymised by type and city unless you have written permission
to name them.

> A Lagos skincare brand

### `Space Name`

Free text, so it can name several rooms.

> Nue Ville, Bain & Bubbles and The Creperie

### `Images`

Not written — specified. List which room photos to upload, with the alt text for
each. **3–4 images.**

Alt text is the only description a search engine gets for these, and this
section exists to prove the space works, so describe the room and what happened
in it — not "image1.jpg".

> 1. Bain & Bubbles vanity — alt: "Bain & Bubbles, used for the beauty close-ups"
> 2. Nue Ville wide — alt: "Nue Ville, where the product stills were shot"
> 3. The Creperie island — alt: "The Creperie, used for the lifestyle set"

### `Story`

**60–110 words**, plain text, one or two paragraphs. No markup — it renders as a
single styled paragraph.

Structure: the constraint they were under → what they booked → what that let
them avoid. The constraint is what makes it a story rather than a testimonial,
and the avoided cost is what a reader recognises in their own situation.

Write plainly. No "we were thrilled to partner with".

> The brand had a launch date eleven days out and needed product stills, model
> application shots and a lifestyle set for paid social — normally three separate
> location days. They booked a full day across three of our rooms and shot all of
> it in one call sheet, moving the model and the lighting kit down one corridor
> between setups instead of across Lagos.

### `Outcome`

One sentence for the pull-quote. **Lead with a number.** No adjectives.

> Six weeks of paid social and full e-commerce imagery from a single 8-hour booking.

---

## `FAQs` → separate `Service FAQs` items

**6–8 per service.** Each is its own CMS item, referenced from the service.

These do real work: they answer the enquiries that currently arrive by WhatsApp,
and they are the part of the page most likely to be quoted back by an AI
assistant answering a question about studios in Lagos.

### `Name` — the question

Phrase it **exactly as someone would type it into Google**, question mark
included. "How much does it cost to rent a photo studio in Lekki?" — not
"Pricing".

Use the location and the plain word for the thing ("photo studio", not
"content creation environment"). One question per item; never bundle two.

### `Answer`

Plain text, **40–90 words**, no markup or lists.

Three rules, in priority order:

1. **First sentence answers the question completely**, and repeats the question's
   key words. A reader who stops there has their answer, and a snippet that gets
   lifted out of context still makes sense.
2. **Include the real number.** "From ₦50,000 per hour" beats "affordable".
   Anything with no number needs a reason.
3. **Then the useful caveat** — the thing that stops a follow-up message.

Never "it depends" without immediately saying what it depends on.

### Cover these eight

Adapt the wording to the service, keep the coverage:

1. **Cost** — "How much does it cost to rent a {thing} in Lekki?"
2. **Multiple rooms / scaling up** — booking more than one, and how it is charged
3. **Equipment or setup** — what is provided, what to bring
4. **Capacity** — how many people, per room
5. **Lead time** — how far ahead to book, and which dates go first
6. **Hours** — opening hours, and whether out-of-hours is possible
7. **Own props / suppliers** — what may be brought in, and the limits
8. **Location and parking** — the address, and where crews park

---

## `Related Services`

Name 1–2 other service pages to cross-link. Choose the service a reader of this
page might actually have wanted instead — the alternative, not a random sibling.

> Event Space Rental

---

## `Featured`

`true` or `false`. Whether this service belongs in the nav dropdown and near the
top of the services index. Default `false` unless told otherwise.

> true

---

## Final check before handing the output over

- [ ] `Intro` is **under 155 characters**, counted
- [ ] Every rate matches the table; nothing averaged or rounded
- [ ] `Price From` is the **lowest** rate among the rooms actually listed
- [ ] `Noun Phrase` reads correctly in "Ready to book ___?"
- [ ] Every room slug is spelled exactly as in the table
- [ ] No room listed that does not serve this service
- [ ] `Use Cases` and `Inclusions` are one item per line, no bullet characters
- [ ] `Body` has no `H1` and no bullet lists
- [ ] Every case study is real, or the section is marked `[NEEDS REAL EXAMPLES]`
- [ ] Every FAQ answer opens with a complete standalone answer
- [ ] Every invented figure replaced with `[CONFIRM: …]`
- [ ] Every case-study image has alt text describing the room
