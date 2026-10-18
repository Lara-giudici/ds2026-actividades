import { describe, it, expect } from "vitest";
import { libroCreateSchema } from "./libro.validation";

describe("libroCreateSchema", () => {
  it("rechaza un libro con el título vacío", () => {
    const libro = {
      titulo: "",
      imagen: "portada.jpg",
      autorId: 1
    };

    const resultado = libroCreateSchema.safeParse(libro);

    expect(resultado.success).toBe(false);
  });

  it("acepta un libro con datos válidos", () => {
    const libro = {
        titulo: "El Principito",
        imagen: "principito.jpg",
        autorId: 1
    };

    const resultado = libroCreateSchema.safeParse(libro);

    expect(resultado.success).toBe(true);
  });
});