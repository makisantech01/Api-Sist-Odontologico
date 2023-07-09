import response from "../utils/response.js";
import Turno from "../models/turno.js";
import Paciente from "../models/paciente.js";
import {
  enviarCorreo,
  agregarEventoCalendario,
} from "../middlewares/calendar.js";

import { generarDiasConHorasDisponibles } from "../middlewares/diasHoras.js";

export const getAllTurnos = async (req, res) => {
  const { fecha } = req.query;
  if (fecha) {
    const [dia, mes, anio] = fecha.split("-");
    const fechaBusqueda = new Date(anio, mes - 1, dia);
    const fechaISO = fechaBusqueda.toISOString().split("T")[0]; // Convertir la fecha a formato ISO

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
      .status(409)
      .json({ error: "Ya existe un turno en la misma hora" });
  }

  const newTurno = await Turno.create({
    fecha: fechaISO,
    hora: horaTurno,
  });
  await currentPaciente?.addTurno(newTurno);

  // Envía el correo electrónico de notificación
  const email = currentPaciente.email;
  const asunto = "Confirmación de turno";
  const contenido = `Estimado/a ${currentPaciente.nombre}, esta es la confirmación de que tienes un turno programado para el día ${fechaTurno} a las ${horaTurno}.`;
  enviarCorreo(email, asunto, contenido);

  // Agrega el evento al calendario del paciente
  const descripcion = "Turno en el centro odontológico";
  agregarEventoCalendario(email, fechaISO, horaTurno, asunto, descripcion);

  response(res, 200, newTurno);
};

export const updateTurno = async (req, res) => {
  const { id } = req.params;
  const turno = await Turno.findByPk(id);

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
  const updatedTurno = await turno?.update({
    fecha: fechaISO,
    hora: horaTurno,
  });
  response(res, 201, updatedTurno);
};

export const deleteTurno = async (req, res) => {
  const { id } = req.params;
  const turno = await Turno.findByPk(id);
  await turno.destroy();
  response(res, 200, `Turno Id: ${id} eliminado!`);
};

export const disponibilidad = async (req, res) => {
  const diasConHorasDisponibles = await generarDiasConHorasDisponibles();
  response(res, 200, diasConHorasDisponibles);
};
