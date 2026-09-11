import { Link } from "react-router-dom";

function Navbar() {
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
          className="text-white text-decoration-none"
        >
          Catálogo
        </Link>

        <Link
          to="/alta"
          className="text-white text-decoration-none"
        >
          Alta Libro
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;