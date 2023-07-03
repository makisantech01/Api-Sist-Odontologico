import request from "supertest";
import { main } from "../../index.js";
import app from "../../app.js";
import Paciente from "../../models/paciente.js";

describe("Paciente Routes", () => {
  let paciente;
  beforeEach(async () => {
    await main();
    // paciente = Paciente.create({
    //   dni: "123456789",
    //   nombre: "Cristian",
    //   apellido: "Prueba",
    //   edad: 27,
    //   fechaNacimiento: "01/10/1995",
    //   domicilio: "Pellegrini 1543",
    //   localidad: "Quilmes",
    //   nroHistoriaClinica: 123456,
    //   email: "cristianmurua1995@gmail.com",
    //   telefono1: 1123459954,
    //   telefono2: 1133459954,
    //   obraSocial: "OSDE",
    // });
  });

  test("debería obtener un paciente por su DNI", async () => {
    const response = await request(app).get(`/pacientes`);
    expect(response.status).toBe(200);
    // Agrega más expectativas para verificar la respuesta
  });

  // Otras pruebas para diferentes escenarios

  // // Elimina el paciente después de ejecutar las pruebas
  // afterEach(async () => {
  //   if (paciente) {
  //     await Paciente.destroy({ where: { dni: paciente.dni } });
  //   }
  // });
});
