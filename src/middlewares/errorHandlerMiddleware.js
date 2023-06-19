const getErrorMessage = require("../utils/errorHelpers");

exports.errorHandlerMiddleware = (err, req, res) => {
  res.render("/404", { error: getErrorMessage(err) });
};
