import { useState } from "react";

import BookCard from "./components/BookCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {

  const [mostrar, setMostrar] = useState(false);

  function cambiarEstado() {
    setMostrar(!mostrar);
  }

  const libros = [
    {
      titulo: "Harry Potter",
      autor: "J.K Rowling",
      imagen:
        "https://covers.openlibrary.org/b/id/10521270-L.jpg",
    },

   {
      titulo: "El Principito",
      autor: "Antoine de Saint-Exupéry",
      imagen:
        "https://images-na.ssl-images-amazon.com/images/I/71tmow7B+FL.jpg",
    },

    {
      titulo: "Percy Jackson",
      autor: "Rick Riordan",
      imagen:
        "https://m.media-amazon.com/images/I/91RQ5d-eIqL.jpg",
    }
  ];

  return (
    <>
      <Navbar />

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

      <Footer />
    </>
  );
}

export default App;