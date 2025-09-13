class pelicula {
    //arreglo con generos aceptados
    static listaGeneros = [
        "Acción", "Adultos", "Animación", "Autobiografía", "Aventura", "Ciencia ficción", "Cine negro", "Comedia", "Concursos de televisión", "Crimen",
        "Deportes", "Documental", "Drama", "Familiar", "Fantasía", "Guerra", "Historia", "Musicales", "Misterio", "Noticias", "Películas de vaqueros", "Programa de entrevistas",
        "Reality shows", "Romance", "Suspenso", "Terror"

    ];

    constructor({ id, titulo, director, estreno, pais, generos, calificacion }) {


        //administracion de atributos
        this.id = id;
        this.titulo = titulo;
        this.director = director;
        this.estreno = estreno;
        this.pais = pais;
        this.generos = generos;
        this.calificacion = calificacion;

        //validacions 
        this.validarIMDB(this.id);
        this.validarTitulo(this.titulo);
        this.validarDirector(this.director);
        this.validarEstreno(this.estreno);
        this.validarPais(this.pais);
        this.validarGeneros(this.generos);
        this.validarCalificacion(this.calificacion);
    }
    // 8. Validación de cadenas
    validarCadena(propiedad, valor) {
        if (!valor) {
            console.warn(`${propiedad} "${valor}" está vacío`);

        }
        if (typeof valor !== "string") {
            console.warn(`${propiedad} "${valor}" ingresado no es una cadena de texto`);
            return false;
        }
        return true;
    }

    // 9. Validación del formato de ID IMDB
    validarIMDB(id) {
        if (this.validarCadena("IMBD ID", id)) {
            if (!(/^([a-z]){2}([0-9]){7}$/.test(id))) {
                console.log(`IMBD id ${id} no es válido, debe tener nueve caracteres, los dos primeros letras y los siete restantes números.`);
            }
        }
    }

    // 10. Validación de longitud de cadena
    validarLongitudCadena(propiedad, valor, longitud) {
        if (valor.length > longitud) {
            console.error(`${propiedad} "${valor}" excede el número de caracteres permitidos (${longitud}).`);
            return false;
        }
        return true;
    }

    //11. validad titulo
    validarTitulo(titulo) {
        if (this.validarCadena("titulo", titulo) && (this.validarLongitudCadena("titulo", titulo, 100))) {
            return true
        }
    }


    //12.validar director
    validarDirector(director) {
        if (this.validarCadena("director", director) && (this.validarLongitudCadena("director", director, 50))) {
            return true
        }
    }

    //14.validar numeros
    validarNumero(propiedad, valor) {
        if (valor === undefined || valor === null) {
            console.warn(`${propiedad} "${valor}"ingresado no es un numero`);
            return false;
        }
        return true;
    }

    //13.agregar validaciones al constructor

    //15. validar ano de estreno 
    validarEstreno(estreno) {
        if (!Number.isInteger(estreno) || !/^\d{4}$/.test(estreno.toString())) {
            throw new Error("el ano de estreno debe ser un numero entero de 4 digitos.");
        }
    }

    // 16. Validar arreglo (país o géneros)
    validarArreglo(propiedad, valor) {
        if (!valor) {
            console.warn(`${propiedad} "${valor}" está vacío`);
            return false;
        }
        if (!(valor instanceof Array)) {
            console.warn(`${propiedad} "${valor}" no es un arreglo`);
            return false;
        }
        if (valor.length === 0) {
            console.warn(`${propiedad} "${valor}" no tiene datos`);
            return false;
        }
        for (let item of valor) {
            if (typeof item != "string") {
                console.error(`${propiedad} contiene un valor que no es cadena: ${item}`);
                return false;
            }
        }
        return true;
    }

    //17. validar pais
    validarPais(pais) {
        this.validarArreglo("pais", pais);

    }

    //18. metodos estaticos para generos aceptados
    static generosAceptados() {
        console.info(`los generos aceptados son ${pelicula.listaGeneros.join(",")}`);
    }

    //19. validar generos
    validarGeneros(generos) {
        if (this.validarArreglo("Generos", generos)) {
            for (let gen of generos) {
                if (!pelicula.listaGeneros.includes(gen)) {
                    console.error(`Genero "${gen}"no es valido. debe ser uno de los generos aceptados: `);
                    pelicula.generosAceptados();
                }
            }
        }

    }

    //20. validar calificacion entre 0 y 10, con decimales de una posicion
    validarCalificacion(calificacion) {
        if (this.validarNumero("calificacion", calificacion)) {
            if (calificacion < 0 && calificacion > 10) {
                console.error(`la calificacion debe estar entre 0 y 10`);

            } else {
                this.calificacion = Number(calificacion.toFixed(1));
            }
        }

    }

    //21. imprimir ficha tecnica
    fichaTecnica() {
        console.info(`
            === FICHA TECNICA ===
            titulo: ${this.titulo}
            director: ${this.director}
            estreno: ${this.estreno}
            pais: ${this.pais}
            generos: ${this.generos}
            calificacion: ${this.calificacion}
            ==================================
            `);
    }
}

//ejemplo para validar errores:
const peliculaDemo = new pelicula({
    id: "pd1234567",
    titulo: "una pelicula de prueba.",
    director: "homero simpson",
    estreno: 1998,
    pais: ["mexico"],
    generos: ["Aventura", "Comedia"],
    calificacion: 8.1





});

peliculaDemo.fichaTecnica();

const peliculasArr = [
    {
        id: "pd1234567",
        titulo: "una pelicula de prueba.",
        director: "homero simpson",
        estreno: 1998,
        pais: ["mexico"],
        generos: ["Aventura", "Comedia"],
        calificacion: 8.1
    }
];

peliculasArr.forEach(p => {
    const peli = new pelicula(p);
    peli.fichaTecnica();
});

pelicula.generosAceptados();
