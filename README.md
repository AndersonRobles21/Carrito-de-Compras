# Carrito-de-Compras
🧁 Investigación 🧁

🧁 ¿Qué es una intersección de tipos?
En TypeScript, una intersección de tipos (&) permite combinar múltiples tipos en uno solo.
El nuevo tipo resultante debe cumplir con todas las propiedades de los tipos combinados.

Ej: “este valor debe ser A y B al mismo tiempo”.

Ejemplo sencillo: type Persona = {
  nombre: string;
  edad: number;
};

type Trabajador = {
  empresa: string;
  salario: number;
};

// Intersección: debe tener las propiedades de Persona y Trabajador
type Empleado = Persona & Trabajador;

const empleado1: Empleado = {
  nombre: "Laura",
  edad: 25,
  empresa: "Tech Solutions",
  salario: 3000
};

🧁 La intersección con interfaces
Este también funcina con "interface".
Ejemplo sencillo: interface Estudiante {
  carrera: string;
  semestre: number;
}

interface Deportista {
  deporte: string;
  nivel: string;
}

type EstudianteDeportista = Estudiante & Deportista;

const juan: EstudianteDeportista = {
  carrera: "Ingeniería",
  semestre: 5,
  deporte: "Fútbol",
  nivel: "Avanzado"
};

🧁 Uso en funciones 
Se pueden usar intersecciones para parámetros más estricto.
Ejemplo sencillo: type Identificable = { id: number };
type ConNombre = { nombre: string };

function mostrarInfo(obj: Identificable & ConNombre) {
  console.log(`ID: ${obj.id}, Nombre: ${obj.nombre}`);
}

mostrarInfo({ id: 1, nombre: "Carlos" }); // válido
// mostrarInfo({ id: 2 }); error, falta "nombre"

🧁 Demo completa en TypeScript
// Tipos base
type Usuario = {
  id: number;
  nombre: string;
};

type Credenciales = {
  email: string;
  password: string;
};

// Intersección
type UsuarioConCredenciales = Usuario & Credenciales;

// Función que usa intersección
function registrarUsuario(user: UsuarioConCredenciales) {
  console.log(`Usuario registrado: ${user.nombre} con email ${user.email}`);
}

// Ejemplo de uso
const nuevoUsuario: UsuarioConCredenciales = {
  id: 101,
  nombre: "Ana",
  email: "ana@mail.com",
  password: "1234"
};

registrarUsuario(nuevoUsuario);

🧁 Una intersección de tipos (&) combina varios tipos en uno solo.
Es útil cuando queremos que una variable u objeto tenga todas las propiedades de varios tipos.
Se aplica en objetos, interfaces, funciones y genéricos para mayor flexibilidad y seguridad.

