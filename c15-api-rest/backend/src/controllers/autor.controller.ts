import { Request, Response } from "express";

import {
  findAll,
  findById,
  create as createAutor,
  update as updateAutor,
  remove as removeAutor
} from "../services/autor.service";

export function getAll(_req: Request, res: Response) {
  res.json(findAll());
}

export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const autor = findById(id);

  if (!autor) {
    res.status(404).json({
      mensaje: "Autor no encontrado"
    });
    return;
  }

  res.json(autor);
}

export function create(req: Request, res: Response) {
  const nuevoAutor = createAutor(req.body);

  res.status(201).json(nuevoAutor);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);

  const autorActualizado = updateAutor(id, req.body);

  if (!autorActualizado) {
    res.status(404).json({
      mensaje: "Autor no encontrado"
    });
    return;
  }

  res.json(autorActualizado);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);

  const eliminado = removeAutor(id);

  if (!eliminado) {
    res.status(404).json({
      mensaje: "Autor no encontrado"
    });
    return;
  }

  res.status(204).send();
}