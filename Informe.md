🧁Laura Orejuela🧁

# Informe SOLID (S y O) — Proyecto: Carrito de Compras

## 1. Contexto
Este proyecto implementa un sistema simple de *carrito de compras* en TypeScript.  
El usuario puede crear un carrito, añadir productos, y gestionarlos mediante un menú interactivo en consola.

Módulos relevantes:
- Carrito: clase principal que gestiona los productos.
- Producto: estructura que representa un producto (nombre, precio, cantidad).
- index.ts: punto de entrada con la interacción por consola.

## 2. Inventario de Clases Analizadas
- Clase 1: src/carrito.ts — Carrito  
- Clase 2: src/producto.ts — Producto

## 3. Análisis por Clase

### 3.1 src/carrito.ts — Carrito
Responsabilidad declarada: Gestionar productos en el carrito (agregar, eliminar, listar, calcular total).

*S (Single Responsibility)*
- Diagnóstico: ❌ *No cumple totalmente.*
- Justificación: Actualmente, Carrito mezcla varias responsabilidades:
  - Lógica de negocio (gestión de productos).
  - Cálculo de totales.
  - Posiblemente interacción directa con consola en algunos métodos.
- Riesgo: Acoplamiento fuerte y dificultad para mantener/pruebas unitarias.
🧁 Laura Orejuela 🧁


🔴🔴Anderson Topaga🔴🔴
*O (Open/Closed)*
- Diagnóstico: ❌ *No cumple.*
- Justificación: La lógica de cálculo (ej. total con descuentos, impuestos, promociones) está fija en la clase.  
  Para extender habría que modificar el código directamente.

*Refactor propuesto*
``ts
 Antes
class Carrito {
  private productos: Producto[] = [];

  agregar(producto: Producto) { /* ... */ }
  eliminar(id: number) { /* ... */ }
  calcularTotal(): number { /* lógica fija */ }
  mostrar() { console.log(this.productos); }
}

// Después (aplicando S y O)
interface EstrategiaPrecio {
  calcular(productos: Producto[]): number;
}

class PrecioSimple implements EstrategiaPrecio {
  calcular(productos: Producto[]) {
    return productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  }
}

class Carrito {
  constructor(
    private estrategia: EstrategiaPrecio,
    private productos: Producto[] = []
  ) {}

  agregar(producto: Producto) { this.productos.push(producto); }
  eliminar(id: number) { this.productos = this.productos.filter(p => p.id !== id); }
  calcularTotal() { return this.estrategia.calcular(this.productos); }
}


🔴🔴Anderson Topaga🔴🔴 
🧿Andrey Llanos🧿
src/producto.ts — Producto

Responsabilidad declarada: Representar un producto con atributos básicos.

S (Single Responsibility)

Diagnóstico: ✅ Cumple.

Justificación: Solo representa datos de un producto.
Única razón de cambio: modificación de la estructura de datos de un producto.

O (Open/Closed)

Diagnóstico: ✅ Cumple.

Justificación: Se puede extender agregando más propiedades mediante interfaces o herencia, sin modificar el código original.

4. Conclusiones

Carrito necesita refactor para separar responsabilidades y permitir extensibilidad.

Producto ya cumple con S y O.

Propuesta: aplicar estrategias de precio y repositorios para separar la persistencia de la lógica de negocio, siguiendo SOLID.
🧿Andrey Llanos🧿
