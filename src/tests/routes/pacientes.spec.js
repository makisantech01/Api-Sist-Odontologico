// import request from "supertest";
// import { main } from "../../index.js";
// import app from "../../app.js";
// import Paciente from "../../models/paciente.js";

// describe("Paciente Routes", () => {
//   let paciente;
//   main();
//   beforeEach(() => {
//     paciente = Paciente.create({
//       dni: "123456789",
//       nombre: "Cristian",
//       apellido: "Prueba",
//       edad: 27,
//       fechaNacimiento: "01/10/1995",
//       domicilio: "Pellegrini 1543",
//       localidad: "Quilmes",
//       nroHistoriaClinica: 123456,
//       email: "cristianmurua1995@gmail.com",
//       telefono1: 1123459954,
//       telefono2: 1133459954,
//       obraSocial: "OSDE",
//     });
//   });

//   test("debería obtener el listado de pacientes y responder con status 200", (done) => {
//     request(app)
//       .get(`/pacientes`)
//       .then((response) => {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//   });

//   test("debería obtener el paciente con el dni ingresado y responder con status 200", (done) => {
//     request(app)
//       .get(`/pacientes/${paciente.dni}`)
//       .then((response) => {
//         expect(response.statusCode).toBe(200);
//         expect(response).toBe(paciente);
//         done();
//       });
//   });

//   // // Elimina el paciente después de ejecutar las pruebas
//   // afterEach(async () => {
//   //   if (paciente) {
//   //     await Paciente.destroy({ where: { dni: paciente.dni } });
//   //   }
//   // });
// });
