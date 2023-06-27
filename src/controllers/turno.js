import response from "../utils/response.js";
import Turno from "../models/turno.js";
import Paciente from "../models/paciente.js";

export const getAllTurnos = async (req, res) => {
  const { fecha } = req.query;
  if (fecha) {
    console.log(fecha);
    const [dia, mes, anio] = fecha.split("-");
    const fechaBusqueda = new Date(anio, mes - 1, dia);
    const fechaISO = fechaBusqueda.toISOString().split("T")[0]; // Convertir la fecha a formato ISO
    console.log(fechaISO);
    const turnos = await Turno.findAll({
      where: {
        fecha: fechaISO,
      },
      include: [{ model: Paciente }],
    });
    response(res, 200, turnos);
  } else {
    const turno = await Turno.findAll({
      include: [{ model: Paciente }],
    });
    response(res, 200, turno);
  }
};

// export const getTurnosbyDate = async (req, res) => {
//   const { fecha } = req.query;
//   console.log(fecha);
//   const [dia, mes, anio] = fecha.split("-");
//   const fechaBusqueda = new Date(anio, mes - 1, dia);
//   const fechaISO = fechaBusqueda.toISOString().split("T")[0]; // Convertir la fecha a formato ISO
//   console.log(fechaISO);
//   const turnos = await Turno.findAll({
//     where: {
//       fecha: fechaISO,
//     },
//     include: [{ model: Paciente }],
//   });
//   response(res, 200, turnos);
// };

export const getTurno = async (req, res) => {
  const { id } = req.params;
  const turno = await Turno.findByPk(id, {
    include: [{ model: Paciente }],
  });
  response(res, 200, turno);
};

export const createTurno = async (req, res) => {
  const { dni } = req.params;
  const currentPaciente = await Paciente.findByPk(dni);

  // Obtén el día y hora del turno que deseas crear
  const fechaTurno = req.body.fecha;
  const horaTurno = req.body.hora;
  const [dia, mes, anio] = fechaTurno.split("/");
  const fecha = new Date(anio, mes - 1, dia);
  const fechaISO = fecha.toISOString().split("T")[0]; // Convertir la fecha a formato ISO

  // Busca los turnos existentes para el mismo día y hora
  const turnosExistente = await Turno.findOne({
    where: {
      fecha: fechaISO,
      hora: horaTurno,
    },
  });

  if (turnosExistente) {
    return res
      .status(400)
      .json({ error: "Ya existe un turno en la misma hora" });
  }

  const newTurno = await Turno.create({
    fecha: fechaISO,
    hora: horaTurno,
  });
  await currentPaciente?.addTurno(newTurno);
  response(res, 200, newTurno);
};

export const updateTurno = async (req, res) => {
  const { id } = req.params;
  const turno = await Turno.findByPk(id);
  const updatedTurno = await turno.update(req.body);
  response(res, 201, updatedTurno);
};

export const deleteTurno = async (req, res) => {
  const { id } = req.params;
  const turno = await Turno.findByPk(id);
  await turno.destroy();
  response(res, 200, `Turno Id: ${id} eliminado!`);
};
