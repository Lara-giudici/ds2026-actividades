import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { apiFetch } from "../services/api";

const libroSchema = z.object({
  titulo: z
    .string()
    .min(1, "El título es obligatorio"),

  imagen: z
    .string()
    .min(1, "La imagen es obligatoria"),

  autorId: z
  .number()
  .int()
  .positive("El autor es obligatorio"),
});

type LibroForm = z.infer<typeof libroSchema>;

export default function AltaLibro() {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LibroForm>({
    resolver: zodResolver(libroSchema),
  });

  async function onSubmit(datos: LibroForm) {
    try {
      setError(null);

      await apiFetch("/libros", {
        method: "POST",
        body: JSON.stringify(datos),
      });

      alert("Libro cargado correctamente");

      reset();
      navigate("/catalogo");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Error desconocido"
      );
    }
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
              {errors.titulo.message}
            </p>
          )}
        </div>

        <div className="mb-3">
          <label>Imagen</label>

          <input
            className="form-control"
            {...register("imagen")}
          />

          {errors.imagen && (
            <p className="text-danger">
              {errors.imagen.message}
            </p>
          )}
        </div>

        <div className="mb-3">
          <label>ID del autor</label>

          <input
            type="number"
            className="form-control"
            {...register("autorId", { valueAsNumber: true })}
          />

          {errors.autorId && (
            <p className="text-danger">
              {errors.autorId.message}
            </p>
          )}
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <button className="btn btn-primary">
          Guardar
        </button>

      </form>
    </div>
  );
}