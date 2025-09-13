// === async-drills.js (Starter con TODOs) ===

// Ejercicio 1: delay(ms) -> Promesa que resuelve tras ms ms
// Pista: return new Promise(resolve => setTimeout(resolve, ms))
export async function delay(ms) {
  // TODO: implementa y elimina el 'throw'
  return new Promise(resolve => setTimeout(resolve,ms));
}

// Ejercicio 2: flash(el, times, ms)
// Alterna la clase 'on' en el elemento 'el', 'times' veces, esperando 'ms' entre cambios
export async function flash(el, times, ms) {
  // TODO
  for (let i = 0; i < times; i++) {
    el.classList.toggle('on');
    await delay(ms);
  }
  // Asegura terminar en "apagado"
  if (el.classList.contains('on')) el.classList.remove('on');
}

// Ejercicio 3: runFlagLoop(flag, ms)
// Mientras flag.value sea true:
//   - espera ms
//   - incrementa flag.count
export async function runFlagLoop(flag, ms) {
  // TODO
  while (flag.value) {
    await delay(ms);
    flag.count = (flag.count || 0) + 1;
  }
}

// Ejercicio 4: getJSON(url)
// Usa fetch; si !res.ok lanza Error con el status; si ok retorna res.json()
export async function getJSON(url) {
  // TODO
  const res = await fetch(url);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

// Ejercicio 5: timeoutFetch(url, ms)
// Usa AbortController para abortar si supera ms
export async function timeoutFetch(url, ms) {
  // TODO
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(t);
    return res;
  } catch (e) {
    clearTimeout(t);
    throw e;
  }
}

// Ejercicio 6: parallelJSON(urls)
// Descarga todas en paralelo (Promise.all) y retorna array de JSONs
export async function parallelJSON(urls) {
  // TODO
  const resps = await Promise.all(urls.map(u => fetch(u)));
  const datas = await Promise.all(resps.map(r => {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }));
  return datas;
}

// Exponer en global para que los tests puedan llamarlas si no usas módulos
window.delay = delay;
window.flash = flash;
window.runFlagLoop = runFlagLoop;
window.getJSON = getJSON;
window.timeoutFetch = timeoutFetch;
window.parallelJSON = parallelJSON;
