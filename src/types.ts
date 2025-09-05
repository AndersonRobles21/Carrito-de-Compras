// ---------------- Tipos básicos ----------------
export type Producto = {
  id: number;
  nombre: string;
  precio: number;
};

// Unión de tipos (producto físico o digital)
export type ProductoUnion =
  | (Producto & { tipo: "fisico"; peso: number })
  | (Producto & { tipo: "digital"; formato: string });

// Intersección de tipos: combinar atributos comunes
export type Vendible = Producto & { stock: number };

// Type normal para el cliente
export type Cliente = {
  id: number;
  nombre: string;
};
