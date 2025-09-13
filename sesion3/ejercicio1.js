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

    // 5. filtrar duplicado usando filter + indexOf
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

// Casos de prueba
quitarDuplicados();
quitarDuplicados({});
quitarDuplicados([]);
quitarDuplicados([2]);
quitarDuplicados(["10", "X", "X", "2", "10", 10, true, true]);
