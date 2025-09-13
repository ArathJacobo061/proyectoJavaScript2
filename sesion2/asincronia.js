// parte síncrona
(function () {
    console.log("Código síncrono");
    console.log("Inicio");
    function dos() {
        console.log("Dos");
    }
    function uno() {
        console.log("Uno");
        dos();
        console.log("Tres");
    }
    uno();
    console.log("Fin.");
})();

// Parte asincrona
(function () {
    console.log("Código asincrono");
    console.log("Inicio");

    function dos() {
        console.log("Dos");
    }

    function uno() {
        setTimeout(function () {
            console.log("Uno");
        }, 0);
        dos();
        console.log("Tres");
    }

    uno();
    console.log("Fin.");
})();

