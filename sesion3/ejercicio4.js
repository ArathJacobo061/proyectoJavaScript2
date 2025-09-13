// Objeto base
let persona = {
    nombre: "",
    apellido: "",
    edad: 0
};
// Handler que valida propiedades existentes y valores
let manejador = {
    set(obj, prop, valor) {
        // Verificar que la propiedad sea válida
        const propiedades = ["nombre", "apellido", "edad"];
        if (!propiedades.includes(prop)) {
            console.error(`La propiedad ${prop} no existe en el objeto persona`);
            return false;
        }
        // Validar nombre y apellido con regex;
        if ((prop === "nombre" || prop === "apellido") && !/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/g.test(valor)) {
            console.error(`${prop} solo acepta letras y espacios`);
            return false;
        }
        obj[prop] = valor;
        return true;
    }
};
// Proxy que intercerpa modificaciones a persona
let juan = new Proxy(persona, manejador);
// Asignaciones válidas
juan.nombre = "Juán";
juan.apellido = "Pérez";
juan.edad = 35;
console.log(juan);
// Asignación de propiedad inexistente
juan.twitter = "@juanperez";
console.log(persona);