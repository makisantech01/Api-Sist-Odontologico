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
import { createTurnoController, deleteTurnoController, getAllTurnosController, getTurnoController, updateTurnoController } from "../controllers/turno.js";

export const getAllTurnos = async (req, res) => {
	const { fecha } = req.query;
	const turnos = await getAllTurnosController(fecha)
	response(res, 200, turnos)
};

export const getTurno = async (req, res) => {
	const { id } = req.params;
	const turno = getTurnoController(id)
	response(res, 200, turno);
};

export const createTurno = async (req, res) => {
	const { dni } = req.params;
	const fechaTurno = req.body.fecha;
	const horaTurno = req.body.hora;
	if (!dni, !fechaTurno, !horaTurno) throw new Error('Faltan campos requeridos (dni - fecha - hora')

	const newTurno = await createTurnoController(dni, fechaTurno, horaTurno)
	response(res, 200, newTurno);
};

export const updateTurno = async (req, res) => {
	const { id } = req.params;
	// Obtén el día y hora del turno que deseas crear
	const fechaTurno = req.body.fecha;
	const horaTurno = req.body.hora;

	const updatedTurno = await updateTurnoController(id, fechaTurno, horaTurno)
	response(res, 201, updatedTurno);
};

export const deleteTurno = async (req, res) => {
	const { id } = req.params;
	const response = await deleteTurnoController(id)
	response(res, 200, response);
};

export const disponibilidad = async (req, res) => {
	const diasConHorasDisponibles = await disponibilidad()
	response(res, 200, diasConHorasDisponibles);
};
