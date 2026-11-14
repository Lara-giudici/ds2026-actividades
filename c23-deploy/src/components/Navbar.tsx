
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { usuario, estaAutenticado, tieneRol, logout } = useAuth();

  return (
    <>
      <aside className="sidebar-libreria">
        <div className="sidebar-marca">
          <div className="sidebar-icono">✦</div>
          <h2>Entre Páginas</h2>
          <p>Librería Online</p>
        </div>

        <nav className="sidebar-menu">
          <NavLink to="/" end className="sidebar-enlace">
            <span>⌂</span> Inicio
          </NavLink>

          <NavLink to="/catalogo" className="sidebar-enlace">
            <span>▤</span> Catálogo
          </NavLink>

          {tieneRol("ADMIN") && (
            <NavLink to="/libros/nuevo" className="sidebar-enlace">
              <span>＋</span> Alta libro
            </NavLink>
          )}
        </nav>

        <div className="sidebar-inferior">
          {estaAutenticado ? (
            <button
              type="button"
              className="sidebar-enlace sidebar-boton"
              onClick={logout}
            >
              <span>↪</span> Salir
            </button>
          ) : (
            <NavLink to="/login" className="sidebar-enlace">
              <span>→</span> Ingresar
            </NavLink>
          )}
        </div>
      </aside>

      <header className="barra-superior">
        {estaAutenticado && usuario ? (
          <span>Hola, {usuario.nombre}</span>
        ) : (
          <span>Bienvenido a Entre Páginas</span>
        )}
      </header>
    </>
  );
}

export default Navbar;
