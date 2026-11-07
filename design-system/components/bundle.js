/* No Babysitting · shared runtime for component previews.
   One classic script, no imports, no network. GSAP is optional at call time (window.gsap).
   window.NoBabysitting = { ascii, sources, colleague, decode, clock, cursorLabel, ... } */
(function () {
  'use strict';
  var NB = {};

  /* Glyph ramps. RAMP runs light -> dense and carries the brand's own letters (N B A Y S I T G),
     the way WRDLSS and Artefakt build density from their names. */
  NB.RAMP = ' ·:-=+/<>!?1ITN3S5YG8BA#@';
  NB.NOISE = '/\\|<>{}[]~^!?;:';
  NB.STRUCT = '─│┌┐└┘├┤';
  NB.COLORS = ['fg-subtle', 'fg-muted', 'fg', 'accent', 'signal', 'warn', 'danger', 'info', 'control', 'level-1', 'level-2', 'level-3', 'level-4', 'chart-1', 'faint'];
  var CI = {}; NB.COLORS.forEach(function (c, i) { CI[c] = i; }); NB.CI = CI;

  /* reduced motion = the OS setting or the in-page Motion switch (localStorage 'nb-motion' = 'off') */
  NB.reduce = function () {
    var off = false; try { off = window.localStorage.getItem('nb-motion') === 'off'; } catch (e) { /* storage blocked */ }
    return off || !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  };
  NB.tok = function (name) { var v = getComputedStyle(document.documentElement).getPropertyValue('--' + name).trim(); return v || '#888888'; };

  /* ---------- offscreen sampler: paint(g, W, H) in square pixel space, sample one point per cell ---------- */
  function sample(cols, rows, cw, ch, paint, lum) {
    var k = 3, W = Math.max(1, cols * k), H = Math.max(1, Math.round(rows * k * ch / cw));
    var c = document.createElement('canvas'); c.width = W; c.height = H;
    var g = c.getContext('2d'); paint(g, W, H);
    var d = g.getImageData(0, 0, W, H).data, n = cols * rows, cov = new Float32Array(n), rgb = new Uint8ClampedArray(n * 3), sy = H / rows;
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var px = Math.min(W - 1, Math.floor(x * k + k / 2)), py = Math.min(H - 1, Math.floor(y * sy + sy / 2));
        var o = (py * W + px) * 4, i = y * cols + x, r = d[o], gg = d[o + 1], b = d[o + 2], a = d[o + 3] / 255;
        if (lum) {
          var l = (0.2126 * r + 0.7152 * gg + 0.0722 * b) / 255;
          cov[i] = l * a;
          if (l < lum && l > 0) { var s = lum / l; r = Math.min(255, r * s); gg = Math.min(255, gg * s); b = Math.min(255, b * s); }
        } else { cov[i] = a; }
        rgb[i * 3] = r; rgb[i * 3 + 1] = gg; rgb[i * 3 + 2] = b;
      }
    }
    return { cov: cov, rgb: rgb };
  }

  /* value noise for textures */
  function hash(x, y, s) { var h = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453; return h - Math.floor(h); }
  function vnoise(x, y, s) {
    var xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    var a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, y, s) { return 0.55 * vnoise(x, y, s) + 0.3 * vnoise(x * 2.1, y * 2.1, s + 3) + 0.15 * vnoise(x * 4.3, y * 4.3, s + 7); }

  NB.sources = {
    /* wordmark in Archivo (expanded by default). Latin caps without diacritics. */
    text: function (lines, opt) {
      opt = opt || {};
      return function (cols, rows, cw, ch) {
        return sample(cols, rows, cw, ch, function (g, W, H) {
          var fam = opt.family || '"Archivo", "Arial Black", sans-serif', wt = opt.weight || 800, lh = opt.lh || 1.02;
          try { g.fontStretch = opt.stretch || 'expanded'; } catch (e) { /* older engines */ }
          g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle';
          g.font = wt + ' 100px ' + fam;
          var widest = Math.max.apply(null, lines.map(function (l) { return g.measureText(l).width; }));
          var size = Math.min((W * (opt.fill || 0.86) / widest) * 100, H * (opt.vfill || 0.78) / (lines.length * lh));
          g.font = wt + ' ' + size + 'px ' + fam;
          var cy = H * (opt.cy || 0.5);
          lines.forEach(function (l, i) { g.fillText(l, W / 2, cy + (i - (lines.length - 1) / 2) * size * lh); });
        });
      };
    },
    /* Aino-style symmetric sculpture: density falls left -> right inside the silhouette; words can be embedded in rows. */
    sculpture: function (opt) {
      opt = opt || {};
      return function (cols, rows) {
        var n = cols * rows, cov = new Float32Array(n), chars = new Array(n), color = new Int8Array(n).fill(-1);
        var sp = opt.vspan || [0, 1], y0 = Math.round(sp[0] * (rows - 1)), y1 = Math.round(sp[1] * (rows - 1));
        for (var y = y0; y <= y1; y++) {
          var v = (y - y0) / Math.max(1, y1 - y0);
          var w = (opt.min || 0.012) + (opt.amp || 0.34) * Math.pow(Math.abs(Math.sin(Math.PI * (v * (opt.lobes || 2) + (opt.phase || 0)))), opt.pow || 1.35);
          w = Math.max(0.006, w + (vnoise(v * 7, 1, opt.seed || 2) - 0.5) * (opt.wobble || 0));
          var L = 0.5 - w, R = 0.5 + w;
          for (var x = 0; x < cols; x++) {
            var u = (x + 0.5) / cols;
            if (u >= L && u <= R) cov[y * cols + x] = 0.1 + 0.9 * (1 - (u - L) / Math.max(1e-6, R - L));
          }
        }
        (opt.words || []).forEach(function (wd) {
          var y = Math.round((sp[0] + wd.at * (sp[1] - sp[0])) * (rows - 1)), x0 = Math.round(cols / 2 - wd.text.length / 2);
          for (var k = 0; k < wd.text.length; k++) {
            var i = y * cols + x0 + k; if (i < 0 || i >= n) continue;
            chars[i] = wd.text[k]; color[i] = CI[wd.color || 'fg']; if (cov[i] < 0.05) cov[i] = 0.06;
          }
        });
        return { cov: cov, chars: chars, color: color };
      };
    },
    /* WRDLSS-style terrain / cloud field, low key */
    terrain: function (opt) {
      opt = opt || {};
      return function (cols, rows) {
        var n = cols * rows, cov = new Float32Array(n), sc = opt.scale || 0.06, seed = opt.seed || 3, th = opt.threshold || 0.48;
        for (var i = 0; i < n; i++) {
          var x = i % cols, y = (i / cols) | 0;
          var f = fbm(x * sc, y * sc * 1.8, seed) + (opt.slope || 0) * (y / rows - 0.5);
          cov[i] = f > th ? Math.min(1, (f - th) / (1 - th) * 1.6) : 0;
        }
        return { cov: cov };
      };
    },
    /* a 1-bit bitmap (rows of '#'/'.', e.g. NB.LOGO.lg) fitted into the grid, square pixels.
       opt.fill: share of width it may take; opt.vfill: share of height; opt.cy: vertical centre (0..1). */
    bitmap: function (L, opt) {
      opt = opt || {};
      return function (cols, rows, cw, ch) {
        var n = cols * rows, cov = new Float32Array(n), W = cols * cw, H = rows * ch;
        var px = Math.min(W * (opt.fill || 0.84) / L.w, H * (opt.vfill || 0.42) / L.h);
        var ox = (W - L.w * px) / 2, oy = H * (opt.cy || 0.5) - L.h * px / 2;
        for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
          var bx = Math.floor(((x + 0.5) * cw - ox) / px), by = Math.floor(((y + 0.5) * ch - oy) / px);
          if (bx >= 0 && by >= 0 && bx < L.w && by < L.h && L.rows[by][bx] === '#') cov[y * cols + x] = 0.62 + 0.38 * vnoise(x * 0.35, y * 0.5, 9);
        }
        return { cov: cov };
      };
    },
    /* Asciify-style full-colour: a procedural dusk city (own artwork, no stock). Per-pixel "shader" so every row has texture.
       Colours come from the "image", lightened (minLum) so marks stay legible on bg. */
    scene: function (opt) {
      opt = opt || {};
      function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
      function ramp(stops, t) { for (var i = 1; i < stops.length; i++) if (t <= stops[i][0]) return mix(stops[i - 1][1], stops[i][1], (t - stops[i - 1][0]) / (stops[i][0] - stops[i - 1][0])); return stops[stops.length - 1][1]; }
      function ss(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
      var SKY = [[0, [14, 16, 52]], [0.45, [58, 38, 104]], [0.78, [178, 72, 104]], [1, [246, 160, 88]]];
      return function (cols, rows, cw, ch) {
        return sample(cols, rows, cw, ch, function (g, W, H) {
          var img = g.createImageData(W, H), d = img.data, hz = 0.6, sxu = opt.sunX || 0.68, asp = W / H;
          var bw = 0.028, nb = Math.ceil(1 / bw);
          for (var py = 0; py < H; py++) {
            var v = py / H;
            for (var px = 0; px < W; px++) {
              var u = px / W, c, dx = (u - sxu) * asp, dy = v - (hz - 0.035), dist = Math.sqrt(dx * dx + dy * dy);
              if (v < hz) {
                var t = v / hz; c = ramp(SKY, t);
                c = mix([0, 0, 0], c, 0.5 + 0.8 * fbm(u * 7 + 2, v * 26, 3));
                var cl = ss(0.42, 0.66, fbm(u * 3.2 + 1.3, v * 15, 11)) * (0.35 + 0.65 * t);
                c = mix(c, mix([96, 56, 120], [255, 176, 120], ss(0.9, 0.05, Math.abs(dx))), cl * 0.85);
                if (t < 0.55 && hash(px, py, 4) > 0.993) c = [255, 255, 255];
                var glow = Math.max(0, 1 - dist / 0.36); c = mix(c, [255, 190, 120], glow * glow * 0.4);
                if (dist < 0.12 && !(dy > -0.02 && Math.floor(v * 120) % 3 === 0)) c = mix([255, 250, 232], [255, 176, 100], ss(0.03, 0.12, dist) * 0.6);
                var ridge = hz - 0.07 - fbm(u * 5, 2, 5) * 0.09;
                if (v > ridge) c = mix([40, 26, 72], [70, 40, 92], fbm(u * 12, v * 12, 6) * 0.6);
                var bi = Math.floor(u / bw), bh = 0.025 + hash(bi, 7, 1) * hash(bi, 8, 2) * 0.17 + (Math.abs(bi * bw - sxu) < 0.07 ? 0 : 0.02);
                if (hash(bi, 9, 3) > 0.12 && v > hz - bh) {
                  c = [18, 14, 34];
                  var wx = Math.floor((u - bi * bw) / bw * 4), wy = Math.floor((v - (hz - bh)) * 90);
                  if (wx > 0 && wx < 3 && wy % 2 === 1 && hash(bi * 7 + wx, wy, 5) > 0.62) c = [255, 206, 138];
                }
              } else {
                var tw = (v - hz) / (1 - hz); c = mix([46, 30, 74], [10, 9, 20], ss(0, 1, tw));
                var wdt = 0.05 + tw * 0.14, streak = fbm(u * 26, v * 70, 8);
                if (Math.abs(u - sxu) < wdt * (0.6 + streak) && streak > 0.42) c = mix([255, 178, 110], [200, 90, 90], tw);
                else if (fbm(u * 18, v * 60, 12) > 0.66) c = mix(c, [120, 80, 150], 0.7);
              }
              var gr = 0.8 + 0.4 * hash(px, py, 21); c = [c[0] * gr, c[1] * gr, c[2] * gr];
              var o = (py * W + px) * 4; d[o] = c[0]; d[o + 1] = c[1]; d[o + 2] = c[2]; d[o + 3] = 255;
            }
          }
          g.putImageData(img, 0, 0);
        }, opt.minLum || 0.34);
      };
    }
  };

  /* ---------- the renderer ----------
     Quiet by default (docs/09-motion-script.md): the canvas is repainted only when its state changes
     (scrub, pointer, theme, resize). Two opt-ins add life while the visitor is still:
       breathe   fraction of cells per second that drift (noise glyph swaps, or a source glyph moving one
                 step along the ramp), painted cell by cell, its rate rising and falling on a slow sine
       calm      elements whose boxes stay free of noise (+1 cell), with a faint, sparse ring around them,
                 so text never sits on dense characters and detail grows towards the edges */
  NB.ascii = function (canvas, opt) {
    opt = opt || {};
    var CW = (opt.cell || [9, 16])[0], CH = (opt.cell || [9, 16])[1];
    var ramp = opt.ramp || NB.RAMP, noise = opt.noise || NB.NOISE;
    var glyphs = [], gi = {};
    (' ' + ramp + noise + NB.STRUCT + (opt.extra || '')).split('').forEach(function (g) { if (!(g in gi)) { gi[g] = glyphs.length; glyphs.push(g); } });
    var ctx = canvas.getContext('2d'), DPR = Math.min(2, window.devicePixelRatio || 1);
    var font = opt.font || '500 13px "JetBrains Mono", ui-monospace, monospace';
    var atlas, cols = 0, rows = 0, n = 0, src = { cov: new Float32Array(0) }, noiseG, thr, glyphOf, zone, rgbStr = null;
    var dirty = true, visible = true, last = 0, lastB = 0, reduce = NB.reduce();
    var FRONT = CI[opt.frontColor || 'accent'];
    var S = { order: opt.order != null ? opt.order : 1, px: -1e4, py: -1e4, lens: 0, lensPx: opt.lensPx || 96, noiseFill: opt.noiseFill != null ? opt.noiseFill : 1 };

    function buildAtlas() {
      atlas = document.createElement('canvas');
      atlas.width = glyphs.length * CW * DPR; atlas.height = NB.COLORS.length * CH * DPR;
      var a = atlas.getContext('2d'); a.scale(DPR, DPR); a.font = font; a.textAlign = 'center'; a.textBaseline = 'middle';
      NB.COLORS.forEach(function (c, ci) {
        a.globalAlpha = c === 'faint' ? (opt.faintAlpha || 0.3) : c === 'fg-subtle' ? (opt.noiseAlpha || 0.6) : 1;
        a.fillStyle = NB.tok(c === 'faint' ? 'fg-subtle' : c);
        glyphs.forEach(function (g, i) { a.fillText(g, i * CW + CW / 2, ci * CH + CH / 2 + 1); });
      });
      dirty = true;
    }
    function rampIdx(c) { return gi[ramp[Math.min(ramp.length - 1, Math.max(0, Math.round(c * (ramp.length - 1))))]]; }
    /* 2 = full noise, 1 = faint and sparse, 0 = no noise at all */
    function zones() {
      zone = new Uint8Array(n); zone.fill(2);
      var calm = typeof opt.calm === 'function' ? opt.calm() : opt.calm;
      if (!calm || !calm.length || !n) return;
      var cr = canvas.getBoundingClientRect(), ring = opt.calmRing == null ? 4 : opt.calmRing;
      [].forEach.call(calm, function (el) {
        var r = el && el.getBoundingClientRect(); if (!r || !r.width || !r.height) return;
        var x0 = Math.floor((r.left - cr.left) / CW) - 1, x1 = Math.ceil((r.right - cr.left) / CW);
        var y0 = Math.floor((r.top - cr.top) / CH) - 1, y1 = Math.ceil((r.bottom - cr.top) / CH);
        for (var y = Math.max(0, y0 - ring); y <= Math.min(rows - 1, y1 + ring); y++) {
          for (var x = Math.max(0, x0 - ring); x <= Math.min(cols - 1, x1 + ring); x++) {
            var i = y * cols + x, v = x >= x0 && x <= x1 && y >= y0 && y <= y1 ? 0 : 1;
            if (v < zone[i]) zone[i] = v;
          }
        }
      });
    }
    function layout() {
      var w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return;
      canvas.width = Math.round(w * DPR); canvas.height = Math.round(h * DPR); ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cols = Math.floor(w / CW); rows = Math.floor(h / CH); n = cols * rows;
      src = opt.source ? opt.source(cols, rows, CW, CH) : { cov: new Float32Array(n) };
      noiseG = new Uint16Array(n); thr = new Float32Array(n); glyphOf = new Int16Array(n);
      var sweep = opt.sweep || 0;
      for (var i = 0; i < n; i++) {
        noiseG[i] = gi[noise[(Math.random() * noise.length) | 0]];
        thr[i] = Math.min(0.999, Math.random() * (1 - sweep) + ((i % cols) / cols) * sweep);
        var ch = src.chars && src.chars[i];
        glyphOf[i] = ch && (ch in gi) ? gi[ch] : rampIdx(src.cov[i]);
      }
      rgbStr = null;
      if (src.rgb && opt.mode === 'color') {
        rgbStr = new Array(n);
        for (var j = 0; j < n; j++) rgbStr[j] = 'rgb(' + src.rgb[j * 3] + ',' + src.rgb[j * 3 + 1] + ',' + src.rgb[j * 3 + 2] + ')';
      }
      zones();
      dirty = true;
    }
    /* what cell i shows now: L.g glyph (-1 = nothing), L.c colour row, L.f css colour for full-colour cells */
    var L = { g: -1, c: 0, f: null };
    function look(i, lr2) {
      var x = i % cols, y = (i / cols) | 0, p = S.order, t = thr[i], cov = src.cov[i], forced = src.chars && src.chars[i];
      L.g = -1; L.f = null;
      if (lr2 > 0 && opt.lens !== false) {
        var dx = (x + 0.5) * CW - S.px, dy = (y + 0.5) * CH - S.py;
        if (dx * dx + dy * dy < lr2) {
          L.g = glyphOf[i]; if (glyphs[L.g] === ' ') L.g = gi['·'];
          L.c = forced ? CI.fg : CI[opt.lensColor || 'signal']; return L;
        }
      }
      if (p >= t) {
        if (cov <= 0.02 && !forced) return L;
        L.g = glyphOf[i];
        if (p < 1 && p - t < 0.045) L.c = FRONT;
        else if (src.color && src.color[i] >= 0) L.c = src.color[i];
        else if (opt.tone) L.c = CI[opt.tone];
        else L.c = cov > 0.72 ? CI.fg : cov > 0.48 ? CI['level-4'] : cov > 0.26 ? CI['level-3'] : CI['level-2'];
        if (rgbStr && L.c !== FRONT) L.f = rgbStr[i];
      } else {
        var z = zone[i];
        if (!z || ((t * 9973) % 1) > S.noiseFill * (z === 1 ? 0.45 : 1)) return L;
        L.g = noiseG[i]; L.c = t - p < 0.045 ? FRONT : z === 1 ? CI.faint : CI['fg-subtle'];
      }
      if (glyphs[L.g] === ' ') L.g = -1;
      return L;
    }
    function paint(i) {
      var x = (i % cols) * CW, y = ((i / cols) | 0) * CH;
      if (L.g < 0) return;
      if (L.f) { ctx.fillStyle = L.f; ctx.fillText(glyphs[L.g], x + CW / 2, y + CH / 2 + 1); }
      else ctx.drawImage(atlas, L.g * CW * DPR, L.c * CH * DPR, CW * DPR, CH * DPR, x, y, CW, CH);
    }
    function fontSetup() { if (rgbStr) { ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; } }
    function draw() {
      ctx.clearRect(0, 0, cols * CW + CW, rows * CH + CH);
      var lr = S.lens * S.lensPx, lr2 = lr * lr;
      fontSetup();
      for (var i = 0; i < n; i++) { look(i, lr2); paint(i); }
    }
    /* repaint one cell; cells under the lens wait for the next full draw */
    function drawCell(i) {
      if (S.lens > 0) {
        var dx = ((i % cols) + 0.5) * CW - S.px, dy = (((i / cols) | 0) + 0.5) * CH - S.py, lr = S.lens * S.lensPx;
        if (dx * dx + dy * dy < lr * lr) return;
      }
      ctx.clearRect((i % cols) * CW, ((i / cols) | 0) * CH, CW, CH);
      look(i, 0); paint(i);
    }
    /* m random cells change: noise swaps glyph, a settled cell moves one step along the ramp around its own density */
    function shimmer(m, cellwise) {
      if (rgbStr && cellwise) fontSetup();
      for (var k = 0; k < m; k++) {
        var j = (Math.random() * n) | 0;
        if (S.order >= thr[j]) {
          if (src.chars && src.chars[j]) continue;
          var cv = src.cov[j]; if (cv <= 0.02) continue;
          glyphOf[j] = rampIdx(Math.max(0.03, Math.min(1, cv + (Math.random() - 0.5) * 0.18)));
        } else noiseG[j] = gi[noise[(Math.random() * noise.length) | 0]];
        if (cellwise) drawCell(j);
      }
    }
    function tick(time) {
      if (!visible || document.hidden || !n) return;
      if (time - last < 1 / (opt.fps || 30)) return;
      last = time;
      if (opt.onTick) opt.onTick(S, time, api);
      if (dirty) {
        /* while the state is moving (scrub), a few noise glyphs swap so the field reads as alive */
        if (!reduce && S.order < 0.999) shimmer(Math.max(4, (n * 0.01) | 0), false);
        draw(); dirty = false; return;
      }
      if (reduce || !opt.breathe || time - lastB < 1 / 12) return;
      lastB = time;
      var k = 0.35 + 0.65 * (0.5 - 0.5 * Math.cos(2 * Math.PI * time / (opt.breathePeriod || 8)));
      shimmer(Math.max(1, Math.round(n * opt.breathe / 12 * k)), true);
    }
    var api = {
      state: S, redraw: function () { dirty = true; }, relayout: layout,
      recalm: function () { zones(); dirty = true; },
      cols: function () { return cols; }, rows: function () { return rows; }, cell: [CW, CH],
      setSource: function (fn) { opt.source = fn; layout(); }
    };
    function start() {
      buildAtlas(); layout();
      if (reduce) { S.order = 1; S.lens = 0; draw(); return; }
      if (window.gsap) window.gsap.ticker.add(tick);
      else (function loop(t) { tick(t / 1000); requestAnimationFrame(loop); })(0);
      if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; dirty = true; }).observe(canvas);
      document.addEventListener('visibilitychange', function () { if (!document.hidden) dirty = true; });
      new MutationObserver(buildAtlas).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(layout, 150); });
      if (opt.pointer !== false) {
        var host = opt.host || canvas, G = window.gsap;
        var qx = G ? G.quickTo(S, 'px', { duration: 0.25, ease: 'power3.out', onUpdate: api.redraw }) : function (v) { S.px = v; dirty = true; };
        var qy = G ? G.quickTo(S, 'py', { duration: 0.25, ease: 'power3.out', onUpdate: api.redraw }) : function (v) { S.py = v; dirty = true; };
        host.addEventListener('pointermove', function (e) { var r = canvas.getBoundingClientRect(); qx(e.clientX - r.left); qy(e.clientY - r.top); });
        host.addEventListener('pointerenter', function () { if (G) G.to(S, { lens: 1, duration: 0.3, onUpdate: api.redraw }); else { S.lens = 1; dirty = true; } });
        host.addEventListener('pointerleave', function () { if (G) G.to(S, { lens: 0, duration: 0.3, onUpdate: api.redraw }); else { S.lens = 0; dirty = true; } });
      }
    }
    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    api.ready = fonts.then(function () { return opt.fontLoad && document.fonts ? document.fonts.load(opt.fontLoad) : null; }).then(start, start);
    return api;
  };

  /* ---------- Logo: "Blocks" lettering ----------
     The bitmap IS the logo (Newsreader 800 sampled onto a coarse grid by tools/make-logo.js; masters in
     design-system/assets/Logo/). Never re-typeset it. lg = 139x18 for >= 36px tall, sm = 104x14 for HUD-size marks. */
  NB.LOGO = {
    lg: { w: 139, h: 18, base: 14, rows: [
      '######....###..................###....................###.............................###.....................###..........................',
      '.######....#................######..................#####............................####.....................####.........................',
      '.######....#.................#####...................####.............................###......#........#.....###..........................',
      '.#.#####...#..................####...................####....................................###......###..................................',
      '.#.######..#.....#####........####.####.....#####....####.####..#####.....#..#####.....##..########.########....##....##..####....#########',
      '.#..#####..#...###..###.......##########..##..####...##########..####.......##....#.#####..########.########.#####.###########...###.######',
      '.#...#####.#...###..####......####..####.###...####..####..####..#####...#..###...#..####...####.....####....#####..###########.####.####..',
      '.#...#####.#..####..####......####..####.......####..####..#####..####...#..######...####...####.....####.....####..####..#####.####.####..',
      '.#....######..####..####......####..####.....######..####..#####..#####.#...#######..####...####.....####.....####..####...####..###.####..',
      '.#.....#####..####..####......####..####..###..####..####..####....####.#....######..####...####.....####.....####..####...####..###.###...',
      '.#.....#####..####..####......####..####.####..####..####..####....#####.......#####.####...####.....####.....####..####...####...#........',
      '.#......####..####..####......####..####.####.#####..####..####.....####.........##..####...####.....####.....####..####...####..###.......',
      '.#.......###...###..###.......####..###..##########..####..###.......##.....#....##..####...#######..#######..####..####...####.#########..',
      '###......###....######.......########.....####.####..########........##.....######...#####...#####....#####..#####..#####.#####.##########.',
      '......................................................................#..........................................................#########.',
      '..................................................................#..#...........................................................##....###.',
      '.................................................................#####..........................................................###.....##.',
      '..................................................................###...........................................................########...'
    ] },
    sm: { w: 104, h: 14, base: 11, rows: [
      '.......................##................#......................##.................#....................',
      '#####...#............####..............####.....................###...............###...................',
      '#.###...#.............###..............####.....................##....##.....##....#....................',
      '#.####..#....###......###.###....###....###.##..###.......#.#.....#.######.######...#....#..##....######',
      '#..####.#..##..##.....########.##.###...#######.####.....##..#.####.######.######.###.#########.###.##.#',
      '#..####.#.###..###....###..###.#...###..###.###..###....####....###..###....###...###..###.####.###.##..',
      '#...#####.###..###....###..###....####..###.###..####.#.######..###..###....###...###..###..###.###.##..',
      '#....####.###..###....###..###.###.###..###.###...###....#####..###..###....###...###..###..###..####...',
      '#....####.###..###....###..###.###.###..###.###...####......##..###..###....###...###..###..###..#......',
      '#.....###..##..##.....###..##..#######.####.##.....##.......##..###..#####..#####.###..###..###.######..',
      '#......##...####......#.####....##.###.#.####.......#....#..#...###...###....##...###..###..###.#######.',
      '....................................................#............................................######.',
      '.................................................###............................................##....#.',
      '.................................................##.............................................####....'
    ] }
  };
  NB.logoPath = function (L) {
    var d = '';
    L.rows.forEach(function (s, y) { var re = /#+/g, m; while ((m = re.exec(s))) d += 'M' + m.index + ' ' + y + 'h' + m[0].length + 'v1h-' + m[0].length + 'z'; });
    return d;
  };
  /* stacked lockup for tall screens, cut from the master bitmap (never re-typeset):
     "No" on the first line, "babysitting" on the second, left aligned, a 4-pixel gap */
  NB.LOGO.st = (function (L) {
    var used = function (x) { return L.rows.some(function (r) { return r[x] === '#'; }); }, x = 12, run = 0;
    for (; x < L.w; x++) { run = used(x) ? 0 : run + 1; if (run >= 4) break; }
    var a0 = x - run + 1, b0 = x; while (b0 < L.w && !used(b0)) b0++;
    var w2 = L.w - b0, gap = 4, blank = new Array(w2 + 1).join('.');
    var top = L.rows.map(function (r) { var s = r.slice(0, a0); return (s + blank).slice(0, w2); });
    var mid = []; for (var i = 0; i < gap; i++) mid.push(blank);
    var bot = L.rows.map(function (r) { return r.slice(b0); });
    return { w: w2, h: L.h * 2 + gap, base: L.h + gap + L.base, rows: top.concat(mid, bot) };
  })(NB.LOGO.lg);
  /* static mark: inline SVG, fill currentColor (accent by default, fg for monochrome) */
  NB.logoSVG = function (size, label) {
    var L = typeof size === 'object' ? size : NB.LOGO[size || 'lg'];
    return '<svg class="nb-logo" viewBox="0 0 ' + L.w + ' ' + L.h + '" shape-rendering="crispEdges" role="img" aria-label="' + (label || 'No babysitting') + '"><path fill="currentColor" d="' + NB.logoPath(L) + '"/></svg>';
  };
  /* reveal: a white line of code is typed, then compiled into the blocks left to right.
     Trail: just-converted pixels are fg (white), they settle to accent behind the head (M11 family).
     host gets: .nb-logo-stage > [.nb-logo-code, svg]. Returns { play, stage }. Reduced motion: final mark. */
  var LOGO_N = 0;
  NB.logo = function (host, opt) {
    opt = opt || {};
    var L = NB.LOGO[opt.size || 'lg'], id = 'nblg' + (++LOGO_N), d = NB.logoPath(L), text = opt.text || 'No babysitting';
    host.classList.add('nb-logo-stage');
    host.innerHTML = '<span class="nb-logo-code" aria-hidden="true"><span class="t"></span><span class="nb-logo-caret">▍</span></span>' +
      '<svg class="nb-logo" viewBox="0 0 ' + L.w + ' ' + L.h + '" shape-rendering="crispEdges" role="img" aria-label="' + text + '">' +
      '<defs><clipPath id="' + id + 'a"><rect x="0" y="0" width="0" height="' + L.h + '"/></clipPath>' +
      '<clipPath id="' + id + 'w"><rect x="0" y="0" width="0" height="' + L.h + '"/></clipPath></defs>' +
      '<path class="a" fill="currentColor" clip-path="url(#' + id + 'a)" d="' + d + '"/>' +
      '<path class="w" fill="var(--fg)" clip-path="url(#' + id + 'w)" d="' + d + '"/></svg>';
    var code = host.querySelector('.nb-logo-code'), t = code.querySelector('.t'), caret = code.querySelector('.nb-logo-caret');
    var svg = host.querySelector('svg'), ra = svg.querySelector('#' + id + 'a rect'), rw = svg.querySelector('#' + id + 'w rect');
    var TRAIL = opt.trail || 14, S = { n: 0, s: 0 };
    function fit() {
      /* code line spans the mark (JetBrains Mono advance = 0.6em) and sits on the mark's baseline */
      if (opt.snap !== false && host.parentNode) { /* whole screen pixels per logo pixel keeps the block edges crisp */
        var k = Math.max(1, Math.min(opt.maxScale || 5, Math.floor(host.parentNode.clientWidth / L.w)));
        host.style.width = k * L.w + 'px';
      }
      var W = svg.getBoundingClientRect().width, fs = W / (text.length * 0.6), px = W / L.w;
      code.style.fontSize = fs + 'px';
      var g = document.createElement('canvas').getContext('2d'); g.font = '500 ' + fs + 'px "JetBrains Mono", monospace';
      var m = g.measureText('N'), a = m.fontBoundingBoxAscent || fs * 1.02, de = m.fontBoundingBoxDescent || fs * 0.3;
      code.style.top = (L.base * px - ((fs - (a + de)) / 2 + a)) + 'px';
    }
    function paint() {
      t.textContent = text.slice(0, Math.round(S.n));
      var s = S.s, px = svg.getBoundingClientRect().width / L.w;
      ra.setAttribute('width', Math.max(0, s - TRAIL));
      rw.setAttribute('x', Math.max(0, s - TRAIL)); rw.setAttribute('width', Math.max(0, Math.min(s, L.w) - Math.max(0, s - TRAIL)));
      code.style.clipPath = 'inset(0 0 0 ' + Math.min(s, L.w) * px + 'px)';
      code.style.visibility = s >= L.w ? 'hidden' : 'visible';
    }
    function final() { S.n = text.length; S.s = L.w + TRAIL; paint(); caret.style.visibility = 'hidden'; }
    var G = window.gsap, tl = null;
    function play() {
      if (tl) tl.kill();
      fit(); S.n = 0; S.s = 0; caret.style.visibility = 'visible'; paint();
      if (!G || NB.reduce()) { final(); return null; }
      tl = G.timeline({ onUpdate: paint });
      tl.to(S, { n: text.length, duration: text.length * 0.055, ease: 'steps(' + text.length + ')' })
        .to(caret, { autoAlpha: 0, duration: 0.3, repeat: 3, yoyo: true, ease: 'steps(1)' })
        .set(caret, { visibility: 'hidden' })
        .to(S, { s: L.w + TRAIL, duration: opt.sweep || 1.1, ease: 'none' }, '-=0.15');
      return tl;
    }
    window.addEventListener('resize', function () { fit(); paint(); });
    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    fonts.then(function () { if (opt.autoplay === false) { fit(); final(); } else play(); });
    return { play: play, final: final, stage: host };
  };

  /* ---------- The Colleague ---------- */
  NB.FACES = {
    idle: ['[•_•]', 'fg-muted', 'đang chờ'],
    tracking: ['[ •_•]', 'fg-muted', 'đang nhìn theo bạn'],
    thinking: ['[°_°]…', 'info', 'đang suy nghĩ'],
    working: ['[>_<]≡', 'accent', 'đang làm việc'],
    asking: ['[•_•]?', 'warn', 'đang hỏi bạn'],
    overloaded: ['[@_@]', 'warn', 'đang quá tải'],
    verified: ['[^_^]✓', 'signal', 'đã kiểm chứng xong']
  };
  NB.colleague = function (el, state) {
    var cur = null;
    el.setAttribute('role', 'img');
    function set(s, instant) {
      if (s === cur || !NB.FACES[s]) return;
      cur = s; var f = NB.FACES[s];
      el.style.color = 'var(--' + f[1] + ')';
      el.setAttribute('aria-label', 'Đồng nghiệp: ' + f[2]);
      if (!instant && window.gsap && window.ScrambleTextPlugin && !NB.reduce()) window.gsap.to(el, { duration: 0.35, scrambleText: { text: f[0], chars: '•°^>_<@', speed: 0.8 } });
      else el.textContent = f[0];
    }
    set(state || 'idle', true);
    return { set: set, get: function () { return cur; } };
  };

  /* ---------- text helpers ---------- */
  /* M4 "agent is processing". ONLY for the verb of an agent action (Đọc, Kiểm tra, Ghi…) and agent log lines.
     Never for corner labels, stamps, panel titles or status words: use NB.say. The scramble set has no
     diacritics, so Vietnamese marks never flicker; the final text resolves left to right. */
  NB.SCRAMBLE = '01/\\<>#*';
  NB.decode = function (el, text, dur) {
    if (window.gsap && window.ScrambleTextPlugin && !NB.reduce()) return window.gsap.to(el, { duration: dur || 0.8, scrambleText: { text: text, chars: NB.SCRAMBLE, speed: 0.6 } });
    el.textContent = text; return null;
  };
  /* Plain text change for everything that is not an agent action: swap text, short fade (dur-quick). */
  NB.say = function (el, text) {
    el.textContent = text;
    if (window.gsap && !NB.reduce()) return window.gsap.fromTo(el, { autoAlpha: 0.35 }, { autoAlpha: 1, duration: 0.24, ease: 'power2.out', overwrite: true });
    return null;
  };
  NB.clock = function (el) {
    function f() { var d = new Date(); el.textContent = d.toLocaleTimeString('vi-VN', { hour12: false }); }
    f(); return setInterval(f, 1000);
  };
  NB.cursorLabel = function (host, text) {
    var lab = document.createElement('span'); lab.className = 'nb-cursor'; lab.textContent = text; lab.setAttribute('aria-hidden', 'true');
    host.appendChild(lab);
    var G = window.gsap; if (!G || NB.reduce()) return lab;
    var qx = G.quickTo(lab, 'x', { duration: 0.3, ease: 'power3.out' }), qy = G.quickTo(lab, 'y', { duration: 0.3, ease: 'power3.out' });
    host.addEventListener('pointermove', function (e) { var r = host.getBoundingClientRect(); qx(e.clientX - r.left + 16); qy(e.clientY - r.top + 16); });
    host.addEventListener('pointerenter', function () { G.to(lab, { autoAlpha: 1, duration: 0.2 }); });
    host.addEventListener('pointerleave', function () { G.to(lab, { autoAlpha: 0, duration: 0.2 }); });
    return lab;
  };
  /* blocks meter as text: "███░░" */
  NB.blocks = function (v, width) { var f = Math.round(v * width); return new Array(f + 1).join('█') + new Array(width - f + 1).join('░'); };

  window.NoBabysitting = NB;
})();
