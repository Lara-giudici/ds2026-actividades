import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";

const SALT_ROUNDS = 10;

type Registro = {
  nombre: string;
  email: string;
  password: string;
};

type Login = {
  email: string;
  password: string;
};

export async function registrar(datos: Registro) {
  const hash = await bcrypt.hash(datos.password, SALT_ROUNDS);

  return prisma.usuario.create({
    data: {
      nombre: datos.nombre,
      email: datos.email,
      passwordHash: hash
    },
    select: {
      id: true,
      email: true,
      nombre: true,
      rol: true
    }
  });
}

export async function login(datos: Login) {
  const usuario = await prisma.usuario.findUnique({
    where: {
      email: datos.email
    }
  });

  if (!usuario) {
    return null;
  }

  const passwordCorrecta = await bcrypt.compare(
    datos.password,
    usuario.passwordHash
  );

  if (!passwordCorrecta) {
    return null;
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h"
    }
  );

  return {
    token
  };
}