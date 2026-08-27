import { Spinner, Alert } from "react-bootstrap";
import BookCard from "../components/BookCard";
import type { Book } from "../types/Book";
import { useFetch } from "../hooks/useFetch";


export default function Catalogo() {
  
  const { data: libros, loading, error } =
    useFetch<Book[]>("/libros.json");

  

   

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
    <div className="container mt-4">
      <h2>Catálogo</h2>

      <div className="d-flex flex-wrap justify-content-center">
        {(libros ?? []).map((libro, index) => (
          <BookCard
            key={index}
            titulo={libro.titulo}
            autor={libro.autor}
            imagen={libro.imagen}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}