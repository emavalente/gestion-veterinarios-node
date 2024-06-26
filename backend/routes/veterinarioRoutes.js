import express from "express";
import {
  perfilVeterinario,
  confirmarVeterinario,
  registrarVeterinario,
} from "../controllers/veterinario.controller.js";

const router = express.Router();

router.post("/", registrarVeterinario);
router.get("/confirmar/:token", confirmarVeterinario);
router.get("/perfil", perfilVeterinario);

export default router;
