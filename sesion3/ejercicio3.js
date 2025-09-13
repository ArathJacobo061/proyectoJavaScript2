function cuadrado(valor) {
  setTimeout(() => {
    console.log({ valor, resultado: valor * valor });
  }, Math.random() * 1000);
}

function* generador() {
  console.log("Inicia Generador...");
  yield 0;
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  console.log("Termina Generador...");
}

let gen = generador();
for (let numero of gen) {
  cuadrado(numero);
}
