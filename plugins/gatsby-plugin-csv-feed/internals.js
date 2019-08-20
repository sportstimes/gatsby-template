"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.validateOptions = validateOptions;
exports.runQuery = runQuery;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function validateOptions(_ref, options) {
  var reporter = _ref.reporter;

  if (options === void 0) {
    options = {};
  }

  delete options.plugins;
  var result = optionsSchema.validate(options, {
    abortEarly: false,
    allowUnknown: false
  });

  if (result.error) {
    var errors = [];
    result.error.details.forEach(function (detail) {
      errors.push(detail.message);
    });
    reporter.panic("Error with gatsby-plugin-csv-feed plugin options:\n" + errors.join('\n'));
  }
}

var itemSchema = _joi.default.object({
  output: _joi.default.string().required(),
  query: _joi.default.string(),
  serialize: _joi.default.func().required()
}).required();

var optionsSchema = _joi.default.object().keys({
  feeds: _joi.default.array().items(itemSchema).required(),
  query: _joi.default.string()
});

function runQuery(handler, query) {
  return handler(query).then(function (res) {
    if (res.errors) {
      throw new Error(res.errors.join(', '));
    }

    return res.data;
  });
}