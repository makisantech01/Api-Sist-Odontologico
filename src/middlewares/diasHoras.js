import moment from "moment";
import "moment/locale/es.js";
import Turno from "../models/turno.js";
const rangoHoras = { inicio: 15, fin: 20 };
const intervaloMinutos = 30;

moment.locale("es");

const generarHorasDisponibles = () => {
  const horasDisponibles = [];
  const { inicio, fin } = rangoHoras;
  const topeHorario = moment({ hour: fin, minute: 0 });

  let hora = moment({ hour: inicio, minute: 0 });

  // Generar las horas disponibles hasta el tope horario
  while (hora.isBefore(topeHorario)) {
    horasDisponibles.push({ hora: hora.format("HH:mm"), disponible: true });
    hora.add(intervaloMinutos, "minutes");
  }

  return horasDisponibles;
};

export const generarDiasConHorasDisponibles = async () => {
  const dias = [];
  const fechaInicio = moment();

  for (let i = 0; i < 30; i++) {
    const fecha = fechaInicio.clone().add(i, "days");
    const dia = fecha.format("dddd");
    const fechaISO = fecha.format("DD/MM/YYYY");
    const horasDisponibles = generarHorasDisponibles();
    const turnos = await Turno.findAll({
      where: {
        fecha: fecha.format("YYYY-MM-DD"),
      },
    });

    turnos?.forEach((turno) => {
      const horaTurno = moment(turno.hora, "HH:mm");

      const horaEncontrada = horasDisponibles.find(
        (hora) => hora.hora === horaTurno.format("HH:mm")
      );

      if (horaEncontrada) {
        horaEncontrada.disponible = false;
      }
    });

    if (dia !== "sábado" && dia !== "domingo") {
      dias.push({ dia, fecha: fechaISO, horasDisponibles });
    }
  }

  return dias;
};
