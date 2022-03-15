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
  async (req, res, next) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(
      Product.find(),
      req.query
    )
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      productCount,
      products,
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

//Create new Review or Update existing review

exports.createProductReview = catchAsyncError(
  async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) =>
        rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Review created successfully",
      product,
    });
  }
);

//Get all reviews for a product
exports.getProductReviews = catchAsyncError(
  async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
      return next(
        new ErrorHander("Product not found", 404)
      );
    }
    res.status(200).json({
      status: "success",
      reviews: product.reviews,
      message: "Product reviews fetched successfully",
    });
  }
);

//Delete review for a product
exports.deleteReview = catchAsyncError(
  async (req, res, next) => {
    const product = await Product.findById(
      req.query.productId
    );

    if (!product) {
      return next(
        new ErrorHander("Product not found", 404)
      );
    }

    const reviews = product.reviews.filter(
      (rev) =>
        rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  }
);
