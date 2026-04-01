# Al Rukn Al Dhahabi — Website Rules & Source of Truth

> **Purpose of this file:** This is the single source of truth for building the new Al Rukn Al Dhahabi website. All business details, copy, SEO metadata, Cloudinary image references, URLs, and bilingual content are defined here. The agent must never invent, modify, or translate content outside what is specified below. The old site is being replaced (styling only was the issue — all factual data here is accurate and verified).

---

## 1. BUSINESS IDENTITY

| Field | Value |
|---|---|
| Business Name (English) | Al Rukn Al Dhahabi |
| Business Name (Arabic) | الركن الذهبي للبليارد |
| Short tagline (EN) | Premium Billiards, Snooker & Gaming in Ajman |
| Short tagline (AR) | بلياردو وسنوكر وألعاب بريميوم في عجمان |
| Location | Grand Mall, Al Rashidiya 3, Ajman, UAE |
| Location (AR) | غراند مول، الراشدية 3، عجمان، الإمارات |
| WhatsApp Number | +971 54 200 2332 |
| WhatsApp Link | https://wa.me/971542002332?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20services |
| WhatsApp Link (AR) | https://wa.me/971542002332?text=مرحباً%2C%20أود%20الاستفسار%20عن%20خدماتكم |
| Phone | +971 54 200 2332 |
| Phone Link | tel:+971542002332 |
| Google Maps Link | https://maps.app.goo.gl/jWcPmvJwTzk3QoW5A |
| Google Maps Full URL | https://www.google.com/maps/place/Al+Rukn+Al+Dhahabi+Billiards/@25.3927019,55.4366184,17z |
| Latitude | 25.392703 |
| Longitude | 55.439188 |
| Instagram | https://www.instagram.com/alrukn.aldhahabi/ |
| TikTok | https://www.tiktok.com/@alrukn.aldhahabi |
| Social Handle | @alrukn.aldhahabi |
| Website | https://www.alruknaldhahabi.com |
| Cloudinary Cloud Name | dtwjhjtjw |
| Footer Credit | Powered by EtechStudio — https://ebrahimalmahbosh.com |

---

## 2. ABOUT / STORY COPY

### English
- **Section label:** OUR STORY
- **Heading:** Where Every Game Becomes an Experience
- **Body:**
  > Al Rukn Al Dhahabi is Ajman's premier entertainment destination, offering world-class billiards and snooker tables in a refined, welcoming atmosphere.
  >
  > Whether you're a competitive player or just looking for a great time with friends and family, our venue is designed for everyone — from beginners to champions.
  >
  > Find us inside Grand Mall, Al Rashidiya 3, Ajman — where luxury meets sport.

### Arabic
- **Section label:** قصتنا
- **Heading:** حيث تتحول كل لعبة إلى تجربة
- **Body:**
  > الركن الذهبي هو وجهة الترفيه الأولى في عجمان، نقدم طاولات بلياردو وسنوكر عالمية المستوى في أجواء راقية وترحيبية.
  >
  > سواء كنت لاعباً محترفاً أو تبحث عن وقت ممتع مع الأصدقاء والعائلة، مكاننا مصمم للجميع — من المبتدئين إلى الأبطال.
  >
  > زُرنا داخل غراند مول، الراشدية 3، عجمان — حيث يلتقي الرقي بالرياضة.

### Stats (verified)
| Stat | EN Value | AR Value |
|---|---|---|
| Billiard Tables | 10+ | +10 |
| Sports & Games | 5 | 5 |
| Location | Grand Mall Ajman | غراند مول عجمان |

---

## 3. SERVICES / WHAT WE OFFER

- **Section label (EN):** WHAT WE OFFER / Our Services
- **Section label (AR):** ما نقدمه / خدماتنا
- **Intro (EN):** Five premium experiences under one roof. No bookings needed — walk in and play.
- **Intro (AR):** خمس تجارب بريميوم تحت سقف واحد. لا حجز مسبق — ادخل والعب.

### Services List

| # | Icon | Name (EN) | Name (AR) | Description (EN) | Description (AR) |
|---|---|---|---|---|---|
| 1 | 🎱 | Billiards | بلياردو | Professional full-size billiard tables for players of all levels. | طاولات بلياردو احترافية بالحجم الكامل لجميع المستويات. |
| 2 | 🎱 | Snooker | سنوكر | Full-size snooker tables in a premium, focused environment. | طاولات سنوكر بالحجم الكامل في بيئة راقية ومركّزة. |
| 3 | 🎮 | PlayStation | بلايستيشن | Latest PlayStation consoles with a wide selection of games. | أحدث أجهزة بلايستيشن مع مجموعة واسعة من الألعاب. |
| 4 | 🏓 | Table Tennis | تنس الطاولة | Olympic-standard table tennis tables for serious play. | طاولات تنس طاولة بمعيار أولمبي للعب الجدي. |

> **Note:** The business offers 5 experiences total (stat says "5 Sports & Games"). The 5th experience is not explicitly named on the current site. Do NOT invent a 5th service. Keep the list as the 4 confirmed above unless the owner provides the 5th.

---

## 4. CLOUDINARY IMAGES

- **Cloud name:** `dtwjhjtjw`
- **Base URL:** `https://res.cloudinary.com/dtwjhjtjw/image/upload/`
- **Recommended transform params:** `f_auto,q_auto` always. Add crop/size as needed.

### Image Inventory (confirmed from current site)

| ID / Public Key | Usage on current site |
|---|---|
| `image1` | Gallery image 1 (square crop, 800×800) |
| `image2` | Hero background (1920×1080) + Gallery image 2 |
| `image3` | Gallery image 3 |
| `image4` | About section image (800×600) + Gallery image 4 |
| `photo1` | Gallery image 5 |
| `photo2` | Gallery image 6 |
| `image10` | Gallery image 7 |

### Cloudinary URL Pattern
```
https://res.cloudinary.com/dtwjhjtjw/image/upload/f_auto,q_auto,c_fill,w_[WIDTH],h_[HEIGHT]/[IMAGE_ID]
```

Example — hero:
```
https://res.cloudinary.com/dtwjhjtjw/image/upload/f_auto,q_auto,c_fill,w_1920,h_1080/image2
```

> **Rule:** Always use `f_auto,q_auto` at minimum for performance. Use Next.js `<Image>` with Cloudinary loader when using Next.js.

---

## 5. SEO RULES

### Page: Home (`/` or `/en` for English, `/ar` for Arabic)

#### English Meta
```
title: "Al Rukn Al Dhahabi | Billiard, Snooker & Gaming in Ajman"
description: "Premium billiards, snooker, PlayStation & table tennis at Grand Mall, Al Rashidiya 3, Ajman. Walk in — no booking needed. Open daily."
keywords: "billiards Ajman, snooker Ajman, PlayStation Ajman, table tennis Ajman, Grand Mall Ajman, billiard hall UAE, entertainment Ajman"
og:title: "Al Rukn Al Dhahabi — Billiards & Gaming, Grand Mall Ajman"
og:description: "Ajman's premier billiards & gaming lounge. 10+ tables, PlayStation, table tennis. Grand Mall, Al Rashidiya 3."
og:image: "https://res.cloudinary.com/dtwjhjtjw/image/upload/f_auto,q_auto,c_fill,w_1200,h_630/image2"
og:url: "https://www.alruknaldhahabi.com/en"
og:type: "website"
og:locale: "en_AE"
canonical: "https://www.alruknaldhahabi.com/en"
```

#### Arabic Meta
```
title: "الركن الذهبي للبليارد | بلياردو وسنوكر وألعاب في عجمان"
description: "بلياردو وسنوكر وبلايستيشن وتنس الطاولة في غراند مول، الراشدية 3، عجمان. ادخل مباشرة — لا حجز مسبق."
keywords: "بلياردو عجمان، سنوكر عجمان، بلايستيشن عجمان، تنس الطاولة عجمان، غراند مول عجمان، ملاعب بلياردو الإمارات"
og:title: "الركن الذهبي — بلياردو وألعاب، غراند مول عجمان"
og:description: "وجهة الترفيه الأولى في عجمان. +10 طاولات، بلايستيشن، تنس الطاولة. غراند مول، الراشدية 3."
og:locale: "ar_AE"
canonical: "https://www.alruknaldhahabi.com/ar"
```

### Hreflang Tags (required on every page)
```html
<link rel="alternate" hreflang="en" href="https://www.alruknaldhahabi.com/en" />
<link rel="alternate" hreflang="ar" href="https://www.alruknaldhahabi.com/ar" />
<link rel="alternate" hreflang="x-default" href="https://www.alruknaldhahabi.com/en" />
```

### Structured Data (JSON-LD — LocalBusiness)
```json
{
  "@context": "https://schema.org",
  "@type": "EntertainmentBusiness",
  "name": "Al Rukn Al Dhahabi",
  "alternateName": "الركن الذهبي للبليارد",
  "url": "https://www.alruknaldhahabi.com",
  "telephone": "+971542002332",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Grand Mall, Al Rashidiya 3",
    "addressLocality": "Ajman",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.3926971,
    "longitude": 55.4391933
  },
  "sameAs": [
    "https://www.instagram.com/alrukn.aldhahabi/",
    "https://www.tiktok.com/@alrukn.aldhahabi",
    "https://www.google.com/maps/place/Al+Rukn+Al+Dhahabi+Billiards/@25.3927019,55.4366184,17z"
  ],
  "hasMap": "https://maps.app.goo.gl/jWcPmvJwTzk3QoW5A",
  "image": "https://res.cloudinary.com/dtwjhjtjw/image/upload/f_auto,q_auto,c_fill,w_1200,h_630/image2"
}
```

---

## 6. NAVIGATION STRUCTURE

### Sections (Single Page or Multi-page — both acceptable)
| Anchor/Route | EN Label | AR Label |
|---|---|---|
| `#hero` / top | Home | الرئيسية |
| `#about` | About | عن المكان |
| `#services` | Services | الخدمات |
| `#gallery` | Gallery | معرض الصور |
| `#contact` | Contact | تواصل معنا |

### Language Switcher
- EN page links to `/ar`
- AR page links to `/en`
- Label: show the **other** language name (e.g., on EN page show "العربية", on AR page show "English")

---

## 7. CONTACT SECTION

### English
- **Heading:** Get in Touch
- **Address:** Grand Mall, Al Rashidiya 3, Ajman, UAE *(clickable → Google Maps)*
- **Phone:** +971 54 200 2332 *(clickable → tel:)*
- **WhatsApp CTA:** Chat with us on WhatsApp
- **WhatsApp button text:** Open WhatsApp
- **Directions button text:** Get Directions

### Arabic
- **Heading:** تواصل معنا
- **Address:** غراند مول، الراشدية 3، عجمان، الإمارات *(قابل للنقر → خرائط Google)*
- **Phone:** 2332 200 54 971+
- **WhatsApp CTA:** تحدث معنا على واتساب
- **WhatsApp button text:** فتح واتساب
- **Directions button text:** احصل على الاتجاهات

### Social Follow (EN: "Follow Us" / AR: "تابعنا")
- Instagram: https://www.instagram.com/alrukn.aldhahabi/
- TikTok: https://www.tiktok.com/@alrukn.aldhahabi

---

## 8. FOOTER

### English
```
© 2026 Al Rukn Al Dhahabi. All rights reserved.
Powered by EtechStudio → https://ebrahimalmahbosh.com
```

### Arabic
```
© 2026 الركن الذهبي للبليارد. جميع الحقوق محفوظة.
تصميم وتطوير EtechStudio → https://ebrahimalmahbosh.com
```

---

## 9. DESIGN SYSTEM

> The styling is being completely rebuilt. The agent must NOT replicate old CSS. These are the brand constraints the new design must respect.

### Brand Identity
- **Aesthetic:** Dark luxury — refined, premium, not cheap or neon-flashy
- **Primary theme:** Dark backgrounds (near-black or very deep navy/charcoal)
- **Accent color:** Gold / amber tones (representing "Al Dhahabi" = The Golden)
- **Feel:** Upscale billiards lounge — similar to a luxury sports club
- **Avoid:** Bright white backgrounds, cheap neon greens/blues, generic sports-center look

### Color Palette (suggested tokens — agent may refine)
```css
--color-bg:        #0a0a0a;       /* near black */
--color-bg-card:   #111111;       /* card/surface */
--color-gold:      #C9A84C;       /* primary accent */
--color-gold-light:#E5C97E;       /* hover / highlight */
--color-text:      #F0EDE6;       /* warm off-white */
--color-text-muted:#9E9790;       /* secondary text */
--color-border:    #2A2620;       /* subtle borders */
```

### Typography Direction
- Arabic content: always `dir="rtl"`, `lang="ar"`, use an Arabic-supporting web font (e.g., Tajawal, Cairo, or Noto Sans Arabic from Google Fonts)
- English content: `dir="ltr"`, `lang="en"`, use a premium display font (e.g., Cormorant Garamond, Playfair Display, or similar luxury serif for headings)
- Body text: clean, legible at small sizes

### RTL Rules
- Arabic pages: `<html dir="rtl" lang="ar">`
- English pages: `<html dir="ltr" lang="en">`
- Flexbox/Grid layouts must mirror correctly in RTL
- Padding/margin that uses `left`/`right` must use `inline-start`/`inline-end` (logical properties)
- Text alignment: `text-align: start` (not hardcoded left/right)
- Icons that imply direction (arrows, chevrons) must flip in RTL

---

## 10. ROUTING ARCHITECTURE

### Recommended: URL-based routing
```
/en        → English homepage
/ar        → Arabic homepage
/          → Redirect to /en (or detect browser language and redirect)
```

### Next.js App Router structure (if using Next.js)
```
app/
  [locale]/
    page.tsx       ← home page
    layout.tsx     ← locale-aware layout (sets lang, dir)
  page.tsx         ← redirect to /en
```

### Locale detection (optional)
- Read `Accept-Language` header on first visit
- If Arabic → redirect to `/ar`, else → `/en`
- Remember preference (cookie or localStorage)

---

## 11. PERFORMANCE RULES

- All images must go through Cloudinary with `f_auto,q_auto` transforms
- Hero image: `priority` load, preloaded
- Gallery images: lazy loaded
- No unnecessary third-party scripts
- Google Fonts: self-host or use `display=swap`
- Core Web Vitals targets: LCP < 2.5s, CLS < 0.1

---

## 12. WHAT THE AGENT MUST NEVER DO

1. **Never invent services** not listed in Section 3 (e.g., café, arcade, VR — not confirmed)
2. **Never invent opening hours** — not published on the site, do not add unless owner provides
3. **Never invent pricing** — not published, do not add
4. **Never change the WhatsApp number** — always `+971 54 200 2332`
5. **Never change the address** — always Grand Mall, Al Rashidiya 3, Ajman, UAE
6. **Never translate the brand name** — "Al Rukn Al Dhahabi" stays in English on EN pages; "الركن الذهبي" stays in Arabic on AR pages
7. **Never use placeholder/lorem ipsum copy** in final output
8. **Never hardcode `dir="ltr"` on Arabic pages** or vice versa
9. **Never reference images outside the confirmed Cloudinary inventory** (image1–image4, photo1, photo2, image10) unless owner provides new ones
10. **Never remove the EtechStudio footer credit**

---

## 13. QUICK REFERENCE CARD

```
Business:     Al Rukn Al Dhahabi (الركن الذهبي للبليارد)
Location:     Grand Mall, Al Rashidiya 3, Ajman, UAE
WhatsApp:     +971 54 200 2332
Website:      https://www.alruknaldhahabi.com
Instagram:    @alrukn.aldhahabi
TikTok:       @alrukn.aldhahabi
Cloudinary:   dtwjhjtjw
Images:       image1, image2, image3, image4, photo1, photo2, image10
Tables:       10+ billiard tables
Services:     Billiards | Snooker | PlayStation | Table Tennis (+ 1 unconfirmed)
Walk-in:      No booking needed
Aesthetic:    Dark luxury, gold accent, billiards lounge
Languages:    English (/en, LTR) + Arabic (/ar, RTL)
Footer credit: EtechStudio → ebrahimalmahbosh.com
```