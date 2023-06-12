import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import {
  getAllProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../controllers/producto.js";

const router = Router();

router.get("/", catchedAsync(getAllProductos));
router.get("/:id", catchedAsync(getProducto));
router.post("/", catchedAsync(createProducto));
router.put("/:id", catchedAsync(updateProducto));
router.delete("/:id", catchedAsync(deleteProducto));

export default router;
