import * as readline from "readline";
import { Carrito } from "./carrito";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let carrito: Carrito;

function iniciarPrograma() {
  rl.question("¿Cómo se llama tu carrito? ", (nombreCarrito: string) => {
    carrito = new Carrito(nombreCarrito);
    console.log(`🛒 Carrito "${nombreCarrito}" creado con éxito!`);
    mostrarMenu();
  });
}

function mostrarMenu() {
  console.log(`
===== 🛒 MENÚ DEL CARRITO =====
1. Agregar producto
2. Eliminar producto
3. Actualizar cantidad
4. Mostrar factura
5. Salir
  `);

  rl.question("Elige una opción: ", (opcion: string) => {
    switch (opcion) {
      case "1":
        rl.question("Nombre del producto: ", (nombre: string) => {
          rl.question("Precio: ", (precioStr: string) => {
            rl.question("Cantidad: ", (cantidadStr: string) => {
              const precio = parseFloat(precioStr);
              const cantidad = parseInt(cantidadStr, 10);
              carrito.agregarProducto(nombre, precio, cantidad);
              mostrarMenu();
            });
          });
        });
        break;

      case "2":
        rl.question("ID del producto a eliminar: ", (idStr: string) => {
          const id = parseInt(idStr, 10);
          carrito.eliminarProducto(id);
          mostrarMenu();
        });
        break;

      case "3":
        rl.question("ID del producto a actualizar: ", (idStr: string) => {
          rl.question("Nueva cantidad: ", (cantidadStr: string) => {
            const id = parseInt(idStr, 10);
            const cantidad = parseInt(cantidadStr, 10);
            carrito.actualizarCantidad(id, cantidad);
            mostrarMenu();
          });
        });
        break;

      case "4":
        carrito.listarProductos();
        mostrarMenu();
        break;

      case "5":
        console.log("👋 Saliendo del programa...");
        rl.close();
        break;

      default:
        console.log("❌ Opción no válida");
        mostrarMenu();
        break;
    }
  });
}

iniciarPrograma();
