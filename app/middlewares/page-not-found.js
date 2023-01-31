const pageNotFound = (req, res) => {
  res.status(404).send('<h1>PAGE NOT FOUND</h1>');
};

module.exports = pageNotFound;
