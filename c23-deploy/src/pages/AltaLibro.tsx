
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";

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
  const [guardando, setGuardando] = useState(false);

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
      setGuardando(true);

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
    } finally {
      setGuardando(false);
    }
  }

  return (
    <section className="formulario-libreria">
      <Link to="/catalogo" className="volver-catalogo">
        ← Volver al catálogo
      </Link>

      <div className="formulario-tarjeta">
        <div className="formulario-encabezado">
          <span className="detalle-etiqueta">
            ENTRE PÁGINAS
          </span>

          <h1>Agregar nuevo libro</h1>

          <p>
            Completá los datos para incorporar un libro
            a nuestra colección.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="campo-formulario">
            <label htmlFor="titulo">Título del libro</label>

            <input
              id="titulo"
              type="text"
              className="form-control"
              placeholder="Ej.: El Principito"
              {...register("titulo")}
            />

            {errors.titulo && (
              <p className="text-danger mt-1">
                {errors.titulo.message}
              </p>
            )}
          </div>

          <div className="campo-formulario">
            <label htmlFor="imagen">URL de la portada</label>

            <input
              id="imagen"
              type="text"
              className="form-control"
              placeholder="https://..."
              {...register("imagen")}
            />

            {errors.imagen && (
              <p className="text-danger mt-1">
                {errors.imagen.message}
              </p>
            )}
          </div>

          <div className="campo-formulario">
            <label htmlFor="autorId">ID del autor</label>

            <input
              id="autorId"
              type="number"
              min="1"
              className="form-control"
              placeholder="Ej.: 1"
              {...register("autorId", {
                valueAsNumber: true
              })}
            />

            {errors.autorId && (
              <p className="text-danger mt-1">
                {errors.autorId.message}
              </p>
            )}
          </div>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <div className="formulario-acciones">
            <button
              type="submit"
              className="boton-guardar"
              disabled={guardando}
            >
              {guardando ? "Guardando..." : "Guardar libro"}
            </button>

            <Link
              to="/catalogo"
              className="boton-cancelar"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
