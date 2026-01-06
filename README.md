# 🪙 CoinSwipe - Tinder for Crypto

Discover your next crypto investment by swiping. Build your watchlist the fun way.

![CoinSwipe Demo](https://via.placeholder.com/800x400?text=CoinSwipe+Demo)

## Features

- **Swipe Interface** - Drag cards left to pass, right to like
- **Real-time Data** - Pulls from CoinGecko API (free)
- **Category Filters** - Filter by Meme, DeFi, AI, L1, L2, Blue Chip
- **Mini Charts** - 7-day sparkline on each card
- **Super Like** - Star your absolute favorites
- **Undo** - Made a mistake? Go back one swipe
- **Sound Effects** - Satisfying swipe sounds (can be muted)
- **Persistent Watchlist** - Matches saved to localStorage
- **Share to Twitter** - One-click share your picks
- **Mobile Optimized** - Works great on phones
- **Affiliate Ready** - Buy buttons link to exchanges

## Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/coinswipe.git
cd coinswipe

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deploy to Vercel (Free)

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/coinswipe)

### Option 2: Manual Deploy
1. Push this code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Add New Project"
4. Import your coinswipe repo
5. Click "Deploy"
6. Done! You get a free `.vercel.app` domain

## Monetization

### Affiliate Links
Edit `AFFILIATE_LINKS` in `src/CoinSwipe.jsx`:

```javascript
const AFFILIATE_LINKS = {
  coinbase: 'https://www.coinbase.com/join/YOUR_REFERRAL_CODE',
  binance: 'https://www.binance.com/register?ref=YOUR_REF',
  bybit: 'https://www.bybit.com/register?affiliate_id=YOUR_ID',
};
```

### Revenue Streams
1. **Affiliate commissions** - $10-50 per funded signup
2. **Promoted coins** - Charge projects for featured placement
3. **Premium tier** - Unlimited swipes, advanced filters
4. **Data licensing** - Aggregate swipe data = sentiment signals

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **CoinGecko API** - Free crypto data
- **localStorage** - Persistence
- **Web Audio API** - Sound effects

## Customization

### Add More Coins
The app fetches top 100 by market cap. To change:

```javascript
// In CoinSwipe.jsx, modify the API call:
const response = await fetch(
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=true'
);
```

### Add Categories
Edit the `CATEGORIES` array and `getCoinCategory()` function.

### Custom Domain
1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In Vercel dashboard → Settings → Domains
3. Add your domain and follow DNS instructions

## Analytics (Optional)

Add Vercel Analytics for free:

```bash
npm install @vercel/analytics
```

```javascript
// In main.jsx
import { Analytics } from '@vercel/analytics/react';

// Add <Analytics /> inside your app
```

## License

MIT - Do whatever you want with it.

## Contributing

PRs welcome! Ideas:
- [ ] More coin metadata (team, whitepaper links)
- [ ] Portfolio tracker
- [ ] Price alerts
- [ ] Dark/light theme toggle
- [ ] More exchanges

---

Built with 💜 and caffeine
