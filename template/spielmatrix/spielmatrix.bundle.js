(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// assets
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.assets = {
		initialize : function(sm) {
			Spielmatrix.assets.initializeAsset(Spielmatrix.assets.petscii);
		},

		initializeAsset : function(asset) {
			asset.texture = PIXI.BaseTexture.fromImage(asset.url, false, PIXI.SCALE_MODES.NEAREST);
			var size = 8, tileHeight = 8, texWidth = 128, texHeight = 128;
			var numTilesX = Math.floor(texWidth / size);
			var numTilesY = Math.floor(texHeight / tileHeight);
			for (var y = 0; y < numTilesY; ++y ) {
				for (var x = 0; x < numTilesX; ++x ) {
					var tex = new PIXI.Texture(asset.texture, new PIXI.Rectangle(x*size, y*size,size,size));
					asset.glyphs.push(tex);
				}
			}
		},

		petscii : {
			texture : null,
			glyphs : [],
			tileSize : 8,
			w : 16,
			h : 16,
			url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAABQZJREFUeNrsWguyozAMU+5/6Z19ryW2JTsxLe3ODsy0QKGg2PI3wZgboPfxetxW/8u2n/vwAQAIB+6+DwCYp79HwOMXDwCPzRzy5m/Nz+3z4hPmnV8CYAXx93IhypWIVypJVDB3PwK5HsB5Er4LQHkd+g6r0pr1GVEiPdLrHwLAVHUW2QWAueMXZk+aVmEftAdAnlqbWgAwJ0bs0woWIy4B7QAIV70EuyKvKS8B6Cc9j7ukWwOoSUkSvByAdEqGGPSsX/HMj/uGF7PjwW4akLjJHMBB3ggs7ML/txB5CbkHmGg2qni+ivcrp4xCnUYCgUFFtAthOLPIef+W7Vuf53zJSxKgaMiXjyFJcmorYQ4k0dX4gVoF5k4TfoYkz15+YG8/ZTpNQ8PCDAXJMNjeXco4+Hzkrky545mSKYdD9g6v0erTUcGPGR4hGpQ9OlpbMjoaJ55T5aDRPB4AEFnkDJ5HX6gMexSwFs3IwxCjP8hUtgpXgHShmgNDjrwGkNt/WeKBWE3sHsElb1jNiKpWVrDyhBfbf+4HEEYUklrhDzhoKdN83hzupx+Uvp35ZbyIVsT/g/kIP5A5FTkSSdaMMj5Dh09wLADtcGxU9Jwbqt63ACJQjARAYWq1BGoVCKMESRyHMRT+vcUBcz//z+v/kZIR+VZWEOsc9hOU0KCwgi9vkCOm88xKWKTSk1bFyEZ81z4/A6CS2BCWLAJsJBc1AOJCnpOa5FKoICNhAQBhqEnBwgekAuVw4lC0rpG/OEuwMgBGlEGkIfEwbQbr10eSV+lURwEYPiakcd9VywqAsIIo2kWb7jMOQFS/33FEeWu36P4WtWnMJwfKIXLXMJKSwptLc3catiI2jCQWyAIkuGLumHAXzUZRT04VDYd+kfIPe+l4JP0mgN2ERKlAAyDPjLEnAcq9IDkwRDOr+P3t+QCqVve5Nt0VvsZx4CyAs64qSeRnj1xkRJEDeCEjSgBQ6+mFhARVQgKVDyCJBfLFy4TEu6x1eZ5MprDIdUNNpd/JeWdKF/TCMMFiezWInRTVvHadkNIKEgCv+IUTVpRIfSQtIZ845nlO01d0ACgqaudyaOwoBBCv+6q0hqCDX5wVc9Zm6/ffNz3fF35uAeDKmdPqQOMgCczOENz6AQ1lxQGuo+105JD7EecNOwAiBwb1Ikzn1Sv7OVM734yQE1YQMg7oTkKYpnR+xGumDSDppsNOTm/tVVqh5htlABGN9faBnZ27AXQApI7+XQCKwf5bAOjyDeA0AN02QCcPeSUnSJddhR6C89szumPUCybWwDcAmDrCNxq5smwA2QcwR45h43kmrjaQvgScCtYjXK1R6nNAqqALpMEBlXL25/5XyzQJwKvmtWu25dqkkGLFFZHJGqBeH0Is4TDmNkIRGrvRfnZ/fmG/OKpYDzffl7fr9H7VpSYActktTTiCyvNyKlf7+03Wi/qCu+I5AAA7xWO9jCcrMKhqh5zc5kVPcr5AOxS3FlMXnW7kTEI3l3B9m+7skj6whNXij1gI1a0XNMblCtahJhq5NbfRKUFLcngQAeZbT75Vi9RcFdcCgCcXTQsB7IdMx2OolUrnARwSeIx8aAkUU6HUxruEA64XIucVjdniAivgFhCyRbVNAG91BGem7b673QBuADeAG8AN4AZwA/h/AHDJjqot0u/rtYGICvcjAFIgSHB8SMe5av5bAF9TwddIeNYM/wgwAPgEL2OdLRvSAAAAAElFTkSuQmCC',
			EMPTY : 0x00,
			FILLED : 0xFF,
		}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.assets);

});





},{}],2:[function(require,module,exports){
// keyboard
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.keyboard = {
		initialize : function(sm) {
			// Register every key available in keydrown
			for (var prop in kd) {
				if (kd.hasOwnProperty(prop)) {
					if (kd[prop] instanceof kd.Key) {
						kd[prop].press(Spielmatrix.keyboard.keyEvent.bind(null, sm, true, prop));
						kd[prop].up(Spielmatrix.keyboard.keyEvent.bind(null, sm, false, prop));
					}
				}
			}
		},

		keyEvent : function(sm, down, key) {
			if (down && sm.options.keydown) {
				sm.options.keydown(key);
			}
			if (!down && sm.options.keyup) {
				sm.options.keyup(key);
			}
		},

		isKeyDown : function(key) {
			return kd.isDown(key);
		},

		isKeyUp : function(key) {
			return !kd.isDown(key);
		},

		update : function(sm, data) {
			// Let keydrown process the keys
			kd.tick();
		}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.keyboard);

});

},{}],3:[function(require,module,exports){
/*! keydrown - v1.1.2 - 2014-09-21 - http://jeremyckahn.github.com/keydrown */
;(function (window) {

var util = (function () {

  var util = {};

  /**
   * @param {Object} obj The Object to iterate through.
   * @param {function(*, string)} iterator The function to call for each property.
   */
  util.forEach = function (obj, iterator) {
    var prop;
    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        iterator(obj[prop], prop);
      }
    }
  };
  var forEach = util.forEach;


  /**
   * Create a transposed copy of an Object.
   *
   * @param {Object} obj
   * @return {Object}
   */
  util.getTranspose = function (obj) {
    var transpose = {};

    forEach(obj, function (val, key) {
      transpose[val] = key;
    });

    return transpose;
  };


  /**
   * Implementation of Array#indexOf because IE<9 doesn't support it.
   *
   * @param {Array} arr
   * @param {*} val
   * @return {number} Index of the found element or -1 if not found.
   */
  util.indexOf = function (arr, val) {
    if (arr.indexOf) {
      return arr.indexOf(val);
    }

    var i, len = arr.length;
    for (i = 0; i < len; i++) {
      if (arr[i] === val) {
        return i;
      }
    }

    return -1;
  };
  var indexOf = util.indexOf;


  /**
   * Push a value onto an array if it is not present in the array already.  Otherwise, this is a no-op.
   *
   * @param {Array} arr
   * @param {*} val
   * @return {boolean} Whether or not the value was added to the array.
   */
  util.pushUnique = function (arr, val) {
    if (indexOf(arr, val) === -1) {
      arr.push(val);
      return true;
    }

    return false;
  };


  /**
   * Remove a value from an array.  Assumes there is only one instance of the value present in the array.
   *
   * @param {Array} arr
   * @param {*} val
   * @return {*} The value that was removed from arr.  Returns undefined if nothing was removed.
   */
  util.removeValue = function (arr, val) {
    var index = indexOf(arr, val);

    if (index !== -1) {
      return arr.splice(index, 1)[0];
    }
  };


  /**
   * Cross-browser function for listening for and handling an event on the document element.
   *
   * @param {string} eventName
   * @param {function} handler
   */
  util.documentOn = function (eventName, handler) {
    if (window.addEventListener) {
      window.addEventListener(eventName, handler, false);
    } else if (document.attachEvent) {
      document.attachEvent('on' + eventName, handler);
    }
  };


  /**
   * Shim for requestAnimationFrame.  See: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   */
  util.requestAnimationFrame = (function () {
    return window.requestAnimationFrame  ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
  })();


  /**
   * An empty function.  NOOP!
   */
  util.noop = function () {};

  return util;

}());

/**
 * Lookup table of keys to keyCodes.
 *
 * @type {Object.<number>}
 */
var KEY_MAP = {
   'A': 65
  ,'B': 66
  ,'C': 67
  ,'D': 68
  ,'E': 69
  ,'F': 70
  ,'G': 71
  ,'H': 72
  ,'I': 73
  ,'J': 74
  ,'K': 75
  ,'L': 76
  ,'M': 77
  ,'N': 78
  ,'O': 79
  ,'P': 80
  ,'Q': 81
  ,'R': 82
  ,'S': 83
  ,'T': 84
  ,'U': 85
  ,'V': 86
  ,'W': 87
  ,'X': 88
  ,'Y': 89
  ,'Z': 90
  ,',': 188
  ,'.': 190
  ,'/': 191
  ,';': 186
  ,'\'': 222
  ,'[': 219
  ,']': 221
  ,'0': 48
  ,'1': 49
  ,'2': 50
  ,'3': 51
  ,'4': 52
  ,'5': 53
  ,'6': 54
  ,'7': 55
  ,'8': 56
  ,'9': 57
  ,'-': 189
  ,'=': 187
  ,'BACKSPACE': 8
  ,'TAB': 9
  ,'DEL': 46
  ,'NUMPAD_0': 96
  ,'NUMPAD_1': 97
  ,'NUMPAD_2': 98
  ,'NUMPAD_3': 99
  ,'NUMPAD_4': 100
  ,'NUMPAD_5': 101
  ,'NUMPAD_6': 102
  ,'NUMPAD_7': 103
  ,'NUMPAD_8': 104
  ,'NUMPAD_9': 105
  ,'NUMPAD_/': 111
  ,'NUMPAD_.': 110
  ,'NUMPAD_*': 106
  ,'NUMPAD_-': 109
  ,'NUMPAD_+': 107
  ,'ENTER': 13
  ,'SHIFT': 16
  ,'CTRL': 17
  ,'ESC': 27
  ,'SPACE': 32
  ,'LEFT': 37
  ,'UP': 38
  ,'RIGHT': 39
  ,'DOWN': 40
  ,'GRAVE': 192
  ,'PAGEUP': 33
  ,'PAGEDOWN': 34
  ,'END': 35
  ,'HOME': 36
};


/**
 * The transposed version of KEY_MAP.
 *
 * @type {Object.<string>}
 */
var TRANSPOSED_KEY_MAP = util.getTranspose(KEY_MAP);

/*!
 * @type Array.<string>
 */
var keysDown = [];

var Key = (function () {

  'use strict';

  /**
   * Represents a key on the keyboard.  You'll never actually call this method directly; Key Objects for every key that Keydrown supports are created for you when the library is initialized (as in, when the file is loaded).  You will, however, use the `prototype` methods below to bind functions to key states.
   *
   * @param {number} keyCode The keyCode of the key.
   * @constructor
   */
  function Key (keyCode) {
    this.keyCode = keyCode;
  }


  /*!
   * The function to be invoked on every tick that the key is held down for.
   *
   * @type {function}
   */
  Key.prototype._downHandler = util.noop;


  /*!
   * The function to be invoked when the key is released.
   *
   * @type {function}
   */
  Key.prototype._upHandler = util.noop;


  /*!
   * The function to be invoked when the key is pressed.
   *
   * @type {function}
   */
  Key.prototype._pressHandler = util.noop;


  /*!
   * Private helper function that binds or invokes a hander for `down`, `up', or `press` for a `Key`.
   *
   * @param {Key} key
   * @param {string} handlerName
   * @param {function=} opt_handler If omitted, the handler is invoked.
   */
  function bindOrFire (key, handlerName, opt_handler) {
    if (opt_handler) {
      key[handlerName] = opt_handler;
    } else {
      key[handlerName]();
    }
  }


  /**
   * Returns whether the key is currently pressed or not.
   *
   * @return {boolean} True if the key is down, otherwise false.
   */
  Key.prototype.isDown = function () {
    return util.indexOf(keysDown, this.keyCode) !== -1;
  };


  /**
   * Bind a function to be called when the key is held down.
   *
   * @param {function=} opt_handler The function to be called when the key is held down.  If omitted, this function invokes whatever handler was previously bound.
   */
  Key.prototype.down = function (opt_handler) {
    bindOrFire(this, '_downHandler', opt_handler);
  };


  /**
   * Bind a function to be called when the key is released.
   *
   * @param {function=} opt_handler The function to be called when the key is released.  If omitted, this function invokes whatever handler was previously bound.
   */
  Key.prototype.up = function (opt_handler) {
    bindOrFire(this, '_upHandler', opt_handler);
  };


  /**
   * Bind a function to be called when the key is pressed.  This handler will not fire again until the key is released — it does not repeat.
   *
   * @param {function=} opt_handler The function to be called once when the key is pressed.  If omitted, this function invokes whatever handler was previously bound.
   */
  Key.prototype.press = function (opt_handler) {
    bindOrFire(this, '_pressHandler', opt_handler);
  };


  /**
   * Remove the handler that was bound with [`kd.Key#down`](#down).
   */
  Key.prototype.unbindDown = function () {
    this._downHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with [`kd.Key#up`](#up).
   */
  Key.prototype.unbindUp = function () {
    this._upHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with [`kd.Key#press`](#press).
   */
  Key.prototype.unbindPress = function () {
    this._pressHandler = util.noop;
  };

  return Key;

}());

var kd = (function (keysDown) {

  'use strict';

  var kd = {};
  kd.Key = Key;

  var isRunning = false;


  /**
   * Evaluate which keys are held down and invoke their handler functions.
   */
  kd.tick = function () {
    var i, len = keysDown.length;
    for (i = 0; i < len; i++) {
      var keyCode = keysDown[i];

      var keyName = TRANSPOSED_KEY_MAP[keyCode];
      if (keyName) {
        kd[keyName].down();
      }
    }
  };


  /**
   * A basic run loop.  `handler` gets called approximately 60 times a second.
   *
   * @param {function} handler The function to call on every tick.  You almost certainly want to call `kd.tick` in this function.
   */
  kd.run = function (handler) {
    isRunning = true;

    util.requestAnimationFrame.call(window, function () {
      if (!isRunning) {
        return;
      }

      kd.run(handler);
      handler();
    });
  };


  /**
   * Cancels the loop created by [`kd.run`](#run).
   */
  kd.stop = function () {
    isRunning = false;
  };


  // SETUP
  //


  // Initialize the KEY Objects
  util.forEach(KEY_MAP, function (keyCode, keyName) {
    kd[keyName] = new Key(keyCode);
  });

  util.documentOn('keydown', function (evt) {
    var keyCode = evt.keyCode;
    var keyName = TRANSPOSED_KEY_MAP[keyCode];
    var isNew = util.pushUnique(keysDown, keyCode);

    if (isNew && kd[keyName]) {
      kd[keyName].press();
    } else if (!kd[keyName]) {
      console.warn("Unhandled key: " + keyCode)
    }
  });

  util.documentOn('keyup', function (evt) {
    var keyCode = util.removeValue(keysDown, evt.keyCode);

    var keyName = TRANSPOSED_KEY_MAP[keyCode];
    if (keyName) {
      kd[keyName].up();
    }
  });

  // Stop firing the "down" handlers if the user loses focus of the browser
  // window.
  util.documentOn('blur', function (evt) {
    // Fire the "up" handler for each key that is currently held down
    util.forEach(keysDown, function (keyCode) {
      var mappedKey = TRANSPOSED_KEY_MAP[keyCode];
      if (mappedKey) {
        kd[mappedKey].up();
      }
    });

    keysDown.length = 0;
  });


  return kd;

/*!
 * The variables passed into the closure here are defined in kd.key.js.
 */ /*!*/
}(keysDown));

if (typeof module === "object" && typeof module.exports === "object") {
  // Keydrown was loaded as a CommonJS module (by Browserify, for example).
  module.exports = kd;
} else if (typeof define === "function" && define.amd) {
  // Keydrown was loaded as an AMD module.
  define(function () {
    return kd;
  });
} else {
  window.kd = kd;
}

} (window));

},{}],4:[function(require,module,exports){
// Main file for browserify to use
var _spielmatrix = require('../lib/spielmatrix.js');
var _assets = require('../lib/assets.js');
var _rendering = require('../lib/rendering.js');
var _tile = require('../lib/tile.js');
var _mouse = require('../lib/mouse.js');
var _utilities = require('../lib/utilities.js');
var _keyboard = require('../lib/keyboard.js');
window.kd = require('../lib/keydrown/keydrown.js');
},{"../lib/assets.js":1,"../lib/keyboard.js":2,"../lib/keydrown/keydrown.js":3,"../lib/mouse.js":5,"../lib/rendering.js":6,"../lib/spielmatrix.js":7,"../lib/tile.js":8,"../lib/utilities.js":9}],5:[function(require,module,exports){
// mouse
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.mouse = {
		initialize : function(sm) {
			sm.state.pixiContainer.mouseover = Spielmatrix.mouse.onMouseOver.bind(null, sm);
			sm.state.pixiContainer.mouseout  = Spielmatrix.mouse.onMouseOut.bind(null, sm);
			sm.state.pixiContainer.mousedown = Spielmatrix.mouse.onMouseDown.bind(null, sm);
			sm.state.pixiContainer.mouseup   = Spielmatrix.mouse.onMouseUp.bind(null, sm);
			sm.state.pixiContainer.mousemove = Spielmatrix.mouse.onMouseMove.bind(null, sm);
			sm.state.pixiContainer.touchstart = Spielmatrix.mouse.onMouseDown.bind(null, sm);
			sm.state.pixiContainer.touchmove = Spielmatrix.mouse.onMouseMove.bind(null, sm);
			sm.state.pixiContainer.touchend = Spielmatrix.mouse.onMouseUp.bind(null, sm);
		},

		setMouseState : function(sm, x, y, onGrid) {
			sm.state.cursor.x = x;
			sm.state.cursor.y = y;
			sm.state.cursor.onGrid = onGrid;
		},

		// Mouse click
		onMouseDown : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			if (sm.options.mousedown) sm.options.mousedown(x, y);
		},

		// Mouse click released
		onMouseUp : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			if (sm.options.mouseup) sm.options.mouseup(x, y);
		},

		// Mouse moved
		onMouseMove : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			// Issue move event if the x or y changed
			var onGrid = x >= 0 && y >= 0 && x < sm.state.width && y < sm.state.height;
			if (sm.state.cursor.x != x || sm.state.cursor.y != y || sm.state.cursor.onGrid != onGrid) {
				if (onGrid && sm.options.mousemove) sm.options.mousemove(sm.state.cursor.x, sm.state.cursor.y, x, y);
				if (sm.state.cursor.onGrid && sm.options.mouseleave) sm.options.mouseleave(sm.state.cursor.x, sm.state.cursor.y);
				if (onGrid && sm.options.mouseenter) sm.options.mouseenter(x, y);
				Spielmatrix.mouse.setMouseState(sm, x, y, onGrid);
			}
		},

		// Mouse moved from off the grid to on the grid
		onMouseOver : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			if (sm.options.mouseover) sm.options.mouseover(x, y);
			Spielmatrix.mouse.setMouseState(sm, x, y, true);
		},

		// Mouse moved from on the grid to off the grid
		onMouseOut : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			if (sm.options.mouseout) sm.options.mouseout(sm.state.cursor.x, sm.state.cursor.y);
			if (sm.options.mouseleave) sm.options.mouseleave(sm.state.cursor.x, sm.state.cursor.y);
			Spielmatrix.mouse.setMouseState(sm, x, y, false);
		}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.mouse);

});

},{}],6:[function(require,module,exports){
// rendering
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.rendering = {
		initialize : function(sm) {
			Spielmatrix.rendering.initializeRenderer(sm);
			Spielmatrix.rendering.initializeTiles(sm);
		},

		initializeRenderer : function(sm) {
			// create a renderer instance
			var w = sm.state.width * sm.state.tileSize;
			var h = sm.state.height * sm.state.tileSize;

			var rendererOptions = {
				antialias: false
			};

			var renderer = PIXI.autoDetectRenderer(w, h, rendererOptions);
			sm.state.renderer = renderer;

			// Create display object container to hold sprites
			var pixiContainer = new PIXI.Container();
			pixiContainer.interactive = true;
			sm.state.pixiContainer = pixiContainer;

			// add the renderer view element to the DOM
			var place = sm.options.place || document.body;
			place.appendChild(renderer.view);
		},

		initializeTiles : function(sm) {
			// Rectangle texture
			sm.state.squareTexture = Spielmatrix.assets.petscii.glyphs[Spielmatrix.assets.petscii.FILLED];
			sm.state.glyphTexture = Spielmatrix.assets.petscii.glyphs[Spielmatrix.assets.petscii.EMPTY];

			var squareContainer = new PIXI.Container();
			var glyphContainer = new PIXI.Container();
			sm.state.pixiContainer.addChild(squareContainer);
			sm.state.pixiContainer.addChild(glyphContainer);
			
			// Scale the overall container to fit the rendering view
			var size = Spielmatrix.assets.petscii.tileSize;
			var scale = sm.state.tileSize / size;
			sm.state.pixiContainer.scale.x = scale;
			sm.state.pixiContainer.scale.y = scale;

			var w = sm.state.width;
			var h = sm.state.height;
			
			var color = sm.options.defaultColor;
			for (var y = 0; y < h; ++y) {
				for (var x = 0; x < w; ++x) {
			 		// Set up the graphics
			 		var squareSprite = new PIXI.Sprite(sm.state.squareTexture);
			 		var glyphSprite = new PIXI.Sprite(sm.state.glyphTexture);
		   			squareContainer.addChild(squareSprite);
		   			glyphContainer.addChild(glyphSprite);
					sm.state.tiles.push(new Spielmatrix.Tile(squareSprite, glyphSprite, Spielmatrix.assets.petscii.glyphs, x, y, size, color));
				}
			}
		},

		render : function(sm) {
			var len = sm.state.tiles.length;
			for (var i = 0; i < len; ++i) {
				sm.state.tiles[i].render();
			}

			sm.state.renderer.render(sm.state.pixiContainer);
		}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.rendering);

});

},{}],7:[function(require,module,exports){
// Spielmatrix
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	this.Spielmatrix = mod();
})(function() {
	"use strict";

	// GAME CONSTRUCTOR

	// A Spielmatrix instance represents an editor. This is the object
	// that user code is usually dealing with.

	function Spielmatrix(options) {
		if (!(this instanceof Spielmatrix)) return new Spielmatrix(options);

		// Determine effective options based on given values and defaults.
		this.options = options = options ? Spielmatrix.copyObj(options) : {};
		Spielmatrix.copyObj(defaults, options, false);

		// Internal state
		this.state = {
			tiles: [],
			renderer: null,
			width: this.options.width,
			height: this.options.height,
			tileSize: this.options.tileSize,
			cursor: {x:-1, y:-1, onGrid:false},
			time: Spielmatrix.getMS()
		};

		var sm = this;

		Spielmatrix.initializeModules(sm);

		for (var opt in optionHandlers)
			if (optionHandlers.hasOwnProperty(opt))
				optionHandlers[opt](this, options[opt], Init);

		Spielmatrix.updateLoop(sm);
	}

	// MODULE REGISTRATION

	Spielmatrix.modules = [];

	Spielmatrix.initializeModules = function(sm) {
		for (var i = 0; i < Spielmatrix.modules.length; ++i) {
			var module = Spielmatrix.modules[i];
			if (typeof module.initialize === 'function')
				module.initialize(sm);
		}
	};

	Spielmatrix.updateModules = function(sm, data) {
		for (var i = 0; i < Spielmatrix.modules.length; ++i) {
			var module = Spielmatrix.modules[i];
			if (typeof module.update === 'function')
				module.update(sm, data);
		}
	};

	// GAME METHODS

	// The public API of Spielmatrix

	Spielmatrix.prototype = {
		constructor: Spielmatrix,
		draw: function(x, y, color) {
			Spielmatrix.drawTile(this, x, y, color);
		},
		color: function(x, y, color) {
			Spielmatrix.drawTile(this, x, y, color);
		},
		glyph: function(x, y, index) {
			Spielmatrix.drawGlyph(this, x, y, index);
		},
		glyphColor: function(x, y, color) {
			Spielmatrix.drawColorGlyph(this, x, y, color);
		},
		tile: function(x, y) {
			return Spielmatrix.getTile(this, x, y);
		},
		randBetween: function(lo, hi) {
			return Math.floor(Math.random() * (hi+1-lo));
		},
		log: function(obj) {
			Spielmatrix.log(obj);
		}
	};
	

	// GAME INTERNALS

	// The private workings of Spielmatrix

	Spielmatrix.updateLoop = function(sm) {
		// start animating
		window.requestAnimationFrame(animate);

		function animate() {
			var now = Spielmatrix.getMS();
			var dt = Math.max(1, now - sm.state.time);
			sm.state.time = now;
			onUpdate(sm, {"time":dt});
			Spielmatrix.rendering.render(sm);
			// Get next animation frame
			window.requestAnimationFrame(animate);
		}
	};
	
	// GAME EVENTS

	function onUpdate(sm, data) {
		// Notify other modules
		Spielmatrix.updateModules(sm, data);
		// Notify game
		if (sm.options.update) sm.options.update(data);
	}


	// OPTION DEFAULTS

	// The default configuration options.
	var defaults = Spielmatrix.defaults = {};
	// Functions to run when options are changed.
	var optionHandlers = Spielmatrix.optionHandlers = {};

	function option(name, deflt, handle, notOnInit) {
		Spielmatrix.defaults[name] = deflt;
		if (handle) optionHandlers[name] =
			notOnInit ? function(cm, val, old) {
				if (old != Init) handle(cm, val, old);
			} : handle;
	}

	// Passed to option handlers when there is no old value.
	var Init = Spielmatrix.Init = { toString: function() { return "Spielmatrix.Init"; } };

	// Default options
	option("width", 10);
	option("height", 10);
	option("defaultColor", 0x336699);
	option("tileSize", 32);
	option("place", document.body);

	// THE END

	Spielmatrix.version = "0.2.0";

	return Spielmatrix;
});

},{}],8:[function(require,module,exports){
// tile
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	// UTILITY FUNCTIONS
	var Tile = Spielmatrix.Tile = function(squareSprite, glyphSprite, glyphSheet, x, y, size, color) {
		squareSprite.position.x = x * size;
		squareSprite.position.y = y * size;
		glyphSprite.position.x = x * size;
		glyphSprite.position.y = y * size;
		glyphSprite.scale.x = size / 8;
		glyphSprite.scale.y = size / 8;
		this.squareSprite = squareSprite;
		this.glyphSprite = glyphSprite;
		this.glyphSheet = glyphSheet;
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.colorGlyph = color;
		this.dirty = true;
	};

	Tile.prototype.render = function() {
		if (this.dirty) {
			this.dirty = false;
			this.squareSprite.tint = this.color;
			this.glyphSprite.tint = this.colorGlyph;
		}
	};

	Tile.prototype.setColor = function(color) {
		this.dirty = true;
		this.color = color;
	};

	Tile.prototype.setGlyphColor = function(color) {
		this.dirty = true;
		this.colorGlyph = color;
	};

	Tile.prototype.setGlyph = function(index) {
		if (index >= 0 && index < this.glyphSheet.length) {
			this.glyphSprite.texture = this.glyphSheet[index];
		} else {
			Spielmatrix.error("Glyph index "+index+" out of range.");
		}
	};

	// INTERNAL INTERFACE

	Spielmatrix.drawTile = function(sm, x, y, color) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile !== null) {
			tile.setColor(color);
		}
	};

	Spielmatrix.drawGlyph = function(sm, x, y, index) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile !== null) {
			tile.setGlyph(index);
		}
	};

	Spielmatrix.drawColorGlyph = function(sm, x, y, color) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile !== null) {
			tile.setGlyphColor(color);
		}
	};

	Spielmatrix.getTile = function(sm, x, y) {
		var i = x + y * sm.state.width;
		if (i < 0 || i >= sm.state.tiles.length) {
			Spielmatrix.error(["Tile out of bounds:",x,y].join(" "));
			return null;
		}
		return sm.state.tiles[i];
	};
});

},{}],9:[function(require,module,exports){
// utilities
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	// UTILITY FUNCTIONS

	function Nothing() {}

	Spielmatrix.createObj = function(base, props) {
		var inst;
		if (Object.create) {
			inst = Object.create(base);
		} else {
			Nothing.prototype = base;
			inst = new Nothing();
		}
		if (props) Spielmatrix.copyObj(props, inst);
		return inst;
	};

	Spielmatrix.copyObj = function(obj, target, overwrite) {
		if (!target) target = {};
		for (var prop in obj)
			if (obj.hasOwnProperty(prop) && (overwrite !== false || !target.hasOwnProperty(prop)))
				target[prop] = obj[prop];
		return target;
	};

	// TIMING

	Spielmatrix.getMS = function() {
		return (new Date()).getMilliseconds();
	};

	// LOGGING

	Spielmatrix.log = function(obj) {
		console.log(obj);
	};

	Spielmatrix.error = function(obj) {
		console.error(obj);
	};

});

},{}]},{},[4]);
