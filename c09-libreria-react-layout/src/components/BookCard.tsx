import { Link } from "react-router-dom"

export default function BookCard({ titulo, autor, imagen, index }: any) {
  return (
    <div className="card p-3 m-2" style={{ width: "200px" }}>
      <img src={imagen} className="card-img-top" />

      <div className="card-body">
        <h5>{titulo}</h5>
        <p>{autor}</p>

        <Link to={`/libros/${index}`} className="btn btn-primary">
          Ver más
        </Link>
      </div>
    </div>
  )
}