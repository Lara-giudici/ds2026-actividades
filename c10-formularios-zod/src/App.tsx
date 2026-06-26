import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home"
import Catalogo from "./pages/Catalogo"
import LibroDetalle from "./pages/LibroDetalle"
import AltaLibro from "./pages/AltaLibro";
import { useState } from "react";
import type { Book } from "./types/Book";

export default function App() {
  const [libros, setLibros] = useState<Book[]>([
  {
    titulo: "Harry Potter",
    autor: "J.K Rowling",
    imagen: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
  },
  {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    imagen: "https://images-na.ssl-images-amazon.com/images/I/71tmow7B+FL.jpg",
  },
  {
    titulo: "Percy Jackson",
    autor: "Rick Riordan",
    imagen: "https://m.media-amazon.com/images/I/91RQ5d-eIqL.jpg",
  }
]);

  function agregarLibro(nuevoLibro: Book) {
      setLibros([...libros, nuevoLibro]);
  }
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home libros={libros} />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/alta" element={<AltaLibro agregarLibro={agregarLibro} />} />
      </Routes>
    </Layout>
  )
}