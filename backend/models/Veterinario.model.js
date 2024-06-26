import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";

const veterinarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true, // registro requerido
    trim: true, // recorte de espacios al inicio y al final
  },
  email: {
    type: String,
    required: true,
    unique: true, // registro único.
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    default: null, // valor por defecto puede ser null (vacio)
    trim: true,
  },
  web: {
    type: String,
    default: null,
    trim: true,
  },
  token: {
    type: String,
    default: generarId(),
  },
  confirmado: {
    type: Boolean,
    default: false,
  },
});

// Hashear password antes de guardar el registro.
veterinarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);

export default Veterinario;
