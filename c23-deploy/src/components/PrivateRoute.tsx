import { Navigate, Outlet } from "react-router-dom";

import { useAuth, type Rol } from "../context/AuthContext";

type PrivateRouteProps = {
  rol?: Rol;
};

function PrivateRoute({ rol }: PrivateRouteProps) {
  const { cargando, estaAutenticado, tieneRol } = useAuth();

  if (cargando) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div
          className="spinner-border"
          role="status"
          aria-label="Cargando"
        />
      </div>
    );
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  if (rol && !tieneRol(rol)) {
    return <Navigate to="/sin-permiso" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;