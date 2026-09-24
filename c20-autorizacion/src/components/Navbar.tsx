import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { usuario, estaAutenticado, tieneRol, logout } = useAuth();

  return (
    <nav className="navbar navbar-dark bg-dark px-4">

      <span className="navbar-brand">
        Librería React
      </span>

      <div>
        <Link
          to="/"
          className="text-white text-decoration-none me-3"
        >
          Inicio
        </Link>

        <Link
          to="/catalogo"
          className="text-white text-decoration-none me-3"
        >
          Catálogo
        </Link>

        {tieneRol("ADMIN") && (
          <Link
            to="/libros/nuevo"
            className="text-white text-decoration-none me-3"
          >
            Nuevo libro
          </Link>
        )}

        {estaAutenticado && usuario ? (
          <>
            <span className="text-white me-2">
              Hola, {usuario.nombre} ·
            </span>

            <button
              type="button"
              className="btn btn-link text-white text-decoration-none p-0"
              onClick={logout}
            >
              Salir
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-white text-decoration-none"
          >
            Ingresar
          </Link>
        )}
      </div>

    </nav>
  );
}

export default Navbar;