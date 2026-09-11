import { prisma } from "../src/config/prisma";
import bcrypt from "bcrypt";
import { Rol } from "../src/generated/prisma/enums";

const autores = [
  { nombre: "J.K. Rowling" },
  { nombre: "Antoine de Saint-Exupéry" },
  { nombre: "Rick Riordan" }
];

const categorias = [
  { nombre: "Fantasia" },
  { nombre: "Clasico" },
  { nombre: "Aventura" }
];

const libros = [
  {
    titulo: "Harry Potter",
    autor: "J.K. Rowling",
    imagen: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
    categorias: ["Fantasia"]
  },
  {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    imagen: "https://m.media-amazon.com/images/I/71tmow7B+FL.jpg",
    categorias: ["Clasico"]
  },
  {
    titulo: "Percy Jackson",
    autor: "Rick Riordan",
    imagen: "https://m.media-amazon.com/images/I/91RQ5d-eIqL.jpg",
    categorias: ["Aventura", "Fantasia"]
  }
];

const usuarios = [
  {
    email: "admin@libreria.com",
    nombre: "Administrador",
    password: "Admin1234",
    rol: Rol.ADMIN
  },
  {
    email: "cliente@libreria.com",
    nombre: "Cliente",
    password: "Cliente1234",
    rol: Rol.CLIENTE
  }
];

async function main() {
  for (const autor of autores) {
    await prisma.autor.upsert({
      where: { nombre: autor.nombre },
      update: {},
      create: autor
    });
  }

  for (const categoria of categorias) {
    await prisma.categoria.upsert({
      where: { nombre: categoria.nombre },
      update: {},
      create: categoria
    });
  }

  for (const libro of libros) {
    const libroExistente = await prisma.libro.findFirst({
      where: {
        titulo: libro.titulo
      }
    });

    if (!libroExistente) {
      await prisma.libro.create({
        data: {
          titulo: libro.titulo,
          imagen: libro.imagen,
          autor: {
            connect: {
              nombre: libro.autor
            }
          },
          categorias: {
            connect: libro.categorias.map(nombre => ({
              nombre
            }))
          }
        }
      });
    }
  }

  for (const { password, ...datos } of usuarios) {
    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.usuario.upsert({
      where: {
        email: datos.email
      },
      update: {},
      create: {
        ...datos,
        passwordHash
      }
    });
  }

  console.log("Seed ejecutado correctamente");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });