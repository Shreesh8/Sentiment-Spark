# Sentiment Spark

Analyze sentiment from any text or web page and get clear, actionable insights. Paste text directly or provide a URL; the app will scrape the page content and run an AI-powered sentiment analysis with confidence scores, sentence breakdowns, keywords, and a concise summary.

## Highlights

- Powerful analysis: overall sentiment, score, confidence, sentence-level details, keywords, insights, and summary
- Paste text or a URL: auto-scrapes supported pages (YouTube, Reddit, blogs, news, etc.)
- Modern UI: Vite + React + TypeScript + Tailwind + shadcn/ui
- Serverless functions: Supabase Edge Functions for scraping and analysis

## How It Works

1. Enter text or a URL on the Analyze page.
2. If it’s a URL, the `scrape-url` Supabase Edge Function uses Firecrawl to extract main content.
3. The text is sent to the `analyze-sentiment` Supabase Edge Function, which calls an AI gateway to produce a structured JSON analysis.
4. The UI displays a sentiment gauge, sentence breakdown, insights, keywords, and a summary.

## Tech Stack

- Vite, React, TypeScript
- Tailwind CSS, shadcn/ui
- Supabase (`@supabase/supabase-js`) for Edge Functions
- Optional: TanStack Query, Framer Motion, Recharts for UX/visuals

## Prerequisites

- Node.js 18+ and npm
- A Supabase project (URL + anon/publishable key)
- API keys for the functions:
  - `LOVABLE_API_KEY` (used by `analyze-sentiment` to call the AI gateway)
  - `FIRECRAWL_API_KEY` (used by `scrape-url` to fetch page content)

## Quick Start (Local)

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173 by default)
npm run dev
```

Create a `.env` (or `.env.local`) at the repo root to configure Supabase for the frontend:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_or_publishable_key
```

The app will use these to invoke Supabase Edge Functions from the browser.

## Edge Functions (Supabase)

This repo includes two functions under `supabase/functions/`:

- `analyze-sentiment`: accepts `{ text }` and returns structured sentiment analysis.
  - Requires secret: `LOVABLE_API_KEY`
- `scrape-url`: accepts `{ url }` and returns `{ success, content }` with extracted main content.
  - Requires secret: `FIRECRAWL_API_KEY`

Set the secrets in Supabase (Dashboard → Project Settings → Functions → Environment Variables) or via CLI:

```bash
supabase functions secrets set --name analyze-sentiment LOVABLE_API_KEY=your_key
supabase functions secrets set --name scrape-url FIRECRAWL_API_KEY=your_key
```

Deploy the functions:

```bash
supabase functions deploy analyze-sentiment
supabase functions deploy scrape-url
```

If you’re testing locally with the Supabase CLI, also link your project and serve functions as needed.

## Using the App

1. Go to the Analyze page.
2. Paste text directly, or paste a URL to scrape and analyze.
3. Click “Analyze Sentiment” (or “Scrape & Analyze” for URLs).
4. Review results: overall sentiment, confidence, sentence breakdown, keywords, insights, and summary.

Notes:

- Scraping support varies by site; some domains may be unsupported by Firecrawl.
- Rate limits or missing API keys will be surfaced as errors in the UI toasts.

## Scripts

```bash
# Start development server
npm run dev

# Production build
npm run build

# Preview built app
npm run preview

# Lint
npm run lint
```

## SEO & Crawling

`public/robots.txt` currently allows all crawlers. Add a sitemap line if you have one:

```
Sitemap: https://your-domain.com/sitemap.xml
```

## Troubleshooting

- Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are set and valid.
- For function errors, verify `LOVABLE_API_KEY` and `FIRECRAWL_API_KEY` are configured in Supabase.
- Some sites cannot be scraped; paste text content directly as a fallback.

---

If you’d like, I can run a quick local check (install and dev) or help wire up Supabase secrets and function deploys.
