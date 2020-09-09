"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _systeminformation = _interopRequireDefault(require("systeminformation"));

var _serialNumber = _interopRequireDefault(require("serial-number"));

var _crypto = _interopRequireDefault(require("crypto"));

var _inkGradient = _interopRequireDefault(require("ink-gradient"));

var _inkBigText = _interopRequireDefault(require("ink-big-text"));

var _inkTextInput = _interopRequireDefault(require("ink-text-input"));

var _inkSpinner = _interopRequireDefault(require("ink-spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

process.env.FORCE_COLOR = "1"; //npx babel index.js -o run.js

var App = function App() {
  var devices = ["flash drive", "CPU", "HDD", "mac-address", "ip-address"];
  var ciphers = ["aes256", "aes128"];

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      keys = _useState2[0],
      setKeys = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      time = _useState4[0],
      setTime = _useState4[1];

  var _useState5 = (0, _react.useState)(undefined),
      _useState6 = _slicedToArray(_useState5, 2),
      status = _useState6[0],
      setStatus = _useState6[1];

  var _useState7 = (0, _react.useState)(""),
      _useState8 = _slicedToArray(_useState7, 2),
      query = _useState8[0],
      setQuery = _useState8[1];

  var _useState9 = (0, _react.useState)({}),
      _useState10 = _slicedToArray(_useState9, 2),
      encrypts = _useState10[0],
      setEncrypts = _useState10[1];

  (0, _react.useEffect)(function () {
    if (status === "Encryption") {}
  }, [status]);
  (0, _react.useEffect)(function () {
    var interval = setInterval(function () {
      setTime(function (time) {
        return time + 1;
      });
      if (status != "Encryption" && status != "Fulfilled" && Object.entries(keys).filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return value;
      }).length == devices.length - 1) setStatus("Fulfilled");
    }, 1000);
    return function () {
      return clearInterval(interval);
    };
  });
  (0, _react.useEffect)(function () {
    _systeminformation["default"].blockDevices().then(function (data) {
      var _data$find;

      var serial = (_data$find = data.find(function (obj) {
        return obj.name === "E:";
      })) === null || _data$find === void 0 ? void 0 : _data$find.serial;
      if (!serial) setStatus("Cannot find flash drive");
      setKeys(function (keys) {
        return _objectSpread(_objectSpread({}, keys), {
          "flash drive": serial
        });
      });
    });

    (0, _serialNumber["default"])(function (err, value) {
      if (err) setStatus("Cannot find CPU");
      setKeys(function (keys) {
        return _objectSpread(_objectSpread({}, keys), {
          CPU: value
        });
      });
    });

    _systeminformation["default"].diskLayout().then(function (data) {
      if (!data) setStatus("Cannot find HDD");
      setKeys(function (keys) {
        return _objectSpread(_objectSpread({}, keys), {
          HDD: data.pop().serialNum
        });
      });
    });

    _systeminformation["default"].networkInterfaces().then(function (data) {
      if (!data) setStatus("Cannot get mac-address");
      setKeys(function (keys) {
        return _objectSpread(_objectSpread({}, keys), {
          "mac-address": data.shift().mac
        });
      });
    });

    _systeminformation["default"].networkInterfaces().then(function (data) {
      if (!data) setStatus("Cannot get ip-address");
      setKeys(function (keys) {
        return _objectSpread(_objectSpread({}, keys), {
          "ip-address": data.shift().ip4
        });
      });
    });
  }, []);

  var handleSubmit = function handleSubmit() {
    setStatus("Encryption");
  };

  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, /*#__PURE__*/_react["default"].createElement(_inkGradient["default"], {
    name: "rainbow"
  }, /*#__PURE__*/_react["default"].createElement(_inkBigText["default"], {
    text: "Lab 1"
  }))), status != "Encryption" && /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column"
  }, devices.map(function (device, i) {
    var color = "yellow";
    var deviceColor = undefined;

    var prefix = /*#__PURE__*/_react["default"].createElement(_inkSpinner["default"], {
      type: "line"
    });

    var value = "[Pending]";

    if (device in keys) {
      color = "red";
      prefix = "✘";
      deviceColor = "gray";
      value = "Not available";
    }

    if (keys[device]) {
      color = "green";
      prefix = "✔";
      deviceColor = undefined;
      value = keys[device];
    }

    return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
      key: i
    }, /*#__PURE__*/_react["default"].createElement(_ink.Box, {
      width: "14"
    }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, {
      color: color
    }, prefix), " ", /*#__PURE__*/_react["default"].createElement(_ink.Text, {
      color: deviceColor
    }, device))), /*#__PURE__*/_react["default"].createElement(_ink.Text, {
      key: i
    }, /*#__PURE__*/_react["default"].createElement(_ink.Text, {
      color: color
    }, value)));
  })), status !== "Fulfilled" && /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "blue"
  }, time, " c."), status && /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: status === "Fulfilled" ? "green" : status === "Encryption" ? "blue" : "red"
  }, status), status === "Fulfilled" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_ink.Box, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "Plaintext input"), /*#__PURE__*/_react["default"].createElement(_inkSpinner["default"], {
    type: "simpleDots"
  })), /*#__PURE__*/_react["default"].createElement(_inkTextInput["default"], {
    value: query,
    onChange: setQuery,
    onSubmit: handleSubmit,
    placeholder: "enter text"
  })), status === "Encryption" && /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "Plaint text: ", /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "yellow"
  }, query)), ciphers.map(function (cipher, i) {
    return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
      key: i
    }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, cipher), /*#__PURE__*/_react["default"].createElement(_ink.Text, null, " --", ">", " "), /*#__PURE__*/_react["default"].createElement(_ink.Text, null, " ??? "));
  })));
};

(0, _ink.render)( /*#__PURE__*/_react["default"].createElement(App, null));
