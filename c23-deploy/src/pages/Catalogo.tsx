
import { Spinner, Alert } from "react-bootstrap";
import BookCard from "../components/BookCard";
import type { Book } from "../types/Book";
import { useFetch } from "../hooks/useFetch";

export default function Catalogo() {
  const { data: libros, loading, error } =
    useFetch<Book[]>("/libros");

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Cargando libros...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        {error}
      </Alert>
    );
  }

  return (
    <section className="catalogo-libreria">
      <div className="encabezado-catalogo">
        <h1>Nuestro Catálogo</h1>
        <p>Encontrá tu próxima historia favorita</p>
      </div>

      <div className="grilla-libros">
        {(libros ?? []).map((libro) => (
          <BookCard
            key={libro.id}
            titulo={libro.titulo}
            autor={libro.autor}
            imagen={libro.imagen}
            id={libro.id}
          />
        ))}
      </div>
    </section>
  );
}
