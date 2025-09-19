                                                  Informe SOLID (S y O) — Proyecto: Carrito de Compras
1. Contexto
Este proyecto implementa un sistema simple de carrito de compras en TypeScript.
El usuario puede crear un carrito, añadir Type y gestionarlos mediante un menú interactivo en consola.

Módulos relevantes:

Carrito: clase principal que gestiona los Type.

Type: estructura que representa un Type (nombre, precio, cantidad).

index.ts: punto de entrada con la interacción por consola.

2. Inventario de Clases Analizadas

                                                     Clase 1: src/carrito.ts — Carrito

                                                         Clase 2: src/Type.ts — Type

3. Análisis por Clase

                                                            3.1 src/carrito.ts — Carrito

Responsabilidad declarada: Gestionar Type en el carrito (agregar, eliminar, listar, calcular total).

                                                  S (Single Responsibility)

Diagnóstico: ❌ No cumple.

Justificación: La clase gestiona múltiples responsabilidades:

Maneja la lista de Type.

Calcula el total del carrito.

Se encarga de formatear el listado para mostrarlo en consola.

Riesgo si se mantiene así: Aumento del acoplamiento y dificultad para probar cada parte por separado.

                                             O (Open/Closed)

Diagnóstico: ❌ No cumple.

Justificación: La lógica de cálculo y de presentación están fijas. Para extender precios con descuentos o cambiar el formato de impresión habría que modificar la clase directamente.

Refactor propuesto (antes → después)

3.2 src/type.ts — Type

Responsabilidad declarada: Representar un Type (nombre, precio, cantidad).

                                    S (Single Responsibility)

Diagnóstico: ✅ Cumple.

Justificación: Solo representa datos de un type. No mezcla lógicas adicionales.

                                        O (Open/Closed)

Diagnóstico: ✅ Cumple.

Justificación: Puede extenderse fácilmente (ej. añadiendo un campo de categoría o descuento) sin modificar la estructura existente.

4. Conclusiones

La clase Carrito necesita refactor para separar responsabilidades y permitir extensibilidad.

La clase Type ya cumple con S y O.

                                              📂 src/carrito.ts
                                              ``
// ✅ Liskov Substitution Principle (LSP):
// - Aquí no tengo jerarquías de clases ni herencia directa.
// - Como no hay clases hijas que extiendan de Carrito, técnicamente el principio se cumple
//   porque nada está rompiendo el comportamiento esperado.
// - Si en un futuro creo una subclase (ej: CarritoConDescuento), debería poder usarse en lugar de Carrito sin romper nada.

// ❌ Interface Segregation Principle (ISP):
// - Mi clase Carrito no depende de interfaces pequeñas y específicas, sino que maneja todo directamente
//   (agregar, eliminar, actualizar, listar, imprimir).
// - Si quisiera conectar con distintos módulos (ej: facturación, impresión en PDF, impresión en HTML),
//   me vería obligado a modificar Carrito.
// - 💡 Mejora: crear interfaces separadas, por ejemplo:
//   - IGestorProductos (agregar, eliminar, actualizar)
//   - IImpresoraFactura (mostrar o exportar factura)
//   Así Carrito no tendría que cargar con todo a la vez.

```ts
// Interfaz para impresión de facturas
export interface IFacturaPrinter {
  imprimir(nombreCarrito: string, productos: { id: number; nombre: string; precio: number; cantidad: number }[]): void;
}

// Interfaz para entrada de usuario (puede ser consola, web, etc.)
export interface IEntradaUsuario {
  preguntar(pregunta: string): Promise<string>;
}

```

// ❌ Dependency Inversion Principle (DIP):
// - Carrito depende directamente de `console.log`, es decir, de un detalle de bajo nivel.
// - Si quiero cambiar la salida (ej: mostrar en consola, en archivo, en HTML o en API),
//   debo modificar Carrito.
// - 💡 Mejora: inyectar una abstracción, por ejemplo un `IFacturaPrinter`
//   y que Carrito reciba en el constructor esa dependencia.
//   Así Carrito depende de una interfaz y no de un detalle concreto.


                                                         📂 src/types.ts
// ✅ Liskov Substitution Principle (LSP):
// - Aquí defino `Producto`, `Cliente`, `ProductoUnion`, `Vendible`.
// - No hay herencia, pero sí uso de uniones e intersecciones.
// - Esto respeta LSP porque cualquier variante de producto (físico, digital, vendible)
//   puede usarse en lugar de `Producto` sin romper consistencia.

// ✅ Interface Segregation Principle (ISP):
// - Aquí las definiciones están bien segmentadas: Cliente, ProductoUnion, Vendible.
// - Cada tipo tiene solo lo necesario, no dependen de campos extra que no usan.
// - Cumple ISP porque no estoy forzando a ninguna entidad a depender de cosas que no necesita.

// ✅ Dependency Inversion Principle (DIP):
// - En este archivo no hay dependencias hacia detalles concretos,
//   solo definiciones abstractas de tipos e interfaces.
// - Por tanto, cumple DIP al 100%.


                                                    📂 src/index.ts

// ✅ Liskov Substitution Principle (LSP):
// - En este archivo solo consumo Carrito, Cliente, ProductoUnion y Vendible.
// - Como uso uniones de tipos y objetos tipados, todo sigue funcionando
//   sin romper sustitución.
// - Ejemplo: puedo usar producto físico o digital indistintamente donde se espere un ProductoUnion.

// ❌ Interface Segregation Principle (ISP):
// - Aquí estoy acoplado a la consola de Node (uso readline directamente).
// - Eso obliga a que la "interfaz" de interacción sea consola, y no podría reutilizarse
//   en una interfaz web sin reescribir mucho código.
// - 💡 Mejora: abstraer la entrada/salida en una interfaz (ej: IEntradaUsuario, ISalidaUsuario)
//   y luego tener implementaciones distintas (consola, web, API).

// ❌ Dependency Inversion Principle (DIP):
// - Este archivo depende directamente de `readline` (un detalle de bajo nivel).
// - Carrito y la lógica principal quedan atados a la consola.
// - 💡 Mejora: invertir la dependencia → crear una capa de abstracción
//   donde Carrito y el flujo principal dependan de interfaces (abstracciones),
//   y `readline` sea solo una implementación concreta inyectada.






