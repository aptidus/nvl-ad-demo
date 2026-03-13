// ── NVL Demo App ──

// Shows data
const SHOWS = [
  { id: 'fractured', title: 'Fractured', genre: 'Psychological Thriller', eps: 12, poster: 'assets/episode-1.png', desc: 'A detective unravels her own past while chasing a serial case that mirrors her childhood trauma.' },
  { id: 'cold-trail', title: 'Cold Trail', genre: 'Crime Drama', eps: 8, poster: 'assets/episode-2.png', desc: 'When evidence resurfaces from a decade-old disappearance, a retired investigator must confront the case that ended his career.' },
  { id: 'glass-walls', title: 'Glass Walls', genre: 'Romance Thriller', eps: 16, poster: 'assets/episode-3.png', desc: 'A corporate whistleblower falls for the attorney prosecuting her former employer. Trust becomes currency.' },
  { id: 'silk-thorns', title: 'Silk & Thorns', genre: 'Romantic Drama', eps: 10, poster: 'assets/poster-silk-thorns.png', desc: 'Love grows in the darkest shadows. Two strangers meet in a rain-soaked alley and change each other forever.' },
  { id: 'algorithm', title: 'The Algorithm', genre: 'Cyber Thriller', eps: 6, poster: 'assets/poster-the-algorithm.png', desc: 'A programmer discovers the AI she built has been watching her back—predicting her every move before she makes it.' },
  { id: 'last-exit', title: 'Last Exit', genre: 'Action Thriller', eps: 14, poster: 'assets/poster-last-exit.png', desc: 'Sometimes the only way out is straight through. A man on the run battles his way across the desert.' },
  { id: 'neon-saints', title: 'Neon Saints', genre: 'Crime Drama', eps: 9, poster: 'assets/poster-neon-saints.png', desc: 'Three strangers converge on a neon-lit nightclub where allegiances shift and the midnight saints decide who lives.' },
  { id: 'still-water', title: 'Still Water', genre: 'Mystery Drama', eps: 8, poster: 'assets/poster-still-water.png', desc: 'A woman returns to her lakeside hometown after 15 years to find the truth her family buried beneath the surface.' }
];

const VIDEOS = [
  'https://videos.pexels.com/video-files/3571264/3571264-uhd_1440_2560_30fps.mp4',
  'https://videos.pexels.com/video-files/4763824/4763824-uhd_1440_2560_24fps.mp4',
  'https://videos.pexels.com/video-files/3195394/3195394-uhd_1440_2560_25fps.mp4'
];

// Genre → Sponsor mapping
// Romance → Mercedes-Benz, Drama → Airbnb, Action → Red Bull
// Comedy, Thriller, Documentary → unsponsored
const GENRE_SPONSORS = {
  'Romance': {
    brand: 'Mercedes-Benz',
    tagline: 'The best or nothing.',
    cta: 'DISCOVER MORE',
    banner: 'assets/ad-mercedes-banner.png',
    interstitial: 'assets/ad-mercedes-interstitial.png',
    color: '#C0C0C0'
  },
  'Drama': {
    brand: 'Airbnb',
    tagline: 'Your next adventure awaits.',
    cta: 'BOOK NOW',
    banner: 'assets/ad-airbnb-banner.png',
    interstitial: 'assets/ad-airbnb-interstitial.png',
    color: '#FF5A5F'
  },
  'Action': {
    brand: 'Red Bull',
    tagline: 'Gives You Wings.',
    cta: 'EXPLORE',
    banner: 'assets/ad-redbull-banner.png',
    interstitial: 'assets/ad-redbull-interstitial.png',
    color: '#FFD700'
  }
};

// Map a show's specific genre to a parent genre category for sponsorship
function getSponsor(genre) {
  if (!genre) return GENRE_SPONSORS['Romance']; // fallback
  const g = genre.toLowerCase();
  if (g.includes('romance') || g.includes('romantic')) return GENRE_SPONSORS['Romance'];
  if (g.includes('crime') || g.includes('drama')) return GENRE_SPONSORS['Drama'];
  if (g.includes('action') || g.includes('thriller') || g.includes('cyber')) return GENRE_SPONSORS['Action'];
  if (g.includes('mystery')) return GENRE_SPONSORS['Romance'];
  return GENRE_SPONSORS['Drama']; // default fallback
}

let currentScreen = 'home';
let currentEpisode = 0;
let currentShowIndex = 0;
let heroIndex = 0;
let heroInterval;
let videoPlaying = false;
let bannerTimeout;
let demoOpen = false;

// ── NAV ──
function switchScreen(name) {
  if (name === currentScreen) return;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const screen = document.getElementById('screen-' + name);
  if (screen) {
    screen.classList.add('active');
    currentScreen = name;
  }
  const navItem = document.querySelector(`.nav-item[data-screen="${name}"]`);
  if (navItem) navItem.classList.add('active');

  // Handle player
  if (name === 'player') {
    document.querySelector('.bottom-nav').style.display = 'none';
    document.querySelector('.demo-fab').style.display = 'none';
    document.querySelector('.demo-panel').classList.remove('open');
    playCurrentVideo();
  } else {
    document.querySelector('.bottom-nav').style.display = 'flex';
    document.querySelector('.demo-fab').style.display = 'flex';
    pauseVideo();
  }
}

function openPlayer(showIdx, ep) {
  currentShowIndex = showIdx || 0;
  currentEpisode = ep || 0;
  updatePlayerInfo();
  switchScreen('player');
}

// ── HERO CAROUSEL ──
function initHero() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots .dot');
  heroInterval = setInterval(() => {
    slides[heroIndex].classList.remove('active');
    dots[heroIndex].classList.remove('active');
    heroIndex = (heroIndex + 1) % slides.length;
    slides[heroIndex].classList.add('active');
    dots[heroIndex].classList.add('active');
  }, 4000);
}

// ── VIDEO PLAYER ──
function updatePlayerInfo() {
  const show = SHOWS[currentShowIndex];
  document.getElementById('player-title').textContent = show.title;
  document.getElementById('player-desc').textContent = show.desc;
  document.getElementById('player-ep-label').textContent = `EP ${currentEpisode + 1} OF ${show.eps}`;

  const genreEl = document.getElementById('player-genre');
  genreEl.textContent = show.genre;
  genreEl.className = 'player-genre-tag';
  genreEl.style.borderColor = '';
}

function playCurrentVideo() {
  const video = document.getElementById('main-video');
  const poster = document.getElementById('poster-fallback');
  const vidIdx = currentEpisode % VIDEOS.length;
  video.src = VIDEOS[vidIdx];
  video.load();
  video.play().then(() => {
    videoPlaying = true;
    poster.style.display = 'none';
    video.style.display = 'block';
    scheduleBanner();
  }).catch(() => {
    // Video failed to autoplay, show poster
    poster.src = SHOWS[currentShowIndex].poster;
    poster.style.display = 'block';
    video.style.display = 'none';
    scheduleBanner();
  });
}

function pauseVideo() {
  const video = document.getElementById('main-video');
  video.pause();
  videoPlaying = false;
  clearTimeout(bannerTimeout);
}

function togglePlay() {
  const video = document.getElementById('main-video');
  const playBtn = document.getElementById('play-center');
  if (video.paused) {
    video.play();
    videoPlaying = true;
    playBtn.textContent = '⏸';
  } else {
    video.pause();
    videoPlaying = false;
    playBtn.textContent = '▶';
  }
  playBtn.classList.add('show');
  setTimeout(() => playBtn.classList.remove('show'), 800);
}

function nextEpisode() {
  const show = SHOWS[currentShowIndex];
  if (currentEpisode < show.eps - 1) {
    currentEpisode++;
    // Trigger interstitial between certain episodes
    if (currentEpisode === 2) {
      showInterstitial();
    } else {
      updatePlayerInfo();
      playCurrentVideo();
    }
  } else {
    // Series end - show outro
    showOutro();
  }
}

function prevEpisode() {
  if (currentEpisode > 0) {
    currentEpisode--;
    updatePlayerInfo();
    playCurrentVideo();
  }
}

// Video progress
function updateProgress() {
  const video = document.getElementById('main-video');
  if (video.duration) {
    const pct = (video.currentTime / video.duration) * 100;
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('time-current').textContent = formatTime(video.currentTime);
    document.getElementById('time-total').textContent = formatTime(video.duration);
  }
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}

// ── SWIPE HANDLING ──
let touchStartY = 0;
function initSwipe() {
  const player = document.getElementById('screen-player');
  player.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  player.addEventListener('touchend', e => {
    const diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 60) {
      if (diff > 0) nextEpisode();
      else prevEpisode();
    }
  }, { passive: true });
}

// ── AD FORMATS ──

function showInterstitial() {
  pauseVideo();
  const el = document.getElementById('ad-interstitial');
  const skipBtn = document.getElementById('skip-btn');

  // Swap interstitial image to match genre sponsor
  const show = SHOWS[currentShowIndex];
  const sponsor = getSponsor(show.genre);
  if (sponsor) {
    el.querySelector('img').src = sponsor.interstitial;
    el.querySelector('.ad-cta').textContent = sponsor.cta;
  }

  el.classList.add('active');
  skipBtn.classList.remove('ready');
  skipBtn.textContent = 'Skip in 3s';
  let count = 3;
  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      skipBtn.textContent = 'Skip in ' + count + 's';
    } else {
      clearInterval(timer);
      skipBtn.textContent = 'SKIP ▸';
      skipBtn.classList.add('ready');
    }
  }, 1000);
}

function closeInterstitial() {
  const skipBtn = document.getElementById('skip-btn');
  if (!skipBtn.classList.contains('ready')) return;
  document.getElementById('ad-interstitial').classList.remove('active');
  updatePlayerInfo();
  playCurrentVideo();
}

function scheduleBanner() {
  clearTimeout(bannerTimeout);
  bannerTimeout = setTimeout(() => {
    if (currentScreen === 'player') {
      // Swap banner content to match genre sponsor
      const show = SHOWS[currentShowIndex];
      const sponsor = getSponsor(show.genre);
      const bannerEl = document.getElementById('ad-banner');
      if (sponsor) {
        bannerEl.querySelector('.banner-img img').src = sponsor.banner;
        bannerEl.querySelector('.banner-brand').textContent = 'Sponsored · ' + sponsor.brand;
        bannerEl.querySelector('.banner-title').textContent = sponsor.tagline;
        bannerEl.querySelector('.banner-cta').textContent = sponsor.cta + ' ▸';
      }
      bannerEl.classList.add('active');
    }
  }, 5000);
}

function closeBanner() {
  document.getElementById('ad-banner').classList.remove('active');
}

function showOutro() {
  pauseVideo();
  const el = document.getElementById('ad-outro');

  // Show correct brand in outro
  const show = SHOWS[currentShowIndex];
  const sponsor = getSponsor(show.genre);
  const brandEl = el.querySelector('.outro-brand');
  if (sponsor) {
    brandEl.textContent = sponsor.brand.toUpperCase();
    brandEl.style.color = sponsor.color;
    el.querySelector('.outro-presented').textContent = 'Sponsored by';
  } else {
    brandEl.textContent = '';
    el.querySelector('.outro-presented').textContent = 'Thanks for watching';
  }

  // Set next show info
  const nextIdx = (currentShowIndex + 1) % SHOWS.length;
  const nextShow = SHOWS[nextIdx];
  document.getElementById('outro-next').textContent = nextShow.title + ' · Episode 1';

  el.classList.add('active');
  let count = 5;
  const countEl = document.getElementById('outro-countdown');
  countEl.textContent = count;
  const timer = setInterval(() => {
    count--;
    countEl.textContent = count;
    if (count <= 0) {
      clearInterval(timer);
      closeOutro();
      // Go to next show
      currentShowIndex = nextIdx;
      currentEpisode = 0;
      updatePlayerInfo();
      playCurrentVideo();
    }
  }, 1000);
  el._timer = timer;
}

function closeOutro() {
  const el = document.getElementById('ad-outro');
  el.classList.remove('active');
  if (el._timer) clearInterval(el._timer);
}

// ── DEMO PANEL ──
function toggleDemo() {
  demoOpen = !demoOpen;
  document.querySelector('.demo-panel').classList.toggle('open', demoOpen);
}

function triggerAd(type) {
  demoOpen = false;
  document.querySelector('.demo-panel').classList.remove('open');
  switch(type) {
    case 'interstitial':
      openPlayer(0, 0);
      setTimeout(() => showInterstitial(), 500);
      break;
    case 'banner':
      if (currentScreen !== 'player') openPlayer(0, 0);
      clearTimeout(bannerTimeout);
      // Swap banner content to match genre sponsor before showing
      const show = SHOWS[currentShowIndex];
      const sp = getSponsor(show.genre);
      const bannerEl = document.getElementById('ad-banner');
      if (sp) {
        bannerEl.querySelector('.banner-img img').src = sp.banner;
        bannerEl.querySelector('.banner-brand').textContent = 'Sponsored · ' + sp.brand;
        bannerEl.querySelector('.banner-title').textContent = sp.tagline;
        bannerEl.querySelector('.banner-cta').textContent = sp.cta + ' ▸';
      }
      setTimeout(() => bannerEl.classList.add('active'), 500);
      break;
    case 'genre':
      // Open a Romance show (Mercedes-Benz sponsored) to demo genre tag
      openPlayer(3, 0);
      showToast('Romance genre sponsored by Mercedes-Benz');
      break;
    case 'outro':
      openPlayer(0, 0);
      setTimeout(() => showOutro(), 500);
      break;
  }
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ── ACTION RAIL ──
function toggleLike() {
  const btn = document.querySelector('.action-btn.like-btn');
  btn.classList.toggle('liked');
  const icon = btn.querySelector('.action-icon');
  if (btn.classList.contains('liked')) {
    icon.textContent = '❤️';
    showToast('Added to favorites');
  } else {
    icon.textContent = '🤍';
  }
}

function doAction(action) {
  switch(action) {
    case 'comment': showToast('Comments (demo)'); break;
    case 'share': showToast('Share link copied!'); break;
    case 'bookmark':
      showToast('Added to My List');
      break;
  }
}

// ── SEARCH ──
function selectPill(el) {
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  showToast('Filtering: ' + el.textContent);
}

// ── MY LIST TABS ──
function selectListTab(el) {
  document.querySelectorAll('.mylist-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// ── PROFILE TOGGLE ──
function toggleSetting(el) {
  el.classList.toggle('on');
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  // Set status bar time
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  document.getElementById('status-time').textContent = (h % 12 || 12) + ':' + m + ' ' + ampm;

  // Init hero carousel
  initHero();

  // Init swipe on player
  initSwipe();

  // Video progress updates
  const video = document.getElementById('main-video');
  video.addEventListener('timeupdate', updateProgress);
  video.addEventListener('ended', nextEpisode);

  // Player tap to play/pause
  document.querySelector('.player-container').addEventListener('click', e => {
    if (e.target.closest('.action-rail') || e.target.closest('.player-back') ||
        e.target.closest('.player-more-btn') || e.target.closest('.ad-banner')) return;
    togglePlay();
  });

  // Start on home
  switchScreen('home');
});
