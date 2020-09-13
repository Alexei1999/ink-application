'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _systeminformation = _interopRequireDefault(require("systeminformation"));

var _serialNumber = _interopRequireDefault(require("serial-number"));

var _crypto = _interopRequireDefault(require("crypto"));

var _got = _interopRequireDefault(require("got"));

var _fs = _interopRequireDefault(require("fs"));

var _inkGradient = _interopRequireDefault(require("ink-gradient"));

var _inkBigText = _interopRequireDefault(require("ink-big-text"));

var _inkSpinner = _interopRequireDefault(require("ink-spinner"));

var _inkDivider = _interopRequireDefault(require("ink-divider"));

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

process.env.FORCE_COLOR = '1'; //
//to compile:
//npx babel source.js -o index.js; node ./index.js

// import Server from "./src/components/Server.js";
// import Logo from "./src/components/Logo.js";
// const Timer = importJsx("./src/components/Timer.js");
// const Devices = importJsx("./src/components/Devices.js");
// const Encrypting = importJsx("./src/components/Encrypting.js");
// const Fetching = importJsx("./src/components/Fetching.js");
// const Result = importJsx("./src/components/Result.js");
var key = 'AlexeiShulzhickij2020';

var Server = function Server(setServer) {
  var app = require('express')();

  var port = 3000;

  var bodyParser = require('body-parser');

  var path = __dirname + '/database.json'; //
  //database:
  //
  //{
  //	user: [data, data, data, ...]
  //}
  //
  //{
  //	sdc1s2fsdf341sd: [13123123, 13122323, 12233223, ...]
  //}
  //

  var readDatabase = function readDatabase() {
    if (!_fs["default"].existsSync(path)) _fs["default"].writeFileSync(path, JSON.stringify({}));
    return JSON.parse(_fs["default"].readFileSync(path));
  };

  var writeDatabase = function writeDatabase(data) {
    if (!_fs["default"].existsSync(path)) _fs["default"].writeFileSync(path, JSON.stringify({}));
    return _fs["default"].writeFileSync(path, JSON.stringify(data));
  };

  app.use(bodyParser.json());
  app.post('/', function (req, res) {
    var data = req.body;
    var token = data.map(function (value) {
      var resizedIV = Buffer.allocUnsafe(16);

      var nkey = _crypto["default"].createHash('sha256').update(key).digest(),
          decipher = _crypto["default"].createDecipheriv('aes256', nkey, resizedIV);

      var msg = [];
      msg.push(decipher.update(value, 'hex', 'binary'));
      msg.push(decipher["final"]('binary'));
      return msg.join('').substr(-10);
    }).join('');
    var database = readDatabase();

    if (!(token in database)) {
      database[token] = [];
      var user = Object.values(database).find(function (user) {
        return token.match(/.{1,10}/g).some(function (tkn) {
          return user.includes(tkn);
        });
      });
      if (user && token.match(/.{1,10}/g).filter(function (str) {
        return user.includes(str);
      }).length > 3) database[token] = database[user];
    }

    database[token].push(Date.now());
    writeDatabase(database);
    res.json([token, database[token]]);
  });
  app.use(function (err, req, res, next) {
    console.log(err);
    setServer(false);
    res.status(204).send();
  });
  app.listen(port, function () {
    setServer(true);
  });
};

var Logo = function Logo(_ref) {
  var text = _ref.text,
      status = _ref.status;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      dead = _useState2[0],
      setDead = _useState2[1];

  (0, _react.useEffect)(function () {
    setDead(false);
    var timer = setTimeout(function () {
      return setDead(true);
    }, 10000);
    return function () {
      return clearTimeout(timer);
    };
  }, [status]);
  var skull = "\n\n \u2584\u2580\u2580\u2580\u2580\u2580\u2584   \n\u2590 \u2584\u2584 \u2584\u2584 \u258C\n\u2590 \u2580 \u2584 \u2580 \u258C\n \u258C\u2584 \u2584 \u2584\u2590\n \u2590 \u2580 \u2580 \u258C\n  \u2580\u2580\u2580\u2580\u2580    \n";

  var logo = /*#__PURE__*/_react["default"].createElement(_ink.Text, null, /*#__PURE__*/_react["default"].createElement(_inkGradient["default"], {
    name: "rainbow"
  }, /*#__PURE__*/_react["default"].createElement(_inkBigText["default"], {
    text: text
  })));

  var deadLogo = /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Box, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "red"
  }, skull), /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "red"
  }, /*#__PURE__*/_react["default"].createElement(_inkBigText["default"], {
    text: "404"
  }))), /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "Application is ", /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "redBright"
  }, "dead")), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    height: 1
  }));

  return dead ? deadLogo : logo;
};

var Timer = function Timer(_ref2) {
  var trb = _ref2.trb;

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      time = _useState4[0],
      setTime = _useState4[1];

  (0, _react.useEffect)(function () {
    var interval = setInterval(function () {
      return setTime(function (time) {
        return time + 1;
      });
    }, 1000);
    return function () {
      return clearInterval(interval);
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_inkDivider["default"], {
    padding: 6,
    titlePadding: 5,
    title: time + ' c.',
    dividerColor: !trb ? 'red' : undefined,
    dividerChar: !trb ? '!' : undefined,
    width: 30
  });
};

var Device = function Device(_ref3) {
  var device = _ref3.device,
      _ref3$completed = _ref3.completed,
      completed = _ref3$completed === void 0 ? false : _ref3$completed,
      _ref3$result = _ref3.result,
      result = _ref3$result === void 0 ? undefined : _ref3$result,
      _ref3$error = _ref3.error,
      error = _ref3$error === void 0 ? false : _ref3$error,
      _ref3$simple = _ref3.simple,
      simple = _ref3$simple === void 0 ? false : _ref3$simple,
      _ref3$textColor = _ref3.textColor,
      textColor = _ref3$textColor === void 0 ? undefined : _ref3$textColor;
  var color = !simple ? 'yellow' : undefined;
  var deviceColor = undefined;
  var prefix = !simple ? /*#__PURE__*/_react["default"].createElement(_inkSpinner["default"], {
    type: "line"
  }) : '';
  var value = '[Pending]';

  if (!simple) {
    if (completed) {
      color = 'red';
      prefix = '✘';
      deviceColor = 'gray';
      value = 'Not available';
    }

    if (!result && error) {
      deviceColor = 'gray';
      textColor = 'blue';
      prefix = /*#__PURE__*/_react["default"].createElement(_inkSpinner["default"], {
        type: "dots"
      });
      value = 'Not available';
    }

    if (result) {
      color = 'green';
      prefix = '✔';
      deviceColor = undefined;
      value = result;
    }
  } else value = result;

  return /*#__PURE__*/_react["default"].createElement(_ink.Box, null, /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    width: "14"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: color
  }, prefix), ' ', /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: deviceColor
  }, device))), /*#__PURE__*/_react["default"].createElement(_ink.Text, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: textColor || color
  }, value)));
};

var Devices = function Devices(_ref4) {
  var done = _ref4.done;

  var _useState5 = (0, _react.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      keys = _useState6[0],
      setKeys = _useState6[1];

  var _useState7 = (0, _react.useState)(undefined),
      _useState8 = _slicedToArray(_useState7, 2),
      status = _useState8[0],
      setStatus = _useState8[1];

  var _useState9 = (0, _react.useState)(0),
      _useState10 = _slicedToArray(_useState9, 2),
      count = _useState10[0],
      setCount = _useState10[1];

  var devices = ['flash drive', 'CPU', 'HDD', 'mac-address', 'ip-address'];
  (0, _react.useEffect)(function () {
    if (devices.every(function (device) {
      return keys[device];
    })) {
      setStatus(['Completed', 'green']);
      setTimeout(function () {
        return done(keys);
      }, 1000);
    }
  }, [count, keys]);
  (0, _react.useEffect)(function () {
    var timers = [];

    var errorHandler = function errorHandler(device) {
      setStatus(['Cannot get ' + device, 'red']);
      timers.push(setTimeout(function () {
        setKeys(function (keys) {
          delete keys[device];
          return keys;
        });
        setCount(function (count) {
          return count + 1;
        });
      }, 5000));
    };

    if (!keys['flash drive']) {
      _systeminformation["default"].blockDevices().then(function (data) {
        var _data$find;

        var serial = (_data$find = data.find(function (obj) {
          return obj.name === 'E:';
        })) === null || _data$find === void 0 ? void 0 : _data$find.serial;
        if (!serial) errorHandler('flash drive');
        setKeys(function (keys) {
          return _objectSpread(_objectSpread({}, keys), {
            'flash drive': serial
          });
        });
      });
    }

    if (!keys['CPU']) (0, _serialNumber["default"])(function (err, value) {
      if (err) errorHandler('CPU');
      setKeys(function (keys) {
        return _objectSpread(_objectSpread({}, keys), {
          CPU: value
        });
      });
    });
    if (!keys['HDD']) _systeminformation["default"].diskLayout().then(function (data) {
      if (!data) errorHandler('HDD');
      setKeys(function (keys) {
        return _objectSpread(_objectSpread({}, keys), {
          HDD: data.pop().serialNum
        });
      });
    });
    if (!keys['mac-address']) _systeminformation["default"].networkInterfaces().then(function (data) {
      if (!data) errorHandler('mac-address');
      setKeys(function (keys) {
        return _objectSpread(_objectSpread({}, keys), {
          'mac-address': data.shift().mac
        });
      });
    });
    if (!keys['ip-address']) _systeminformation["default"].networkInterfaces().then(function (data) {
      if (!data) errorHandler('ip-address');
      setKeys(function (keys) {
        return _objectSpread(_objectSpread({}, keys), {
          'ip-address': data.shift().ip4
        });
      });
    });
    return function () {
      return timers.forEach(function (timer) {
        return clearTimeout(timer);
      });
    };
  }, [count]);
  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column"
  }, devices.map(function (device, i) {
    return /*#__PURE__*/_react["default"].createElement(Device, {
      key: i,
      device: device,
      completed: device in keys,
      result: keys[device],
      error: status
    });
  }), status && /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: status[1]
  }, status[0]));
};

var Encrypting = function Encrypting(_ref5) {
  var done = _ref5.done,
      keys = _ref5.data;

  var _useState11 = (0, _react.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      current = _useState12[0],
      setStatus = _useState12[1];

  var _useState13 = (0, _react.useState)(['hashing', 'encrypting', 'completed']),
      _useState14 = _slicedToArray(_useState13, 2),
      stack = _useState14[0],
      setStack = _useState14[1];

  var _useState15 = (0, _react.useState)(null),
      _useState16 = _slicedToArray(_useState15, 2),
      data = _useState16[0],
      setData = _useState16[1];

  var nextState = function nextState() {
    setStatus(stack.shift());
    setStack(stack);
  };

  (0, _react.useEffect)(function () {
    if (!current) {
      setData(keys);
      nextState();
    }
  });
  (0, _react.useEffect)(function () {
    if (!data) return function () {};
    if (current === 'hashing') setTimeout(function () {
      setData(Object.fromEntries(Object.entries(data).map(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            key = _ref7[0],
            value = _ref7[1];

        return [key, _crypto["default"].createHash('sha256').update(value).digest('hex')];
      })));
      nextState();
    }, 500);
    if (current === 'encrypting') setTimeout(function () {
      setData(Object.fromEntries(Object.entries(data).map(function (_ref8) {
        var _ref9 = _slicedToArray(_ref8, 2),
            item = _ref9[0],
            value = _ref9[1];

        var resizedIV = Buffer.allocUnsafe(16);

        var nkey = _crypto["default"].createHash('sha256').update(key).digest(),
            cipher = _crypto["default"].createCipheriv('aes256', nkey, resizedIV);

        var msg = [];
        msg.push(cipher.update(value, 'binary', 'hex'));
        msg.push(cipher["final"]('hex'));
        return [item, msg.join('')];
      })));
      nextState();
    }, 500);
    if (current === 'completed') setTimeout(function () {
      return done(Object.values(data));
    }, 1000);
  }, [current]);
  var label = null;
  var color = null;

  if (current === 'hashing') {
    label = 'source';
    color = undefined;
  }

  if (current === 'encrypting') {
    label = 'sha256';
    color = 'red';
  }

  if (current === 'completed') {
    label = 'aes256';
    color = 'yellow';
  }

  if (!data) return null;
  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Box, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "yellow"
  }, /*#__PURE__*/_react["default"].createElement(_inkSpinner["default"], {
    type: "line"
  })), /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: color
  }, " ", label)), Object.entries(data).map(function (_ref10) {
    var _ref11 = _slicedToArray(_ref10, 2),
        key = _ref11[0],
        value = _ref11[1];

    return /*#__PURE__*/_react["default"].createElement(Device, {
      key: key,
      device: key,
      result: value,
      simple: true,
      textColor: color
    });
  }));
};

var Fetching = function Fetching(_ref12) {
  var done = _ref12.done,
      keys = _ref12.data;

  var _useState17 = (0, _react.useState)('blue'),
      _useState18 = _slicedToArray(_useState17, 2),
      color = _useState18[0],
      setColor = _useState18[1];

  (0, _react.useEffect)(function () {
    setColor('yellow');
    setTimeout(function () {
      return _got["default"].post('http://localhost:3000/', {
        json: keys,
        responseType: 'json'
      }).then(function (_ref13) {
        var body = _ref13.body;
        setColor('green');
        setTimeout(function () {
          return done(body);
        }, 2000);
      });
    }, 2000);
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_ink.Box, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: color
  }, /*#__PURE__*/_react["default"].createElement(_inkSpinner["default"], {
    type: "dots3"
  })), /*#__PURE__*/_react["default"].createElement(_ink.Text, null, " Fetching data"));
};

var Result = function Result(_ref14) {
  var data = _ref14.data;

  var _data = _slicedToArray(data, 2),
      token = _data[0],
      items = _data[1];

  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "user ", /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "red"
  }, "data")), /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "name: ", /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "yellow"
  }, token)), /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "data:"), items.map(function (stmp, i) {
    return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
      key: stmp
    }, /*#__PURE__*/_react["default"].createElement(_ink.Box, {
      width: 3
    }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, i)), /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "-", '>', " "), /*#__PURE__*/_react["default"].createElement(_ink.Text, {
      color: "blue"
    }, new Date(stmp).toISOString()));
  }));
};

var App = function App() {
  var _useState19 = (0, _react.useState)(false),
      _useState20 = _slicedToArray(_useState19, 2),
      server = _useState20[0],
      setServer = _useState20[1];

  var _useState21 = (0, _react.useState)(null),
      _useState22 = _slicedToArray(_useState21, 2),
      current = _useState22[0],
      setStatus = _useState22[1];

  var _useState23 = (0, _react.useState)(['devices', 'encrypting', 'fetching', 'completed']),
      _useState24 = _slicedToArray(_useState23, 2),
      stack = _useState24[0],
      setStack = _useState24[1];

  var _useState25 = (0, _react.useState)(null),
      _useState26 = _slicedToArray(_useState25, 2),
      data = _useState26[0],
      setData = _useState26[1];

  var _useApp = (0, _ink.useApp)(),
      exit = _useApp.exit;

  var nextState = function nextState(value) {
    if (value) setData(value);
    setStatus(stack.shift());
    setStack(stack);
  };

  (0, _react.useEffect)(function () {
    if (!current) nextState();

    if (current === 'completed') {
      exit();
    }
  });
  (0, _react.useEffect)(function () {
    Server(setServer);
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(Logo, {
    text: "Lab 1",
    status: current
  }), /*#__PURE__*/_react["default"].createElement(Timer, {
    trb: server
  }), current == 'devices' && /*#__PURE__*/_react["default"].createElement(Devices, {
    done: nextState
  }), current == 'encrypting' && /*#__PURE__*/_react["default"].createElement(Encrypting, {
    done: nextState,
    data: data
  }), current == 'fetching' && /*#__PURE__*/_react["default"].createElement(Fetching, {
    done: nextState,
    data: data
  }), current == 'completed' && /*#__PURE__*/_react["default"].createElement(Result, {
    data: data
  }));
};

(0, _ink.render)( /*#__PURE__*/_react["default"].createElement(App, null));
