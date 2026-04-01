# Al Rukn Al Dhahabi - Complete Technical Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Environment Variables (.env)](#environment-variables-env)
3. [SEO Configuration](#seo-configuration)
4. [Arabic and English (Internationalization)](#arabic-and-english-internationalization)
5. [Sections Architecture](#sections-architecture)
6. [Complete Setup Guide](#complete-setup-guide)
7. [Design System Reference](#design-system-reference)
8. [Dependencies](#dependencies)
9. [File Structure](#file-structure)

---

## 📖 Project Overview

**Project Name:** Al Rukn Al Dhahabi - Official Website  
**Type:** Bilingual Web Application (English/Arabic)  
**Framework:** Next.js 15.5 (App Router)  
**Language:** TypeScript 5  
**Styling:** Tailwind CSS 4  
**Deployment:** Vercel  

**Business:** Premium billiards, snooker, PlayStation & gaming entertainment venue  
**Location:** Grand Mall, Al Rashidiya 3, Ajman, UAE  
**Live Site:** https://alruknaldhahabi.com  

### Key Features
- ✅ Full bilingual support (English & Arabic) with URL-based routing (`/en`, `/ar`)
- ✅ RTL (Right-to-Left) layout support for Arabic
- ✅ Responsive design with mobile-first approach
- ✅ Performance optimized with translation caching
- ✅ Comprehensive SEO with locale-specific metadata
- ✅ JSON-LD structured data for local business
- ✅ Modern UX with smooth scrolling and animations
- ✅ Accessibility features (semantic HTML, ARIA labels, keyboard navigation)

---

## 🔐 Environment Variables (.env)

### File Location: `frontend/.env`

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dtwjhjtjw
NEXT_PUBLIC_CLOUDINARY_API_KEY=562868238944231
NEXT_PUBLIC_CLOUDINARY_API_SECRET=oC1lBcen5dddsqBB7GOZwX8-ViQ
```

### Detailed Configuration Explanation

#### 1. Cloudinary Cloud Name
**Key:** `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`  
**Value:** `dtwjhjtjw`  
**Purpose:** Unique identifier for your Cloudinary account  
**Usage:** Used in image URLs: `https://res.cloudinary.com/dtwjhjtjw/image/upload/...`

#### 2. Cloudinary API Key
**Key:** `NEXT_PUBLIC_CLOUDINARY_API_KEY`  
**Value:** `562868238944231`  
**Purpose:** Public key for API authentication  
**Usage:** Client-side image uploads and transformations

#### 3. Cloudinary API Secret
**Key:** `NEXT_PUBLIC_CLOUDINARY_API_SECRET`  
**Value:** `oC1lBcen5dddsqBB7GOZwX8-ViQ`  
**Purpose:** Secret key for server-side operations  
**Security:** Never expose this in client-side code

### Integration in Next.js Config

**File:** `next.config.ts`
```typescript
import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
```

**Why This Matters:**
- Allows Next.js Image component to optimize Cloudinary images
- Prevents "Invalid src prop" errors
- Enables automatic image optimization and lazy loading

### For New Projects

Replace with your own Cloudinary credentials:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key_here
NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_api_secret_here
```

**Get Your Credentials:**
1. Sign up at https://cloudinary.com
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Update the `.env` file

---

## 🎯 SEO Configuration

### Complete SEO Implementation Strategy

The project implements a comprehensive SEO strategy covering:
1. Metadata optimization
2. International hreflang tags
3. Geo-targeting meta tags
4. Structured data (JSON-LD)
5. Sitemap generation
6. Open Graph and Twitter Cards

### 1. Metadata Setup

**File:** `app/[locale]/layout.tsx`

#### Function: `generateMetadata()`

This async function generates locale-specific metadata for search engines.

#### Arabic Metadata Example
```typescript
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  if (isAr) {
    return {
      metadataBase: new URL('https://alruknaldhahabi.com'),
      title: {
        default: 'الركن الذهبي | بلياردو وسنوكر وبلايستيشن في عجمان',
        template: '%s | الركن الذهبي',
      },
      description: 'صالة بلياردو وسنوكر وبلايستيشن وتنس طاولة وبينج بونج في جراند مول عجمان.',
      keywords: [
        'بلياردو عجمان',
        'سنوكر عجمان',
        'بلايستيشن عجمان',
        'الركن الذهبي',
        'تنس طاولة عجمان',
        'ألعاب ترفيهية عجمان',
        'جراند مول عجمان',
      ],
      authors: [{ name: 'Al Rukn Al Dhahabi' }],
      creator: 'Al Rukn Al Dhahabi',
      publisher: 'Al Rukn Al Dhahabi',
      formatDetection: {
        email: false,
        address: true,
        telephone: true,
      },
    };
  }
  
  // English metadata follows same structure
}
```

#### English Metadata Structure
```typescript
return {
  metadataBase: new URL('https://alruknaldhahabi.com'),
  title: {
    default: 'Al Rukn Al Dhahabi | Billiard, Snooker & Gaming in Ajman',
    template: '%s | Al Rukn Al Dhahabi',
  },
  description: 'Premium billiard hall, snooker tables, PlayStation, table tennis and ping pong in Grand Mall Ajman, UAE.',
  keywords: [
    'billiard Ajman',
    'billiards in Ajman',
    'snooker Ajman',
    'PlayStation Ajman',
    'table tennis Ajman',
    'gaming zone Ajman',
    'Grand Mall Ajman',
    'Al Rukn Al Dhahabi',
  ],
  authors: [{ name: 'Al Rukn Al Dhahabi' }],
  creator: 'Al Rukn Al Dhahabi',
  publisher: 'Al Rukn Al Dhahabi',
};
```

### 2. Open Graph (Social Media) Tags

Open Graph tags control how your site appears when shared on social media platforms (Facebook, LinkedIn, etc.).

#### Arabic Open Graph
```typescript
openGraph: {
  type: 'website',
  url: 'https://alruknaldhahabi.com/ar',
  siteName: 'الركن الذهبي',
  title: 'الركن الذهبي | بلياردو وسنوكر وبلايستيشن في عجمان',
  description: 'صالة بلياردو وسنوكر وبلايستيشن في جراند مول عجمان، الإمارات.',
  locale: 'ar_AE',
  alternateLocale: ['en_AE'],
  images: [
    {
      url: 'https://res.cloudinary.com/dtwjhjtjw/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/image2',
      width: 1200,
      height: 630,
      alt: 'الركن الذهبي - صالة بلياردو في عجمان',
    },
  ],
},
```

#### English Open Graph
```typescript
openGraph: {
  type: 'website',
  url: 'https://alruknaldhahabi.com/en',
  siteName: 'Al Rukn Al Dhahabi Billiards',
  title: 'Al Rukn Al Dhahabi | Billiard, Snooker & Gaming in Ajman',
  description: 'Premium billiard hall and gaming zone in Grand Mall Ajman, UAE.',
  locale: 'en_AE',
  alternateLocale: ['ar_AE'],
  images: [
    {
      url: 'https://res.cloudinary.com/dtwjhjtjw/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/image2',
      width: 1200,
      height: 630,
      alt: 'Al Rukn Al Dhahabi - Billiard Hall in Ajman',
    },
  ],
},
```

**Best Practices:**
- Image dimensions: 1200x630px (optimal for social sharing)
- Use absolute URLs for images
- Specify both `locale` and `alternateLocale` for multilingual sites
- Include descriptive alt text for accessibility

### 3. Twitter Card Tags

Twitter Cards enhance how your content appears on Twitter.

```typescript
twitter: {
  card: 'summary_large_image',
  title: 'Al Rukn Al Dhahabi | Billiards Ajman',
  description: 'Billiard, snooker and gaming in Ajman, UAE',
  creator: '@alrukn.aldhahabi',
},
```

**Card Types:**
- `summary_large_image`: Large image preview (recommended)
- `summary`: Small thumbnail image

### 4. Robots Configuration

Controls search engine indexing behavior.

```typescript
robots: { 
  index: true, 
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
},
```

**Settings Explained:**
- `index: true` - Allow search engines to index the page
- `follow: true` - Follow links on the page
- `max-image-preview: 'large'` - Show large image previews in search results
- `max-snippet: -1` - No limit on snippet length

### 5. International Hreflang Tags

Hreflang tags tell search engines which language version to show users in different regions.

**Implementation in `<head>`:**
```html
<head>
  <link rel="alternate" hrefLang="en" href="https://alruknaldhahabi.com/en" />
  <link rel="alternate" hrefLang="ar" href="https://alruknaldhahabi.com/ar" />
  <link rel="alternate" hrefLang="x-default" href="https://alruknaldhahabi.com/en" />
</head>
```

**What Each Tag Means:**
- `hrefLang="en"` - English version for English-speaking users
- `hrefLang="ar"` - Arabic version for Arabic-speaking users
- `hrefLang="x-default"` - Default version when no match is found

**Why This Matters:**
- Prevents duplicate content issues
- Improves SEO for international audiences
- Ensures users see the correct language version

### 6. Geo-Targeting Meta Tags

Geo tags help local SEO by specifying your business location.

```html
<meta name="geo.region" content="AE-AJ" />
<meta name="geo.placename" content="Ajman, UAE" />
<meta name="geo.position" content="25.392707887316476;55.43918952665708" />
<meta name="ICBM" content="25.392707887316476, 55.43918952665708" />
```

**Tag Breakdown:**
- `geo.region` - Country and emirate code (UAE - Ajman)
- `geo.placename` - City name
- `geo.position` - Latitude and longitude coordinates
- `ICBM` - Alternative coordinate format (used by some search engines)

**How to Get Coordinates:**
1. Google Maps → Right-click on location → Copy coordinates
2. Or use: https://www.latlong.net/

### 7. Structured Data (JSON-LD)

Structured data helps search engines understand your business better and can enable rich snippets in search results.

**File:** `app/[locale]/layout.tsx`

#### Schema Builder Function
```typescript
function buildSchema(locale: 'en' | 'ar') {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': 'https://alruknaldhahabi.com/#business',
    name: isAr ? 'الركن الذهبي للبلياردو' : 'Al Rukn Al Dhahabi Billiards',
    alternateName: isAr ? 'Al Rukn Al Dhahabi' : 'الركن الذهبي',
    url: `https://alruknaldhahabi.com/${locale}`,
    telephone: '+971542002332',
    description: isAr
      ? 'صالة بلياردو وسنوكر وبلايستيشن في جراند مول عجمان.'
      : 'Premium billiard hall, snooker and gaming zone in Grand Mall Ajman.',
    inLanguage: locale,
    address: {
      '@type': 'PostalAddress',
      streetAddress: isAr ? 'جراند مول، الراشدية 3' : 'Grand Mall, Al Rashidiya 3',
      addressLocality: isAr ? 'عجمان' : 'Ajman',
      addressRegion: 'Ajman',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.392707887316476,
      longitude: 55.43918952665708,
    },
    sameAs: [
      'https://www.instagram.com/alrukn.aldhahabi/',
      'https://www.tiktok.com/@alrukn.aldhahabi',
    ],
    hasMap: 'https://maps.app.goo.gl/jWcPmvJwTzk3QoW5A',
  };
}
```

#### Injection in Layout
```tsx
<head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema),
    }}
  />
</head>
```

**Schema Type Options:**
- `SportsActivityLocation` - For sports venues (used here)
- `LocalBusiness` - General local business
- `EntertainmentBusiness` - Entertainment venues
- `NightClub` - Nightlife venues

**Key Properties:**
- `@id` - Unique identifier for your business
- `sameAs` - Social media profiles
- `hasMap` - Link to Google Maps
- `geo` - Precise coordinates for map integration

### 8. Sitemap Generation

**File:** `app/sitemap.ts`

The sitemap tells search engines about all the pages on your site and how often they change.

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://alruknaldhahabi.com';
  const lastModified = new Date();
  
  return [
    { 
      url: `${base}/`, 
      lastModified, 
      changeFrequency: 'daily', 
      priority: 1.0 
    },
    { 
      url: `${base}/en`, 
      lastModified, 
      changeFrequency: 'weekly', 
      priority: 0.9 
    },
    { 
      url: `${base}/ar`, 
      lastModified, 
      changeFrequency: 'weekly', 
      priority: 0.9 
    },
  ];
}
```

**Sitemap Properties:**
- `url` - Full URL of the page
- `lastModified` - Last update date (auto-generated)
- `changeFrequency` - How often content changes
  - `daily` - Homepage changes frequently
  - `weekly` - Language pages change less often
- `priority` - Importance relative to other pages (0.0 to 1.0)

**Output:** Next.js automatically generates `/sitemap.xml` at build time

**Submit to Search Engines:**
1. Google Search Console: https://search.google.com/search-console
2. Bing Webmaster Tools: https://www.bing.com/webmasters

---
