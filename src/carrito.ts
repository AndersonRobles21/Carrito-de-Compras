import { Producto } from "./types";

// ------------------------------
// 🛒 Carrito genérico
// ------------------------------
export class Carrito<T> {
  private productos: T[] = [];
  private contadorId: number = 1;

  agregarProducto(producto: T): void {
    this.productos.push(producto);
    console.log("✅ Producto agregado al carrito genérico.");
  }

  listarProductos(): void {
    console.log("📦 Productos en el carrito genérico:", this.productos);
  }

  getItems(): T[] {
    return this.productos;
  }
}

// ------------------------------
// 🛒 Carrito real con factura
// ------------------------------
export class CarritoProductos {
  private productos: Producto[] = [];
  private contadorId: number = 1;

  // Agregar producto con validaciones
  agregarProducto(nombre: string, precio: number, cantidad: number): void {
    if (!nombre || precio <= 0 || cantidad <= 0) {
      console.log("❌ Datos inválidos. Verifique nombre, precio y cantidad.");
      return;
    }

    const producto: Producto = {
      id: this.contadorId++,
      nombre,
      precio,
      cantidad,
    };
    this.productos.push(producto);
    console.log(`✅ Producto agregado: ${nombre} (x${cantidad})`);
  }

  // Listar productos y factura
  listarProductos(): void {
    if (this.productos.length === 0) {
      console.log("🛒 El carrito está vacío.");
      return;
    }

    console.log("\n========= FACTURA =========");
    let total = 0;
    this.productos.forEach((p, index) => {
      const subtotal = p.precio * p.cantidad;
      total += subtotal;
      // Mostrar el ID del producto en la factura
      console.log(
        `${index + 1}. [ID:${p.id}] ${p.nombre} - $${p.precio} x ${p.cantidad} = $${subtotal}`
      );
    });
    console.log("----------------------------");
    console.log(`TOTAL: $${total}`);
    console.log("============================\n");
  }

  // Eliminar producto
  eliminarProducto(id: number): void {
    const index = this.productos.findIndex((p) => p.id === id);
    if (index === -1) {
      console.log("❌ Producto no encontrado.");
      return;
    }
    const eliminado = this.productos.splice(index, 1)[0];
    console.log(`🗑️ Producto eliminado: ${eliminado.nombre}`);
  }

  // Actualizar cantidad
  actualizarCantidad(id: number, nuevaCantidad: number): void {
    if (nuevaCantidad <= 0) {
      console.log("❌ La cantidad debe ser mayor a 0.");
      return;
    }
    const producto = this.productos.find((p) => p.id === id);
    if (!producto) {
      console.log("❌ Producto no encontrado.");
      return;
    }
    producto.cantidad = nuevaCantidad;
    console.log(`✏️ Cantidad actualizada: ${producto.nombre} (x${nuevaCantidad})`);
  }
}
