const express = require("express");
const router = express.Router();

const {
  createProduct,
  listProduct,
  readProduct,
  updateProduct,
  deleteProduct,
  listProductById,
  searchFilters,
  createImages,
  removeImage,
} = require("../controller/product");

const { authCheck, adminCheck } = require("../middleweres/auth");

router.post("/product", createProduct);
router.get("/products/:count", listProduct);
router.get("/product/:id", readProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);
router.post("/productby", listProductById);
router.post("/search/filters", searchFilters);

router.post("/images", createImages);
router.post("/removeimage", authCheck, adminCheck, removeImage);

module.exports = router;
