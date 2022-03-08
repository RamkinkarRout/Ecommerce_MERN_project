const Product = require("../models/productModels");

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

//upadate products -- Admin only

exports.updateProducts = async (req, res) => {
  let product = await Product.findById(req.params.id);
  // if product not found
  if (!product) {
    return res.status(500).json({
      status: "fail",
      message: "Product not found",
    });
  } else {
    product = await Product.findByIdAndUpdate(
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
  }
};

//delete product -- Admin only

exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product not found
  if (!product) {
    return res.status(500).json({
      status: "fail",
      message: "Product not found",
    });
  } else {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  }
};
