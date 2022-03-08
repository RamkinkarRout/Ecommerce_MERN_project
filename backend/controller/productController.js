exports.getAllProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Products fetched successfully",
  });
};
