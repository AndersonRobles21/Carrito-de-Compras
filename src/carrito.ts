import { ProductoUnion, Cliente, Vendible } from "./types";


// Clase genérica con métodos y atributos genéricos
export class Carrito<T> {
  private items: T[] = [];

  // Método genérico para añadir
  agregarItem<U extends T>(item: U): void {
    this.items.push(item);
  }

  // Método genérico para obtener por campo
  obtenerItem<K extends keyof T>(campo: K, valor: T[K]): T | undefined {
    return this.items.find((i) => i[campo] === valor);
  }

  // Método para listar
  listar(): T[] {
    return this.items;
  }
}

// ---------------- Carritos instanciados ----------------
export const carritoProductos = new Carrito<ProductoUnion>();


