
import { Spinner, Alert } from "react-bootstrap";
import BookCard from "../components/BookCard";
import type { Book } from "../types/Book";
import { useFetch } from "../hooks/useFetch";

function Home() {
  const {
    data: libros,
    loading,
    error
  } = useFetch<Book[]>("/libros");

  return (
    <section className="inicio-libreria">
      <div className="encabezado-inicio">
        <h1>Libros Destacados</h1>
        <p>Descubrí nuestras historias</p>
      </div>

      {loading && (
        <div className="text-center mt-5">
          <Spinner animation="border" />
          <p>Cargando libros...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <div className="grilla-libros">
          {(libros ?? []).slice(0, 3).map((libro) => (
            <BookCard
              key={libro.id}
              titulo={libro.titulo}
              autor={libro.autor}
              imagen={libro.imagen}
              id={libro.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Home;
