export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

// ---------------------------------------------------
// 📌 Clase Carrito<T>
// ---------------------------------------------------
export class Carrito<T> {
  private nombre: string;
  private productos: Producto[] = [];
  private contadorId: number = 1;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  // ---------------------------------------------------
  // ✅ S: Esta clase tiene más de una responsabilidad:
  //   - Maneja productos (agregar, eliminar, actualizar)
  //   - También imprime facturas en consola
  //   -> Eso son 2 razones de cambio distintas (gestión de datos y presentación).
  //   Refactor sugerido: separar en 2 clases
  //   (ej: Carrito solo gestiona productos, y otra clase Factura/Reporte imprime).
  // Solución: separar en 2 clases (Carrito solo maneja productos, otra clase Factura/Reporte muestra resultados)
  //
  // ✅ O: Actualmente NO está bien cerrada a modificación.
  //   - Si quiero cambiar el método de impresión (factura en consola → HTML o JSON),
  //     tendría que modificar esta clase.
  //   - Para cumplir O, se podría usar una interfaz IImpresoraFactura
  //     y pasarla por inyección de dependencias, o usar polimorfismo.
  // Solución: usar una interfaz o estrategia de impresión (ej: IFacturaPrinter) y pasarla por composición.

  // ---------------------------------------------------

  // Agregar producto (el id se genera automáticamente)
  agregarProducto(nombre: string, precio: number, cantidad: number): void {
    const nuevo: Producto = {
      id: this.contadorId++,
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

  // Factura con el nombre del carrito
  listarProductos(): void {
    if (this.productos.length === 0) {
      console.log("🛒 El carrito está vacío.");
      return;
    }

    console.log(`\n========= FACTURA (${this.nombre}) =========`);
    let total = 0;
    this.productos.forEach((p, index) => {
      const subtotal = p.precio * p.cantidad;
      total += subtotal;
      console.log(
        `${index + 1}. [ID:${p.id}] ${p.nombre} - $${p.precio} x ${p.cantidad} = $${subtotal}`
      );
    });
    console.log("----------------------------");
    console.log(`TOTAL: $${total}`);
    console.log("===========================\n");
  }
}
