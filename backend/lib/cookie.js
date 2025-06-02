const tokenMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token)
    return res.status(404).json({ message: `accesss_token not porovided` });

  try {
    req.token = token;
    next();
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: `something went wrong ` });
  }
};

module.exports = {
  tokenMiddleware,
};
