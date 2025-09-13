(() => {
  // ==== Configuración básica ====
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');

  // Tamaño de grilla (16x16 por defecto)
  const COLS = 16;
  const ROWS = 16;
  const CELL = Math.floor(Math.min(canvas.width, canvas.height) / COLS);

  // Colores
  const COLOR_BG = '#0a0f14';
  const COLOR_FOOD = getCSSVar('--food') || '#ff6a3d';
  const COLOR_SNAKE = getCSSVar('--snake') || '#3fb950';
  const COLOR_HEAD = getCSSVar('--snake-head') || '#2ea043';

  // HUD
  const scoreEl = document.getElementById('score');
  const bestEl = document.getElementById('best');
  const pauseBtn = document.getElementById('pauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  const speedInput = document.getElementById('speed');

  // Estado del juego
  let snake, dir, nextDir, food, score, best, alive, paused;
  let stepMs = speedToMs(+speedInput.value); // menor = más rápido
  let acc = 0; // acumulador para timestep
  let last = performance.now();

  // Cargar mejor puntaje
  best = Number(localStorage.getItem('snake_best') || 0);
  bestEl.textContent = best;

  // Inicializar
  init();
  requestAnimationFrame(loop);

  // ==== Funciones de juego ====

  function init() {
    // Serpiente inicial centrada
    const startX = Math.floor(COLS / 2);
    const startY = Math.floor(ROWS / 2);
    snake = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY }
    ];
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    score = 0;
    alive = true;
    paused = false;
    scoreEl.textContent = score;
    spawnFood();
    render(true);
  }

  function spawnFood() {
    // Evitar colocar comida sobre el cuerpo
    let x, y, clash;
    do {
      x = Math.floor(Math.random() * COLS);
      y = Math.floor(Math.random() * ROWS);
      clash = snake.some(p => p.x === x && p.y === y);
    } while (clash);
    food = { x, y };
  }

  function loop(now) {
    const dt = now - last;
    last = now;

    if (!paused && alive) {
      acc += dt;
      while (acc >= stepMs) {
        tick();
        acc -= stepMs;
      }
    }

    render();
    requestAnimationFrame(loop);
  }

  function tick() {
    // Actualiza dirección (bloquea reversa instantánea)
    if ( (nextDir.x !== -dir.x) || (nextDir.y !== -dir.y) ) {
      dir = nextDir;
    }

    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    // Colisión con muro
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      gameOver();
      return;
    }

    // Colisión con cuerpo
    if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
      gameOver();
      return;
    }

    // Avanza
    snake.unshift(head);

    // Comer
    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreEl.textContent = score;
      if (score > best) {
        best = score;
        bestEl.textContent = best;
        localStorage.setItem('snake_best', String(best));
      }
      spawnFood();
      // acelera levemente al comer
      stepMs = Math.max(40, stepMs - 5);
    } else {
      snake.pop();
    }
  }

  function gameOver() {
    alive = false;
  }

  // ==== Render ====
  function render(forceClear = false) {
    if (forceClear) {
      ctx.fillStyle = COLOR_BG;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      // Limpiar solo el frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Fondo sólido (canvas se ve con grid via CSS)
    ctx.fillStyle = COLOR_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Comida
    drawCell(food.x, food.y, COLOR_FOOD, true);

    // Serpiente
    snake.forEach((seg, i) => {
      drawCell(seg.x, seg.y, i === 0 ? COLOR_HEAD : COLOR_SNAKE);
    });

    if (!alive) {
      drawOverlay('Game Over', 'Presiona Reiniciar');
    } else if (paused) {
      drawOverlay('Pausa', 'Pulsa Reanudar');
    }
  }

  function drawCell(cx, cy, color, isFood = false) {
    const pad = isFood ? 4 : 2;
    const x = cx * CELL + pad;
    const y = cy * CELL + pad;
    const size = CELL - pad * 2;
    ctx.fillStyle = color;
    roundRect(ctx, x, y, size, size, Math.min(8, size / 3));
    ctx.fill();
    if (isFood) {
      // brillito simple
      ctx.globalAlpha = 0.15;
      ctx.fillRect(x, y, size, size);
      ctx.globalAlpha = 1;
    }
  }

  function drawOverlay(title, subtitle) {
    ctx.save();
    ctx.fillStyle = '#000a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 36px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 18);

    ctx.font = '16px system-ui, sans-serif';
    ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 + 18);
    ctx.restore();
  }

  // ==== Entradas (teclado) ====
  window.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if (k === 'arrowup' || k === 'w') setNextDir(0, -1);
    else if (k === 'arrowdown' || k === 's') setNextDir(0, 1);
    else if (k === 'arrowleft' || k === 'a') setNextDir(-1, 0);
    else if (k === 'arrowright' || k === 'd') setNextDir(1, 0);
    else if (k === ' ' || k === 'p') togglePause();
    else if (k === 'r') reset();
  });

  function setNextDir(x, y) {
    nextDir = { x, y };
  }

  // ==== Botones HUD ====
  pauseBtn.addEventListener('click', togglePause);
  resetBtn.addEventListener('click', reset);
  speedInput.addEventListener('input', (e) => {
    // Ajusta la base de velocidad (no cambia si está muy acelerado por comidas,
    // pero en reinicio se aplicará)
    stepMs = speedToMs(+e.target.value);
  });

  function togglePause() {
    if (!alive) return;
    paused = !paused;
    pauseBtn.textContent = paused ? 'Reanudar' : 'Pausar';
    pauseBtn.setAttribute('aria-pressed', String(paused));
  }

  function reset() {
    stepMs = speedToMs(+speedInput.value);
    acc = 0;
    init();
    pauseBtn.textContent = 'Pausar';
    pauseBtn.setAttribute('aria-pressed', 'false');
  }

  // ==== Gestos táctiles (swipe) ====
  let touchStart = null;
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    touchStart = { x: t.clientX, y: t.clientY, time: performance.now() };
  }, { passive: true });

  canvas.addEventListener('touchend', (e) => {
    if (!touchStart) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    const dt = performance.now() - touchStart.time;

    // swipe mínimo
    if (dt < 500 && (adx > 24 || ady > 24)) {
      if (adx > ady) setNextDir(dx > 0 ? 1 : -1, 0);
      else setNextDir(0, dy > 0 ? 1 : -1);
    }
    touchStart = null;
  }, { passive: true });

  // ==== Utilidades ====
  function speedToMs(v) {
    // v: 5 (lento) .. 20 (rápido)
    const clamped = Math.max(5, Math.min(20, v));
    // Mapea a 220..70 ms por paso
    const ms = Math.round(250 - (clamped - 5) * (180 / 15));
    return ms;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function getCSSVar(name){
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  // Ajuste de tamaño si cambias el canvas en HTML/CSS
  window.addEventListener('resize', () => render(true));
})();
