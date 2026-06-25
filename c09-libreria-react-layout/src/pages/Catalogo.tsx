import BookCard from "../components/BookCard"

export default function Catalogo() {
  const libros = [
    { titulo: "Harry Potter", autor: "J.K Rowling", imagen: "https://covers.openlibrary.org/b/id/10521270-L.jpg" },
    { titulo: "El Principito", autor: "Antoine de Saint-Exupéry", imagen: "https://images-na.ssl-images-amazon.com/images/I/71tmow7B+FL.jpg" },
    { titulo: "Percy Jackson", autor: "Rick Riordan", imagen: "https://m.media-amazon.com/images/I/91RQ5d-eIqL.jpg" }
  ]

  return (
    <div className="container mt-4">
      <h2>Catálogo</h2>

      <div className="d-flex flex-wrap justify-content-center">
        {libros.map((libro, index) => (
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