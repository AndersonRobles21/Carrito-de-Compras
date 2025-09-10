export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export class Carrito {
  private productos: Producto[] = [];
  private idCounter: number = 1;

  // Agregar producto (el id se genera automáticamente)
  agregarProducto(nombre: string, precio: number, cantidad: number): void {
    const nuevo: Producto = {
      id: this.idCounter++,
      nombre,
      precio,
      cantidad,
    };
    this.productos.push(nuevo);
    console.log(`✅ Producto agregado: ${nombre}`);
  }

  // Eliminar producto por ID
  eliminarProducto(id: number): void {
    this.productos = this.productos.filter(p => p.id !== id);
    console.log(`🗑️ Producto con id ${id} eliminado`);
  }

  // Actualizar cantidad
  actualizarCantidad(id: number, nuevaCantidad: number): void {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      producto.cantidad = nuevaCantidad;
      console.log(`🔄 Cantidad actualizada para ${producto.nombre}`);
    } else {
      console.log(`⚠️ No se encontró el producto con id ${id}`);
    }
  }

  // Mostrar productos
  mostrarProductos(): void {
    console.log("\n📋 Lista de productos:");
    if (this.productos.length === 0) {
      console.log("El carrito está vacío.\n");
      return;
    }
    this.productos.forEach(p =>
      console.log(
        `ID: ${p.id} | ${p.nombre} | $${p.precio} | Cantidad: ${p.cantidad}`
      )
    );
    console.log();
  }
}
