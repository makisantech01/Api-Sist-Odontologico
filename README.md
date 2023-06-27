rutas de la Api:<br>
<br>
Usuarios:<br>
GET - http://localhost:3001/usuarios devuelve todos los usuarios registrados <br>
GET - http://localhost:3001/usuarios/:dni devuelve el usuario registrado con el dni pasado por params
POST - http://localhost:3001/usuarios crea usuario pasando la info por body
Ej. {
    "dni":39115272,
    "password": "contraseña",
    "admin":false (este valor va por defecto en false para pacientes. El registro de la odontologa sera creado por nosotros para validar la propiedad en true)
}
PUT - http://localhost:3001/usuarios/:dni (dni por params y modificacion por body - el dni no deberia tener que actualizar asi que es la ruta para actualizar la contraseña)
DELETE - http://localhost:3001/usuarios/:dni

Login:
POST - http://localhost:3001/login
POST - http://localhost:3001/logout
POST - http://localhost:3001/enviar-alerta-whatsapp (pendiente de consultas por costos)
POST - http://localhost:3001/solicitar-restablecimiento/:dni (dni del paciente por params y email por body)
POST - http://localhost:3001/restablecer-contraseña (token y password por body)
PUT - http://localhost:3001/actualizar-contraseña (dni y password por body)

Pacientes:
GET - http://localhost:3001/pacientes devuelve todos los pacientes registrados
GET - http://localhost:3001/pacientes/:dni devuelve el paciente registrado con el dni pasado por params
POST - http://localhost:3001/pacientes/:id (id de usuario (dni) por params para asociar el paciente)
Ej. {
    "dni":39115272,
    "nombre": "Cristian",
    "apellido": "Murua",
    "edad": 27,
    "fechaNacimiento": "01/10/1995",
    "domicilio": "Pellegrini 1543",
    "localidad": "Quilmes",
    "nroHistoriaClinica": 123456,
    "email": "cristianmurua1995@gmail.com",
    "telefono1": 1173627751,
    "telefono2": 1132805541,
    "obraSocial": "OSDE"
}

PUT - http://localhost:3001/pacientes/:dni (dni por params, Modificaciones pasado por body)
DELETE - http://localhost:3001/pacientes/:dni (dni por params)

Consultas:
GET - http://localhost:3001/consultas devuelve todas las consultas registradas
GET - http://localhost:3001/consultas/:id devuelve la consulta registrada con el id pasado por params
POST - http://localhost:3001/consultas/:dni crea una consulta asociada al paciente con el dni pasado por params
{
    "prestacion": "Limpieza y blanqueamiento",
    "zona": "Distal",
    "caras": "V",
    "sector": 16,
    "observaciones": "alguna observacion"
}
PUT - http://localhost:3001/consultas/:id
DELETE - http://localhost:3001/consultas/:id

Turnos:
GET - http://localhost:3001/turnos devuelve todos los turnos registrados
GET - http://localhost:3001/turnos?fecha=DD/MM/AAA devuelve todos los turnos registrados en la fecha que se pasa por query
GET - http://localhost:3001/turnos/:id devuelve la consulta registrada con el id pasado por params
POST - http://localhost:3001/turnos/:dni crea una consulta asociada al paciente con el dni pasado por params
{
    "fecha": "28/06/2023",
    "hora": "16:00",
    "estado": true,

}
PUT - http://localhost:3001/turnos/:id
DELETE - http://localhost:3001/turnos/:id

Historial Medico:
GET - http://localhost:3001/historiales
GET - http://localhost:3001/historiales/:id
POST - http://localhost:3001/historiales/:dni se le pasa el dni del paciente/usuario para asociar el form
{
    "enfermedad": false,
    "detalleEnfermedad": "detalle",
    "tratamientoMedico": false,
    "detalleTratamiento": "detalle",
    "medicacion": false,
    "detalleMedicacion": "detalle",
    "alergia": false,
    "detalleAlergia": "detalle",
    "cicatrizacion": false,
    "fiebreReumatica": false,
    "diabetes": false,
    "problemasCardiacos": false,
    "aspirinas": false,
    "anticoagulante": false,
    "tabaquismo": true,
    "embarazo": false,
    "mesesEmbarazo": 6,
    "hipertension": false,
    "hipotension": false,
    "problemasRenales": false,
    "problemasGastricos": false,
    "detalleGastricos": "detalle",
    "convulsiones": false,
    "epilepsia": false,
    "sifilisGonorreaHIV": false,
    "operacion": false,
    "detalleOperacion": "detalle",
    "problemasRespiratorios": false,
    "detalleRespiratorios": "detalle",
    "tiroides": false,
    "detalleTiroides": "detalle",
    "otros": false,
    "detalleOtros": "detalle",
    "consentimiento": true
}
PUT - http://localhost:3001/historiales/:id
DELETE - http://localhost:3001/historiales/:id

Productos:
GET - http://localhost:3001/productos
GET - http://localhost:3001/productos/:id
POST - http://localhost:3001/productos
{
    "nombre":"Dentifrico",
    "cantidad": 10,
    "lote": "K2023",
    "vencimiento": "23/06/2028",
    "stockMinimo": 2
}
PUT - http://localhost:3001/productos/:id
DELETE - http://localhost:3001/productos/:id

Odontogramas:
GET - http://localhost:3001/odontogramas
GET - http://localhost:3001/odontogramas/:id
POST - http://localhost:3001/odontogramas/:id Se pasa el id por params de la consulta asociada al organigrama
{
    "datos": {
        "18": { "extras": { "Cross": "red" } },
        "26": { "left": "blue", "bottom": "blue", "center": "blue" },
        "28": { "extras": { "Cross": "red" } },
        "38": { "extras": { "Cross": "red" } }

    },
    "observaciones": "observaciones"
}
PUT - http://localhost:3001/odontogramas/:id
DELETE - http://localhost:3001/odontogramas/:id

