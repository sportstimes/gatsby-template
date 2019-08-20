"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.onPostBuild = onPostBuild;
exports.onPreBootstrap = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _json2csv = require("json2csv");

var _internals = require("./internals");

var publicPath = "./public";
var onPreBootstrap = _internals.validateOptions;
exports.onPreBootstrap = onPreBootstrap;

function onPostBuild(_x, _x2) {
  return _onPostBuild.apply(this, arguments);
}

function _onPostBuild() {
  _onPostBuild = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_ref, options) {
    var graphql, baseQuery, feedPromises, feeds, filePromises;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            graphql = _ref.graphql;

            if (!options.query) {
              _context3.next = 5;
              break;
            }

            _context3.next = 4;
            return (0, _internals.runQuery)(graphql, options.query);

          case 4:
            baseQuery = _context3.sent;

          case 5:
            // Run queries
            feedPromises = Object.keys(options.feeds).map(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(feed) {
                var _options$feeds$feed, query, rest, data;

                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _options$feeds$feed = options.feeds[feed], query = _options$feeds$feed.query, rest = (0, _objectWithoutPropertiesLoose2.default)(_options$feeds$feed, ["query"]);

                        if (!query) {
                          _context.next = 5;
                          break;
                        }

                        _context.next = 4;
                        return (0, _internals.runQuery)(graphql, query);

                      case 4:
                        data = _context.sent;

                      case 5:
                        return _context.abrupt("return", (0, _extends2.default)({
                          query: Object.assign({}, baseQuery, data)
                        }, rest));

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context3.next = 8;
            return Promise.all(feedPromises);

          case 8:
            feeds = _context3.sent;
            // Serialize data
            filePromises = feeds.map(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee2(feed) {
                var serialize, query, output, fields, feedData, parser, csvData, outputPath, outputDir;
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        serialize = feed.serialize, query = feed.query, output = feed.output;
                        fields = [];
                        feedData = serialize({
                          query: query
                        }); // Get headers

                        feedData.forEach(function (item) {
                          Object.keys(item).forEach(function (header) {
                            var headerMatch = fields.find(function (val) {
                              return val === header;
                            });

                            if (!headerMatch) {
                              fields.push(header);
                            }
                          });
                        }); // Create csv

                        parser = new _json2csv.Parser({
                          fields: fields
                        });
                        csvData = parser.parse(feedData); // Write to file

                        outputPath = _path.default.join(publicPath, output);
                        outputDir = _path.default.dirname(outputPath);
                        _context2.next = 10;
                        return _fsExtra.default.exists(outputDir);

                      case 10:
                        if (_context2.sent) {
                          _context2.next = 13;
                          break;
                        }

                        _context2.next = 13;
                        return _fsExtra.default.mkdirp(outputDir);

                      case 13:
                        _context2.next = 15;
                        return _fsExtra.default.writeFile(outputPath, csvData);

                      case 15:
                        return _context2.abrupt("return", _context2.sent);

                      case 16:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }()); // Write to files

            _context3.next = 12;
            return Promise.all(filePromises);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _onPostBuild.apply(this, arguments);
}