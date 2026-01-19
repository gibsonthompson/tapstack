# Tapstack

White-label website agency platform. Built with Next.js 14.

## Quick Start

```bash
# 1. Unzip and navigate to folder
cd tapstack

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
```

## Deploy to Vercel

1. Push this folder to a new GitHub repo
2. Connect repo to Vercel
3. Set environment variables (if needed)
4. Deploy

```bash
git init
git add .
git commit -m "Initial Tapstack landing page"
git remote add origin https://github.com/YOUR_USERNAME/tapstack.git
git push -u origin main
```

## Project Structure

```
tapstack/
├── app/
│   ├── layout.js          # Root layout + metadata
│   ├── page.js            # Landing page
│   ├── globals.css        # Global styles + Tailwind
│   └── components/
│       ├── Navigation.js  # Sticky nav
│       ├── Hero.js        # Hero section
│       ├── Features.js    # Feature grid
│       ├── HowItWorks.js  # 3-step process
│       ├── Pricing.js     # $99/month pricing
│       ├── FAQ.js         # FAQ accordion
│       └── Footer.js      # Footer + final CTA
├── public/
│   └── logo.png           # Tapstack logo
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Brand Colors

- Dark: `#171515`
- Cream: `#fcfcfd`  
- Lime (accent): `#c1ff72`

## Fonts

- Display: Syne
- Body: Space Grotesk

## Next Steps

1. Add `/signup` page with agency onboarding flow
2. Add `/login` page
3. Connect to Supabase (same database as rocket-solutions)
4. Add Stripe for agency subscriptions
5. Build agency dashboard

## Domain

Point `tapstack.dev` to Vercel deployment.
