/* ================= Vision Properties — shared engine ================= */
const VP = window.VP = {};
(() => {
const D = VP_DATA;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } } };
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
const MOB = () => innerWidth < 760;
const wa = t => `https://wa.me/${D.C.wa}${t ? '?text=' + encodeURIComponent(t) : ''}`;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
Object.assign(VP, { $, $$, esc, store, RM, FINE, MOB, wa, D, clamp });

/* ---------------- icons ---------------- */
const sv = (p, f) => `<svg viewBox="0 0 24 24" ${f ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'} aria-hidden="true">${p}</svg>`;
const I = {
  arrow: sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  ne: sv('<path d="M7 17 17 7M8 7h9v9"/>'),
  left: sv('<path d="M19 12H5M11 18l-6-6 6-6"/>'),
  pin: sv('<path d="M12 22s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>'),
  phone: sv('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
  wa: sv('<path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.3-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/>', 1),
  mail: sv('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>'),
  check: sv('<path d="m5 12 5 5 9-10"/>'),
  x: sv('<path d="M6 6l12 12M18 6 6 18"/>'),
  chat: sv('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
  send: sv('<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>'),
  copy: sv('<rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>'),
  share: sv('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>'),
  expand: sv('<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>'),
  ig: sv('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>'),
  fb: sv('<path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7H17l.6-4h-4.1V8.8c0-.5.3-.8.5-.8z"/>', 1),
  yt: sv('<path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9L15.6 12l-5.8 3.1z"/>', 1),
  map: sv('<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>')
};
VP.I = I;

/* ---------------- images: local first, original URL as fallback ---------------- */
const SRC = x => typeof x === 'string' ? { src: x } : (x || {});
VP.SRC = SRC;
VP.img = (pic, alt, cls = '', eager) => { const o = SRC(pic); return `<div class="ph ${cls}"><img ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" src="${esc(o.src)}"${o.fb ? ` data-fb="${esc(o.fb)}"` : ''} alt="${esc(alt)}"></div>`; };
VP.rawImg = (pic, alt, extra = '') => { const o = SRC(pic); return `<img loading="lazy" decoding="async" src="${esc(o.src)}"${o.fb ? ` data-fb="${esc(o.fb)}"` : ''} alt="${esc(alt)}" ${extra}>`; };
function wireImgs(root = document) {
  $$('img[data-fb], .ph img', root).forEach(im => {
    if (im.dataset.w) return; im.dataset.w = 1;
    const ok = () => im.classList.add('ld');
    const bad = () => { if (im.dataset.fb && im.src !== im.dataset.fb) { im.src = im.dataset.fb; return; } im.dispatchEvent(new Event('vpfail')); };
    if (im.complete && im.naturalWidth) ok(); else if (im.complete && im.getAttribute('src')) bad();
    im.addEventListener('load', ok); im.addEventListener('error', bad);
  });
}
VP.wireImgs = wireImgs;
document.addEventListener('error', e => { const im = e.target; if (im && im.tagName === 'IMG' && im.dataset && im.dataset.fb && !im.dataset.w && im.src !== im.dataset.fb) im.src = im.dataset.fb; }, true);

/* ---------------- buttons: <a class="btn btn-primary" data-i="arrow">Label</a> → rolling label + icon disk ---------------- */
function enhanceButtons(root = document) {
  $$('.btn:not([data-b])', root).forEach(b => {
    b.dataset.b = 1;
    const label = b.textContent.trim(), name = b.dataset.i || 'arrow', icon = name === 'none' ? '' : (I[name] || I.arrow);
    b.innerHTML = `<span class="btn-l"><span>${esc(label)}</span><span aria-hidden="true">${esc(label)}</span></span>` + (icon ? `<span class="btn-fill" aria-hidden="true"></span><span class="btn-i" aria-hidden="true">${icon}${icon}</span>` : '');
    if (!icon) b.classList.add('no-i');
    if (!b.getAttribute('aria-label') && b.tagName === 'A' && b.target === '_blank') b.setAttribute('aria-label', label + ' (opens in a new tab)');
  });
}
VP.enhanceButtons = enhanceButtons;
VP.btn = (label, href, cls = 'btn-primary', i = 'arrow', extra = '') => `<a class="btn ${cls}" href="${esc(href)}" data-i="${i}" ${extra}>${esc(label)}</a>`;

/* ---------------- project card ---------------- */
VP.card = (p, i = 0) => {
  const alt = p.pics[1] ? `<img class="alt" loading="lazy" decoding="async" src="${esc(p.pics[1].src)}" data-fb="${esc(p.pics[1].fb)}" alt="">` : '';
  return `<a class="pc rv d${i % 4}" href="project.html?p=${p.s}" data-tilt="5" data-spot data-f="${p.f.join(' ')}" data-name="${esc((p.n + ' ' + p.loc + ' ' + p.type + ' ' + p.area + ' ' + (p.dev || '')).toLowerCase())}">
  ${VP.img(p.pics[0], p.n).replace('</div>', alt + '</div>')}
  <span class="tag"><span>${esc(p.area)}</span>${p.hot ? `<em>${esc(p.hot)}</em>` : ''}</span>
  <span class="info"><b>${esc(p.n)}</b><small>${esc(p.type)}${p.units ? ' · ' + esc(p.units) : ''}</small>
  <span class="more"><span><p><span>${esc(p.loc.length > 34 ? p.area : p.loc)}</span><span>View${I.arrow}</span></p></span></span></span></a>`;
};

/* ---------------- theme ---------------- */
function setTheme(t) {
  document.documentElement.dataset.theme = t; store.set('vp-theme', t);
  const m = $('meta[name="theme-color"]'); if (m) m.content = t === 'light' ? '#f6f3ef' : '#0b0a0a';
  BG.theme && BG.theme(t);
}
VP.setTheme = setTheme;

/* ================================================================
   BACKGROUND — Three.js particle field that morphs per section
   ================================================================ */
const BG = VP.BG = {};
(() => {
  let THREE, renderer, scene, camera, group, geo, mat, N, aA, aB, rA, rB, seed;
  let cur = null, mixStart = 0, mixDur = 1700, mouseOn = 0, mouseOnT = 0, spinV = 0, autoSpin = 0, pulse = 0;
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 }, tgt = { x: 0, y: 0, s: 1, a: 1, rx: 0, ry: 0 }, st = { x: 0, y: 0, s: 1, a: 1, rx: 0, ry: 0 };
  let mouse3 = null, scr = null, logoPix = null;
  const cache = {};

  /* shape kit: sample primitives by weight, add dust, rotate */
  function Kit(n) {
    const P = new Float32Array(n * 3), R = new Float32Array(n); let i = 0;
    const K = {
      P, R, get i() { return i; },
      push(x, y, z, r) { if (i >= n) return; P[i * 3] = x; P[i * 3 + 1] = y; P[i * 3 + 2] = z; R[i] = r; i++; },
      rot(rx, ry, rz) {
        const cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry), cz = Math.cos(rz), sz = Math.sin(rz);
        for (let k = 0; k < i; k++) {
          let x = P[k * 3], y = P[k * 3 + 1], z = P[k * 3 + 2], t;
          t = y * cx - z * sx; z = y * sx + z * cx; y = t;
          t = x * cy + z * sy; z = -x * sy + z * cy; x = t;
          t = x * cz - y * sz; y = x * sz + y * cz; x = t;
          P[k * 3] = x; P[k * 3 + 1] = y; P[k * 3 + 2] = z;
        } return K;
      },
      dust(frac = .1) { const m = Math.floor(n * frac); for (let k = 0; k < m; k++) K.push((Math.random() - .5) * 15, (Math.random() - .5) * 9, (Math.random() - .5) * 6, 3); return K; },
      /* weighted primitives: [{w, f:()=>[x,y,z], r}] */
      sample(prims, count) {
        const tot = prims.reduce((a, p) => a + p.w, 0);
        for (let k = 0; k < count; k++) {
          let q = Math.random() * tot, p = prims[0];
          for (const pr of prims) { q -= pr.w; if (q <= 0) { p = pr; break; } }
          const v = p.f(); K.push(v[0], v[1], v[2], typeof p.r === 'function' ? p.r() : p.r);
        } return K;
      },
      fill() { while (i < n) { const k = (Math.random() * Math.max(1, i)) | 0; K.push(P[k * 3] + (Math.random() - .5) * .05, P[k * 3 + 1] + (Math.random() - .5) * .05, P[k * 3 + 2], R[k]); } return K; }
    };
    return K;
  }
  const J = (a = .03) => (Math.random() - .5) * a;
  const seg = (a, b, w, r, jit = .03) => ({ w, r, f: () => { const t = Math.random(); return [a[0] + (b[0] - a[0]) * t + J(jit), a[1] + (b[1] - a[1]) * t + J(jit), a[2] + (b[2] - a[2]) * t + J(jit)]; } });
  const ring = (c, rad, w, r, axis = 'z', jit = .03) => ({ w, r, f: () => { const t = Math.random() * 6.2832, u = Math.cos(t) * rad, v = Math.sin(t) * rad; return axis === 'z' ? [c[0] + u + J(jit), c[1] + v + J(jit), c[2] + J(jit)] : [c[0] + u + J(jit), c[1] + J(jit), c[2] + v + J(jit)]; } });
  function boxEdges(x, y, z, w, h, d, wt, r) {
    const p = [[x, y, z], [x + w, y, z], [x + w, y + h, z], [x, y + h, z], [x, y, z + d], [x + w, y, z + d], [x + w, y + h, z + d], [x, y + h, z + d]];
    const E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    return E.map(([a, b]) => { const L = Math.hypot(p[b][0] - p[a][0], p[b][1] - p[a][1], p[b][2] - p[a][2]); return seg(p[a], p[b], wt * L, r, .02); });
  }

  const SHAPES = {
    cloud(n) { const K = Kit(n); K.sample([{ w: 1, r: () => Math.random() < .15 ? 1 : (Math.random() < .5 ? 0 : 2), f: () => { const r = Math.pow(Math.random(), .55) * 4.6, arm = ((Math.random() * 3) | 0) * 2.094, a = arm + r * 1.15 + J(.6); return [Math.cos(a) * r, J(.35) * (1.2 - r / 5), Math.sin(a) * r]; } }], n * .9); K.dust(.1); K.rot(.45, 0, .12); return K.fill(); },
    logo(n) {
      const K = Kit(n);
      if (logoPix && logoPix.length) {
        const m = Math.floor(n * .9);
        for (let k = 0; k < m; k++) {
          const q = logoPix[(Math.random() * logoPix.length) | 0];
          const z = (Math.random() - .5) * .5;
          K.push(q[0] + J(.05), q[1] + J(.05), z, q[2] === 0 ? (Math.random() < .22 ? 1 : 0) : 2);
        }
      } else return SHAPES.house(n);
      K.dust(.1); return K.fill();
    },
    skyline(n) {
      const K = Kit(n), prims = [], T = [[-4.6, .9, 2.2], [-3.5, 1.1, 3.6], [-2.2, .9, 2.6], [-1.1, 1.2, 4.6], [.3, 1, 3.2], [1.5, 1.3, 5.2], [3, .9, 2.8], [4.1, 1, 3.9]];
      T.forEach(([x, w, h]) => {
        const y = -2.6, z = -.5, d = .9;
        prims.push(...boxEdges(x, y, z, w, h, d, 1.2, 2));
        prims.push({ w: w * h * 2.2, r: () => Math.random() < .3 ? 1 : 0, f: () => { const c = ((Math.random() * Math.max(2, Math.round(w * 4))) | 0) + .5, rr = ((Math.random() * Math.round(h * 4)) | 0) + .5; return [x + c * w / Math.max(2, Math.round(w * 4)) + J(.02), y + rr * h / Math.round(h * 4) + J(.02), z + d + .01]; } });
      });
      prims.push(seg([-6, -2.6, .4], [6, -2.6, .4], 3, 2, .05));
      K.sample(prims, n * .9); K.dust(.1); K.rot(.08, -.32, 0); return K.fill();
    },
    house(n) {
      const K = Kit(n), w = 4.2, h = 2.6, d = 2.4, x = -w / 2, y = -2.2, z = -d / 2, top = y + h, peak = top + 1.8;
      const prims = [...boxEdges(x, y, z, w, h, d, 1.4, 2),
        seg([x, top, z], [0, peak, z], 2.2, 0), seg([x + w, top, z], [0, peak, z], 2.2, 0), seg([x, top, z + d], [0, peak, z + d], 2.2, 0), seg([x + w, top, z + d], [0, peak, z + d], 2.2, 0), seg([0, peak, z], [0, peak, z + d], 1.4, 0),
        { w: 6, r: () => Math.random() < .25 ? 1 : 0, f: () => { const t = Math.random(), s = Math.random(), L = Math.random() < .5; const ex = L ? x + (0 - x) * t : (x + w) + (0 - (x + w)) * t; return [ex, top + (peak - top) * t + J(.02), z + s * d]; } },
        ...boxEdges(-.45, y, z + d, .9, 1.5, 0, 1.4, 1), ...boxEdges(x + .45, y + 1.1, z + d, .8, .8, 0, 1.4, 1), ...boxEdges(x + w - 1.25, y + 1.1, z + d, .8, .8, 0, 1.4, 1),
        ring([0, y, 0], 3.6, 3, 2, 'y', .04), ring([0, y, 0], 4.4, 2, 3, 'y', .04)];
      K.sample(prims, n * .9); K.dust(.1); K.rot(.18, -.55, 0); return K.fill();
    },
    key(n) {
      const K = Kit(n), cx = -2.4;
      const prims = [ring([cx, 0, 0], 1.35, 6, 0), ring([cx, 0, 0], .55, 2.6, 1), ring([cx, 0, 0], 1.0, 2, 2),
        seg([cx + 1.35, .18, 0], [3.4, .18, 0], 4, 0), seg([cx + 1.35, -.18, 0], [3.4, -.18, 0], 4, 0), seg([3.4, .18, 0], [3.4, -.18, 0], .4, 0),
        ...[[1.3, .8], [2.1, .6], [2.8, .9]].flatMap(([tx, th]) => [seg([tx, -.18, 0], [tx, -.18 - th, 0], 1, 1), seg([tx + .35, -.18, 0], [tx + .35, -.18 - th, 0], 1, 1), seg([tx, -.18 - th, 0], [tx + .35, -.18 - th, 0], .5, 1)])];
      K.sample(prims, n * .9); K.dust(.1); K.rot(.25, -.35, -.18); return K.fill();
    },
    pin(n) {
      const K = Kit(n), cy = .9, R = 1.6, tip = -2.1;
      const prims = [{ w: 9, r: 0, f: () => { const a = Math.random() * 6.2832; if (Math.sin(a) < -.6) return [Math.cos(a) * R, cy + Math.sin(a) * R, J(.05)]; return [Math.cos(a) * R + J(.03), cy + Math.sin(a) * R + J(.03), J(.05)]; } },
        seg([-R * .8, cy - R * .6, 0], [0, tip, 0], 3, 0), seg([R * .8, cy - R * .6, 0], [0, tip, 0], 3, 0),
        ring([0, cy, 0], .62, 3, 1), ring([0, tip - .2, 0], 1.1, 2.4, 2, 'y'), ring([0, tip - .2, 0], 2.0, 2.4, 2, 'y'), ring([0, tip - .2, 0], 3.0, 2.4, 3, 'y')];
      K.sample(prims, n * .9); K.dust(.1); K.rot(.15, 0, 0); return K.fill();
    },
    plan(n) {
      const K = Kit(n), L = [[-4, -2.6, 4, -2.6], [4, -2.6, 4, 2.6], [4, 2.6, -4, 2.6], [-4, 2.6, -4, -2.6], [-1, -2.6, -1, .4], [-1, 1.4, -1, 2.6], [-4, .2, -1, .2], [1.5, 2.6, 1.5, -.4], [1.5, -1.4, 1.5, -2.6], [1.5, .6, 4, .6]];
      const prims = L.map(([a, b, c, e]) => seg([a, b, 0], [c, e, 0], Math.hypot(c - a, e - b) * 1.4, 2, .025));
      L.slice(0, 4).forEach(([a, b, c, e]) => { const nx = (e - b) ? .12 : 0, ny = (c - a) ? .12 : 0; prims.push(seg([a + nx * Math.sign(a || 1) * 0, b - ny * Math.sign(b), 0], [c, e - ny * Math.sign(e), 0], Math.hypot(c - a, e - b) * .6, 0, .02)); });
      prims.push({ w: 4, r: 1, f: () => { const a = Math.random() * 1.5708; return [-1 + Math.cos(a) * 1, .4 + Math.sin(a) * 1, 0]; } }, { w: 4, r: 1, f: () => { const a = Math.random() * 1.5708; return [1.5 - Math.sin(a) * 1, -.4 - Math.cos(a) * 1, 0]; } });
      prims.push({ w: 6, r: 3, f: () => [-4 + ((Math.random() * 17) | 0) * .5, -2.6 + ((Math.random() * 11) | 0) * .52, J(.02)] });
      K.sample(prims, n * .9); K.dust(.1); K.rot(-.75, .3, .05); return K.fill();
    },
    globe(n) {
      const K = Kit(n), R = 2.9, prims = [];
      for (let k = -2; k <= 2; k++) { const lat = k * .52, r = R * Math.cos(lat); prims.push({ w: r, r: k === 0 ? 0 : 2, f: () => { const a = Math.random() * 6.2832; return [Math.cos(a) * r, R * Math.sin(lat), Math.sin(a) * r]; } }); }
      for (let k = 0; k < 6; k++) { const lo = k * .5236; prims.push({ w: R, r: k % 2 ? 2 : 0, f: () => { const a = Math.random() * 6.2832; return [R * Math.cos(a) * Math.cos(lo), R * Math.sin(a), R * Math.cos(a) * Math.sin(lo)]; } }); }
      prims.push({ w: 4, r: 1, f: () => { const a = Math.random() * 6.2832, rr = R + .9 + J(.08); return [Math.cos(a) * rr, Math.sin(a) * rr * .26, Math.sin(a) * rr]; } });
      K.sample(prims, n * .9); K.dust(.1); K.rot(.35, 0, -.25); return K.fill();
    },
    wave(n) {
      const K = Kit(n);
      K.sample([{ w: 1, r: () => Math.random() < .2 ? 1 : (Math.random() < .55 ? 0 : 2), f: () => { const x = (Math.random() - .5) * 13, z = (Math.random() - .5) * 7, gx = Math.round(x * 3) / 3; return [gx + J(.02), Math.sin(gx * .9 + z * .7) * .45 + Math.cos(z * 1.3) * .25 - .6, z]; } }], n * .9);
      K.dust(.1); K.rot(.38, 0, 0); return K.fill();
    }
  };
  function getShape(k) { if (!cache[k]) { const K = (SHAPES[k] || SHAPES.cloud)(N); cache[k] = { P: K.P, R: K.R }; } return cache[k]; }

  const VS = `attribute vec3 aA; attribute vec3 aB; attribute float aRA; attribute float aRB; attribute float aSeed;
uniform float uT,uMix,uSize,uPR,uMR,uPulse,uScatter,uAlpha,uMOn; uniform vec3 uMouse,uC0,uC1,uC2,uC3;
varying vec3 vCol; varying float vA;
vec3 pal(float r){ return r<.5?uC0:(r<1.5?uC1:(r<2.5?uC2:uC3)); }
float ease(float t){ return t<.5?4.*t*t*t:1.-pow(-2.*t+2.,3.)/2.; }
void main(){
  float m=ease(clamp(uMix*1.45-aSeed*.45,0.,1.));
  vec3 p=mix(aA,aB,m); float tr=sin(m*3.14159);
  p+=vec3(sin(aSeed*41.+uT*.9),cos(aSeed*33.+uT*.7),sin(aSeed*27.+uT*.8))*tr*uScatter;
  p+=vec3(sin(uT*.6+aSeed*6.28),cos(uT*.5+aSeed*5.1),sin(uT*.4+aSeed*3.7))*.024;
  vec2 dm=p.xy-uMouse.xy; float dist=length(dm); float f=smoothstep(uMR,0.,dist)*uMOn;
  p.xy+=normalize(dm+vec2(1e-4))*f*.65; p.z+=f*.9;
  p*=1.+uPulse*(.12+.08*sin(aSeed*20.));
  vec4 mv=modelViewMatrix*vec4(p,1.); gl_Position=projectionMatrix*mv;
  gl_PointSize=uSize*(.5+aSeed*.95)*(1.+f*1.5)*uPR*(10./-mv.z);
  vCol=mix(pal(aRA),pal(aRB),m)+f*.25;
  float tw=.78+.22*sin(uT*1.6+aSeed*31.);
  float dust=(mix(aRA,aRB,m)>2.5)?.5:1.;
  vA=uAlpha*tw*dust;
}`;
  const FS = `varying vec3 vCol; varying float vA; void main(){ vec2 c=gl_PointCoord-.5; float r=length(c); if(r>.5) discard; float a=pow(smoothstep(.5,0.,r),1.25); gl_FragColor=vec4(vCol,a*vA); }`;

  function readPal() {
    const cs = getComputedStyle(document.documentElement);
    return ['--p0', '--p1', '--p2', '--p3'].map(v => cs.getPropertyValue(v).split(',').map(Number));
  }
  function loadLogo() {
    return new Promise(res => {
      const src = window.VP_LOGO_SRC; if (!src) return res();
      const im = new Image(); im.onload = () => {
        try {
          const c = document.createElement('canvas'), w = im.width, h = im.height; c.width = w; c.height = h;
          const x = c.getContext('2d'); x.drawImage(im, 0, 0); const d = x.getImageData(0, 0, w, h).data, out = [];
          const sc = 5.4 / h;
          for (let y = 0; y < h; y++) for (let xx = 0; xx < w; xx++) {
            const i = (y * w + xx) * 4, r = d[i], g = d[i + 1], b = d[i + 2]; if (d[i + 3] < 140) continue;
            let role = -1; if (r > 150 && g < 100 && b < 100) role = 0; else if (r + g + b < 200) role = 2;
            if (role >= 0) out.push([(xx - w / 2) * sc, -(y - h / 2) * sc, role]);
          }
          logoPix = out;
        } catch (e) { }
        res();
      }; im.onerror = () => res(); im.src = src;
    });
  }

  BG.init = async function () {
    const canvas = $('#bg3d'); THREE = window.THREE;
    if (!canvas || !THREE || RM) { document.documentElement.classList.add('no3d'); return; }
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' }); }
    catch (e) { document.documentElement.classList.add('no3d'); return; }
    await loadLogo();
    const mob = MOB();
    N = mob ? 6000 : (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4 ? 9000 : 14000);
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mob ? 1.5 : 1.6));
    scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, .1, 100); camera.position.z = 10;
    group = new THREE.Group(); scene.add(group);
    geo = new THREE.BufferGeometry();
    const s0 = getShape('cloud');
    aA = new Float32Array(s0.P); aB = new Float32Array(s0.P); rA = new Float32Array(s0.R); rB = new Float32Array(s0.R);
    seed = new Float32Array(N); for (let i = 0; i < N; i++) seed[i] = Math.random();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    geo.setAttribute('aA', new THREE.BufferAttribute(aA, 3)); geo.setAttribute('aB', new THREE.BufferAttribute(aB, 3));
    geo.setAttribute('aRA', new THREE.BufferAttribute(rA, 1)); geo.setAttribute('aRB', new THREE.BufferAttribute(rB, 1));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50);
    const V3 = () => ({ value: new THREE.Vector3() });
    mat = new THREE.ShaderMaterial({
      vertexShader: VS, fragmentShader: FS, transparent: true, depthWrite: false, depthTest: false,
      uniforms: { uT: { value: 0 }, uMix: { value: 1 }, uSize: { value: 3 }, uPR: { value: renderer.getPixelRatio() }, uMR: { value: 1.3 }, uPulse: { value: 0 }, uScatter: { value: .9 }, uAlpha: { value: .9 }, uMOn: { value: 0 }, uMouse: { value: new THREE.Vector3(99, 99, 0) }, uC0: V3(), uC1: V3(), uC2: V3(), uC3: V3() }
    });
    const pts = new THREE.Points(geo, mat); pts.frustumCulled = false; group.add(pts);
    BG.theme(document.documentElement.dataset.theme || 'dark');
    resize(); addEventListener('resize', resize);
    addEventListener('pointermove', e => { ptr.tx = e.clientX / innerWidth * 2 - 1; ptr.ty = e.clientY / innerHeight * 2 - 1; mouseOnT = e.pointerType === 'mouse' ? 1 : .6; scr = [e.clientX, e.clientY]; }, { passive: true });
    document.addEventListener('mouseleave', () => { mouseOnT = 0; });
    addEventListener('touchend', () => { mouseOnT = 0; }, { passive: true });
    let ly = scrollY; addEventListener('scroll', () => { spinV += (scrollY - ly) * .00018; ly = scrollY; }, { passive: true });
    BG.ready = true; canvas.classList.add('on');
    watch(); loop();
  };
  function resize() { if (!renderer) return; renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); if (mat) mat.uniforms.uPR.value = renderer.getPixelRatio(); if (BG._last) place(BG._last.o); }
  BG.theme = function (t) {
    if (!mat) return;
    readPal().forEach((c, i) => mat.uniforms['uC' + i].value.set(c[0], c[1], c[2]));
    mat.blending = t === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending;
    mat.uniforms.uSize.value = t === 'light' ? 2.7 : 3;
    BG._ab = t === 'light' ? .75 : 1; mat.needsUpdate = true;
  };
  function place(o) {
    o = o || {}; const halfH = Math.tan(camera.fov * Math.PI / 360) * camera.position.z, halfW = halfH * camera.aspect, mob = MOB();
    const fit = Math.min(1, halfW / 4.8);
    tgt.x = (mob ? (o.mx || 0) : (o.x || 0)) * halfW;
    const hw = 3.6 * (o.s || 1) * (mob ? (o.ms || .66) : fit), room = halfW - hw * .9; if (room > 0 && Math.abs(tgt.x) > room) tgt.x = Math.sign(tgt.x) * room;
    tgt.y = (mob ? (o.my != null ? o.my : (o.y || 0)) : (o.y || 0)) * halfH;
    tgt.s = (o.s || 1) * (mob ? (o.ms || .66) : fit); tgt.rx = o.rx || 0; tgt.ry = o.ry || 0;
    tgt.a = (o.a == null ? 1 : o.a) * (mob ? (o.ma == null ? .45 : o.ma) : 1); autoSpin = o.spin || 0;
  }
  BG.morph = function (key, o) {
    if (!BG.ready) return; BG._last = { key, o }; place(o); if (key === cur) return;
    const m = mat.uniforms.uMix.value;
    for (let i = 0; i < N; i++) {
      const mm = ease(Math.min(1, Math.max(0, m * 1.45 - seed[i] * .45)));
      aA[i * 3] += (aB[i * 3] - aA[i * 3]) * mm; aA[i * 3 + 1] += (aB[i * 3 + 1] - aA[i * 3 + 1]) * mm; aA[i * 3 + 2] += (aB[i * 3 + 2] - aA[i * 3 + 2]) * mm;
      rA[i] = mm > .5 ? rB[i] : rA[i];
    }
    const s = getShape(key); aB.set(s.P); rB.set(s.R);
    ['aA', 'aB', 'aRA', 'aRB'].forEach(a => geo.attributes[a].needsUpdate = true);
    mat.uniforms.uMix.value = 0; mixStart = performance.now(); mixDur = (o && o.dur) || 1800; cur = key; pulse = .6;
  };
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  BG.pulse = () => { pulse = 1; };
  function watch() {
    const els = $$('[data-shape]'); if (!els.length) return;
    const opt = el => { const o = {}; ['x', 'y', 's', 'mx', 'my', 'ms', 'a', 'ma', 'spin', 'rx', 'ry'].forEach(k => { const v = el.getAttribute('data-shape-' + k); if (v != null) o[k] = parseFloat(v); }); return o; };
    const go = el => BG.morph(el.dataset.shape, opt(el));
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) go(en.target); }), { rootMargin: '-45% 0px -45% 0px' });
    els.forEach(e => io.observe(e)); setTimeout(() => { if (!BG._last) go(els[0]); }, 150);
  }
  function setMouse(cx, cy) {
    const v = new THREE.Vector3(cx / innerWidth * 2 - 1, -(cy / innerHeight) * 2 + 1, .5).unproject(camera);
    const dir = v.sub(camera.position).normalize(), t = -camera.position.z / dir.z;
    const w = camera.position.clone().add(dir.multiplyScalar(t)); group.updateMatrixWorld(); mouse3 = group.worldToLocal(w);
  }
  let t0 = performance.now(), last = t0;
  function loop() {
    requestAnimationFrame(loop); if (document.hidden) return;
    const now = performance.now(), dt = Math.min(.05, (now - last) / 1000); last = now;
    const u = mat.uniforms; u.uT.value = (now - t0) / 1000;
    if (u.uMix.value < 1) u.uMix.value = Math.min(1, (now - mixStart) / mixDur);
    const k = 1 - Math.pow(.0016, dt);
    ['x', 'y', 's', 'a', 'rx', 'ry'].forEach(p => st[p] += (tgt[p] - st[p]) * k * .9);
    ptr.x += (ptr.tx - ptr.x) * k; ptr.y += (ptr.ty - ptr.y) * k;
    mouseOn += (mouseOnT - mouseOn) * k; u.uMOn.value = mouseOn;
    spinV *= Math.pow(.05, dt); pulse *= Math.pow(.04, dt); u.uPulse.value = pulse;
    group.position.set(st.x, st.y, 0); group.scale.setScalar(st.s);
    group.rotation.y += (autoSpin * dt) + spinV;
    if (!autoSpin) group.rotation.y += ((ptr.x * .22 + st.ry) - group.rotation.y) * k * .6;
    group.rotation.x += ((-ptr.y * .12 + st.rx) - group.rotation.x) * k * .6;
    u.uAlpha.value = .9 * st.a * (BG._ab || 1);
    if (scr) setMouse(scr[0], scr[1]); if (mouse3) u.uMouse.value.copy(mouse3);
    renderer.render(scene, camera);
  }
})();



/* ================================================================
   Stage: giant word rising behind a building that constructs itself
   markup: .stage > .sky .stars .word>span .glow .tower>(img.t-bp img.t-real .t-scan img.t-xray) .ground
   ================================================================ */
VP.stage = (st, opt = {}) => {
  if (!st) return;
  const tw = $('.tower', st), dur = opt.dur || 3200, onProg = opt.onProgress || (() => {});
  const wsp = $('.word span', st);
  const fit = () => { if (!wsp) return; wsp.style.fontSize = '200px'; const w = wsp.getBoundingClientRect().width / (wsp.getBoundingClientRect().width ? 1 : 1); const target = st.clientWidth * (opt.fit || .94); wsp.style.fontSize = Math.min(opt.max || 520, 200 * target / Math.max(1, wsp.scrollWidth)) + 'px'; };
  fit(); document.fonts && document.fonts.ready.then(fit); addEventListener('resize', fit);
  st._fit = fit;
  const set = (k, v) => st.style.setProperty(k, v);
  const run = () => {
    if (RM) { st.classList.add('go'); set('--bp', 1); set('--build', 1); set('--bp-o', 0); st.classList.add('built'); onProg(1); return; }
    const t0 = performance.now();
    st.classList.add('go');
    const tick = t => {
      const e = t - t0, bp = clamp(e / (dur * .42), 0, 1), b = clamp((e - dur * .3) / (dur * .7), 0, 1);
      const eo = x => 1 - Math.pow(1 - x, 3);
      set('--bp', eo(bp).toFixed(4)); set('--build', eo(b).toFixed(4)); onProg(e / dur);
      if (b < 1) requestAnimationFrame(tick); else { set('--bp-o', 0); st.classList.add('built'); onProg(1); }
    };
    requestAnimationFrame(tick);
  };
  /* wait for the two tower images */
  const imgs = $$('.t-bp,.t-real', st);
  Promise.all(imgs.map(im => im.complete ? 1 : new Promise(r => { im.onload = im.onerror = r; }))).then(() => setTimeout(run, opt.delay || 250));
  /* parallax + x-ray lens */
  if (FINE && !RM) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf;
    st.addEventListener('pointermove', e => {
      const r = st.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - .5; ty = (e.clientY - r.top) / r.height - .5;
      if (tw) { const tr = tw.getBoundingClientRect(); set('--lx', (e.clientX - tr.left) + 'px'); set('--ly', (e.clientY - tr.top) + 'px'); }
      if (!raf) raf = requestAnimationFrame(loop);
    });
    st.addEventListener('pointerleave', () => { tx = ty = 0; if (!raf) raf = requestAnimationFrame(loop); });
    function loop() { cx += (tx - cx) * .08; cy += (ty - cy) * .08; set('--px', cx.toFixed(4)); set('--py', cy.toFixed(4)); raf = (Math.abs(tx - cx) + Math.abs(ty - cy) > .001) ? requestAnimationFrame(loop) : null; }
  }
  /* scroll: the word keeps rising as the stage scrolls away */
  if (!RM) {
    const sc = () => { const r = st.getBoundingClientRect(), p = clamp(-r.top / Math.max(1, r.height), 0, 1); set('--lift', (p * 38).toFixed(2)); };
    addEventListener('scroll', sc, { passive: true }); sc();
  }
};

/* ================================================================
   Scroll-built tower (pinned): progress 0→1 drives --build
   ================================================================ */
VP.scrollBuild = (sec, onProg) => {
  if (!sec) return;
  const st = $('.stage', sec);
  const upd = () => {
    const r = sec.getBoundingClientRect(), total = r.height - innerHeight;
    const p = clamp(-r.top / Math.max(1, total), 0, 1);
    const bp = clamp(p / .35, 0, 1), b = clamp((p - .12) / .78, 0, 1);
    st.style.setProperty('--bp', bp.toFixed(4)); st.style.setProperty('--build', b.toFixed(4));
    st.style.setProperty('--bp-o', b >= 1 ? 0 : 1); st.classList.toggle('built', b >= 1);
    onProg && onProg(p, b);
  };
  addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
};

/* ================================================================
   Rails: drag to scroll, arrows, progress bar
   ================================================================ */
VP.rail = (rail, ctl) => {
  if (!rail) return;
  const bar = ctl && $('.rail-bar i', ctl), prev = ctl && $('[data-prev]', ctl), next = ctl && $('[data-next]', ctl);
  const step = () => { const c = rail.children[0]; return c ? c.getBoundingClientRect().width + 16 : 300; };
  const upd = () => { const max = rail.scrollWidth - rail.clientWidth; const p = max > 0 ? rail.scrollLeft / max : 1;
    if (bar) bar.style.transform = `scaleX(${clamp(rail.clientWidth / rail.scrollWidth + p * (1 - rail.clientWidth / rail.scrollWidth), .08, 1)})`;
    if (prev) prev.disabled = rail.scrollLeft < 4; if (next) next.disabled = rail.scrollLeft > max - 4; };
  rail.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); setTimeout(upd, 100);
  prev && prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
  next && next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
  if (FINE) { let x0 = null, s0 = 0, moved = 0;
    rail.addEventListener('pointerdown', e => { if (e.button) return; x0 = e.clientX; s0 = rail.scrollLeft; moved = 0; });
    addEventListener('pointermove', e => { if (x0 == null) return; const dx = e.clientX - x0; if (Math.abs(dx) > 6) { moved = 1; rail.classList.add('drag'); } if (moved) rail.scrollLeft = s0 - dx; });
    addEventListener('pointerup', () => { if (x0 == null) return; x0 = null; setTimeout(() => rail.classList.remove('drag'), 0); });
    rail.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = 0; } }, true);
  }
};

/* ================================================================
   Lightbox
   ================================================================ */
VP.lightbox = (items, start = 0) => {
  let lb = $('.vlb');
  if (!lb) {
    lb = document.createElement('div'); lb.className = 'vlb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML = `<div class="vlb-top"><span class="vlb-cnt"></span><a class="btn btn-glass btn-sm vlb-go" data-i="arrow" style="display:none">View project</a><button class="ib vlb-x" aria-label="Close viewer">${I.x}</button></div>
      <button class="ib nav-arr vlb-p" aria-label="Previous photo">${I.left}</button><figure class="vlb-f"><img alt=""><figcaption></figcaption></figure><button class="ib nav-arr vlb-n" aria-label="Next photo">${I.arrow}</button><div class="vlb-th"></div>`;
    document.body.appendChild(lb); enhanceButtons(lb);
  }
  let i = start; const img = $('.vlb-f img', lb), cap = $('figcaption', lb), th = $('.vlb-th', lb), go = $('.vlb-go', lb);
  th.innerHTML = items.length > 1 ? items.map((it, j) => `<button data-j="${j}" aria-label="Photo ${j + 1}">${VP.rawImg(it, '')}</button>`).join('') : '';
  wireImgs(th);
  const show = () => {
    const it = items[i]; img.classList.remove('in');
    img.onerror = () => { if (it.fb && img.src !== it.fb) img.src = it.fb; };
    img.onload = () => img.classList.add('in'); img.src = it.src; img.alt = it.cap || '';
    cap.textContent = it.cap || ''; $('.vlb-cnt', lb).textContent = `${String(i + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    if (it.href) { go.style.display = ''; go.href = it.href; } else go.style.display = 'none';
    $$('button', th).forEach((b, j) => b.classList.toggle('on', j === i)); const cur = $$('button', th)[i]; cur && cur.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  };
  const mv = d => { i = (i + d + items.length) % items.length; show(); };
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; removeEventListener('keydown', key); last && last.focus && last.focus(); };
  const key = e => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') mv(1); if (e.key === 'ArrowLeft') mv(-1); };
  const last = document.activeElement;
  $('.vlb-p', lb).onclick = () => mv(-1); $('.vlb-n', lb).onclick = () => mv(1); $('.vlb-x', lb).onclick = close;
  $('.vlb-p', lb).style.visibility = $('.vlb-n', lb).style.visibility = items.length > 1 ? '' : 'hidden';
  th.onclick = e => { const b = e.target.closest('button'); if (b) { i = +b.dataset.j; show(); } };
  lb.onclick = e => { if (e.target === lb || e.target.classList.contains('vlb-f')) close(); };
  let sx = null; lb.onpointerdown = e => sx = e.clientX; lb.onpointerup = e => { if (sx != null && Math.abs(e.clientX - sx) > 50) mv(e.clientX < sx ? 1 : -1); sx = null; };
  addEventListener('keydown', key);
  lb.classList.add('open'); document.body.style.overflow = 'hidden'; show(); setTimeout(() => $('.vlb-x', lb).focus(), 50);
};

/* ================================================================
   UI wiring
   ================================================================ */
function splitText(root = document) {
  $$('.split', root).forEach(el => {
    if (el.dataset.sp) return; el.dataset.sp = 1; let n = 0;
    const walk = node => [...node.childNodes].forEach(c => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(p => { if (!p) return; if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
          const o = document.createElement('span'); o.className = 'slw'; const s = document.createElement('span'); s.className = 'sw'; s.style.transitionDelay = (n++ * .05 + (+el.dataset.delay || 0)) + 's'; s.textContent = p; o.appendChild(s); frag.appendChild(o); });
        c.replaceWith(frag);
      } else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c);
    });
    walk(el);
  });
}
const rio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
document.addEventListener('dragstart', e => { if (e.target.closest && e.target.closest('.rail, .ring-stage, .mrail')) e.preventDefault(); });
VP.observe = (root = document) => $$('.rv:not(.in),.split:not(.in)', root).forEach(el => rio.observe(el));
const cio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; const el = e.target, to = +el.dataset.to, t0 = performance.now(), dur = RM ? 0 : 1500;
  const step = t => { const p = dur ? Math.min(1, (t - t0) / dur) : 1; el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4))); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step); cio.unobserve(el);
}), { threshold: .6 });

function interactions() {
  document.addEventListener('pointermove', e => {
    const s = e.target.closest && e.target.closest('[data-spot]');
    if (s) { const r = s.getBoundingClientRect(); s.style.setProperty('--mx', (e.clientX - r.left) + 'px'); s.style.setProperty('--my', (e.clientY - r.top) + 'px'); }
    if (!FINE || RM) return;
    const t = e.target.closest && e.target.closest('[data-tilt]');
    if (t && !t.closest('.rail.drag')) {
      const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height, a = +(t.dataset.tilt || 6);
      t.classList.add('tilting'); t.style.transform = `perspective(1200px) rotateY(${(x - .5) * a}deg) rotateX(${(.5 - y) * a}deg)`;
      if (!t._lv) { t._lv = 1; t.addEventListener('pointerleave', () => { t.classList.remove('tilting'); t.style.transform = ''; t._lv = 0; }, { once: true }); }
    }
  }, { passive: true });
}

function nav() {
  const n = $('.nav'), menu = $('.menu'), ind = $('.menu .ind'), prog = $('#progress'), drop = $('.drop'), page = document.body.dataset.page;
  $$('.menu a, .drop a.dl').forEach(a => { if (a.dataset.p === page) { a.classList.add('on'); a.setAttribute('aria-current', 'page'); } });
  const moveTo = a => { if (!a) { ind.style.opacity = 0; return; } const mr = menu.getBoundingClientRect(), r = a.getBoundingClientRect(); ind.style.opacity = 1; ind.style.width = r.width + 'px'; ind.style.transform = `translateX(${r.left - mr.left - 4}px)`; };
  if (menu) { $$('.menu a').forEach(a => a.addEventListener('mouseenter', () => moveTo(a))); menu.addEventListener('mouseleave', () => moveTo($('.menu a.on'))); setTimeout(() => moveTo($('.menu a.on')), 80); document.fonts && document.fonts.ready.then(() => moveTo($('.menu a.on'))); addEventListener('resize', () => moveTo($('.menu a.on'))); }
  let ly = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    if (!n.classList.contains('open')) { if (y > innerHeight * .7 && y > ly + 4) n.classList.add('hide'); else if (y < ly - 4) n.classList.remove('hide'); }
    document.body.classList.toggle('nav-hidden', n.classList.contains('hide'));
    ly = y;
  }, { passive: true });
  const toggle = o => { n.classList.toggle('open', o); drop.classList.toggle('open', o); $('#menuBtn').setAttribute('aria-expanded', o); if (o) setTimeout(() => $('a', drop).focus(), 60); };
  $('#menuBtn').addEventListener('click', e => { e.stopPropagation(); toggle(!drop.classList.contains('open')); });
  document.addEventListener('click', e => { if (drop.classList.contains('open') && !e.target.closest('.drop')) toggle(false); });
  $('#themeBtn').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));
  addEventListener('keydown', e => { if (e.key === 'Escape') { toggle(false); chat.close(); } });
}

VP.toast = msg => { let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); } t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2400); };
VP.copy = async (txt, msg) => { try { await navigator.clipboard.writeText(txt); VP.toast(msg || 'Copied'); } catch (e) { VP.toast(txt); } };

/* ================================================================
   Assistant (keyword answers, WhatsApp hand-off) — compact panel
   ================================================================ */
const chat = VP.chat = {};
(() => {
  const P = D.P, find = s => P.find(p => p.s === s);
  const link = p => `<a href="project.html?p=${p.s}">Open ${esc(p.n)}</a>`;
  const KB = [
    [['hello', 'hi', 'salam', 'assalam', 'hey', 'aoa'], () => 'Hello. I can help with projects, areas, installment plans, site visits or our contact details. What are you looking for?'],
    [['office', 'address', 'location', 'where are you', 'kahan', 'visit you'], () => `Our office is at <b>${esc(D.C.addr)}</b>. <a href="${D.C.map}" target="_blank" rel="noopener">Open in Maps</a>`],
    [['phone', 'call', 'number', 'contact', 'reach'], () => `Call ${D.C.phones.map(p => `<a href="tel:${p[1]}">${p[0]}</a>`).join(', ')}, or email <a href="mailto:${D.C.email}">${D.C.email}</a>.`],
    [['email', 'mail'], () => `Email us at <a href="mailto:${D.C.email}">${D.C.email}</a>.`],
    [['whatsapp', 'message'], () => `WhatsApp us on <a href="${wa()}" target="_blank" rel="noopener">${D.C.waShow}</a>.`],
    [['installment', 'instalment', 'qist', 'payment plan', 'easy payment', 'monthly'], () => `Many of our projects offer installment or flexible payment plans, Paari Palace and Saima Greens among them. Plans vary by project, so tell me which one you like. ${link(find('paari-palace'))}`],
    [['price', 'cost', 'rate', 'how much', 'budget', 'kitne', 'qeemat'], () => 'Prices change often, so we share them directly to keep them accurate. Send us the project name and your budget and we\'ll send current rates.'],
    [['sea', 'beach', 'waterfront', 'marina', 'dha', 'phase 8', 'phase viii'], () => `On the DHA Phase VIII seafront: <b>Saima Waterfront</b> (40 storeys, 1 to 4 bed) and <b>Saima Marina Residence</b> (41 storeys, 1 to 4 bed). ${link(find('saima-waterfront'))}`],
    [['jinnah', 'university road', 'airport', 'malir'], () => `Along Jinnah Avenue and University Road: <b>Roomi Icon</b>, <b>Roomi Towers</b>, <b>Saima Jinnah Mall & Residence</b> and <b>Saima Meadow Avenue</b>. ${link(find('roomi-icon'))}`],
    [['super highway', 'm9', 'm-9', 'highway', 'baqai', 'toll', 'motorway'], () => `On the M-9: <b>Paari Palace</b> (six gated towers, 3 to 6 rooms, installments) and <b>Roomi City</b> (residential plots at Exit 7). ${link(find('paari-palace'))}`],
    [['north nazimabad', 'nazimabad', 'saars tower', '320'], () => `In North Nazimabad: <b>Saars Tower</b>, <b>Saima Premium Empire</b>, <b>Saima Paari Excellency</b> (pre-launch) and <b>E Square</b> offices. ${link(find('saars-tower'))}`],
    [['civil lines', 'saars 3', 'karachi club'], () => `<b>SAARS 3</b> is a Ground + 44 tower in Civil Lines with 3 to 6 bed lounge apartments. ${link(find('saars-3'))}`],
    [['plot', 'land', 'build my own', 'roomi city'], () => `For plots, see <b>Roomi City</b>, an upcoming community at M-9 Exit 7 next to Saima Mid-town. ${link(find('roomi-city'))}`],
    [['shop', 'commercial', 'mall', 'office space', 'business', 'rental income'], () => 'For commercial and mixed-use: <b>Saima Jinnah Mall & Residence</b>, <b>Saima Mall & Residency</b>, <b>Saima Business Park</b>, <b>Saima Center Point</b> and <b>E Square</b>. <a href="projects.html#com">See commercial projects</a>'],
    [['pre-launch', 'prelaunch', 'pre launch', 'new launch', 'upcoming'], () => `Early-stage projects include <b>Saima Paari Excellency</b> (pre-launch), <b>Saima Center Point</b> (recently launched), and the upcoming <b>Roomi Icon</b>, <b>Roomi Towers</b> and <b>Roomi City</b>.`],
    [['pool', 'swimming', 'gym', 'sauna', 'jacuzzi', 'amenit', 'spa'], () => '<b>Saima Waterfront</b> has a pool, sauna, Jacuzzi and gym. <b>Roomi Icon</b> plans a pool, spa, yoga room and mini theatre. <b>Saars Tower</b> has a pool and fitness centre.'],
    [['sell', 'selling', 'sale my', 'list my'], () => 'Yes, we help owners sell faster and more economically, using digital marketing to reach qualified buyers. Send your property details to get started.'],
    [['rent', 'tenant', 'lease', 'kiraya'], () => 'We help with renting too. Tell us whether you\'re a tenant or an owner, plus the area and budget.'],
    [['invest', 'return', 'roi', 'profit'], () => 'We\'re an investment consulting firm as well as a marketing firm. Share your budget and time horizon and we\'ll give you honest options. We won\'t promise returns, but we will give you a clear picture.'],
    [['visit', 'site visit', 'see the site', 'showroom', 'tour'], () => 'Happy to arrange a site visit. Send us the project name and a suitable day.'],
    [['developer', 'builder', 'affiliat', 'partner', 'bahria', 'emaar', 'saima group'], () => 'Our affiliations include Bahria Town, Emaar, Saima Group, Roomi City, Paari Builders, DHA City, Gulmohar City and LIS Developers.'],
    [['all projects', 'list', 'projects', 'options'], () => `We have ${P.length} projects listed. <a href="projects.html">Browse all projects</a>`],
    [['thank', 'shukriya', 'thanks', 'jazak'], () => 'You\'re welcome. Anything else I can help with?']
  ];
  const SUG = ['Installment plans', 'Sea-facing apartments', 'Pre-launch projects', 'Plots', 'Office address'];
  let el, btn, msgs, greeted = false;
  const add = (html, who) => { const d = document.createElement('div'); d.className = 'm ' + who; d.innerHTML = html; msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; };
  const answer = q => {
    const s = q.toLowerCase(); let best = null, score = 0;
    KB.forEach(([keys, fn]) => { let sc = 0; keys.forEach(k => { if (s.includes(k)) sc += k.length; }); if (sc > score) { score = sc; best = fn; } });
    const pm = P.find(p => s.includes(p.n.toLowerCase())) || P.find(p => p.n.toLowerCase().split(' ').filter(w => w.length > 4 && s.includes(w)).length >= 2);
    if (pm && score < 8) return `<b>${esc(pm.n)}</b>, ${esc(pm.loc)}. ${esc(pm.d || 'Message us for availability, unit sizes and the current payment plan.')} ${link(pm)}`;
    if (best) return best();
    return `A member of our team can answer that properly. <a target="_blank" rel="noopener" href="${wa('Hi Vision Properties, ' + q)}">Ask on WhatsApp</a>`;
  };
  const ask = q => { q = q.trim(); if (!q) return; add(esc(q), 'u');
    const t = document.createElement('div'); t.className = 'm b'; t.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>'; msgs.appendChild(t); msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => { t.remove(); add(answer(q), 'b'); }, RM ? 50 : 600); };
  chat.open = () => { el.classList.add('open'); btn.classList.add('open', 'seen'); btn.setAttribute('aria-expanded', 'true'); el.setAttribute('aria-hidden', 'false'); store.set('vp-chat-seen', 1);
    if (!greeted) { greeted = true; add('Assalam-o-Alaikum. I\'m the Vision Properties assistant. Ask me about projects, areas, payment plans or our office.', 'b'); }
    setTimeout(() => $('#chatIn').focus(), 250); };
  chat.close = () => { if (!el) return; el.classList.remove('open'); btn.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); el.setAttribute('aria-hidden', 'true'); };
  chat.init = () => {
    el = $('.chat'); btn = $('.chat-btn'); msgs = $('.msgs');
    const zones = $$('.foot, #enquire, .enq, form.lead-form' + (MOB() ? ', .hero, .phero' : '')); const vis = new Set();
    if (zones.length) { const zo = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)); btn.classList.toggle('away', vis.size > 0); }, { threshold: .15 }); zones.forEach(z => zo.observe(z)); }
    if (store.get('vp-chat-seen')) btn.classList.add('seen');
    $('.sugg').innerHTML = SUG.map(s => `<button type="button">${s}</button>`).join('');
    $('.sugg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) ask(b.textContent); });
    $('.cf').addEventListener('submit', e => { e.preventDefault(); ask($('#chatIn').value); $('#chatIn').value = ''; });
    btn.addEventListener('click', () => el.classList.contains('open') ? chat.close() : chat.open());
    $$('[data-chat]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); chat.open(); }));
  };
})();

/* FAQ */
VP.faq = (target, list = D.FAQ) => {
  target.innerHTML = list.map((f, i) => `<div class="qa${i ? '' : ' open'}"><button aria-expanded="${!i}">${esc(f[0])}<i aria-hidden="true"></i></button><div class="a"><div><p>${esc(f[1])}</p></div></div></div>`).join('');
  $$('.qa', target).forEach(q => $('button', q).addEventListener('click', () => {
    const o = !q.classList.contains('open');
    $$('.qa', target).forEach(x => { x.classList.remove('open'); $('button', x).setAttribute('aria-expanded', 'false'); });
    if (o) { q.classList.add('open'); $('button', q).setAttribute('aria-expanded', 'true'); }
  }));
};

/* lead form → WhatsApp (shared by home, project, contact) */
VP.leadForm = (form, extra = () => []) => {
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const n = $('[name=name]', form), p = $('[name=phone]', form); let bad = false;
    [n, p].forEach(x => { x.removeAttribute('aria-invalid'); const m = x.parentNode.querySelector('.err-msg'); if (m) m.textContent = ''; });
    const fail = (x, msg) => { x.setAttribute('aria-invalid', 'true'); const m = x.parentNode.querySelector('.err-msg'); if (m) m.textContent = msg; if (!bad) x.focus(); bad = true; };
    if (!n.value.trim()) fail(n, 'Please add your name.');
    if (!/^[+\d][\d\s-]{6,}$/.test(p.value.trim())) fail(p, 'Please add a phone number we can call, e.g. 0300 1234567.');
    if (bad) return;
    const lines = ['Hi Vision Properties,', 'Name: ' + n.value.trim(), 'Phone: ' + p.value.trim()].concat(extra(form)).filter(Boolean);
    open(wa(lines.join('\n')), '_blank', 'noopener');
    const ok = $('.form-ok', form); if (ok) ok.hidden = false;
  });
};

/* ---------------- boot ---------------- */
VP.boot = pageInit => {
  try { pageInit && pageInit(); } catch (e) { console.error(e); }
  enhanceButtons(); splitText(); interactions(); nav(); chat.init();
  $$('.count').forEach(c => cio.observe(c));
  wireImgs(); VP.observe();
  $$('.yr').forEach(y => y.textContent = new Date().getFullYear());
  $$('[data-rail]').forEach(r => VP.rail(r, $(`[data-rail-ctl="${r.dataset.rail}"]`)));
  const ld = $('.loader'), done = () => { if (!ld || ld.classList.contains('done')) return; ld.classList.add('done'); document.body.classList.add('ready'); setTimeout(() => ld.remove(), 800); };
  if (document.readyState === 'complete') setTimeout(done, 200); else addEventListener('load', () => setTimeout(done, 150));
  setTimeout(done, 2600);
  const startBG = () => BG.init();
  if ('requestIdleCallback' in window) requestIdleCallback(startBG, { timeout: 1200 }); else setTimeout(startBG, 400);
};
})();
