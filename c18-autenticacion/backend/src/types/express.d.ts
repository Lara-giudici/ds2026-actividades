import { Rol } from "../generated/prisma/enums";

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        email: string;
        rol: Rol;
      };
    }
  }
}

export {};