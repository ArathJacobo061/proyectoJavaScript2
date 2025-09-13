// 1. Symbol
console.log('Symbol');
const simbolo1 = Symbol('descripción');
const simbolo2 = Symbol('descripción');

console.log(simbolo1 == simbolo2);

const simboloGlobal1 = Symbol.for('descripción');
const simboloGlobal2 = Symbol.for('descripción');
console.log(simboloGlobal1 == simboloGlobal2);

const objSimbolo = {};
objSimbolo[simbolo1] = 'privado';
console.log(objSimbolo[simbolo1]);

// 2. Set
console.log('Conjuntos');
const conjunto = new Set();
conjunto.add(1);
conjunto.add(2);
conjunto.add(2); // No lo va a agregar, ya que existe
conjunto.add(3);
console.log(conjunto.has(2));
console.log(conjunto.size);

conjunto.delete(1);
console.log(conjunto);
console.log(conjunto.size);

// 3. Map
console.log('Map');
const mapa = new Map();
mapa.set('uno', 1);
mapa.set('dos', 2);
mapa.set('nombre', 'Ricardo');
const arrKey = [1, 2];
mapa.set(arrKey, 'es un arreglo como clave');
console.log(mapa.get('uno'));     // 1
console.log(mapa.get('nombre'));  // Ricardo
console.log(mapa.get(arrKey));    // es un arreglo como clave
console.log(mapa.size);           // 3

// 3. Iteradores y Generadores
// Iterador personalizado utilizando Symbol.iterator
console.log('Iteradores y Generadores');
const rango = {
    from: 1,
    to: 13,
    [Symbol.iterator]() {
        let actual = this.from;
        let ultimo = this.to;
        return {
            next() {
                if (actual <= ultimo) {
                    return { value: actual++, done: false };
                } else {
                    return { done: true };
                }
            }
        }
    }
};
for (let num of rango) {
    console.log(num);
}
// Iterador con function*
function* fibonacciSequence() {
    let a = 0, b = 1;
    while (true) {
        yield b;
        [a, b] = [b, a + b];
    }
}
function* take(n, iterable) {
    let iter = iterable[Symbol.iterator]();
    while (n-- > 0) {
        let next = iter.next();
        if (next.done) return;
        yield next.value;
    }
}
console.log([...take(10, fibonacciSequence())]);

// Proxy
console.log('Proxy');
const objetivo = { mensaje: "Hola mundo" };
const proxy = new Proxy(objetivo, {
    get: function (target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return 'Propiedad no encontrada';
        }
    }
});


console.log(proxy.mensaje);
console.log(proxy.inexistente);
const { proxy: revocableProxy, revoke } = Proxy.revocable({ datos: 123 }, {});
console.log(revocableProxy.datos);
revoke();
try {
    console.log(revocableProxy.datos);
} catch (e) {
    console.log('Proxy revocado: no accesible');
}
// Propiedades dinámicas de los objetos
console.log('Propiedades dinámicas de los objetos');
const propDinamica = 'dinámica';
const obDinamico = {
    [propDinamica]: 42,
    [1 + 1]: 'dos',
    [Symbol('sym')]: "valor símbolo"
};
console.log(obDinamico.dinámica);
console.log(obDinamico[2]);

const quitarDuplicados = (arr = undefined) => {
    // 1. validar si se ingresó el arreglo
    if (arr === undefined)
        return console.warn("No ingresaste un arreglo");
    // 2. validar si es un arreglo
    if (!(arr instanceof Array))
        return console.error("El valor que ingresaste no es un arreglo");
    // 3. validar que no esté vacío
    if (arr.length === 0)
        return console.error("El arreglo está vacío");
    // 4. validar que tenga al menos 2 elementos
    if (arr.length === 1)
        return console.error("El arreglo debe tener al menos dos elementos");
    // 5. filtrar duplicador usando filter + indexOf
    // return console.info({
    //     original: arr,
    //     sinDuplicados: arr.filter((valor, indice, self) => self.indexOf(valor) === indice)
    // });
    // 6. Alternativa de mejora utilizando set
    return console.info({
        original: arr,
        sinDuplicados: [...new Set(arr)]
    });
}
quitarDuplicados();
quitarDuplicados({});
quitarDuplicados([]);
quitarDuplicados([2]);
quitarDuplicados(["10", "X", "X", "2", "10", 10, true, true]);