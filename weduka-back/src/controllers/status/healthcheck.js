const healthcheckStatus = async (req, res, next) => {
  return res.flatResponse(req.id, 200, {
    status: 'ok',
  });
};

module.exports = {
  healthcheckStatus,
};
