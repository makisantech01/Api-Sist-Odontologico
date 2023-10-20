// database/databaseSeeder.js
import Option from "../../models/option.js"

const bulkCreateOptions = async () => {
	console.log("bulkcreateoptions")

	try {
		const options = await Option.findAll()
		if (!options.length) {
			await Option.bulkCreate([
				{
					name: "restaurado",
					color: "gray",
				},
				{
					name: "cariado",
					color: "green",
				},
				{
					name: "restaurado",
					color: "red",
				},
				{
					name: "higido",
					color: "blue",
				},
				{
					name: "corona",
					color: "yellow",
				},
				{
					name: "implantedental",
					color: "purple",
				},
			])
			console.log("Options created succesfully")
		}
	} catch (error) {
		console.error("Error at options management:", error)
	}
}

export default bulkCreateOptions
