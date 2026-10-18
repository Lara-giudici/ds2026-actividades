import { describe, it, expect, vi } from "vitest";

vi.mock("../config/prisma", () => ({
  prisma: {
    libro: {
      findUnique: vi.fn()
    }
  }
}));

import { prisma } from "../config/prisma";
import { findById } from "./libro.service";

describe("Servicio de libros", () => {
  it("busca un libro por su ID", async () => {
    vi.mocked(prisma.libro.findUnique).mockResolvedValue(null);

    await findById(1);

    expect(prisma.libro.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        autor: true,
        categorias: true
      }
    });
  });
});