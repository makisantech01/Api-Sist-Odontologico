import moment from "moment";
import "moment/locale/es.js";
const rangoHoras = { inicio: 16, fin: 20 };
const intervaloMinutos = 30;

moment.locale("es");

const generarHorasDisponibles = () => {
  const horasDisponibles = [];
  const { inicio, fin } = rangoHoras;
  const topeHorario = moment({ hour: fin, minute: 0 });

  let hora = moment({ hour: inicio, minute: 0 });

  // Generar las horas disponibles hasta el tope horario
  while (hora.isBefore(topeHorario)) {
    horasDisponibles.push(hora.format("HH:mm"));
    hora.add(intervaloMinutos, "minutes");
  }

  return horasDisponibles;
};

export const generarDiasConHorasDisponibles = () => {
  const dias = [];
  const fechaInicio = moment();

  for (let i = 0; i < 30; i++) {
    const fecha = fechaInicio.clone().add(i, "days");
    const dia = fecha.format("dddd");
    const fechaISO = fecha.format("DD/MM/YYYY");
    const horasDisponibles = generarHorasDisponibles();
    if (dia !== "sábado" && dia !== "domingo") {
      dias.push({ dia, fecha: fechaISO, horasDisponibles });
    }
  }

  return dias;
};
