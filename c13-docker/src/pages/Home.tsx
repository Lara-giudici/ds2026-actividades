import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import type { Book } from "../types/Book";


function Home(){

  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    console.log("Home cargada");
  }, []);

  const libros: Book[] = [
    {
      titulo: "Harry Potter",
      autor: "J.K Rowling",
      imagen: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
    },
    {
      titulo: "El Principito",
      autor: "Antoine de Saint-Exupéry",
      imagen: "https://m.media-amazon.com/images/I/71tmow7B+FL.jpg",
    },
    {
      titulo: "Percy Jackson",
      autor: "Rick Riordan",
      imagen: "https://m.media-amazon.com/images/I/91RQ5d-eIqL.jpg",
    }
  ];

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