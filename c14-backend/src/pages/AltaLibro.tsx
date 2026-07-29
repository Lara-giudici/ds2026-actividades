import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";


const libroSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  autor: z.string().min(1, "El autor es obligatorio"),
});


export default function AltaLibro() {

    const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(libroSchema),
});

  function onSubmit() {
    alert("Libro cargado correctamente");
    reset();
    navigate("/catalogo");
  }

  return (
    <div className="container mt-4">

      <h2>Alta de Libro</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-3">
          <label>Título</label>
          <input
            className="form-control"
            {...register("titulo")}
          />
          
          {errors.titulo && (
            <p className="text-danger">
                {errors.titulo?.message as string}
            </p>
          )}
        </div>

        <div className="mb-3">
          <label>Autor</label>
          <input
            className="form-control"
            {...register("autor")}
          />
          
          {errors.autor && (
            <p className="text-danger">
                {errors.autor?.message as string}
            </p>
          )}
        </div>

        <button className="btn btn-primary">
          Guardar
        </button>

      </form>

    </div>
  );
}