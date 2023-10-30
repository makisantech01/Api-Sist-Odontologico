import response from "../utils/response.js"
import Consulta from "../models/consulta.js"
import Paciente from "../models/paciente.js"
import Odontograma from "../models/odontograma.js"
import Producto from "../models/producto.js"

export const getAllConsultasController = async (req, res) => {
	const consultas = await Consulta.findAll({
		include: [{ model: Odontograma, attributes: ['id'] }],
	});
	return consultas
}

export const getConsultaController = async (id) => {
	const consulta = await Consulta.findByPk(id, {
		include: [{ model: Paciente }, { model: Odontograma }, { model: Producto }],
	})
	return consulta
}

export const createConsultaController = async (dni, consultaData) => {
	// const { productos, ...consultaData } = req.body;
	const currentPaciente = await Paciente.findByPk(dni)
	if (!currentPaciente) return null
	const newConsulta = await Consulta.create(consultaData)
	await currentPaciente?.addConsulta(newConsulta)
	// for (const producto of productos) {
	//   const { id, cantidad } = producto;

	//   // Buscar el producto en la base de datos
	//   const productoExistente = await Producto.findByPk(id);

	//   if (productoExistente) {
	//     // Actualizar el stock del producto restando la cantidad utilizada
	//     productoExistente.cantidad -= cantidad;
	//     await productoExistente.save();
	//   }
	// }
	return newConsulta
}

export const updateConsultaController = async (id) => {
	const consulta = await Consulta.findByPk(id)
	const updatedConsulta = await consulta?.update(req.body)
	return updatedConsulta
}

export const deleteConsultaController = async (id) => {
	const consulta = await Consulta.findByPk(id)
	await consulta.destroy()
	response(res, 200, `Consulta ID: ${id} eliminada!`)
}
