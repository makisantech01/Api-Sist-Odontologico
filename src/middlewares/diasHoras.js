import moment from "moment";

const rangoHoras = { inicio: 16, fin: 20 };
const intervaloMinutos = 30;

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
    const fechaISO = fecha.format("DD/MM/YYYY");
    const horasDisponibles = generarHorasDisponibles();
    dias.push({ fecha: fechaISO, horasDisponibles });
  }

  return dias;
};
