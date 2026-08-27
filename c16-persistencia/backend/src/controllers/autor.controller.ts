import { Request, Response } from "express";

import {
  findAll,
  findById,
  create as createAutor,
  update as updateAutor,
  remove as removeAutor
} from "../services/autor.service";

export async function getAll(_req: Request, res: Response) {
  try {
    const autores = await findAll();
    return res.json(autores);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const autor = await findById(id);

    if (!autor) {
      return res.status(404).json({
        mensaje: "Autor no encontrado"
      });
    }

    return res.json(autor);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const nuevoAutor = await createAutor(req.body);

    return res.status(201).json(nuevoAutor);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const autorActualizado = await updateAutor(id, req.body);

    if (!autorActualizado) {
      return res.status(404).json({
        mensaje: "Autor no encontrado"
      });
    }

    return res.json(autorActualizado);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const eliminado = await removeAutor(id);

    if (!eliminado) {
      return res.status(404).json({
        mensaje: "Autor no encontrado"
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
}