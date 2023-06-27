import response from "../utils/response.js";
import Producto from "../models/producto.js";

export const getAllProductos = async (req, res) => {
  const productos = await Producto.findAll();
  response(res, 200, productos);
};

export const getProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findByPk(id);
  response(res, 200, producto);
};

export const createProducto = async (req, res) => {
  const { nombre, cantidad, lote, vencimiento, stockMinimo } = req.body;
  //formateo de fecha
  const [dia, mes, anio] = vencimiento.split("/");
  const fecha = new Date(anio, mes - 1, dia);
  const fechaISO = fecha.toISOString().split("T")[0]; // Convertir la fecha a formato ISO
  const newProducto = await Producto.create({
    nombre,
    cantidad,
    lote,
    vencimiento: fechaISO,
    stockMinimo,
  });
  response(res, 200, newProducto);
};

export const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, cantidad, lote, vencimiento, stockMinimo } = req.body;
  //formateo de fecha
  const [dia, mes, anio] = vencimiento.split("/");
  const fecha = new Date(anio, mes - 1, dia);
  const fechaISO = fecha.toISOString().split("T")[0]; // Convertir la fecha a formato ISO
  const producto = await Producto.findByPk(id);
  const updatedProducto = await producto?.update({
    nombre,
    cantidad,
    lote,
    vencimiento: fechaISO,
    stockMinimo,
  });
  response(res, 201, updatedProducto);
};

export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findByPk(id);
  await producto.destroy();
  response(res, 200, `Producto ID: ${id} eliminado!`);
};
