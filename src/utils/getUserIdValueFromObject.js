function getUserIdValueFromObject(obj) {
	// Función recursiva para buscar y devolver el valor de la propiedad "dni"
	function buscar(obj) {
		for (const key in obj) {
			if (typeof obj[key] === 'object') {
				const resultadoRecursivo = buscar(obj[key])
				if (resultadoRecursivo) {
					return resultadoRecursivo
				}

			} else if (key === 'dni') {
				return obj[key]
			}
		}
		return null
	}

	return parseInt(buscar(obj));
}

export default getUserIdValueFromObject