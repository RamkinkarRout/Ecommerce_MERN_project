const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxlength: [10, "Price cannot be more than 10 digits"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  catagory: {
    type: String,
    required: [true, "Please enter product catagory"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxlength: [4, "Stock cannot be more than 4 digits"],
    default: 1,
  },
  numOfViews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: [true, "Please enter your name"],
      },

      rating: {
        type: Number,
        required: [true, "Please enter your rating"],
      },
      comment: {
        type: String,
        required: [true, "Please enter your comment"],
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
