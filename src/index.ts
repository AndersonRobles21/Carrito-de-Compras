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

const carrito = new CarritoProductos();

function mostrarMenu() {
  console.log(`
==============================
       🛒 CARRITO DE COMPRAS
==============================
1. Agregar producto
2. Listar productos (Factura)
3. Eliminar producto
4. Actualizar cantidad
0. Salir
==============================`);
}

function preguntar() {
  mostrarMenu();
  rl.question("Elige una opción: ", (opcion) => {
    switch (opcion) {
      case "1":
        rl.question("Nombre del producto: ", (nombre) => {
          rl.question("Precio: ", (precioStr) => {
            rl.question("Cantidad: ", (cantidadStr) => {
              const precio = parseFloat(precioStr);
              const cantidad = parseInt(cantidadStr);
              carrito.agregarProducto(nombre, precio, cantidad);
              preguntar();
            });
          });
        });
        break;

      case "2":
        carrito.listarProductos();
        preguntar();
        break;

      case "3":
        rl.question("ID del producto a eliminar: ", (idStr) => {
          carrito.eliminarProducto(parseInt(idStr));
          preguntar();
        });
        break;

      case "4":
        rl.question("ID del producto a actualizar: ", (idStr) => {
          rl.question("Nueva cantidad: ", (cantidadStr) => {
            carrito.actualizarCantidad(
              parseInt(idStr),
              parseInt(cantidadStr)
            );
            preguntar();
          });
        });
        break;

      case "0":
        console.log("Gracias por usar el carrito de compras. ¡Hasta luego!");
        rl.close();
        break;

      default:
        console.log("❌ Opción no válida.");
        preguntar();
    }
  });
}

preguntar();
