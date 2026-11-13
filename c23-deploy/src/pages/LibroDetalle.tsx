import { useParams } from "react-router-dom"

export default function LibroDetalle() {
  const { id } = useParams()

  return (
    <div className="container mt-4">
      <h2>Detalle del libro</h2>
      <p>ID: {id}</p>
    </div>
  )
}