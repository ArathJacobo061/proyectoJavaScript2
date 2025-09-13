// Usando un objeto plano
console.log("Usando un objeto plano");
function limpiaAnagrama(arr) {
  let obj = {};
  for (let item of arr) {
    let ordenado = item.toLowerCase().split('').sort().join('');
    obj[ordenado] = item;
  }
  return Object.values(obj);
}

// Ejemplo de uso
let palabras = ["roma", "amor", "mora", "sopa", "paso", "sapo", "ropa", "paro", "proa"];
console.log(limpiaAnagrama(palabras)); // ["amor", "paso", "proa"]


// Usando Map
console.log("Usando Map");
function limpiaAnagramaMap(arr) {
  let mapa = new Map();
  for (let palabra of arr) {
    let ordenado = palabra.toLowerCase().split('').sort().join('');
    mapa.set(ordenado, palabra);
  }
  return Array.from(mapa.values());
}
