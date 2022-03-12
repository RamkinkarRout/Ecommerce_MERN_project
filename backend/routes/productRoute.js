const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getProductById,
  createProductReview,
} = require("../controller/productController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/auth");

const router = express.Router();

router.route("/product").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    createProduct
  );
router
  .route("/admin/product/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateProducts
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteProduct
  );

router.route("/product/:id").get(getProductById);

router
  .route("/review")
  .put(isAuthenticatedUser, createProductReview);

module.exports = router;
