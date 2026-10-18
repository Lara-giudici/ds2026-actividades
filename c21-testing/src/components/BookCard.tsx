import { Link } from "react-router-dom";
import type { Autor } from "../types/Book";

interface BookCardProps {
  titulo: string;
  autor: Autor;
  imagen: string;
  id: number;
}

export default function BookCard({
  titulo,
  autor,
  imagen,
  id,
}: BookCardProps) {
  return (
    <div className="card p-3 m-2" style={{ width: "200px" }}>
      <img src={imagen} className="card-img-top" alt={titulo} />

      <div className="card-body">
        <h5>{titulo}</h5>
        <p>{autor.nombre}</p>

        <Link to={`/libros/${id}`} className="btn btn-primary">
          Ver más
        </Link>
      </div>
    </div>
  );
}