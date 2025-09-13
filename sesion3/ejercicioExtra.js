//Un sistema tipo red social permite registrar usuarios y asociarles una serie de “tags” (palabras clave o intereses).

//Por mantenimiento y análisis de datos, los administradores necesitan limpiar los datos para:

//Quitar tags duplicados y anagramas para evitar repetición semántica.

//Validar que los datos del usuario cumplen ciertas reglas (por ejemplo, sólo letras para los nombres).

//Recorrer de manera eficiente usuarios activos para estadísticas.

//Problema Propuesto:

//Crea una utilidad que:

//Reciba una lista de usuarios, cada uno con nombre, apellido, edad y un arreglo de tags.


//Elimine de cada usuario los tags duplicados y anagramas.

//Valide los datos del usuario mediante un proxy.

//Genere un iterador personalizado para recorrer sólo los usuarios activos.

// 1. Función para eliminar duplicados y anagramas en el array de tags
function limpiarTags(tags = []) {
  // Quitamos duplicados exactos (normalizando a string)
  const unicos = [...new Set(tags.map(String))];

  // Quitamos anagramas: guardamos sólo una palabra por “firma” ordenada
  const mapa = new Map();
  for (const palabra of unicos) {
    const clave = palabra.toLowerCase().split('').sort().join('');
    if (!mapa.has(clave)) mapa.set(clave, palabra);
  }

  // Devuelve sólo los valores únicos no anagramas
  return Array.from(mapa.values());
}

// 2. Proxy para validar los datos del usuario
const handlerUsuario = {
  set(obj, prop, valor) {
    // Permitir sólo estas propiedades en el objeto
    const permitidas = ["nombre", "apellido", "edad", "tags", "activo"];
    if (!permitidas.includes(prop)) {
      throw new Error(`La propiedad ${prop} no existe en el usuario`);
    }

    // nombre/apellido: sólo letras (incluye acentos), y espacios
    if (["nombre", "apellido"].includes(prop)) {
      if (typeof valor !== "string" || !/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(valor)) {
        throw new Error(`${prop} sólo acepta letras y espacios`);
      }
      valor = valor.trim();
    }

    // edad: entero positivo razonable
    if (prop === "edad") {
      if (typeof valor !== "number" || !Number.isInteger(valor) || valor < 0 || valor > 120) {
        throw new Error("La edad debe ser un número entero entre 0 y 120");
      }
    }

    obj[prop] = valor;
    return true;
  }
};

// 3. Generador / iterador personalizado de usuarios activos
function* usuariosActivos(usuarios) {
  for (const usuario of usuarios) {
    if (usuario.activo) yield usuario;
  }
}

// 4. Ejemplo de uso realista
const usuarios = [
  {
    nombre: "Ana",
    apellido: "Torres",
    edad: 29,
    tags: ["React", "TEAMS", "Teams", "sTEAM", "stream", "AMETS", "react", "node", "steam", "team"],
    activo: true
  },
  {
    nombre: "Pedro",
    apellido: "López",
    edad: 41,
    tags: ["lead", "dale", "deal", "adel", "react", "node", "lead"],
    activo: false
  },
  {
    nombre: "Violeta",
    apellido: "Suárez",
    edad: 23,
    tags: ["JS", "js", "html", "css", "css"],
    activo: true
  }
];

// Limpiamos tags y aplicamos proxy a cada usuario
const usuariosProxies = usuarios.map(u => {
  const proxy = new Proxy({ ...u }, handlerUsuario);
  // Limpiar tags duplicados y anagramas para cada usuario
  proxy.tags = limpiarTags(proxy.tags);
  return proxy;
});

console.log("Usuarios después de limpiar tags (sin duplicados ni anagramas):");
console.log(usuariosProxies);

// Iteramos sobre sólo los usuarios activos usando el generador personalizado
console.log("Usuarios activos:");
for (const user of usuariosActivos(usuariosProxies)) {
  console.log(`${user.nombre} ${user.apellido} | Tags: ${user.tags.join(', ')}`);
}
