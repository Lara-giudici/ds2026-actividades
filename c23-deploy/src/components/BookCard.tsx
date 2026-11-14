
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
    <div className="card tarjeta-libro">
      <div className="contenedor-portada">
        <img
          src={imagen}
          className="portada-libro"
          alt={titulo}
        />
      </div>

      <div className="card-body cuerpo-tarjeta">
        <h5 className="titulo-libro">{titulo}</h5>

        <p className="autor-libro">
          {autor.nombre}
        </p>

        <Link
          to={`/libros/${id}`}
          className="btn btn-primary boton-libro"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}
