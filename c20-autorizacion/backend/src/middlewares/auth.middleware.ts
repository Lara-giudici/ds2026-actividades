import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Rol } from "../generated/prisma/enums";

type TokenPayload = {
  id: number;
  email: string;
  rol: Rol;
};

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "No autenticado"
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "No autenticado"
    });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as unknown as TokenPayload;

    req.usuario = {
      id: payload.id,
      email: payload.email,
      rol: payload.rol
    };

    next();
  } catch {
    return res.status(401).json({
      error: "Token inválido"
    });
  }
}

export function authorize(...rolesPermitidos: Rol[]) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.usuario) {
      return res.status(401).json({
        error: "No autenticado"
      });
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({
        error: "No autorizado"
      });
    }

    next();
  };
}