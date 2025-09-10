import * as readline from "readline";
import { Carrito, CarritoProductos } from "./carrito";
import { Producto, Cliente, ProductoUnion, Vendible } from "./types";

// ==================================================
// 🔹 Ejemplo para mostrar genéricos y tipos
// ==================================================
const carritoGenerico = new Carrito<Producto>();

carritoGenerico.agregarProducto({
  id: 1,
  nombre: "Laptop",
  precio: 3000,
  cantidad: 1,
});

carritoGenerico.listarProductos();

// ✅ Type normal
const cliente: Cliente = {
  id: 101,
  nombre: "Andrey Llanos",
};
console.log("👤 Cliente:", cliente);

// ✅ Unión de tipos
const productoFisico: ProductoUnion = {
  id: 2,
  nombre: "Libro",
  precio: 50000,
  cantidad: 1,
  tipo: "fisico",
  peso: 0.5,
};

const productoDigital: ProductoUnion = {
  id: 3,
  nombre: "E-book",
  precio: 20000,
  cantidad: 1,
  tipo: "digital",
  formato: "PDF",
};

console.log("📘 Producto físico:", productoFisico);
console.log("💾 Producto digital:", productoDigital);

// ✅ Intersección de tipos
const productoVendible: Vendible = {
  id: 4,
  nombre: "Mouse",
  precio: 80000,
  cantidad: 2,
  stock: 10,
};

console.log("🛒 Producto con stock:", productoVendible);

// ==================================================
// 🔹 Carrito real con factura (interactivo)
// ==================================================

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Múltiples carritos identificados por nombre
type CarritoConNombre = {
  id: number;
  nombre: string;
  carrito: CarritoProductos;
};
const carritos: CarritoConNombre[] = [];
let carritoSeleccionado: CarritoConNombre | null = null;
let contadorCarritoId = 1;

function mostrarMenu() {
  console.log(`
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
0. Salir
==============================`);
}

function preguntar() {
  mostrarMenu();
  rl.question("Elige una opción: ", (opcion) => {
    switch (opcion) {
      case "1": // Crear nuevo carrito
        rl.question("Nombre para el nuevo carrito: ", (nombre) => {
          if (!nombre.trim()) {
            console.log("❌ El nombre no puede estar vacío.");
            preguntar();
            return;
          }
          if (carritos.some((c) => c.nombre === nombre)) {
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
              const precio = parseFloat(precioStr);
              const cantidad = parseInt(cantidadStr);
              carritoSeleccionado!.carrito.agregarProducto(
                nombre,
                precio,
                cantidad
              );
              preguntar();
            });
          });
        });
        break;
      case "3": // Listar productos
        if (!carritoSeleccionado) {
          console.log("❌ Selecciona un carrito primero.");
        } else {
          carritoSeleccionado.carrito.listarProductos();
        }
        preguntar();
        break;

      case "4": // Eliminar producto
        if (!carritoSeleccionado) {
          console.log("❌ Selecciona un carrito primero.");
          preguntar();
          return;
        }
        rl.question("ID del producto a eliminar: ", (idStr) => {
          carritoSeleccionado!.carrito.eliminarProducto(parseInt(idStr));
          preguntar();
        });
        break;
      case "5": // Actualizar cantidad
        if (!carritoSeleccionado) {
          console.log("❌ Selecciona un carrito primero.");
          preguntar();
          return;
        }
        rl.question("ID del producto a actualizar: ", (idStr) => {
          rl.question("Nueva cantidad: ", (cantidadStr) => {
            carritoSeleccionado!.carrito.actualizarCantidad(
              parseInt(idStr),
              parseInt(cantidadStr)
            );
            preguntar();
          });
        });
        break;

      case "6": // Seleccionar carrito
        if (carritos.length === 0) {
          console.log("❌ No hay carritos creados.");
          preguntar();
          return;
        }
        rl.question("Nombre del carrito a seleccionar: ", (nombre) => {
          const encontrado = carritos.find((c) => c.nombre === nombre);
          if (!encontrado) {
            console.log("❌ Carrito no encontrado.");
          } else {
            carritoSeleccionado = encontrado;
            console.log(`✅ Carrito '${nombre}' seleccionado.`);
          }
          preguntar();
        });
        break;

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

      case "0":
        console.log("Gracias por usar nuestra tienda online Vuelve pronto.");
        rl.close();
        break;

      default:
        console.log("❌ Opción no válida.");
        preguntar();
    }
  });
}

preguntar();
