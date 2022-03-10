const Product = require("../models/productModels");
const ErrorHander = require("../utils/errorhander.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

//Create product -- Admin only
exports.createProduct = catchAsyncError(
  async (req, res, next) => {
    req.body.user = req.user.id;

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
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(
      Product.find(),
      req.query
    )
      .search()
      .filter()
      .pagination(resultPerPage);
    const product = await apiFeature.query;
    res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      productCount,
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
