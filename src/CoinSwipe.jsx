import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================================
// COINSWIPE - Tinder for Crypto
// ============================================================================

// Mock data fallback (when API fails)
const MOCK_COINS = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', current_price: 98234, market_cap: 1940000000000, market_cap_rank: 1, total_volume: 42000000000, price_change_percentage_24h: 2.34, sparkline_in_7d: { price: [95000, 96000, 94500, 97000, 96500, 98000, 98234] } },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', current_price: 3456, market_cap: 415000000000, market_cap_rank: 2, total_volume: 18000000000, price_change_percentage_24h: -1.23, sparkline_in_7d: { price: [3500, 3480, 3520, 3400, 3450, 3430, 3456] } },
  { id: 'solana', symbol: 'sol', name: 'Solana', image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', current_price: 198, market_cap: 95000000000, market_cap_rank: 5, total_volume: 4200000000, price_change_percentage_24h: 5.67, sparkline_in_7d: { price: [180, 185, 182, 190, 195, 192, 198] } },
  { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png', current_price: 0.32, market_cap: 47000000000, market_cap_rank: 8, total_volume: 2100000000, price_change_percentage_24h: 12.45, sparkline_in_7d: { price: [0.28, 0.27, 0.29, 0.30, 0.31, 0.33, 0.32] } },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png', current_price: 0.98, market_cap: 34000000000, market_cap_rank: 9, total_volume: 890000000, price_change_percentage_24h: -3.21, sparkline_in_7d: { price: [1.02, 1.01, 0.99, 0.97, 0.98, 0.96, 0.98] } },
  { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png', current_price: 38.50, market_cap: 15800000000, market_cap_rank: 12, total_volume: 520000000, price_change_percentage_24h: 4.56, sparkline_in_7d: { price: [36, 37, 36.5, 38, 37.5, 39, 38.5] } },
  { id: 'chainlink', symbol: 'link', name: 'Chainlink', image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png', current_price: 23.40, market_cap: 14200000000, market_cap_rank: 13, total_volume: 890000000, price_change_percentage_24h: 1.89, sparkline_in_7d: { price: [22, 22.5, 23, 22.8, 23.2, 23.5, 23.4] } },
  { id: 'pepe', symbol: 'pepe', name: 'Pepe', image: 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg', current_price: 0.0000234, market_cap: 9800000000, market_cap_rank: 18, total_volume: 2300000000, price_change_percentage_24h: 18.76, sparkline_in_7d: { price: [0.000018, 0.000019, 0.000020, 0.000021, 0.000022, 0.000024, 0.0000234] } },
  { id: 'uniswap', symbol: 'uni', name: 'Uniswap', image: 'https://assets.coingecko.com/coins/images/12504/large/uni.jpg', current_price: 14.20, market_cap: 8500000000, market_cap_rank: 22, total_volume: 340000000, price_change_percentage_24h: -0.45, sparkline_in_7d: { price: [14.5, 14.3, 14.4, 14.1, 14.0, 14.3, 14.2] } },
  { id: 'render-token', symbol: 'rndr', name: 'Render', image: 'https://assets.coingecko.com/coins/images/11636/large/rndr.png', current_price: 8.90, market_cap: 4600000000, market_cap_rank: 28, total_volume: 280000000, price_change_percentage_24h: 7.23, sparkline_in_7d: { price: [8.0, 8.2, 8.1, 8.5, 8.7, 8.8, 8.9] } },
  { id: 'injective-protocol', symbol: 'inj', name: 'Injective', image: 'https://assets.coingecko.com/coins/images/12882/large/Secondary_Symbol.png', current_price: 24.50, market_cap: 2300000000, market_cap_rank: 45, total_volume: 120000000, price_change_percentage_24h: -2.34, sparkline_in_7d: { price: [25, 25.5, 24.8, 24.5, 24.2, 24.8, 24.5] } },
  { id: 'bonk', symbol: 'bonk', name: 'Bonk', image: 'https://assets.coingecko.com/coins/images/28600/large/bonk.jpg', current_price: 0.0000312, market_cap: 2100000000, market_cap_rank: 52, total_volume: 450000000, price_change_percentage_24h: 24.56, sparkline_in_7d: { price: [0.000024, 0.000025, 0.000026, 0.000028, 0.000030, 0.000032, 0.0000312] } },
  { id: 'arbitrum', symbol: 'arb', name: 'Arbitrum', image: 'https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg', current_price: 0.78, market_cap: 3100000000, market_cap_rank: 38, total_volume: 290000000, price_change_percentage_24h: 3.45, sparkline_in_7d: { price: [0.74, 0.75, 0.76, 0.77, 0.76, 0.78, 0.78] } },
  { id: 'sui', symbol: 'sui', name: 'Sui', image: 'https://assets.coingecko.com/coins/images/26375/large/sui_asset.jpeg', current_price: 4.23, market_cap: 13400000000, market_cap_rank: 14, total_volume: 1200000000, price_change_percentage_24h: 8.90, sparkline_in_7d: { price: [3.8, 3.9, 4.0, 4.1, 4.0, 4.2, 4.23] } },
  { id: 'floki', symbol: 'floki', name: 'FLOKI', image: 'https://assets.coingecko.com/coins/images/16746/large/PNG_image.png', current_price: 0.000189, market_cap: 1800000000, market_cap_rank: 58, total_volume: 320000000, price_change_percentage_24h: 15.23, sparkline_in_7d: { price: [0.00016, 0.00017, 0.000165, 0.000175, 0.00018, 0.000185, 0.000189] } },
  { id: 'aave', symbol: 'aave', name: 'Aave', image: 'https://assets.coingecko.com/coins/images/12645/large/AAVE.png', current_price: 268, market_cap: 4000000000, market_cap_rank: 32, total_volume: 180000000, price_change_percentage_24h: 2.10, sparkline_in_7d: { price: [260, 262, 265, 263, 268, 270, 268] } },
  { id: 'fetch-ai', symbol: 'fet', name: 'Fetch.ai', image: 'https://assets.coingecko.com/coins/images/5681/large/Fetch.jpg', current_price: 2.15, market_cap: 5400000000, market_cap_rank: 25, total_volume: 320000000, price_change_percentage_24h: 9.45, sparkline_in_7d: { price: [1.9, 1.95, 2.0, 2.05, 2.1, 2.12, 2.15] } },
  { id: 'ondo-finance', symbol: 'ondo', name: 'Ondo', image: 'https://assets.coingecko.com/coins/images/26580/large/ONDO.png', current_price: 1.42, market_cap: 4400000000, market_cap_rank: 30, total_volume: 280000000, price_change_percentage_24h: 5.67, sparkline_in_7d: { price: [1.3, 1.32, 1.35, 1.38, 1.40, 1.41, 1.42] } },
  { id: 'worldcoin-wld', symbol: 'wld', name: 'Worldcoin', image: 'https://assets.coingecko.com/coins/images/31069/large/worldcoin.jpeg', current_price: 2.34, market_cap: 1800000000, market_cap_rank: 55, total_volume: 210000000, price_change_percentage_24h: -4.56, sparkline_in_7d: { price: [2.5, 2.45, 2.4, 2.38, 2.35, 2.32, 2.34] } },
  { id: 'shiba-inu', symbol: 'shib', name: 'Shiba Inu', image: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png', current_price: 0.0000225, market_cap: 13200000000, market_cap_rank: 15, total_volume: 650000000, price_change_percentage_24h: 6.78, sparkline_in_7d: { price: [0.000020, 0.000021, 0.0000205, 0.0000215, 0.000022, 0.0000225, 0.0000225] } },
];

// Categories for filtering
const CATEGORIES = [
  { id: 'all', label: 'All', emoji: '🌐' },
  { id: 'bluechip', label: 'Blue Chip', emoji: '👔' },
  { id: 'meme', label: 'Meme', emoji: '🐕' },
  { id: 'defi', label: 'DeFi', emoji: '🏦' },
  { id: 'ai', label: 'AI', emoji: '🤖' },
  { id: 'l1', label: 'L1', emoji: '⛓️' },
  { id: 'l2', label: 'L2', emoji: '🔷' },
];

// Affiliate links (replace with your actual referral codes)
const AFFILIATE_LINKS = {
  coinbase: 'https://www.coinbase.com/join/',
  binance: 'https://www.binance.com/register',
  bybit: 'https://www.bybit.com/register',
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getRiskLevel = (marketCap) => {
  if (marketCap > 100000000000) return { emoji: '🟢', label: 'Blue Chip', color: 'text-green-400' };
  if (marketCap > 10000000000) return { emoji: '🟡', label: 'Large Cap', color: 'text-yellow-400' };
  if (marketCap > 1000000000) return { emoji: '🟠', label: 'Mid Cap', color: 'text-orange-400' };
  if (marketCap > 100000000) return { emoji: '🔴', label: 'Small Cap', color: 'text-red-400' };
  return { emoji: '💀', label: 'Degen', color: 'text-purple-400' };
};

const getCoinCategory = (coin) => {
  const id = coin.id.toLowerCase();
  const name = coin.name.toLowerCase();
  const categories = [];
  
  // Meme coins
  if (['dogecoin', 'shiba-inu', 'pepe', 'floki', 'bonk'].includes(id) || 
      id.includes('dog') || id.includes('shib') || id.includes('pepe')) {
    categories.push('meme');
  }
  
  // AI coins
  if (['render-token', 'fetch-ai', 'singularitynet', 'ocean-protocol'].includes(id) ||
      name.includes('ai') || id.includes('ai')) {
    categories.push('ai');
  }
  
  // DeFi
  if (['uniswap', 'aave', 'compound', 'maker', 'curve-dao-token', 'sushi'].includes(id)) {
    categories.push('defi');
  }
  
  // L1s
  if (['bitcoin', 'ethereum', 'solana', 'cardano', 'avalanche-2', 'sui', 'near'].includes(id)) {
    categories.push('l1');
  }
  
  // L2s
  if (['arbitrum', 'optimism', 'polygon-ecosystem-token', 'base'].includes(id)) {
    categories.push('l2');
  }
  
  // Blue chips
  if (coin.market_cap > 50000000000) {
    categories.push('bluechip');
  }
  
  return categories;
};

const getVibes = (coin) => {
  const vibes = [];
  const categories = getCoinCategory(coin);
  
  if (categories.includes('ai')) vibes.push('🤖 AI');
  if (categories.includes('meme')) vibes.push('🐕 Meme');
  if (categories.includes('defi')) vibes.push('🏦 DeFi');
  if (categories.includes('l1')) vibes.push('⛓️ L1');
  if (categories.includes('l2')) vibes.push('🔷 L2');
  if (categories.includes('bluechip')) vibes.push('👔 Blue Chip');
  
  if (coin.price_change_percentage_24h > 10) vibes.push('🚀 Pumping');
  if (coin.price_change_percentage_24h < -10) vibes.push('📉 Dipping');
  if (coin.total_volume > coin.market_cap * 0.1) vibes.push('🔥 High Volume');
  
  if (vibes.length === 0) vibes.push('💎 Gem');
  return vibes.slice(0, 4);
};

const formatNumber = (num) => {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(0)}`;
};

const formatPrice = (price) => {
  if (price >= 1000) return `$${price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.0001) return `$${price.toFixed(6)}`;
  return `$${price.toFixed(10)}`;
};

// ============================================================================
// SOUND EFFECTS (Web Audio API)
// ============================================================================

const playSound = (type) => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'like') {
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialDecayToValueAtTime(0.01, audioContext.currentTime + 0.2);
    } else if (type === 'pass') {
      oscillator.frequency.setValueAtTime(293.66, audioContext.currentTime); // D4
      oscillator.frequency.setValueAtTime(261.63, audioContext.currentTime + 0.1); // C4
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialDecayToValueAtTime(0.01, audioContext.currentTime + 0.15);
    } else if (type === 'superlike') {
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
      gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
      gainNode.gain.exponentialDecayToValueAtTime(0.01, audioContext.currentTime + 0.3);
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (e) {
    // Audio not supported, silently fail
  }
};

// ============================================================================
// SPARKLINE COMPONENT
// ============================================================================

const Sparkline = ({ data, positive }) => {
  if (!data || data.length < 2) return null;
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const width = 80;
  const height = 30;
  const padding = 2;
  
  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        fill="none"
        stroke={positive ? '#4ade80' : '#f87171'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

// ============================================================================
// SWIPEABLE CARD COMPONENT
// ============================================================================

const SwipeCard = ({ coin, onSwipe, style, isTop }) => {
  const cardRef = useRef(null);
  const [dragState, setDragState] = useState({ x: 0, y: 0, dragging: false, startX: 0, startY: 0 });
  
  const risk = getRiskLevel(coin.market_cap);
  const vibes = getVibes(coin);
  const sparklineData = coin.sparkline_in_7d?.price || [];
  const isPositive = coin.price_change_percentage_24h >= 0;
  
  const handleDragStart = (clientX, clientY) => {
    if (!isTop) return;
    setDragState({ x: 0, y: 0, dragging: true, startX: clientX, startY: clientY });
  };
  
  const handleDragMove = useCallback((clientX, clientY) => {
    if (!dragState.dragging) return;
    const deltaX = clientX - dragState.startX;
    const deltaY = clientY - dragState.startY;
    setDragState(prev => ({ ...prev, x: deltaX, y: deltaY }));
  }, [dragState.dragging, dragState.startX, dragState.startY]);
  
  const handleDragEnd = useCallback(() => {
    if (!dragState.dragging) return;
    
    const threshold = 100;
    if (dragState.x > threshold) {
      onSwipe('right');
    } else if (dragState.x < -threshold) {
      onSwipe('left');
    }
    
    setDragState({ x: 0, y: 0, dragging: false, startX: 0, startY: 0 });
  }, [dragState, onSwipe]);
  
  // Mouse events
  const handleMouseDown = (e) => handleDragStart(e.clientX, e.clientY);
  const handleMouseMove = useCallback((e) => handleDragMove(e.clientX, e.clientY), [handleDragMove]);
  const handleMouseUp = useCallback(() => handleDragEnd(), [handleDragEnd]);
  
  // Touch events
  const handleTouchStart = (e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
  const handleTouchMove = useCallback((e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY), [handleDragMove]);
  const handleTouchEnd = useCallback(() => handleDragEnd(), [handleDragEnd]);
  
  useEffect(() => {
    if (dragState.dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [dragState.dragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);
  
  const rotation = dragState.x * 0.1;
  const opacity = Math.max(0, 1 - Math.abs(dragState.x) / 300);
  
  const likeOpacity = Math.min(1, Math.max(0, dragState.x / 100));
  const nopeOpacity = Math.min(1, Math.max(0, -dragState.x / 100));
  
  return (
    <div
      ref={cardRef}
      className="absolute w-full max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{
        ...style,
        transform: `translateX(${dragState.x}px) translateY(${dragState.y}px) rotate(${rotation}deg)`,
        opacity: dragState.dragging ? opacity : 1,
        transition: dragState.dragging ? 'none' : 'transform 0.3s ease-out',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* LIKE / NOPE indicators */}
      <div 
        className="absolute top-8 left-6 z-20 border-4 border-green-500 text-green-500 px-4 py-2 rounded-lg font-bold text-2xl rotate-[-20deg]"
        style={{ opacity: likeOpacity }}
      >
        LIKE
      </div>
      <div 
        className="absolute top-8 right-6 z-20 border-4 border-red-500 text-red-500 px-4 py-2 rounded-lg font-bold text-2xl rotate-[20deg]"
        style={{ opacity: nopeOpacity }}
      >
        NOPE
      </div>
      
      {/* Coin Image */}
      <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-6 flex justify-center">
        <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center shadow-xl overflow-hidden ring-4 ring-gray-600">
          <img 
            src={coin.image} 
            alt={coin.name}
            className="w-full h-full object-cover"
            draggable={false}
            onError={(e) => { 
              e.target.style.display = 'none'; 
              e.target.parentElement.innerHTML = `<span class="text-4xl font-bold">${coin.symbol.toUpperCase().slice(0,2)}</span>`; 
            }}
          />
        </div>
        <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full text-sm font-medium">
          #{coin.market_cap_rank}
        </div>
        {coin.price_change_percentage_24h > 15 && (
          <div className="absolute top-4 left-4 bg-green-500/90 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
            🔥 HOT
          </div>
        )}
      </div>

      {/* Coin Info */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{coin.name}</h2>
            <p className="text-gray-400 uppercase text-sm">{coin.symbol}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">{formatPrice(coin.current_price)}</p>
            <p className={`text-sm font-medium flex items-center justify-end gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Sparkline Chart */}
        {sparklineData.length > 0 && (
          <div className="flex justify-center py-2">
            <Sparkline data={sparklineData} positive={isPositive} />
          </div>
        )}

        {/* Vibes */}
        <div className="flex flex-wrap gap-2">
          {vibes.map((vibe, i) => (
            <span key={i} className="bg-gray-700/80 px-2 py-1 rounded-full text-xs">
              {vibe}
            </span>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-800/80 p-2 rounded-xl">
            <p className="text-gray-400 text-xs">Market Cap</p>
            <p className="font-bold">{formatNumber(coin.market_cap)}</p>
          </div>
          <div className="bg-gray-800/80 p-2 rounded-xl">
            <p className="text-gray-400 text-xs">24h Volume</p>
            <p className="font-bold">{formatNumber(coin.total_volume)}</p>
          </div>
        </div>

        {/* Risk */}
        <div className="flex items-center justify-between bg-gray-800/80 p-2 rounded-xl text-sm">
          <span className="text-gray-400">Risk Level</span>
          <span className={`font-medium ${risk.color}`}>{risk.emoji} {risk.label}</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export default function CoinSwipe() {
  // State
  const [coins, setCoins] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [superLikes, setSuperLikes] = useState([]);
  const [view, setView] = useState('swipe'); // 'swipe', 'matches', 'filters'
  const [stats, setStats] = useState({ liked: 0, passed: 0, superLiked: 0 });
  const [history, setHistory] = useState([]); // For undo
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTutorial, setShowTutorial] = useState(true);
  
  // Load from localStorage on mount
  useEffect(() => {
    const savedMatches = localStorage.getItem('coinswipe_matches');
    const savedSuperLikes = localStorage.getItem('coinswipe_superlikes');
    const savedStats = localStorage.getItem('coinswipe_stats');
    const savedTutorial = localStorage.getItem('coinswipe_tutorial_seen');
    
    if (savedMatches) setMatches(JSON.parse(savedMatches));
    if (savedSuperLikes) setSuperLikes(JSON.parse(savedSuperLikes));
    if (savedStats) setStats(JSON.parse(savedStats));
    if (savedTutorial) setShowTutorial(false);
  }, []);
  
  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('coinswipe_matches', JSON.stringify(matches));
  }, [matches]);
  
  useEffect(() => {
    localStorage.setItem('coinswipe_superlikes', JSON.stringify(superLikes));
  }, [superLikes]);
  
  useEffect(() => {
    localStorage.setItem('coinswipe_stats', JSON.stringify(stats));
  }, [stats]);
  
  // Fetch coins (try API, fallback to mock)
  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h'
        );
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setCoins(shuffled);
      } catch (error) {
        console.log('Using mock data (API unavailable)');
        const shuffled = [...MOCK_COINS].sort(() => Math.random() - 0.5);
        setCoins(shuffled);
      }
      setLoading(false);
    };
    fetchCoins();
  }, []);
  
  // Filter coins by category
  const filteredCoins = coins.filter(coin => {
    if (selectedCategory === 'all') return true;
    return getCoinCategory(coin).includes(selectedCategory);
  });
  
  // Handle swipe
  const handleSwipe = (direction, isSuper = false) => {
    if (currentIndex >= filteredCoins.length) return;
    
    const coin = filteredCoins[currentIndex];
    
    // Save to history for undo
    setHistory(prev => [...prev, { coin, index: currentIndex, direction }]);
    
    if (direction === 'right') {
      if (isSuper) {
        if (!superLikes.find(m => m.id === coin.id)) {
          setSuperLikes(prev => [...prev, { ...coin, matchedAt: Date.now() }]);
        }
        setStats(prev => ({ ...prev, superLiked: prev.superLiked + 1 }));
        if (soundEnabled) playSound('superlike');
      } else {
        if (!matches.find(m => m.id === coin.id)) {
          setMatches(prev => [...prev, { ...coin, matchedAt: Date.now() }]);
        }
        setStats(prev => ({ ...prev, liked: prev.liked + 1 }));
        if (soundEnabled) playSound('like');
      }
    } else {
      setStats(prev => ({ ...prev, passed: prev.passed + 1 }));
      if (soundEnabled) playSound('pass');
    }
    
    setCurrentIndex(prev => prev + 1);
  };
  
  // Undo last swipe
  const handleUndo = () => {
    if (history.length === 0) return;
    
    const lastAction = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentIndex(prev => prev - 1);
    
    // Remove from matches if it was a like
    if (lastAction.direction === 'right') {
      setMatches(prev => prev.filter(m => m.id !== lastAction.coin.id));
      setSuperLikes(prev => prev.filter(m => m.id !== lastAction.coin.id));
      setStats(prev => ({ 
        ...prev, 
        liked: Math.max(0, prev.liked - 1),
        superLiked: Math.max(0, prev.superLiked - 1)
      }));
    } else {
      setStats(prev => ({ ...prev, passed: Math.max(0, prev.passed - 1) }));
    }
  };
  
  // Reset and reshuffle
  const handleReset = () => {
    const shuffled = [...coins].sort(() => Math.random() - 0.5);
    setCoins(shuffled);
    setCurrentIndex(0);
    setHistory([]);
  };
  
  // Remove match
  const removeMatch = (coinId) => {
    setMatches(prev => prev.filter(m => m.id !== coinId));
    setSuperLikes(prev => prev.filter(m => m.id !== coinId));
  };
  
  // Share to Twitter
  const shareToTwitter = (coin) => {
    const text = `Just swiped right on $${coin.symbol.toUpperCase()} on CoinSwipe! 🪙\n\n${coin.name} at ${formatPrice(coin.current_price)} (${coin.price_change_percentage_24h >= 0 ? '+' : ''}${coin.price_change_percentage_24h.toFixed(2)}%)\n\n#crypto #coinswipe`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };
  
  // Dismiss tutorial
  const dismissTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('coinswipe_tutorial_seen', 'true');
  };
  
  const currentCoin = filteredCoins[currentIndex];
  const allMatches = [...superLikes, ...matches.filter(m => !superLikes.find(s => s.id === m.id))];

  // ============================================================================
  // TUTORIAL OVERLAY
  // ============================================================================
  
  if (showTutorial && view === 'swipe') {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-sm text-center space-y-6">
          <span className="text-6xl">🪙</span>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            Welcome to CoinSwipe
          </h1>
          <p className="text-gray-400">Discover your next crypto investment, Tinder style</p>
          
          <div className="space-y-4 text-left bg-gray-800 p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👈</span>
              <span>Swipe left to pass</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">👉</span>
              <span>Swipe right to add to watchlist</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <span>Super Like your favorites</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">↩️</span>
              <span>Undo if you change your mind</span>
            </div>
          </div>
          
          <button
            onClick={dismissTutorial}
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 py-4 rounded-full font-bold text-lg hover:opacity-90 transition"
          >
            Start Swiping 🚀
          </button>
        </div>
      </div>
    );
  }

  // ============================================================================
  // LOADING STATE
  // ============================================================================
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🪙</div>
          <p className="text-gray-400">Loading coins...</p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // SWIPE VIEW
  // ============================================================================
  
  if (view === 'swipe') {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪙</span>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              CoinSwipe
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
            <button 
              onClick={() => setView('matches')}
              className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition"
            >
              <span className="text-pink-500">❤️</span>
              <span className="font-bold">{allMatches.length}</span>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide border-b border-gray-800">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setCurrentIndex(0); setHistory([]); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full whitespace-nowrap transition text-sm ${
                selectedCategory === cat.id 
                  ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Card Area */}
        <div className="flex-1 flex items-center justify-center p-4 relative">
          {currentIndex >= filteredCoins.length ? (
            <div className="flex flex-col items-center gap-4 text-center px-4">
              <span className="text-6xl">🎉</span>
              <h2 className="text-2xl font-bold">You've seen them all!</h2>
              <p className="text-gray-400">
                {allMatches.length} matches from {stats.liked + stats.passed} swipes
              </p>
              <div className="flex gap-3 flex-wrap justify-center">
                <button 
                  onClick={() => setView('matches')}
                  className="bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 rounded-full hover:opacity-90 transition font-medium"
                >
                  View Matches
                </button>
                <button 
                  onClick={handleReset}
                  className="bg-gray-700 px-6 py-3 rounded-full hover:bg-gray-600 transition font-medium"
                >
                  🔄 Shuffle Again
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full max-w-sm h-[480px] flex items-center justify-center">
              {/* Card stack (show 2 behind) */}
              {filteredCoins.slice(currentIndex, currentIndex + 3).reverse().map((coin, i) => {
                const stackIndex = 2 - i;
                const isTop = stackIndex === 0;
                return (
                  <SwipeCard
                    key={coin.id}
                    coin={coin}
                    isTop={isTop}
                    onSwipe={(direction) => handleSwipe(direction)}
                    style={{
                      zIndex: 3 - stackIndex,
                      transform: `scale(${1 - stackIndex * 0.05}) translateY(${stackIndex * 10}px)`,
                      opacity: 1 - stackIndex * 0.2,
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {currentIndex < filteredCoins.length && (
          <div className="flex justify-center items-center gap-4 p-4">
            {/* Undo */}
            <button
              onClick={handleUndo}
              disabled={history.length === 0}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition text-xl ${
                history.length === 0 
                  ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed' 
                  : 'bg-gray-800 hover:bg-yellow-500/30 border-2 border-gray-700 hover:border-yellow-500'
              }`}
              title="Undo"
            >
              ↩️
            </button>
            
            {/* Pass */}
            <button
              onClick={() => handleSwipe('left')}
              className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500/30 border-2 border-gray-700 hover:border-red-500 transition-all active:scale-90 text-3xl"
              title="Pass"
            >
              ❌
            </button>
            
            {/* Super Like */}
            <button
              onClick={() => handleSwipe('right', true)}
              className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500/30 border-2 border-gray-700 hover:border-blue-500 transition-all active:scale-90 text-2xl"
              title="Super Like"
            >
              ⭐
            </button>
            
            {/* Like */}
            <button
              onClick={() => handleSwipe('right')}
              className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500/30 border-2 border-gray-700 hover:border-green-500 transition-all active:scale-90 text-3xl"
              title="Like"
            >
              💚
            </button>
            
            {/* Shuffle */}
            <button
              onClick={handleReset}
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-500/30 border-2 border-gray-700 hover:border-purple-500 transition text-xl"
              title="Shuffle"
            >
              🔀
            </button>
          </div>
        )}

        {/* Progress */}
        {filteredCoins.length > 0 && currentIndex < filteredCoins.length && (
          <div className="px-6 pb-4">
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300"
                style={{ width: `${(currentIndex / filteredCoins.length) * 100}%` }}
              />
            </div>
            <p className="text-center text-gray-500 text-xs mt-2">
              {currentIndex + 1} / {filteredCoins.length} {selectedCategory !== 'all' ? `(${CATEGORIES.find(c => c.id === selectedCategory)?.label})` : ''}
            </p>
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // MATCHES VIEW
  // ============================================================================
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-800">
        <button 
          onClick={() => setView('swipe')}
          className="p-2 hover:bg-gray-800 rounded-full transition text-xl"
        >
          ←
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Your Matches</h1>
          <p className="text-gray-400 text-sm">{allMatches.length} coins in watchlist</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 p-4 bg-gray-800/50">
        <div className="text-center">
          <p className="text-xl font-bold text-green-400">{stats.liked}</p>
          <p className="text-gray-400 text-xs">Liked</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-blue-400">{stats.superLiked}</p>
          <p className="text-gray-400 text-xs">Super</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-red-400">{stats.passed}</p>
          <p className="text-gray-400 text-xs">Passed</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-pink-400">{allMatches.length}</p>
          <p className="text-gray-400 text-xs">Matches</p>
        </div>
      </div>

      {/* Matches List */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {allMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <span className="text-6xl mb-4">💔</span>
            <h2 className="text-xl font-bold text-gray-400">No matches yet</h2>
            <p className="text-gray-500 mb-4">Start swiping to find your coins!</p>
            <button 
              onClick={() => setView('swipe')}
              className="bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 rounded-full hover:opacity-90 transition font-medium"
            >
              Start Swiping
            </button>
          </div>
        ) : (
          allMatches.map((coin) => {
            const coinRisk = getRiskLevel(coin.market_cap);
            const isSuper = superLikes.find(s => s.id === coin.id);
            return (
              <div 
                key={coin.id} 
                className={`bg-gray-800 rounded-2xl p-4 ${isSuper ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
                      <img 
                        src={coin.image} 
                        alt={coin.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => { 
                          e.target.style.display = 'none'; 
                          e.target.parentElement.innerHTML = `<span class="text-lg font-bold">${coin.symbol.toUpperCase().slice(0,2)}</span>`; 
                        }}
                      />
                    </div>
                    {isSuper && (
                      <span className="absolute -top-1 -right-1 text-sm">⭐</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold truncate">{coin.name}</h3>
                      <span className="text-gray-400 text-sm uppercase">{coin.symbol}</span>
                      <span>{coinRisk.emoji}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>{formatPrice(coin.current_price)}</span>
                      <span className={coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <a
                    href={`${AFFILIATE_LINKS.coinbase}?entry=coin_${coin.symbol}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium text-center"
                  >
                    Buy
                  </a>
                  <button
                    onClick={() => shareToTwitter(coin)}
                    className="bg-gray-700 px-3 py-2 rounded-lg hover:bg-gray-600 transition text-sm"
                    title="Share to Twitter"
                  >
                    🐦
                  </button>
                  <button
                    onClick={() => removeMatch(coin.id)}
                    className="bg-gray-700 px-3 py-2 rounded-lg hover:bg-red-500/50 transition text-sm"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Exchange CTAs */}
      {allMatches.length > 0 && (
        <div className="p-4 border-t border-gray-800 space-y-3">
          <p className="text-center text-gray-400 text-sm">
            💰 Ready to invest in your matches?
          </p>
          <div className="grid grid-cols-3 gap-2">
            <a
              href={AFFILIATE_LINKS.coinbase}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 py-2.5 rounded-xl text-center font-medium hover:bg-blue-700 transition text-sm"
            >
              Coinbase
            </a>
            <a
              href={AFFILIATE_LINKS.binance}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 text-black py-2.5 rounded-xl text-center font-medium hover:bg-yellow-400 transition text-sm"
            >
              Binance
            </a>
            <a
              href={AFFILIATE_LINKS.bybit}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 py-2.5 rounded-xl text-center font-medium hover:bg-orange-600 transition text-sm"
            >
              Bybit
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
