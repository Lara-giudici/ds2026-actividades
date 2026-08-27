import { Request, Response } from "express";

import {
  findAll,
  findById,
  create as createLibro,
  update as updateLibro,
  remove as removeLibro
} from "../services/libro.service";

export async function getAll(_req: Request, res: Response) {
  try {
    const libros = await findAll();
    return res.json(libros);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const libro = await findById(id);

    if (!libro) {
      return res.status(404).json({
        mensaje: "Libro no encontrado"
      });
    }

    return res.json(libro);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const nuevoLibro = await createLibro(req.body);

    return res.status(201).json(nuevoLibro);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const libroActualizado = await updateLibro(id, req.body);

    if (!libroActualizado) {
      return res.status(404).json({
        mensaje: "Libro no encontrado"
      });
    }

    return res.json(libroActualizado);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const eliminado = await removeLibro(id);

    if (!eliminado) {
      return res.status(404).json({
        mensaje: "Libro no encontrado"
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
}