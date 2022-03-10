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
  authorizeRoles,
} = require("../middleware/auth");

const router = express.Router();

router.route("/product").get(getAllProducts);
router
  .route("/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    createProduct
  );
router
  .route("/product/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateProducts
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteProduct
  )
  .get(getProductById);
module.exports = router;
