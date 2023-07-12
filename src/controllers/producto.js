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
  const newProducto = await Producto.create(req.body);
  response(res, 200, newProducto);
};

export const updateProducto = async (req, res) => {
  const { id } = req.params;

  const producto = await Producto.findByPk(id);
  const updatedProducto = await producto?.update(req.body);
  response(res, 201, updatedProducto);
};

export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findByPk(id);
  await producto.destroy();
  response(res, 200, `Producto ID: ${id} eliminado!`);
};
