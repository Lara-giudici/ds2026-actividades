import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import type { Book } from "../types/Book";
import { useFetch } from "../hooks/useFetch";

function Home() {
  const [mostrar, setMostrar] = useState(false);

  const { data: libros } = useFetch<Book[]>("/libros");

  useEffect(() => {
    console.log("Home cargada");
  }, []);

  function cambiarEstado() {
    setMostrar(!mostrar);
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">
        Libros Destacados
      </h1>

      <div className="text-center mb-4">
        <button
          className="btn btn-success"
          onClick={cambiarEstado}
        >
          Mostrar descripción
        </button>
      </div>

      {mostrar && (
        <p className="text-center">
          Esta es una librería creada con React,
          TypeScript y Bootstrap.
        </p>
      )}

      <div className="d-flex flex-wrap justify-content-center">
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
    </div>
  );
}

export default Home;