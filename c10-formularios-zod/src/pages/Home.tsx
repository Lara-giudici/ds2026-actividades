import { useState } from "react";
import BookCard from "../components/BookCard";
import type { Book } from "../types/Book";

type HomeProps = {
  libros: Book[];
};

function Home({ libros }: HomeProps) {

  const [mostrar, setMostrar] = useState(false);

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
        {libros.map((libro, index) => (
          <BookCard
            key={index}
            titulo={libro.titulo}
            autor={libro.autor}
            imagen={libro.imagen}
          />
        ))}
      </div>

    </div>
  );
}

export default Home;