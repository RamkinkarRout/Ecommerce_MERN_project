const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getProductById,
} = require("../controller/productController");
const {
  isAuthenticatedUser,
} = require("../middleware/auth");

const router = express.Router();

router
  .route("/product")
  .get(isAuthenticatedUser, getAllProducts);
router.route("/product/new").post(createProduct);
router
  .route("/product/:id")
  .put(updateProducts)
  .delete(deleteProduct)
  .get(getProductById);
module.exports = router;
