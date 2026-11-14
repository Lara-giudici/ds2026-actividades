
import { useParams, useNavigate, Link } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import type { Book } from "../types/Book";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { apiFetch } from "../services/api";

export default function LibroDetalle() {
  const { id } = useParams();
  const { tieneRol } = useAuth();
  const navigate = useNavigate();

  const [eliminando, setEliminando] = useState(false);
  const [errorEliminar, setErrorEliminar] = useState<string | null>(null);

  const {
    data: libro,
    loading,
    error
  } = useFetch<Book>(`/libros/${id}`);

  async function eliminarLibro() {
    const confirmar = window.confirm(
      "¿Estás segura de que querés eliminar este libro?"
    );

    if (!confirmar) return;

    try {
      setEliminando(true);
      setErrorEliminar(null);

      await apiFetch(`/libros/${id}`, {
        method: "DELETE",
      });

      alert("Libro eliminado correctamente");
      navigate("/catalogo");
    } catch (e) {
      setErrorEliminar(
        e instanceof Error ? e.message : "Error al eliminar el libro"
      );
    } finally {
      setEliminando(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Cargando libro...</p>
      </div>
    );
  }

  if (error || !libro) {
    return (
      <Alert variant="danger">
        {error || "No se encontró el libro"}
      </Alert>
    );
  }

  return (
    <section className="detalle-libreria">
      <Link to="/catalogo" className="volver-catalogo">
        ← Volver al catálogo
      </Link>

      <div className="detalle-tarjeta">
        <div className="detalle-portada">
          {libro.imagen && (
            <img
              src={libro.imagen}
              alt={libro.titulo}
            />
          )}
        </div>

        <div className="detalle-informacion">
          <span className="detalle-etiqueta">
            ENTRE PÁGINAS
          </span>

          <h1>{libro.titulo}</h1>

          <p className="detalle-autor">
            de {libro.autor?.nombre ?? "Autor no disponible"}
          </p>

          <div className="detalle-separador" />

          <p className="detalle-dato">
            <strong>Autor:</strong>{" "}
            {libro.autor?.nombre ?? "No disponible"}
          </p>

          <p className="detalle-dato">
            <strong>ID del libro:</strong> {libro.id}
          </p>

          {tieneRol("ADMIN") && (
            <div className="detalle-acciones">
              <button
                type="button"
                className="boton-editar"
                onClick={() =>
                  navigate(`/libros/${libro.id}/editar`)
                }
              >
                Editar libro
              </button>

              <button
                type="button"
                className="boton-eliminar"
                onClick={eliminarLibro}
                disabled={eliminando}
              >
                {eliminando ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          )}

          {errorEliminar && (
            <Alert variant="danger" className="mt-3">
              {errorEliminar}
            </Alert>
          )}
        </div>
      </div>
    </section>
  );
}
