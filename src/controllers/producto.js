import response from "../utils/response.js";
import Producto from "../models/producto.js";
import moment from "moment";

export const getAllProductos = async (req, res) => {
  const productos = await Producto.findAll();
  const productosFormateados = productos.map((producto) => {
    const fechaOriginal = moment(producto.vencimiento);
    const fechaFormateada = fechaOriginal.format("DD/MM/YYYY");
    return { ...producto.toJSON(), vencimiento: fechaFormateada };
  });
  response(res, 200, productosFormateados);
};

export const getProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findByPk(id);
  if (!producto) {
    response(res, 404, { message: "Producto no encontrado!" });
  } else {
    const fechaOriginal = new Date(producto.vencimiento);
    const fechaFormateada = `${fechaOriginal
      .getUTCDate()
      .toString()
      .padStart(2, "0")}/${(fechaOriginal.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0")}/${fechaOriginal.getUTCFullYear()}`;
    response(res, 200, {
      ...producto.toJSON(),
      vencimiento: fechaFormateada,
    });
  }
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
