// Calcula el cuadrado de "value" de forma ASÍNCRONA y devuelve una PROMESA
function cuadradoAsincrona(value) {
  if (typeof value !== "number") {
    // Si no es número, devolvemos una promesa RECHAZADA (cae al catch)
    return Promise.reject(`Error, El valor ingresado ${value} no es un número`);
  }

  // Promesa que se resuelve tras un tiempo aleatorio (0–1000 ms)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        value,
        result: value * value
      });
    }, Math.random() * 1000);
  });
}

// Función ASYNC que llama a "cuadradoAsincrona" varias veces EN ORDEN
async function funcionAsincronaDeclarada() {
  try {
    console.log("Inicio Async Function");

    let obj = await cuadradoAsincrona(0);
    console.log(`Async Function: ${obj.value}, ${obj.result}`);

    obj = await cuadradoAsincrona(1);
    console.log(`Async Function: ${obj.value}, ${obj.result}`);

    obj = await cuadradoAsincrona(2);
    console.log(`Async Function: ${obj.value}, ${obj.result}`);

    obj = await cuadradoAsincrona(3);
    console.log(`Async Function: ${obj.value}, ${obj.result}`);

    obj = await cuadradoAsincrona(4);
    console.log(`Async Function: ${obj.value}, ${obj.result}`);

    obj = await cuadradoAsincrona(5);
    console.log(`Async Function: ${obj.value}, ${obj.result}`);

    console.log("Fin de Async Function");
  } catch (error) {
    // Aquí atrapas cualquier rechazo (por ejemplo si pasas un string)
    console.log(error);
  }
}

// ¡Ejecuta!
funcionAsincronaDeclarada();
