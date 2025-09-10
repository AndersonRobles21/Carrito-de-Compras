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
<<<<<<< HEAD
==============================
   🛒 Bienevido a BartShop
==============================
Carrito actual: ${
    carritoSeleccionado ? carritoSeleccionado.nombre : "Aun no has creado un carrito crealo"
  }
------------------------------
1. Crear nuevo carrito
2. Agregar producto al carrito seleccionado
3. Lista de productos del carrito seleccionado
4. Eliminar producto del carrito seleccionado
5. actualizar cantidad del producto
6. Seleccionar carrito por nombre
7. Lista de todos los carritos
8. Eliminar carrito por nombre
0. Salir
==============================`);
}
=======
===== 🛒 MENÚ DEL CARRITO =====
1. Agregar producto
2. Eliminar producto
3. Actualizar cantidad
4. Mostrar factura
5. Salir
  `);
>>>>>>> fbade2463d2c18339e8be4a5e43b9c7309db3b6e

  rl.question("Elige una opción: ", (opcion: string) => {
    switch (opcion) {
<<<<<<< HEAD
      case "1": // Crear nuevo carrito
        rl.question("Nombre para el nuevo carrito: ", (nombre) => {
          if (!nombre.trim()) {
            console.log("❌ El nombre no puede estar vacío.");
            preguntar();
            return;
          }
          if (carritos.some((si) => si.nombre === nombre)) {
            console.log("❌ Ya existe un carrito con ese nombre.");
            preguntar();
            return;
          }
          const nuevoCarrito: CarritoConNombre = {
            id: contadorCarritoId++,
            nombre,
            carrito: new CarritoProductos(),
          };
          carritos.push(nuevoCarrito);
          carritoSeleccionado = nuevoCarrito;
          console.log(`✅ Bienvenido '${nombre}'.`);
          preguntar();
        });
        break;
      case "2": // Agregar producto
        if (!carritoSeleccionado) {
          console.log("❌ Selecciona un carrito primero.");
          preguntar();
          return;
        }
        rl.question("Nombre del producto: ", (nombre) => {
          rl.question("Precio: ", (precioStr) => {
            rl.question("Cantidad: ", (cantidadStr) => {
=======
      case "1":
        rl.question("Nombre del producto: ", (nombre: string) => {
          rl.question("Precio: ", (precioStr: string) => {
            rl.question("Cantidad: ", (cantidadStr: string) => {
>>>>>>> fbade2463d2c18339e8be4a5e43b9c7309db3b6e
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

<<<<<<< HEAD
      case "7": // Listar todos los carritos
        if (carritos.length === 0) {
          console.log("❌ No hay carritos creados.");
        } else {
          console.log("\nCarritos existentes:");
          carritos.forEach((c) => {
            console.log(`- [${c.id}] ${c.nombre}`);
          });
        }
        preguntar();
        break;


      case "8": // Eliminar carrito por nombre
        if (carritos.length === 0) {
          console.log("❌ No hay carritos creados.");
          preguntar();
          return;
        }
        rl.question("Nombre del carrito a eliminar: ", (nombre) => {
          const index = carritos.findIndex((c) => c.nombre === nombre);
          if (index === -1) {
            console.log("❌ Carrito no encontrado.");
          } else {
            carritos.splice(index, 1);
            console.log(`🗑️ Carrito '${nombre}' eliminado.`);
          }
          preguntar();
        });
        break;

      case "0":
        console.log("Gracias por usar nuestra tienda online Vuelve pronto.");
=======
      case "5":
        console.log("👋 Saliendo del programa...");
>>>>>>> fbade2463d2c18339e8be4a5e43b9c7309db3b6e
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
