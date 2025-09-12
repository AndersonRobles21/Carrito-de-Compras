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

## 3. Análisis por Clase

### 3.1 src/carrito.ts — Carrito
Responsabilidad declarada: Gestionar productos en el carrito (agregar, eliminar, listar, calcular total).

*S (Single Responsibility)*
- Diagnóstico: ❌ *No cumple totalmente.*
- Justificación: Actualmente, Carrito mezcla varias responsabilidades:
  - Posiblemente interacción directa con consola en algunos métodos.
- Riesgo: Acoplamiento fuerte y dificultad para mantener/pruebas unitarias.
🧁 Laura Orejuela 🧁


🔴🔴Anderson Topaga🔴🔴
*O (Open/Closed)*
- Diagnóstico: ❌ *No cumple.*
- Justificación: La lógica de cálculo  está fija en la clase.  
  Para extender habría que modificar el código directamente.
  
🧿Andrey Llanos🧿

  Hacer que carritoProductos.listar() devuelva un arreglo, no un string con formato.

4. Conclusiones

Carrito necesita refactor para separar responsabilidades y permitir extensibilidad.

Producto ya cumple con S y O.

Propuesta: aplicar estrategias de precio y repositorios para separar la persistencia de la lógica de negocio, siguiendo SOLID.
🧿Andrey Llanos🧿
