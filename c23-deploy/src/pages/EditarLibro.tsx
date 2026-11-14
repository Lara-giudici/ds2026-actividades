
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";

import { apiFetch } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import type { Book } from "../types/Book";

type DatosEdicion = {
  titulo: string;
  imagen: string;
  autorId: number;
};

function FormularioEdicion({ libro }: { libro: Book }) {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState(libro.titulo);
  const [imagen, setImagen] = useState(libro.imagen);
  const [autorId, setAutorId] = useState(String(libro.autorId));

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function guardarCambios(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !titulo.trim() ||
      !imagen.trim() ||
      !Number.isInteger(Number(autorId)) ||
      Number(autorId) <= 0
    ) {
      setError("Completá todos los campos correctamente.");
      return;
    }

    const datos: DatosEdicion = {
      titulo: titulo.trim(),
      imagen: imagen.trim(),
      autorId: Number(autorId),
    };

    try {
      setGuardando(true);
      setError(null);

      await apiFetch(`/libros/${libro.id}`, {
        method: "PUT",
        body: JSON.stringify(datos),
      });

      alert("Libro actualizado correctamente");
      navigate(`/libros/${libro.id}`);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Error al actualizar el libro"
      );
    } finally {
      setGuardando(false);
    }
  }

  return (
    <section className="formulario-libreria">
      <Link
        to={`/libros/${libro.id}`}
        className="volver-catalogo"
      >
        ← Volver al detalle
      </Link>

      <div className="formulario-tarjeta">
        <div className="formulario-encabezado">
          <span className="detalle-etiqueta">
            ENTRE PÁGINAS
          </span>

          <h1>Editar libro</h1>

          <p>
            Modificá los datos del libro y guardá
            los cambios para actualizar nuestra colección.
          </p>
        </div>

        <form onSubmit={guardarCambios}>
          <div className="campo-formulario">
            <label htmlFor="titulo">
              Título del libro
            </label>

            <input
              id="titulo"
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="imagen">
              URL de la portada
            </label>

            <input
              id="imagen"
              type="text"
              className="form-control"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              required
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="autorId">
              ID del autor
            </label>

            <input
              id="autorId"
              type="number"
              min="1"
              step="1"
              className="form-control"
              value={autorId}
              onChange={(e) => setAutorId(e.target.value)}
              required
            />
          </div>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          <div className="formulario-acciones">
            <button
              type="submit"
              className="boton-guardar"
              disabled={guardando}
            >
              {guardando
                ? "Guardando..."
                : "Guardar cambios"}
            </button>

            <Link
              to={`/libros/${libro.id}`}
              className="boton-cancelar"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function EditarLibro() {
  const { id } = useParams();

  const {
    data: libro,
    loading,
    error,
  } = useFetch<Book>(`/libros/${id}`);

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
      <div className="container mt-4">
        <Alert variant="danger">
          {error || "No se encontró el libro"}
        </Alert>
      </div>
    );
  }

  return <FormularioEdicion key={libro.id} libro={libro} />;
}
