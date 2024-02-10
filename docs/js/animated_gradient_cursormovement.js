const _0x5eb070 = _0x3409;
(function (_0x53884f, _0x11061d) {
  const _0x2fcf76 = _0x3409,
    _0x3efe82 = _0x53884f();
  while (!![]) {
    try {
      const _0x19c20d =
        -parseInt(_0x2fcf76(0xeb)) / 0x1 +
        (parseInt(_0x2fcf76(0x103)) / 0x2) * (parseInt(_0x2fcf76(0xe3)) / 0x3) +
        parseInt(_0x2fcf76(0xf1)) / 0x4 +
        (parseInt(_0x2fcf76(0xf0)) / 0x5) * (parseInt(_0x2fcf76(0xdb)) / 0x6) +
        (-parseInt(_0x2fcf76(0xe6)) / 0x7) *
          (-parseInt(_0x2fcf76(0xea)) / 0x8) +
        -parseInt(_0x2fcf76(0xe4)) / 0x9 +
        (-parseInt(_0x2fcf76(0xff)) / 0xa) * (parseInt(_0x2fcf76(0xf8)) / 0xb);
      if (_0x19c20d === _0x11061d) break;
      else _0x3efe82["push"](_0x3efe82["shift"]());
    } catch (_0x20cbdd) {
      _0x3efe82["push"](_0x3efe82["shift"]());
    }
  }
})(_0x8982, 0xd28b8);
function _0x8982() {
  const _0x16d983 = [
    "lineCap",
    "targetTouches",
    "964007mqnijC",
    "innerWidth",
    "width",
    "friction",
    "pointsNumber",
    "createLinearGradient",
    "pageY",
    "190JzxpTv",
    "stroke",
    "quadraticCurveTo",
    "spring",
    "206nYgRvL",
    "#00bbff",
    "cos",
    "forEach",
    "23934nyleKN",
    "height",
    "moveTo",
    "pageX",
    "clearRect",
    "addColorStop",
    "resize",
    "beginPath",
    "39675bkOhOu",
    "13647213iJkHAu",
    "addEventListener",
    "5030767qQMIIW",
    "sin",
    "length",
    "lineWidth",
    "16BjInvX",
    "806933RUEpAN",
    "strokeStyle",
    "touchmove",
    "innerHeight",
    "widthFactor",
    "515MzweDc",
    "6561524OdsVZQ",
    "querySelector",
    "click",
    "requestAnimationFrame",
    "lineTo",
  ];
  _0x8982 = function () {
    return _0x16d983;
  };
  return _0x8982();
}
const canvas = document[_0x5eb070(0xf2)](".animated_cursormovement_canvas"),
  ctx = canvas["getContext"]("2d");
let mouseMoved = ![];
function _0x3409(_0x4dc5f5, _0x585900) {
  const _0x89825d = _0x8982();
  return (
    (_0x3409 = function (_0x340903, _0x473ed3) {
      _0x340903 = _0x340903 - 0xd9;
      let _0x2ae11e = _0x89825d[_0x340903];
      return _0x2ae11e;
    }),
    _0x3409(_0x4dc5f5, _0x585900)
  );
}
const pointer = {
    x: 0.5 * window[_0x5eb070(0xf9)],
    y: 0.5 * window[_0x5eb070(0xee)],
  },
  params = {
    pointsNumber: 0x19,
    widthFactor: 0xa,
    mouseThreshold: 0.5,
    spring: 0.25,
    friction: 0.5,
  },
  trail = new Array(params[_0x5eb070(0xfc)]);
for (let i = 0x0; i < params["pointsNumber"]; i++) {
  trail[i] = { x: pointer["x"], y: pointer["y"], dx: 0x0, dy: 0x0 };
}
window["addEventListener"](_0x5eb070(0xf3), (_0x2186bb) => {
  const _0x50ca41 = _0x5eb070;
  updateMousePosition(_0x2186bb[_0x50ca41(0xde)], _0x2186bb[_0x50ca41(0xfe)]);
}),
  window["addEventListener"]("mousemove", (_0x1ae6d4) => {
    const _0x71228c = _0x5eb070;
    (mouseMoved = !![]),
      updateMousePosition(
        _0x1ae6d4[_0x71228c(0xde)],
        _0x1ae6d4[_0x71228c(0xfe)]
      );
  }),
  window[_0x5eb070(0xe5)](_0x5eb070(0xed), (_0x278135) => {
    const _0x7b3038 = _0x5eb070;
    (mouseMoved = !![]),
      updateMousePosition(
        _0x278135[_0x7b3038(0xf7)][0x0]["pageX"],
        _0x278135["targetTouches"][0x0]["pageY"]
      );
  });
function updateMousePosition(_0x469a56, _0x29ca5c) {
  (pointer["x"] = _0x469a56), (pointer["y"] = _0x29ca5c);
}
setupCanvas(),
  update(0x0),
  window[_0x5eb070(0xe5)](_0x5eb070(0xe1), setupCanvas);
function update(_0x1e89ce) {
  const _0x1f8b4b = _0x5eb070;
  !mouseMoved &&
    ((pointer["x"] =
      (0.5 +
        0.3 *
          Math[_0x1f8b4b(0xd9)](0.002 * _0x1e89ce) *
          Math[_0x1f8b4b(0xe7)](0.005 * _0x1e89ce)) *
      window[_0x1f8b4b(0xf9)]),
    (pointer["y"] =
      (0.5 +
        0.2 * Math[_0x1f8b4b(0xd9)](0.005 * _0x1e89ce) +
        0.1 * Math[_0x1f8b4b(0xd9)](0.01 * _0x1e89ce)) *
      window["innerHeight"]));
  ctx[_0x1f8b4b(0xdf)](
    0x0,
    0x0,
    canvas[_0x1f8b4b(0xfa)],
    canvas[_0x1f8b4b(0xdc)]
  ),
    trail[_0x1f8b4b(0xda)]((_0x2833b7, _0x5e4b01) => {
      const _0xa89477 = _0x1f8b4b,
        _0x4cf242 = _0x5e4b01 === 0x0 ? pointer : trail[_0x5e4b01 - 0x1],
        _0x15a249 =
          _0x5e4b01 === 0x0
            ? 0.4 * params[_0xa89477(0x102)]
            : params[_0xa89477(0x102)];
      (_0x2833b7["dx"] += (_0x4cf242["x"] - _0x2833b7["x"]) * _0x15a249),
        (_0x2833b7["dy"] += (_0x4cf242["y"] - _0x2833b7["y"]) * _0x15a249),
        (_0x2833b7["dx"] *= params[_0xa89477(0xfb)]),
        (_0x2833b7["dy"] *= params[_0xa89477(0xfb)]),
        (_0x2833b7["x"] += _0x2833b7["dx"]),
        (_0x2833b7["y"] += _0x2833b7["dy"]);
    });
  var _0x148019 = ctx[_0x1f8b4b(0xfd)](
    0x0,
    0x0,
    canvas["width"],
    canvas[_0x1f8b4b(0xdc)]
  );
  _0x148019[_0x1f8b4b(0xe0)](0x0, _0x1f8b4b(0x104)),
    _0x148019[_0x1f8b4b(0xe0)](0x1, _0x1f8b4b(0x104)),
    (ctx[_0x1f8b4b(0xec)] = _0x148019),
    (ctx[_0x1f8b4b(0xf6)] = "round"),
    ctx[_0x1f8b4b(0xe2)](),
    ctx[_0x1f8b4b(0xdd)](trail[0x0]["x"], trail[0x0]["y"]);
  for (let _0x4969ff = 0x1; _0x4969ff < trail["length"] - 0x1; _0x4969ff++) {
    const _0x2e02c5 =
        0.5 * (trail[_0x4969ff]["x"] + trail[_0x4969ff + 0x1]["x"]),
      _0x16237f = 0.5 * (trail[_0x4969ff]["y"] + trail[_0x4969ff + 0x1]["y"]);
    ctx[_0x1f8b4b(0x101)](
      trail[_0x4969ff]["x"],
      trail[_0x4969ff]["y"],
      _0x2e02c5,
      _0x16237f
    ),
      (ctx[_0x1f8b4b(0xe9)] =
        params[_0x1f8b4b(0xef)] * (params[_0x1f8b4b(0xfc)] - _0x4969ff)),
      ctx["stroke"]();
  }
  ctx[_0x1f8b4b(0xf5)](
    trail[trail["length"] - 0x1]["x"],
    trail[trail[_0x1f8b4b(0xe8)] - 0x1]["y"]
  ),
    ctx[_0x1f8b4b(0x100)](),
    window[_0x1f8b4b(0xf4)](update);
}
function setupCanvas() {
  const _0x1084b4 = _0x5eb070;
  (canvas[_0x1084b4(0xfa)] = window[_0x1084b4(0xf9)]),
    (canvas[_0x1084b4(0xdc)] = window[_0x1084b4(0xee)]);
}
