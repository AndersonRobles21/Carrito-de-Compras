🧁 Laura Orejuela 🧁

 Informe SOLID (S y O) — Proyecto: Carrito de Compras
1. Contexto
Este proyecto implementa un sistema simple de carrito de compras en TypeScript.
El usuario puede crear un carrito, añadir productos y gestionarlos mediante un menú interactivo en consola.

Módulos relevantes:

Carrito: clase principal que gestiona los productos.

Producto: estructura que representa un producto (nombre, precio, cantidad).

index.ts: punto de entrada con la interacción por consola.

2. Inventario de Clases Analizadas

Clase 1: src/carrito.ts — Carrito

Clase 2: src/producto.ts — Producto

3. Análisis por Clase
3.1 src/carrito.ts — Carrito

Responsabilidad declarada: Gestionar productos en el carrito (agregar, eliminar, listar, calcular total).

S (Single Responsibility)

Diagnóstico: ❌ No cumple.

Justificación: La clase gestiona múltiples responsabilidades:

Maneja la lista de productos.

Calcula el total del carrito.

Se encarga de formatear el listado para mostrarlo en consola.

Riesgo si se mantiene así: Aumento del acoplamiento y dificultad para probar cada parte por separado.

O (Open/Closed)

Diagnóstico: ❌ No cumple.

Justificación: La lógica de cálculo y de presentación están fijas. Para extender precios con descuentos o cambiar el formato de impresión habría que modificar la clase directamente.

Refactor propuesto (antes → después)

3.2 src/producto.ts — Producto

Responsabilidad declarada: Representar un producto (nombre, precio, cantidad).

S (Single Responsibility)

Diagnóstico: ✅ Cumple.

Justificación: Solo representa datos de un producto. No mezcla lógicas adicionales.

O (Open/Closed)

Diagnóstico: ✅ Cumple.
```ts
import * as readline from "readline";
import { IEntradaUsuario } from "./interfaces";

export class ConsolaEntradaUsuario implements IEntradaUsuario {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  preguntar(pregunta: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(pregunta, (respuesta) => resolve(respuesta));
    });
  }

  cerrar() {
    this.rl.close();
  }
}
```
Justificación: Puede extenderse fácilmente (ej. añadiendo un campo de categoría o descuento) sin modificar la estructura existente.

4. Conclusiones

La clase Carrito necesita refactor para separar responsabilidades y permitir extensibilidad.

La clase Producto ya cumple con S y O.

Propuesta: aplicar estrategias de precios y formateadores de salida para seguir SOLID.
