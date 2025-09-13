const $ = s => document.querySelector(s);                 // Atajo: $ selecciona el primer elemento que haga match con el selector CSS s

const red = $('#red'), yellow = $('#yellow'), green = $('#green'); // Tomamos las 3 luces por id: #red, #yellow, #green
const statusEl = $('#status');                            // Elemento donde mostramos mensajes de estado ("Ciclo en marcha…", "Detenido")
const msInput  = $('#ms');                                // Input numérico que define cuántos milisegundos dura cada color
const startBtn = $('#start'), stopBtn = $('#stop');       // Botones Iniciar y Detener

let running = false;                                      // Bandera global: true mientras el ciclo del semáforo esté activo

// Espera no bloqueante: devuelve una Promesa que se resuelve después de ms milisegundos
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms)); // setTimeout programa el resolve sin congelar la UI
}

// Enciende SOLO el color indicado (apagando los demás)
function setLight(color) {
  [red, yellow, green].forEach(el => el.classList.remove('on')); // Apaga todas las luces (quita la clase 'on')
  if (color === 'red')    red.classList.add('on');               // Si el color pedido es 'red', enciende rojo
  if (color === 'yellow') yellow.classList.add('on');            // Si es 'yellow', enciende amarillo
  if (color === 'green')  green.classList.add('on');             // Si es 'green', enciende verde
}

// Bucle principal del semáforo usando async/await (no bloquea el hilo principal)
async function runCycle() {
  statusEl.textContent = 'Ciclo en marcha…';            // Muestra estado de que el ciclo arrancó

  while (running) {                                     // Repite mientras la bandera 'running' se mantenga en true
    const ms = Math.max(10, Number(msInput.value) || 800); // Lee la duración desde el input en cada vuelta (mínimo 200ms)

    setLight('red');                                    // Enciende rojo
    await delay(ms);                                    // Espera ms ms sin bloquear la UI
    if (!running) break;                                // Si alguien detuvo el ciclo durante la espera, salimos ya

    setLight('green');                                  // Enciende verde
    await delay(ms);                                    // Espera ms ms
    if (!running) break;                                // Vuelve a verificar la bandera para salir rápido si se detuvo

    setLight('yellow');                                 // Enciende amarillo
    await delay(ms);                                    // Espera ms ms
    // Aquí no hace falta verificar de nuevo: el while revisará 'running' al inicio de la siguiente iteración
  }

  statusEl.textContent = running ? '' : 'Detenido';     // Si se detuvo, mostramos "Detenido" (si siguiera true, dejamos vacío)
}

// Al pulsar "Iniciar": arranca el ciclo si no está ya corriendo
startBtn.addEventListener('click', async () => {
  if (running) return;                                  // Evita lanzar múltiples ciclos simultáneos
  running = true;                                       // Sube la bandera: el while del ciclo podrá ejecutarse
  startBtn.disabled = true;                             // Deshabilita el botón Iniciar para no spamearlo

  try {
    await runCycle();                                   // Corre el bucle del semáforo hasta que 'running' sea false
  } finally {
    startBtn.disabled = false;                          // Siempre re-habilita el botón al terminar (éxito o interrupción)
  }
});

// Al pulsar "Detener": baja la bandera; el ciclo saldrá en el próximo punto de espera
stopBtn.addEventListener('click', () => {
  running = false;                                      // Señal para que runCycle termine en cuanto acabe el delay actual
});
