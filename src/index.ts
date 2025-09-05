import { carritoProductos, carritoClientes, carritoVendibles } from "./carrito";

import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function pregunta(mensaje: string): Promise<string> {
  return new Promise((resolve) => rl.question(mensaje, resolve));
}

function menu() {
  console.log(`
==============================
      CARRITO DE COMPRAS
==============================
1. Agregar producto (Union)
2. Agregar cliente (Type normal)
3. Agregar producto vendible (Intersección)
4. Listar productos
5. Listar clientes
6. Listar vendibles
0. Salir
`);
}

async function main() {
  let opcion: string;
  do {
    menu();
    opcion = (await pregunta("Elige una opción: ")).trim();

    switch (opcion) {
      case "1": {
        const id = Number(await pregunta("ID: "));
        const nombre = await pregunta("Nombre: ");
        const precio = Number(await pregunta("Precio: "));
        const tipo = (await pregunta("Tipo (fisico/digital): ")).toLowerCase();

        if (tipo === "fisico") {
          const peso = Number(await pregunta("Peso (kg): "));
          carritoProductos.agregarItem({ id, nombre, precio, tipo: "fisico", peso });
        } else {
          const formato = await pregunta("Formato (ej: PDF): ");
          carritoProductos.agregarItem({ id, nombre, precio, tipo: "digital", formato });
        }
        break;
      }
      case "2": {
        const id = Number(await pregunta("ID cliente: "));
        const nombre = await pregunta("Nombre cliente: ");
        carritoClientes.agregarItem({ id, nombre });
        break;
      }
      case "3": {
        const id = Number(await pregunta("ID producto: "));
        const nombre = await pregunta("Nombre producto: ");
        const precio = Number(await pregunta("Precio: "));
        const stock = Number(await pregunta("Stock disponible: "));
        carritoVendibles.agregarItem({ id, nombre, precio, stock });
        break;
      }
      case "4":
        console.log("\n=== Carrito de productos (Union) ===");
        console.log(carritoProductos.listar());
        break;
      case "5":
        console.log("\n=== Carrito de clientes (Type normal) ===");
        console.log(carritoClientes.listar());
        break;
      case "6":
        console.log("\n=== Carrito de productos vendibles (Intersección) ===");
        console.log(carritoVendibles.listar());
        break;
      case "0":
        console.log("Saliendo...");
        break;
      default:
        console.log("Opción inválida.");
    }
  } while (opcion !== "0");

  rl.close();
}

main();
