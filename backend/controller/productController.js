const Product = require("../models/productModels");
const ErrorHander = require("../utils/errorhander.js");
const catchAsyncError = require("../middleware/catchAsyncError");

//Create product -- Admin only
exports.createProduct = catchAsyncError(
  async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      succress: true,
      product,
    });
  }
);

//Get all products
exports.getAllProducts = catchAsyncError(
  async (req, res) => {
    const product = await Product.find();
    res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      product,
    });
  }
);

//Get single product by id details

exports.getProductById = catchAsyncError(
  async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(
        new ErrorHander("Product not found", 404)
      );
    }
    res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      product,
    });
  }
);

//upadate products -- Admin only

exports.updateProducts = catchAsyncError(
  async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!product) {
      return next(
        new ErrorHander("Product not found", 404)
      );
    }

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      product,
    });
  }
);

//delete product -- Admin only

exports.deleteProduct = catchAsyncError(
  async (req, res, next) => {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );
    if (!product) {
      return next(
        new ErrorHander("Product not found", 404)
      );
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  }
);
