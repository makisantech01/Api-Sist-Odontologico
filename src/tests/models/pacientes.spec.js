// import { main } from "../../index.js";
// import { DataTypes } from "sequelize";
// import Paciente from "../../models/paciente.js";

// describe("Paciente Model", () => {
//   main();
//   beforeAll(() => {});

//   test("deberia definir los atributos correctos en la tabla", () => {
//     const attributes = Paciente.rawAttributes;

//     expect(attributes.dni).toBeDefined();
//     expect(attributes.dni.type).toBe(DataTypes.BIGINT);
//     expect(attributes.dni.allowNull).toBe(false);
//     expect(attributes.dni.unique).toBe(true);
//     expect(attributes.dni.primaryKey).toBe(true);

//     expect(attributes.nombre).toBeDefined();
//     expect(attributes.nombre.type).toBe(DataTypes.STRING);
//     expect(attributes.nombre.allowNull).toBe(false);
//   });

//   test("deberia definir las relaciones correspondientes a la tabla", () => {
//     const associations = Paciente.associations;

//     expect(associations.Consulta).toBeDefined();
//     expect(associations.Consulta.foreignKey).toBe("pacienteId");
//     expect(associations.Consulta.sourceKey).toBe("dni");

//     expect(associations.Historial).toBeDefined();
//     expect(associations.Historial.foreignKey).toBe("pacienteId");
//     expect(associations.Historial.sourceKey).toBe("dni");
//   });
// });
