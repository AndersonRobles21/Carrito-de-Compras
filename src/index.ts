import { carritoProductos } from "./carrito";
import * as readline from "readline";

// Este archivo implementa un menú interactivo para gestionar un carrito de compras simple.
// El usuario puede agregar productos (físico o digital) y listarlos usando la terminal.

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function pregunta(mensaje: string): Promise<string> {
  return new Promise((resolve) => rl.question(mensaje, resolve));
}

// Muestra el menú principal en consola
function menu() {
  console.clear();
  console.log("==============================");
  console.log("      CARRITO DE COMPRAS");
  console.log("==============================");
  console.log("1. Agregar producto");
  console.log("2. Listar productos");
  console.log("0. Salir");
  console.log("==============================\n");
}

async function main() {
  let opcion: string;
  do {
    menu();
  // Solicita al usuario una opción del menú
  opcion = (await pregunta("Elige una opción: ")).trim();

    switch (opcion) {
      case "1": {
        // Agregar un producto al carrito (físico o digital)
        const id = Number(await pregunta("ID: "));
        const nombre = await pregunta("Nombre: ");
        const precio = Number(await pregunta("Precio: "));
        const tipo = (await pregunta("Tipo (fisico/digital): ")).toLowerCase();
        if (tipo === "fisico") {
          const peso = Number(await pregunta("Peso (kg): "));
          carritoProductos.agregarItem({ id, nombre, precio, tipo: "fisico", peso });
        } else if (tipo === "digital") {
          const formato = await pregunta("Formato (ej: PDF): ");
          carritoProductos.agregarItem({ id, nombre, precio, tipo: "digital", formato });
        } else {
          console.log("Tipo de producto no válido. Solo se permite 'fisico' o 'digital'.");
          break;
        }
        console.log("Producto agregado correctamente.");
        await pregunta("Presiona Enter para continuar...");
        break;
      }
      case "2": {
        // Listar productos del carrito
        console.log("\n=== Carrito de productos ===");
        console.log(carritoProductos.listar());
        await pregunta("Presiona Enter para continuar...");
        break;
      }
      case "0":
        // Salir del programa
        console.log("Gracias por usar el carrito de compras. ¡Hasta luego!");
        break;
      default:
        // Opción inválida
        console.log("Opción inválida.");
        await pregunta("Presiona Enter para continuar...");
    }
  } while (opcion !== "0");

  rl.close();
}

main();
