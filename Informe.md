Informe SOLID (S y O) — Proyecto: Carrito de Compras

Contexto
Este proyecto implementa un sistema simple de carrito de compras en TypeScript.
El usuario puede crear un carrito, añadir productos, y gestionarlos mediante un menú interactivo en consola.

Módulos relevantes:
Carrito: clase principal que gestiona los productos.
Producto: estructura que representa un producto (nombre, precio, cantidad).
index.ts: punto de entrada con la interacción por consola.
2. Inventario de Clases Analizadas
Clase 1: src/carrito.ts — Carrito
Análisis por Clase
src/carrito.ts
Cumple
Este archivo tiene una sola responsabilidad: gestionar la interacción por consola.
No guarda datos ni implementa lógica de negocio.
Solo recibe datos del usuario, llama a métodos del carrito y muestra resultados.

Evaluación según OCP (Open/Closed Principle)

🔴 No cumple del todo
Aunque este archivo en sí está bien, carritoProductos (probablemente en carrito.ts) sigue devolviendo datos con console.log o cadenas formateadas.
Si mañana quisieras mostrar los productos en un frontend web o devolverlos en formato JSON para una API, tendrías que modificar carrito.ts.
💡 Propuesta de mejora para cumplir OCP:
export class Carrito {
private productos: any[] = [];
agregarItem(producto: any) {
this.productos.push(producto);
}
listar(): any[] {
// ✅ Devuelve los datos sin preocuparse por cómo se muestran
return this.productos;
}
}
export const carritoProductos = new Carrito();
Hacer que carritoProductos.listar() devuelva un arreglo, no un string con formato.
Formatear e imprimir el resultado aquí (en el index), no dentro de carrito.ts.
Beneficio:
carrito.ts no depende de console.log.
Ahora es reutilizable en web, API REST, aplicación móvil o consola, sin necesidad de modificar la lógica.
Cumples el principio OCP porque puedes cambiar la forma en que presentas los datos sin tocar la clase Carrito.
Ventajas de Este Diseño
Alta Cohesión:
carrito.ts solo gestiona productos.
index.ts solo se encarga de entrada/salida por consola.
Bajo Acoplamiento:
Si cambias la UI (por ejemplo, pasas de consola a React), no tocas carrito.ts, solo index.ts.
Extensibilidad:
Puedes agregar nuevas formas de mostrar datos (resumen, totales, factura) sin tocar la clase del carrito.
Conclusión
Mejoras para cumplir completamente con OCP:
Quitar cualquier console.log o console.table de carrito.ts.
Hacer que listar() devuelva datos puros.
Centralizar la lógica de impresión en index.ts.
