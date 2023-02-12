const pageNotFound = (req, res, next) => {
  res.status(404).json({ success: false, msg: 'Page Not Found' });
};

export { pageNotFound };
