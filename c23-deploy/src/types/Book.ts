export interface Autor {
  id: number;
  nombre: string;
}

export interface Book {
  id: number;
  titulo: string;
  imagen: string;
  autorId: number;
  autor: Autor;
}