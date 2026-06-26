import BookCard from "../components/BookCard"
import type { Book } from "../types/Book"

type Props = {
  libros: Book[]
}

export default function Catalogo({ libros }: Props) {
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