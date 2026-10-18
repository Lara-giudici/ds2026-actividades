import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { apiFetch } from "../services/api";
import {
  obtenerToken,
  guardarToken,
  borrarToken,
} from "../services/sesion";

export type Rol = "ADMIN" | "CLIENTE";

type Usuario = {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
};

type Credenciales = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

type AuthContextType = {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [cargando, setCargando] = useState<boolean>(
    obtenerToken() !== null
  );

  function logout() {
    borrarToken();
    setUsuario(null);
  }

  useEffect(() => {
    function manejarUnauthorized() {
        logout();
    }

    window.addEventListener("auth:unauthorized", manejarUnauthorized);

    return () => {
        window.removeEventListener("auth:unauthorized", manejarUnauthorized);
    };
  }, []);

  useEffect(() => {
    const token = obtenerToken();

    if (!token) {
      setCargando(false);
      return;
    }

    apiFetch<Usuario>("/auth/yo")
      .then((usuario) => {
        setUsuario(usuario);
      })
      .catch(() => {
        borrarToken();
        setUsuario(null);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  async function login(credenciales: Credenciales) {
    const respuesta = await apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credenciales),
    });

    guardarToken(respuesta.token);

    const usuario = await apiFetch<Usuario>("/auth/yo");

    setUsuario(usuario);
  }

  const estaAutenticado = usuario !== null;

  function tieneRol(rol: Rol) {
    return usuario?.rol === rol;
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        estaAutenticado,
        tieneRol,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe usarse dentro de un AuthProvider"
    );
  }

  return context;
}