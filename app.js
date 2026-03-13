// ── NVL Demo App ──

// 30-title media library spanning Netflix-style genres
const SHOWS = [
  // ── Thriller / Psychological ──
  { id: 'fractured', title: 'Fractured', genre: 'Psychological Thriller', eps: 12, poster: 'assets/episode-1.png', desc: 'A detective unravels her own past while chasing a serial case that mirrors her childhood trauma.' },
  { id: 'algorithm', title: 'The Algorithm', genre: 'Cyber Thriller', eps: 6, poster: 'assets/poster-the-algorithm.png', desc: 'A programmer discovers the AI she built has been watching her back—predicting her every move before she makes it.' },
  { id: 'blindspot', title: 'Blindspot', genre: 'Thriller', eps: 8, poster: 'assets/episode-2.png', desc: 'A neurosurgeon loses her sight in a car accident—and starts seeing visions of crimes before they happen.' },

  // ── Crime / Drama ──
  { id: 'cold-trail', title: 'Cold Trail', genre: 'Crime Drama', eps: 8, poster: 'assets/episode-2.png', desc: 'When evidence resurfaces from a decade-old disappearance, a retired investigator must confront the case that ended his career.' },
  { id: 'neon-saints', title: 'Neon Saints', genre: 'Crime Drama', eps: 9, poster: 'assets/poster-neon-saints.png', desc: 'Three strangers converge on a neon-lit nightclub where allegiances shift and the midnight saints decide who lives.' },
  { id: 'the-wire-city', title: 'Wire City', genre: 'Crime', eps: 10, poster: 'assets/poster-neon-saints.png', desc: 'An undercover cop infiltrates a cybercrime ring operating from the rooftops of a megacity. One wrong packet and it\'s over.' },

  // ── Action / Adventure ──
  { id: 'last-exit', title: 'Last Exit', genre: 'Action Thriller', eps: 14, poster: 'assets/poster-last-exit.png', desc: 'Sometimes the only way out is straight through. A man on the run battles his way across the desert.' },
  { id: 'warpath', title: 'Warpath', genre: 'Action', eps: 10, poster: 'assets/poster-last-exit.png', desc: 'A disgraced MMA fighter is recruited by a covert ops unit. The octagon was child\'s play compared to this.' },
  { id: 'extraction-zero', title: 'Extraction Zero', genre: 'Action Adventure', eps: 8, poster: 'assets/episode-3.png', desc: 'Deep in the Amazon, a rescue team discovers the hostage they came for doesn\'t want to be saved.' },

  // ── Comedy ──
  { id: 'hot-mess', title: 'Hot Mess', genre: 'Comedy', eps: 12, poster: 'assets/poster-silk-thorns.png', desc: 'A celebrity chef\'s restaurant burns down on live TV. Now she runs a taco truck and somehow it\'s thriving.' },
  { id: 'coworking', title: 'Co//Working', genre: 'Workplace Comedy', eps: 10, poster: 'assets/poster-the-algorithm.png', desc: 'Five remote workers share a coworking space. None of them can agree on the thermostat, the music, or reality.' },
  { id: 'family-algo', title: 'The Family Algorithm', genre: 'Comedy Drama', eps: 8, poster: 'assets/poster-still-water.png', desc: 'A data scientist tries to optimize her dysfunctional family using behavioral algorithms. It backfires spectacularly.' },

  // ── Horror ──
  { id: 'the-hallowing', title: 'The Hallowing', genre: 'Horror', eps: 6, poster: 'assets/episode-1.png', desc: 'Every Halloween, the residents of Hollow Creek celebrate an ancient festival. This year, the masks come alive.' },
  { id: 'below-the-floor', title: 'Below the Floor', genre: 'Horror Thriller', eps: 8, poster: 'assets/episode-2.png', desc: 'A family moves into their dream home. Then they discover why the previous owners cemented the basement shut.' },
  { id: 'sleep-watchers', title: 'Sleep Watchers', genre: 'Supernatural Horror', eps: 10, poster: 'assets/poster-still-water.png', desc: 'Insomniacs in a sleep clinic start sharing the same nightmare. The thing in the dream knows their names.' },

  // ── Romance / Romantic Drama ──
  { id: 'glass-walls', title: 'Glass Walls', genre: 'Romance Thriller', eps: 16, poster: 'assets/episode-3.png', desc: 'A corporate whistleblower falls for the attorney prosecuting her former employer. Trust becomes currency.' },
  { id: 'silk-thorns', title: 'Silk & Thorns', genre: 'Romantic Drama', eps: 10, poster: 'assets/poster-silk-thorns.png', desc: 'Love grows in the darkest shadows. Two strangers meet in a rain-soaked alley and change each other forever.' },
  { id: 'paris-rewind', title: 'Paris Rewind', genre: 'Romance', eps: 8, poster: 'assets/poster-silk-thorns.png', desc: 'A time loop traps two strangers in a single perfect day in Paris. Every reset, they remember more—and fall harder.' },

  // ── Sci-Fi ──
  { id: 'arc-seven', title: 'Arc Seven', genre: 'Sci-Fi', eps: 10, poster: 'assets/poster-the-algorithm.png', desc: 'Humanity\'s last colony ship receives a signal from Earth: "We\'re alive. Don\'t come back." The crew splits.' },
  { id: 'echo-state', title: 'Echo State', genre: 'Sci-Fi Thriller', eps: 8, poster: 'assets/episode-1.png', desc: 'Consciousness can be backed up. But when a woman wakes in a body she doesn\'t recognize, she questions who she really is.' },
  { id: 'terraform', title: 'Terraform', genre: 'Sci-Fi Drama', eps: 12, poster: 'assets/poster-neon-saints.png', desc: 'Mars colonists face a moral crisis when the terraforming process awakens something already living in the soil.' },

  // ── Mystery / Suspense ──
  { id: 'still-water', title: 'Still Water', genre: 'Mystery Drama', eps: 8, poster: 'assets/poster-still-water.png', desc: 'A woman returns to her lakeside hometown after 15 years to find the truth her family buried beneath the surface.' },
  { id: 'the-vanishing', title: 'The Vanishing', genre: 'Mystery', eps: 6, poster: 'assets/episode-3.png', desc: 'A small island\'s entire fishing fleet disappears overnight. The boats wash ashore a week later—empty and locked from the inside.' },

  // ── Documentary ──
  { id: 'inside-the-machine', title: 'Inside the Machine', genre: 'Documentary', eps: 6, poster: 'assets/poster-the-algorithm.png', desc: 'How a team of 12 engineers at a startup built an AI that passed the bar exam—and what happened next.' },
  { id: 'the-last-glacier', title: 'The Last Glacier', genre: 'Documentary', eps: 4, poster: 'assets/poster-still-water.png', desc: 'Climate scientists race to document Earth\'s fastest-melting glacier before it vanishes forever.' },

  // ── Fantasy / Anime ──
  { id: 'shadow-court', title: 'Shadow Court', genre: 'Dark Fantasy', eps: 12, poster: 'assets/poster-neon-saints.png', desc: 'A disgraced knight discovers she\'s the heir to a fallen kingdom that exists between the cracks of reality.' },
  { id: 'spirit-engine', title: 'Spirit Engine', genre: 'Anime', eps: 24, poster: 'assets/poster-last-exit.png', desc: 'In a world where souls power machines, a mechanic discovers her dead brother\'s spirit has been trapped inside her motorcycle.' },

  // ── K-Drama / International ──
  { id: 'seoul-midnight', title: 'Seoul Midnight', genre: 'K-Drama', eps: 16, poster: 'assets/poster-silk-thorns.png', desc: 'A K-pop trainee and a street food vendor cross paths at midnight. Their worlds shouldn\'t mix—but Seoul has other plans.' },
  { id: 'the-exchange', title: 'The Exchange', genre: 'K-Drama Thriller', eps: 12, poster: 'assets/episode-1.png', desc: 'Two rival stock traders are forced to share a trading desk. The market is volatile; so is their chemistry.' },

  // ── True Crime ──
  { id: 'the-confession-tapes', title: 'The Confession Tapes', genre: 'True Crime', eps: 8, poster: 'assets/episode-2.png', desc: 'Interrogation footage from the most controversial confessions of the decade. Were they telling the truth?' },

  // ── Medical Drama ──
  { id: 'code-blue', title: 'Code Blue', genre: 'Medical Drama', eps: 10, poster: 'assets/episode-3.png', desc: 'A trauma surgeon operates on the city\'s most dangerous patients by night—while hiding a secret that could end her career.' },

  // ── Survival ──
  { id: 'thin-ice', title: 'Thin Ice', genre: 'Survival Thriller', eps: 8, poster: 'assets/poster-last-exit.png', desc: 'Six strangers crash-land on an Arctic ice sheet. Rescue is 48 hours away. The ice is breaking faster than expected.' },

  // ── Heist ──
  { id: 'vault-9', title: 'Vault 9', genre: 'Heist', eps: 6, poster: 'assets/poster-neon-saints.png', desc: 'A retired safecracker is pulled back for one impossible job—a vault nine stories underground with no blueprints.' },

  // ── Anthology ──
  { id: 'parallel-lives', title: 'Parallel Lives', genre: 'Anthology', eps: 12, poster: 'assets/poster-the-algorithm.png', desc: 'Each episode follows a different person at the exact same crossroads. One choice. Infinite consequences.' },

  // ── Sports Drama ──
  { id: 'breakaway', title: 'Breakaway', genre: 'Sports Drama', eps: 10, poster: 'assets/poster-still-water.png', desc: 'A disgraced Olympic cyclist returns to competition after a doping scandal—this time clean, this time with everything to prove.' },

  // ── Limited Series ──
  { id: 'the-architect', title: 'The Architect', genre: 'Limited Series', eps: 6, poster: 'assets/episode-1.png', desc: 'A grieving architect designs a memorial for the disaster that killed his family. Each floor reveals a buried truth.' },
];

// Color palettes per genre for canvas-generated visuals
const GENRE_PALETTES = {
  'thriller':   ['#1a0a2e','#16213e','#e94560','#533483'],
  'crime':      ['#0f0f0f','#1a1a2e','#e94560','#0f3460'],
  'action':     ['#2d0000','#5c0000','#ff6b35','#f7c59f'],
  'comedy':     ['#1b0a2a','#6c2eb9','#ffd700','#ff69b4'],
  'horror':     ['#0d0d0d','#1a0000','#8b0000','#2d1b2e'],
  'romance':    ['#1a0a1e','#4a0e2b','#ff6b9d','#c084fc'],
  'sci-fi':     ['#0a0a2e','#0f3460','#00d4ff','#7b2ff7'],
  'mystery':    ['#0a1a2a','#1a3a4a','#4ecdc4','#2c3e50'],
  'documentary':['#1a1a1a','#2d2d2d','#f39c12','#ecf0f1'],
  'fantasy':    ['#0a0a2e','#2d1b69','#9b59b6','#e8d5b7'],
  'anime':      ['#0a0a2e','#1a0a3e','#ff4081','#7c4dff'],
  'k-drama':    ['#1a0a1e','#2d0a3e','#ff6b9d','#a78bfa'],
  'true crime': ['#0f0f0f','#1a1a1a','#dc2626','#fbbf24'],
  'medical':    ['#0a1a2e','#0f3460','#00bcd4','#e0f7fa'],
  'survival':   ['#0a1a1a','#1a3a2a','#4caf50','#b0bec5'],
  'heist':      ['#1a1a0a','#3e2d0a','#ffd700','#ff9800'],
  'anthology':  ['#1a0a2e','#2d1b4e','#ab47bc','#e1bee7'],
  'sports':     ['#0a1a0a','#1b5e20','#76ff03','#ffffff'],
  'limited':    ['#1a1a2e','#2c3e50','#e74c3c','#ecf0f1'],
};

function getPaletteForShow(show) {
  const g = (show.genre || '').toLowerCase();
  for (const [key, pal] of Object.entries(GENRE_PALETTES)) {
    if (g.includes(key)) return pal;
  }
  return GENRE_PALETTES['thriller'];
}

// ── Real Video Playback with canvas fallback ──
let animCanvas, animCtx, animFrame, animStart;
let usingRealVideo = false;  // tracks whether we're playing a real .mp4
const EPISODE_DURATION = 30; // each "episode" viewing is 30 seconds (video loops)

function playCurrentVideo() {
  const video = document.getElementById('main-video');
  const poster = document.getElementById('poster-fallback');
  const show = SHOWS[currentShowIndex];
  const palette = getPaletteForShow(show);
  const container = document.querySelector('.player-container');

  // Stop any previous canvas animation
  cancelAnimationFrame(animFrame);
  videoPlaying = true;
  usingRealVideo = false;

  // Try loading real Veo video first
  const videoSrc = `videos/${show.id}.mp4`;
  video.src = videoSrc;
  video.loop = true;   // 8-sec clips loop within the episode
  video.muted = true;
  video.playsInline = true;
  video.style.display = 'block';
  video.style.position = 'absolute';
  video.style.top = '0';
  video.style.left = '0';
  video.style.width = '100%';
  video.style.height = '100%';
  video.style.objectFit = 'cover';
  video.style.zIndex = '0';
  poster.style.display = 'none';

  // Hide canvas while trying real video
  if (animCanvas) animCanvas.style.display = 'none';

  // Attempt to play the real video
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      // Real video is playing!
      usingRealVideo = true;
      startEpisodeTimer();
    }).catch(() => {
      // Video failed to load — fall back to canvas animation
      video.style.display = 'none';
      fallbackCanvasPlay(container, palette);
    });
  }

  // Also handle the case where video source doesn't exist
  video.onerror = () => {
    if (!usingRealVideo) {
      video.style.display = 'none';
      fallbackCanvasPlay(container, palette);
    }
  };

  scheduleBanner();
}

// Episode timer for real video (tracks progress for EPISODE_DURATION seconds)
let episodeTimer = null;
let episodeStart = 0;

function startEpisodeTimer() {
  episodeStart = performance.now();
  cancelAnimationFrame(animFrame);

  function tick() {
    if (!videoPlaying || !usingRealVideo) return;
    const elapsed = (performance.now() - episodeStart) / 1000;
    const progress = Math.min(elapsed / EPISODE_DURATION, 1);

    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = (progress * 100) + '%';
    const timeCurrent = document.getElementById('time-current');
    const timeTotal = document.getElementById('time-total');
    if (timeCurrent) timeCurrent.textContent = formatTime(elapsed);
    if (timeTotal) timeTotal.textContent = formatTime(EPISODE_DURATION);

    if (elapsed >= EPISODE_DURATION) {
      videoPlaying = false;
      const vid = document.getElementById('main-video');
      vid.pause();
      nextEpisode();
      return;
    }
    animFrame = requestAnimationFrame(tick);
  }
  animFrame = requestAnimationFrame(tick);
}

// Canvas fallback (original animated background)
function fallbackCanvasPlay(container, palette) {
  usingRealVideo = false;

  if (!animCanvas) {
    animCanvas = document.createElement('canvas');
    animCanvas.id = 'anim-canvas';
    animCanvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:0;';
    container.insertBefore(animCanvas, container.firstChild);
  }
  animCanvas.width = container.offsetWidth * 2;
  animCanvas.height = container.offsetHeight * 2;
  animCanvas.style.display = 'block';
  animCtx = animCanvas.getContext('2d');

  const seed = currentShowIndex * 137;
  const particles = Array.from({length: 60}, (_, i) => ({
    x: ((seed + i * 73) % 100) / 100,
    y: ((seed + i * 31) % 100) / 100,
    vx: (((seed + i * 17) % 200) - 100) / 8000,
    vy: (((seed + i * 53) % 200) - 100) / 8000,
    r: 2 + ((seed + i * 41) % 6),
    a: 0.2 + ((seed + i * 23) % 60) / 100,
  }));

  cancelAnimationFrame(animFrame);
  animStart = performance.now();

  function renderFrame(ts) {
    const elapsed = (ts - animStart) / 1000;
    const w = animCanvas.width, h = animCanvas.height;
    const ctx = animCtx;

    const grad = ctx.createLinearGradient(0, 0, w * Math.sin(elapsed * 0.3), h);
    grad.addColorStop(0, palette[0]);
    grad.addColorStop(0.5, palette[1]);
    grad.addColorStop(1, palette[0]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    particles.forEach(p => {
      p.x += p.vx + Math.sin(elapsed * 2 + p.r) * 0.0003;
      p.y += p.vy + Math.cos(elapsed * 1.5 + p.r) * 0.0003;
      if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;

      const px = p.x * w, py = p.y * h;
      const glow = ctx.createRadialGradient(px, py, 0, px, py, p.r * 8);
      glow.addColorStop(0, palette[2] + Math.round(p.a * 255).toString(16).padStart(2,'0'));
      glow.addColorStop(0.5, palette[3] + '33');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(px - p.r * 8, py - p.r * 8, p.r * 16, p.r * 16);
    });

    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    for (let y = 0; y < h; y += 4) {
      ctx.fillRect(0, y, w, 1);
    }

    const vg = ctx.createRadialGradient(w/2, h/2, w * 0.25, w/2, h/2, w * 0.7);
    vg.addColorStop(0, 'transparent');
    vg.addColorStop(1, 'rgba(0,0,0,0.6)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);

    const duration = EPISODE_DURATION;
    const progress = Math.min(elapsed / duration, 1);
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = (progress * 100) + '%';
    const timeCurrent = document.getElementById('time-current');
    const timeTotal = document.getElementById('time-total');
    if (timeCurrent) timeCurrent.textContent = formatTime(elapsed);
    if (timeTotal) timeTotal.textContent = formatTime(duration);

    if (elapsed < duration && videoPlaying) {
      animFrame = requestAnimationFrame(renderFrame);
    } else if (elapsed >= duration) {
      videoPlaying = false;
      nextEpisode();
    }
  }

  animFrame = requestAnimationFrame(renderFrame);
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + sec.toString().padStart(2, '0');
}

// Genre → Sponsor mapping
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
  if (g.includes('romance') || g.includes('romantic') || g.includes('k-drama')) return GENRE_SPONSORS['Romance'];
  if (g.includes('crime') || g.includes('drama') || g.includes('documentary') || g.includes('true crime')) return GENRE_SPONSORS['Drama'];
  if (g.includes('action') || g.includes('thriller') || g.includes('cyber') || g.includes('horror') || g.includes('fantasy')) return GENRE_SPONSORS['Action'];
  if (g.includes('comedy') || g.includes('workplace')) return GENRE_SPONSORS['Drama'];
  if (g.includes('sci-fi') || g.includes('anime')) return GENRE_SPONSORS['Action'];
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

// (old playCurrentVideo removed – canvas version is above)

function pauseVideo() {
  cancelAnimationFrame(animFrame);
  videoPlaying = false;
  clearTimeout(bannerTimeout);
  // Also pause the real <video> if playing
  const video = document.getElementById('main-video');
  if (video && !video.paused) video.pause();
}

function togglePlay() {
  const playBtn = document.getElementById('play-center');
  const video = document.getElementById('main-video');

  if (videoPlaying) {
    // Pause
    cancelAnimationFrame(animFrame);
    videoPlaying = false;
    if (usingRealVideo && video && !video.paused) video.pause();
    playBtn.textContent = '▶';
  } else {
    // Resume
    videoPlaying = true;
    if (usingRealVideo) {
      video.play();
      startEpisodeTimer();
    } else {
      animStart = performance.now() - (animStart ? (performance.now() - animStart) : 0);
      playCurrentVideo();
    }
    playBtn.textContent = '⏸';
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

// formatTime defined earlier in canvas section

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
      openPlayer(16, 0); // Silk & Thorns
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
