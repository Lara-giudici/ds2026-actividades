import { Router } from "express";

import {
  registrar,
  login,
  yo
} from "../controllers/auth.controller";

import {
  registroSchema,
  loginSchema
} from "../validations/auth.validation";

import {
  validate
} from "../middlewares/validate.middleware";

import {
  authenticate
} from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/registro",
  validate(registroSchema),
  registrar
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/yo",
  authenticate,
  yo
);

export default router;