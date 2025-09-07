// Interface base del producto (la usas en tu carrito real con factura)
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

// ✅ Type normal
export type Cliente = {
  id: number;
  nombre: string;
};

// ✅ Unión de tipos (producto físico o digital)
export type ProductoUnion =
  | (Producto & { tipo: "fisico"; peso: number })
  | (Producto & { tipo: "digital"; formato: string });

// ✅ Intersección de tipos (producto vendible con stock)
export type Vendible = Producto & { stock: number };
