import { Request, Response } from "express";

import {
  registrar as registrarUsuario,
  login as loginUsuario
} from "../services/auth.service";

export async function registrar(req: Request, res: Response) {
  const usuario = await registrarUsuario(req.body);

  return res.status(201).json(usuario);
}

export async function login(req: Request, res: Response) {
  const resultado = await loginUsuario(req.body);

  if (!resultado) {
    return res.status(401).json({
      error: "Credenciales inválidas"
    });
  }

  return res.status(200).json(resultado);
}

export async function yo(req: Request, res: Response) {
  return res.status(200).json(req.usuario);
}