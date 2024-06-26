import Veterinario from "../models/Veterinario.model.js";

const registrarVeterinario = async (req, res) => {
  const { email } = req.body;

  // Prevenir usuario duplicado.
  const existeVeterinario = await Veterinario.findOne({ email: email });
  if (existeVeterinario) {
    const error = new Error("Este email ya fue registrado");
    return res.status(400).json({ msg: error.message });
  }

  // Guardar un nuevo Veterinario
  try {
    // Creamos una instancia de registro con los datos de la petición.
    const veterinario = new Veterinario(req.body);

    // Guardamos el registro
    const veterinarioGardado = await veterinario.save();

    res.json({
      msg: "Registrando nuevo veterinario...",
      data: veterinarioGardado,
    });
  } catch (error) {
    console.log(error);
  }
};

const confirmarVeterinario = async (req, res) => {
  const { token } = req.params;

  // Buscamos un registro que coincida con el parametro token.
  const veterinarioConfirmado = await Veterinario.findOne({ token: token });

  if (!veterinarioConfirmado) {
    const error = new Error("El token no es válido");
    res.status(404).json({ msg: error.message });
  }

  // Si existe modificamos su estado de confirmado a true.
  try {
    veterinarioConfirmado.token = null;
    veterinarioConfirmado.confirmado = true;

    // Guardamos el registro con los cambios.
    await veterinarioConfirmado.save();

    // Respuesta al cliente
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const perfilVeterinario = (req, res) => {
  res.json({ msg: "Desde API/VETERINARIOS/PERFIL" });
};

export { registrarVeterinario, confirmarVeterinario, perfilVeterinario };
