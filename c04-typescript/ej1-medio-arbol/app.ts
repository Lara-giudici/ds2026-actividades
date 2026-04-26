function generarAsteriscos(filas: number):string {
    let arbol: string = "";
    for (let i: number = 1; i <= filas; i++) {
        let linea: string = "";

        for (let j = 0; j < i; j++) {
            linea += "*";
        }

        arbol += linea + "\n";
    
    }
    return arbol;
}

const inputFilas = document.getElementById("inputFilas") as HTMLInputElement;
const generar = document.getElementById("botonGenerar") as HTMLButtonElement;
const resultado = document.getElementById("resultado") as HTMLElement;

generar.addEventListener("click", () => {
    const cantidad: number = parseInt(inputFilas.value);
    
    if (!isNaN(cantidad) && cantidad > 0) {
        resultado.innerText = generarAsteriscos(cantidad);
    } else {
        resultado.innerText = "Por favor, ingrese un número válido.";
    }
});