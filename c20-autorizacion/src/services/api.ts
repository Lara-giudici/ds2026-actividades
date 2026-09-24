import { obtenerToken } from "./sesion";

const BASE = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetch<T>(
  ruta: string,
  opciones: RequestInit = {}
): Promise<T> {
  const token = obtenerToken();

  const respuesta = await fetch(`${BASE}${ruta}`, {
    ...opciones,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers,
    },
  });

  const cuerpo = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    if (respuesta.status === 401 && token) {
      window.dispatchEvent(new Event("auth:unauthorized"));
    }

    throw new ApiError(
      cuerpo?.error ?? `Error ${respuesta.status}`,
      respuesta.status
    );
  }


  return cuerpo as T;
}