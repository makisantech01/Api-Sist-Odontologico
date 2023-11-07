import response from "../utils/response.js"
import Option from "../models/option.js"

export const getAllOptions = async (req, res) => {
	const options = await Option.findAll()
	response(res, 200, options)
}

export const deleteAllOptions = async (req, res) => {
	try {
		Option.destroy({
			where: {},
			truncate: true, // Reinicia el contador de autoincremento (si existe)
		})
		console.log("Options deleted succesfully")
		response(res, 200, "Options deleted succesfully")

	} catch (error) {
		console.error("Options delete error:", error)
	}

}
