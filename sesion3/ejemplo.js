//Iterable / Iterador
// Un objeto normal NO es iterable… salvo que le pongas [Symbol.iterator]
const rango = {
  from: 3, to: 5,
  [Symbol.iterator]() {
    let i = this.from, fin = this.to;
    return {
      next() {
        return (i <= fin) ? { value: i++, done: false } : { done: true };
      }
    };
  }
};

// for...of usa automáticamente el iterador:
for (const n of rango) console.log(n);  // 3, 4, 5

// También puedes usar el iterador “a mano”:
const it = rango[Symbol.iterator]();
console.log(it.next()); // { value: 3, done: false }
console.log(it.next()); // { value: 4, done: false }
console.log(it.next()); // { value: 5, done: false }
console.log(it.next()); // { done: true }

//Generador (function* + yield)
function* contar(hasta) {
  for (let i = 1; i <= hasta; i++) {
    yield i;              // emite 1, luego 2, luego 3...
  }
}

const g = contar(3);      // g es iterador e iterable a la vez
console.log(g.next());    // { value: 1, done: false }
console.log(g.next());    // { value: 2, done: false }
console.log(g.next());    // { value: 3, done: false }
console.log(g.next());    // { value: undefined, done: true }

// Como es iterable, funciona con for...of:
for (const n of contar(4)) console.log(n); // 1,2,3,4
//proxy
const target = { saludo: "Hola" };
const p = new Proxy(target, {
  get(obj, prop) {                // leer propiedades
    return (prop in obj) ? obj[prop] : "No existe";
  },
  set(obj, prop, val) {           // escribir propiedades
    if (prop === "edad" && (val < 0 || !Number.isInteger(val)))
      throw new Error("Edad inválida");
    obj[prop] = val;
    return true;
  }
});

console.log(p.saludo);    // "Hola"
console.log(p.otro);      // "No existe"
p.edad = 30;              // OK
// p.edad = -5;           // Error: Edad inválida


