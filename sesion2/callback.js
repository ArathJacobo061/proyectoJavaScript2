function cuadradoCallback(value, callback) {
    setTimeout(() => {
        callback(value, value * value);
    }, Math.random() * 1000);
}
cuadradoCallback(0, (valor, resultado) => {
    console.log("Inicia Callback");
    console.log(`callback: ${valor}, ${resultado}`);
    cuadradoCallback(1, (valor, resultado) => {
        console.log(`callback: ${valor}, ${resultado}`);
        cuadradoCallback(2, (valor, resultado) => {
            console.log(`callback: ${valor}, ${resultado}`);
            cuadradoCallback(3, (valor, resultado) => {
                console.log(`callback: ${valor}, ${resultado}`);
                cuadradoCallback(4, (valor, resultado) => {
                    console.log(`callback: ${valor}, ${resultado}`);
                    cuadradoCallback(5, (valor, resultado) => {
                        console.log(`callback: ${valor}, ${resultado}`);
                    });
                });
            });
        });
    });
});