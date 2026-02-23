// ─── CUSTOM CURSOR (desktop/mouse only) ──────────────────────
const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (!isTouch) {
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = -100, my = -100, rx = -100, ry = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .toggle, .project-card, .win-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    ring.style.transform = 'translate(-50%,-50%) scale(1.4)';
    ring.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.opacity = '0.5';
  });
});
} // end isTouch check

// ─── SCROLL PROGRESS ─────────────────────────────────────────
const prog = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const p = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  prog.style.width = p + '%';
});

// ─── REVEAL ON SCROLL ────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), 80 * (e.target.dataset.delay || 0));
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => obs.observe(el));

// ─── THEME TOGGLE ────────────────────────────────────────────
const toggle = document.getElementById('themeToggle');
const label = document.getElementById('toggleLabel');
let isDark = true;
function setTheme(dark) {
  isDark = dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  label.textContent = dark ? 'Dark' : 'Light';
}
toggle.addEventListener('click', () => setTheme(!isDark));
toggle.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') setTheme(!isDark); });

// ─── WIN ITEM DUST HOVER ─────────────────────────────────────
document.querySelectorAll('.win-item[data-dust]').forEach(item => {
  item.addEventListener('mouseenter', () => {
    const dust = item.querySelector('.win-dust');
    dust.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      const d = document.createElement('div');
      d.style.cssText = `
        position:absolute;
        width:${Math.random()*4+2}px;height:${Math.random()*4+2}px;
        background:var(--dust);border-radius:50%;
        left:${Math.random()*100}%;top:${Math.random()*100}%;
        opacity:${Math.random()*0.6+0.2};
        animation: dustFloat ${Math.random()*1+0.5}s ease-out forwards;
        pointer-events:none;
      `;
      dust.appendChild(d);
    }
  });
  item.addEventListener('mouseleave', () => {
    item.querySelector('.win-dust').innerHTML = '';
  });
});

const styleEl = document.createElement('style');
styleEl.textContent = `
@keyframes dustFloat {
  from { transform: translateY(0) scale(1); opacity: 0.6; }
  to { transform: translateY(-20px) scale(0); opacity: 0; }
}`;
document.head.appendChild(styleEl);

// ─── AMBIENT PARTICLES ───────────────────────────────────────
const ambCanvas = document.getElementById('ambient-canvas');
const ambCtx = ambCanvas.getContext('2d');
let ambParticles = [];

function resizeAmb() {
  ambCanvas.width = window.innerWidth;
  ambCanvas.height = window.innerHeight;
}
resizeAmb();
window.addEventListener('resize', resizeAmb);

for (let i = 0; i < 60; i++) {
  ambParticles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.4 + 0.1
  });
}

function animAmb() {
  ambCtx.clearRect(0, 0, ambCanvas.width, ambCanvas.height);
  ambParticles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = ambCanvas.width;
    if (p.x > ambCanvas.width) p.x = 0;
    if (p.y < 0) p.y = ambCanvas.height;
    if (p.y > ambCanvas.height) p.y = 0;
    ambCtx.beginPath();
    ambCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ambCtx.fillStyle = `rgba(120,140,200,${p.opacity})`;
    ambCtx.fill();
  });
  requestAnimationFrame(animAmb);
}
animAmb();

// ─── TERMINAL TYPEWRITER ─────────────────────────────────────
const termBody = document.getElementById('termBody');

const lines = [
  { delay: 300,  html: `<span class="t-prompt">❯</span> <span class="t-cmd">cat profile.json</span>` },
  { delay: 700,  html: `<span class="t-output">{</span>` },
  { delay: 950,  html: `&nbsp;&nbsp;<span class="t-key">"name"</span><span class="t-output">:</span> <span class="t-str">"Kilavi Musyoki"</span><span class="t-output">,</span>` },
  { delay: 1200, html: `&nbsp;&nbsp;<span class="t-key">"role"</span><span class="t-output">:</span> <span class="t-str">"Telecom &amp; Information Engineer"</span><span class="t-output">,</span>` },
  { delay: 1500, html: `&nbsp;&nbsp;<span class="t-key">"university"</span><span class="t-output">:</span> <span class="t-str">"DeKUT, Nyeri 🇰🇪"</span><span class="t-output">,</span>` },
  { delay: 1800, html: `&nbsp;&nbsp;<span class="t-key">"mission"</span><span class="t-output">:</span> <span class="t-str">"Build. Learn. Impact."</span>` },
  { delay: 2050, html: `<span class="t-output">}</span>` },
  { delay: 2300, html: `<span class="t-blank"></span>` },
  { delay: 2500, html: `<span class="t-prompt">❯</span> <span class="t-cmd">ping musyokikilavi870@gmail.com</span>` },
  { delay: 2800, html: `<span class="t-success">✓ Connection established — let's build something.</span>` },
];

let lineIndex = 0;
const blinkEl = document.createElement('span');
blinkEl.className = 'cursor-blink';

function showNextLine() {
  if (lineIndex >= lines.length) {
    // Keep blinking cursor at end
    termBody.appendChild(blinkEl);
    return;
  }
  const { delay, html } = lines[lineIndex];
  setTimeout(() => {
    // Remove blinking cursor from previous position
    if (blinkEl.parentNode) blinkEl.parentNode.removeChild(blinkEl);

    const span = document.createElement('span');
    span.className = 'terminal-line';
    span.innerHTML = html;
    termBody.appendChild(span);
    termBody.appendChild(document.createElement('br'));
    lineIndex++;
    showNextLine();
  }, lineIndex === 0 ? delay : delay - lines[lineIndex - 1].delay);
}
showNextLine();