const Product = require("../models/productModels");
const ErrorHander = require("../utils/errorhander.js");

//Create product -- Admin only
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    succress: true,
    product,
  });
};

//Get all products
exports.getAllProducts = async (req, res) => {
  const product = await Product.find();
  res.status(200).json({
    status: "success",
    message: "Products fetched successfully",
    product,
  });
};

//Get single product by id details

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    return next(new ErrorHander("Product not found", 404));
  }
};

//upadate products -- Admin only

exports.updateProducts = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return next(new ErrorHander("Product not found", 404));
  }
};

//delete product -- Admin only

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHander("Product not found", 404));
  }
};
