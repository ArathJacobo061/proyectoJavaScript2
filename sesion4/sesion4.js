let contador = 0;

function incrementar(){
    let contador = 10; // shadowing 
    contador = ++
    console.log("desde dentro", contador); //11

}

incrementar();
console.log(this);

//this 
//console.log(this);

function mostrarThis(){
    console.log(this);
}
//mostrarThis();

const persona = {
    nombre: "Ricardo",
    saludar: function () {
        console.log(`Hola, soy ${this.nombre}`);
    }
}

persona.saludar(); // "Hola, soy Ricardo"


///////////////////////////////////////////

const objeto = {
    valor: "normal",
    metodoNormal: function () {
        console.log(`Normal:  ${this.valor}`);
    },
    metodoFlechita: () => {
     console.log(`flechita:  ${this.valor}`);
    }
}

objeto.metodoNormal();   // "Normal: normal"
objeto.metodoFlechita(); // "Flecha: undefined"