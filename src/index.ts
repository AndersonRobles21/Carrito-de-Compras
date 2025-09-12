import * as readline from "readline";
import { Carrito } from "./carrito";
import { Cliente, ProductoUnion, Vendible } from "./types";
// 🔹 Ejemplo para mostrar genéricos y tipos

// SRP (Single Responsibility): ✅ CUMPLE
// - Tiene una única responsabilidad: administrar productos (agregar, eliminar, listar, actualizar).
// - Solo debería cambiar si cambia la lógica del carrito.

//OCP (Open/Closed): ❌ NO CUMPLE
// - Está acoplada a la consola porque usa console.log dentro de métodos (ej: listarProductos()).
// - Si quisiera usarse en un frontend web o API, habría que modificar la clase en lugar de extenderla.
// PROPUESTA DE MEJORA: devolver datos en lugar de imprimir, y usar genéricos para aceptar distintos tipos de productos.
const carritoGenerico = new Carrito("caarito");



carritoGenerico.agregarProducto("Laptop", 3000, 1);

carritoGenerico.listarProductos();

// ✅ Type normal
// SRP: ✅ CUMPLE - Representa únicamente un cliente (id y nombre).
// OCP: ✅ CUMPLE - Si quiero agregar nuevos tipos de cliente (VIP, Corporativo) lo puedo hacer sin modificar el original.
const cliente: Cliente = {
  id: 101,
  nombre: "Esteban",
};
console.log("👤 Cliente:", cliente);

// ✅ Unión de tipos
// ✅ TYPE ProductoUnion
// SRP: ✅ CUMPLE - Representa un producto que puede ser físico o digital.
// OCP: ✅ CUMPLE - Puedo crear nuevas variantes de producto sin modificar este tipo, gracias a la unión de tipos.
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
// SRP: ✅ CUMPLE - Representa un producto que puede venderse y tiene stock.
// OCP: ✅ CUMPLE - Si mañana agrego nuevos campos (descuentos, fecha de vencimiento) lo puedo hacer extendiendo el tipo.
const productoVendible: Vendible = {
  id: 4,
  nombre: "Mouse",
  precio: 80000,
  cantidad: 2,
  stock: 10,
};

console.log("🛒 Producto con stock:", productoVendible);


// 🔹 Carrito real con factura (interactivo)


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Múltiples carritos identificados por nombre
type CarritoConNombre = {
  id: number;
  nombre: string;
  carrito: Carrito;
};
const carritos: CarritoConNombre[] = [];
let carritoSeleccionado: CarritoConNombre | null = null;
let contadorCarritoId = 1;

function mostrarMenu() {
  console.log(`
==============================
   🛒 Bienvenido a BartShop
==============================
Carrito actual: ${
    carritoSeleccionado ? carritoSeleccionado.nombre : "Aún no has creado un carrito, créalo"
  }
------------------------------
1. Crear nuevo carrito
2. Agregar producto al carrito seleccionado
3. Lista de productos del carrito seleccionado
4. Eliminar producto del carrito seleccionado
5. Actualizar cantidad del producto
6. Seleccionar carrito por nombre
7. Lista de todos los carritos
8. Eliminar carrito por nombre
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
            carrito: new Carrito(nombre),
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

      case "0": // Salir
        console.log("👋 ¡Gracias por usar BartShop!");
        rl.close();
        break;
      default:
        console.log("❌ Opción no válida.");
        preguntar();
    }
  });
}

preguntar();
