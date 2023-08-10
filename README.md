rutas de la Api:<br>
<br>
Usuarios:<br>
GET - http://localhost:3001/usuarios devuelve todos los usuarios registrados <br>
GET - http://localhost:3001/usuarios/:dni devuelve el usuario registrado con el dni pasado por params<br>
POST - http://localhost:3001/usuarios crea usuario pasando la info por body<br>
Ej. {<br>
    "dni":39115272,<br>
    "password": "contraseña",<br>
    "admin":false (este valor va por defecto en false para pacientes. El registro de la odontologa sera creado por nosotros para validar la propiedad en true)<br>
}<br>
PUT - http://localhost:3001/usuarios/:dni (dni por params y modificacion por body - el dni no deberia tener que actualizar asi que es la ruta para actualizar la contraseña)<br>
DELETE - http://localhost:3001/usuarios/:dni<br>
<br>
Login:<br>
POST - http://localhost:3001/login<br>
POST - http://localhost:3001/logout<br>
POST - http://localhost:3001/enviar-alerta-whatsapp (pendiente de consultas por costos)<br>
POST - http://localhost:3001/solicitar-restablecimiento/:dni (dni del paciente por params y email por body)<br>
POST - http://localhost:3001/restablecer-contrasena (token y password por body)<br>
PUT - http://localhost:3001/actualizar-contraseña (dni y password por body)<br>
<br>
Pacientes:<br>
GET - http://localhost:3001/pacientes devuelve todos los pacientes registrados<br>
GET - http://localhost:3001/pacientes/:dni devuelve el paciente registrado con el dni pasado por params<br>
POST - http://localhost:3001/pacientes/:id (id de usuario (dni) por params para asociar el paciente)<br>
Ej. {<br>
    "dni":39115272,<br>
    "nombre": "Cristian",<br>
    "apellido": "Murua",<br>
    "edad": 27,<br>
    "fechaNacimiento": "01/10/1995",<br>
    "domicilio": "Pellegrini 1543",<br>
    "localidad": "Quilmes",<br>
    "nroHistoriaClinica": 123456,<br>
    "email": "cristianmurua1995@gmail.com",<br>
    "ocupacion": "Programador",<br>
    "telefono1": 1173627751,<br>
    "telefono2": 1132805541,<br>
    "obraSocial": "OSDE"<br>
    "plan": "ORO"<br>
    "titular": "CRISTIAN N MURUA"<br>
    "afiliado": 123456<br>
}<br>
<br>
PUT - http://localhost:3001/pacientes/:dni (dni por params, Modificaciones pasado por body)<br>
DELETE - http://localhost:3001/pacientes/:dni (dni por params)<br>
<br>
Consultas:<br>
GET - http://localhost:3001/consultas devuelve todas las consultas registradas<br>
GET - http://localhost:3001/consultas/:id devuelve la consulta registrada con el id pasado por params<br>
POST - http://localhost:3001/consultas/:dni crea una consulta asociada al paciente con el dni pasado por params<br>
{<br>
    "prestacion": "Limpieza y blanqueamiento",<br>
    "zona": "Distal",<br>
    "caras": "V",<br>
    "sector": 16,<br>
    "observaciones": "alguna observacion"<br>
}<br>
PUT - http://localhost:3001/consultas/:id<br>
DELETE - http://localhost:3001/consultas/:id<br>
<br>
Turnos:<br>
GET - http://localhost:3001/turnos devuelve todos los turnos registrados<br>
GET - http://localhost:3001/turnos?fecha=DD/MM/AAA devuelve todos los turnos registrados en la fecha que se pasa por query<br>
GET - http://localhost:3001/turnos/disponibilidad devuelve un array con los 30 dias proxios desde la fecha en que se hace la peticion con sus respectivos horarios y sin los sabados y domingos. Tambien posee cada horario una propiedad disponible en true o false, dependiendo de si ya existe un turno en esa fecha y hora en concreto <br>
Ej. <br>
{<br>
            "dia": "lunes",<br>
            "fecha": "10/07/2023",<br>
            "horasDisponibles": [<br>
                {<br>
                    "hora": "16:00",<br>
                    "disponible": true<br>
                },<br>
                {<br>
                    "hora": "16:30",<br>
                    "disponible": true<br>
                },<br>
                {<br>
                    "hora": "17:00",<br>
                    "disponible": true<br>
                },<br>
                {<br>
                    "hora": "17:30",<br>
                    "disponible": false<br>
                },<br>
                {<br>
                    "hora": "18:00",<br>
                    "disponible": true<br>
                },<br>
                {<br>
                    "hora": "18:30",<br>
                    "disponible": false<br>
                },<br>
                {<br>
                    "hora": "19:00",<br>
                    "disponible": true<br>
                },<br>
                {<br>
                    "hora": "19:30",<br>
                    "disponible": false<br>
                }<br>
            ]<br>
        }, <br>  
GET - http://localhost:3001/turnos/:id devuelve la consulta registrada con el id pasado por params<br>
POST - http://localhost:3001/turnos/:dni crea una consulta asociada al paciente con el dni pasado por params<br>
{<br>
    "fecha": "28/06/2023",<br>
    "hora": "16:00",<br>
    "estado": true,<br>
}<br>
PUT - http://localhost:3001/turnos/:id<br>
DELETE - http://localhost:3001/turnos/:id<br>
<br>
Historial Medico:<br>
GET - http://localhost:3001/historiales<br>
GET - http://localhost:3001/historiales/:id<br>
POST - http://localhost:3001/historiales/:dni se le pasa el dni del paciente/usuario para asociar el form<br>
{<br>
    "enfermedad": false,<br>
    "detalleEnfermedad": "detalle",<br>
    "tratamientoMedico": false,<br>
    "detalleTratamiento": "detalle",<br>
    "medicacion": false,<br>
    "detalleMedicacion": "detalle",<br>
    "alergia": false,<br>
    "detalleAlergia": "detalle",<br>
    "cicatrizacion": false,<br>
    "fiebreReumatica": false,<br>
    "diabetes": false,<br>
    "problemasCardiacos": false,<br>
    "aspirinas": false,<br>
    "anticoagulante": false,<br>
    "tabaquismo": true,<br>
    "embarazo": false,<br>
    "mesesEmbarazo": 6,<br>
    "hipertension": false,<br>
    "hipotension": false,<br>
    "problemasRenales": false,<br>
    "problemasGastricos": false,<br>
    "detalleGastricos": "detalle",<br>
    "convulsiones": false,<br>
    "epilepsia": false,<br>
    "sifilisGonorreaHIV": false,<br>
    "operacion": false,<br>
    "detalleOperacion": "detalle",<br>
    "problemasRespiratorios": false,<br>
    "detalleRespiratorios": "detalle",<br>
    "tiroides": false,<br>
    "detalleTiroides": "detalle",<br>
    "otros": false,<br>
    "detalleOtros": "detalle",<br>
    "consentimiento": true<br>
}<br>
PUT - http://localhost:3001/historiales/:id<br>
DELETE - http://localhost:3001/historiales/:id<br>
<br>
Productos:<br>
GET - http://localhost:3001/productos<br>
GET - http://localhost:3001/productos/:id<br>
POST - http://localhost:3001/productos<br>
{<br>
    "nombre":"Dentifrico",<br>
    "cantidad": 10,<br>
    "lote": "K2023",<br>
    "vencimiento": "23/06/2028",<br>
    "stockMinimo": 2<br>
}<br>
PUT - http://localhost:3001/productos/:id<br>
DELETE - http://localhost:3001/productos/:id<br>
<br>
Odontogramas:<br>
GET - http://localhost:3001/odontogramas<br>
GET - http://localhost:3001/odontogramas/:id<br>
POST - http://localhost:3001/odontogramas/:id Se pasa el id por params de la consulta asociada al organigrama<br>
{<br>
    "datos": {<br>
        "18": { "extras": { "Cross": "red" } },<br>
        "26": { "left": "blue", "bottom": "blue", "center": "blue" },<br>
        "28": { "extras": { "Cross": "red" } },<br>
        "38": { "extras": { "Cross": "red" } }<br>
    },<br>
    "observaciones": "observaciones"<br>
}<br>
PUT - http://localhost:3001/odontogramas/:id<br>
DELETE - http://localhost:3001/odontogramas/:id<br>
<br>
Google Calendar:<br>
GET - http://localhost:3001/google -> redirect a google/redirect para obtener token y permisos para acceder al Calendar del paciente<br>
GET - http://localhost:3001/google/redirect -> se aceptan los permisos y envia por consola mensaje de exito<br>
<br>
POST - http://localhost:3001/turnos/:dni crea una consulta asociada al paciente con el dni pasado por params, envia confirmacion de turno via mail y luego de los pasos anteriores con el seteo de las credenciales agendara evento en el Google Calendar del paciente<br>
<br>
{<br>
    "fecha": "28/06/2023",<br>
    "hora": "16:00",<br>
    "estado": true,<br>
}<br>
