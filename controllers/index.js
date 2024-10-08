const index = async (req, res, next) => {
  const somestuff = [1, 2, 3, 4];
  res.json({
    msg: "Welcome to the blog api",
    stuff: somestuff,
  });
};

export { index };
