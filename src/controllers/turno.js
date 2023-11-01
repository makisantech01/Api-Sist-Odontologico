import response from "../utils/response.js";
import Turno from "../models/turno.js";
import Paciente from "../models/paciente.js";
import {
  enviarCorreo,
  agregarEventoCalendario,
} from "../middlewares/calendar.js";
import { generarDiasConHorasDisponibles } from "../middlewares/diasHoras.js";
import moment from "moment";
import { cloudresourcemanager } from "googleapis/build/src/apis/cloudresourcemanager/index.js";

export const getAllTurnosController = async (fecha) => {
  if (fecha) {
    const [dia, mes, año] = fecha.split("/");
    const fechaBusqueda = new Date(año, mes - 1, dia);
    const fechaISO = fechaBusqueda.toISOString().split("T")[0]; // Convertir la fecha a formato ISO

    const turnos = await Turno.findAll({
      where: { fecha: fechaISO },
      include: [{ model: Paciente }],
    });
    const turnosFormateados = turnos.map((turno) => {
      const fechaOriginal = new Date(turno.fecha);
      const fechaFormateada = `${fechaOriginal
        .getUTCDate()
        .toString()
        .padStart(2, "0")}/${(fechaOriginal.getUTCMonth() + 1)
          .toString()
          .padStart(2, "0")}/${fechaOriginal.getUTCFullYear()}`;
      return { ...turno.toJSON(), fecha: fechaFormateada };
    });
    return turnosFormateados

  } else {
    const turno = await Turno.findAll({
      include: [{ model: Paciente }],
    });
    const turnoFormateados = turno.map((t) => {
      const fechaOriginal = moment(t.fecha);
      const fechaFormateada = fechaOriginal.format("DD/MM/YYYY");
      return { ...t.toJSON(), fecha: fechaFormateada };
    });
    return turnoFormateados
  }
};

export const getTurnoController = async (id) => {
  const turno = await Turno.findByPk(id, {
    include: [{ model: Paciente }],
  });
  return turno
};

export const createTurnoController = async (dni, fechaTurno, horaTurno) => {
  const currentPaciente = await Paciente.findByPk(dni);
  if (!currentPaciente) {
    throw new Error(`No se encontró un paciente con dni ${dni}`)
  }
  // Obtén el día y hora del turno que deseas crear
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
    throw new Error("Ya existe un turno en la misma hora")
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

  return newTurno
};

export const updateTurnoController = async (id, fechaTurno, horaTurno) => {
  const turno = await Turno.findByPk(id);
  if (!turno) throw new Error('No se encontro un turno asociado')
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
    throw new Error("Ya existe un turno en el mismo horario")
  }
  const updatedTurno = await turno?.update({
    fecha: fechaISO,
    hora: horaTurno,
  });
  return updatedTurno
};

export const deleteTurnoController = async (id) => {
  const turno = await Turno.findByPk(id);
  await turno.destroy();
  return `Turno Id: ${id} eliminado!`
};

export const disponibilidad = async () => {
  const diasConHorasDisponibles = await generarDiasConHorasDisponibles();
  return diasConHorasDisponibles
};
