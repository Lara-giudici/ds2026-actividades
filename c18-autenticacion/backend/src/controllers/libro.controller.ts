import { Request, Response } from "express";

import {
  findAll,
  findById,
  create as createLibro,
  update as updateLibro,
  remove as removeLibro
} from "../services/libro.service";

export async function getAll(_req: Request, res: Response) {
  const libros = await findAll();
  return res.json(libros);
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const libro = await findById(id);

  if (!libro) {
    return res.status(404).json({
      mensaje: "Libro no encontrado"
    });
  }

  return res.json(libro);
}

export async function create(req: Request, res: Response) {
  const nuevoLibro = await createLibro(req.body);

  return res.status(201).json(nuevoLibro);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);

  const libroActualizado = await updateLibro(id, req.body);

  if (!libroActualizado) {
    return res.status(404).json({
      mensaje: "Libro no encontrado"
    });
  }

  return res.json(libroActualizado);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);

  const eliminado = await removeLibro(id);

  if (!eliminado) {
    return res.status(404).json({
      mensaje: "Libro no encontrado"
    });
  }

  return res.status(204).send();
}