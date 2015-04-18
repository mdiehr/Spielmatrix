// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// This is CodeMirror (http://codemirror.net), a code editor
// implemented in JavaScript on top of the browser's DOM.
//
// You can find some technical background for some of the code below
// at http://marijnhaverbeke.nl/blog/#cm-internals .

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    module.exports = mod();
  else if (typeof define == "function" && define.amd) // AMD
    return define([], mod);
  else // Plain browser env
    this.Spielmatrix = mod();
})(function() {
  "use strict";

  // GAME CONSTRUCTOR

  // A Spielmatrix instance represents an editor. This is the object
  // that user code is usually dealing with.

  function Spielmatrix(options) {
    if (!(this instanceof Spielmatrix)) return new Spielmatrix(options);

    this.options = options = options ? copyObj(options) : {};
    // Determine effective options based on given values and defaults.
    copyObj(defaults, options, false);
   
    this.state = {
      stage: null,
      renderer: null,
      tiles: [],  // stores tile list
      width: this.options.width,
      height: this.options.height,
      tileSize: 25,
      delayingBlurEvent: false,
      focused: false,
      onUpdateMethods: []
    };

    var sm = this;

    registerEventHandlers(this);
    ensureGlobalHandlers();

    if (options.autofocus)
      setTimeout(bind(onFocus, this), 20);
    else
      onBlur(this);

	// create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x3da8bb);
	stage.interactive = true;

	var rendererOptions  = { antialias : true};
	// create a renderer instance
	var w = this.state.width * this.state.tileSize;
	var h = this.state.height * this.state.tileSize;
	var renderer = PIXI.autoDetectRenderer(w, h, rendererOptions);
	this.state.stage = stage;
	this.state.renderer = renderer;

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);

    for (var opt in optionHandlers) if (optionHandlers.hasOwnProperty(opt))
      optionHandlers[opt](this, options[opt], Init);
    if (options.finishInit) options.finishInit(this);
    for (var i = 0; i < initHooks.length; ++i) initHooks[i](this);

    // start animating
    requestAnimFrame(animate);
    function animate() {
        render();
        // Get next animation frame
        requestAnimFrame(animate);
    }

    function render() {
    	var funcs = sm.state.onUpdateMethods;
    	for (var i = 0; i < funcs.length; ++i) {
    		funcs[i]();
    	}
    	sm.state.renderer.render(sm.state.stage);
    }
  }

  // GAME METHODS

  // The public API of Spielmatrix

  Spielmatrix.prototype = {
  	constructor: Spielmatrix,
  	setWidth: function(width) {
  		this.state.width = width;
  	},
  	setHeight: function(height) {
  		this.state.height = height;
  	},
    draw: function(x, y, color) {
    	drawTile(this, x, y, color);
    },
    onUpdate: function(func) {
    	this.state.onUpdateMethods.push(func);
    }
  };
  eventMixin(Spielmatrix);

  // GAME INTERNALS

  // The private workings of Spielmatrix

  function drawTile(sm, x, y, color) {

  }

  // OPTION DEFAULTS

  // The default configuration options.
  var defaults = Spielmatrix.defaults = {};
  // Functions to run when options are changed.
  var optionHandlers = Spielmatrix.optionHandlers = {};

  function option(name, deflt, handle, notOnInit) {
    Spielmatrix.defaults[name] = deflt;
    if (handle) optionHandlers[name] =
      notOnInit ? function(cm, val, old) {if (old != Init) handle(cm, val, old);} : handle;
  }

  // Passed to option handlers when there is no old value.
  var Init = Spielmatrix.Init = {toString: function(){return "Spielmatrix.Init";}};

  // These two are, on init, called from the constructor because they
  // have to be initialized before the editor can start at all.
  option("width", 10, function(sm, val) {
    sm.setWidth(val);
  }, true);
  option("height", 10, function(sm, val) {
    sm.setHeight(val);
  }, true);
  option("autofocus", null);

  // EVENT HANDLERS

  // Attach the necessary event handlers when initializing the editor
  function registerEventHandlers(sm) {

  }

  // WINDOW-WIDE EVENTS

  // These must be handled carefully, because naively registering a
  // handler for each editor will cause the editors to never be
  // garbage collected.

  function forEachSpielmatrix(f) {
    if (!document.body.getElementsByClassName) return;
    var byClass = document.body.getElementsByClassName("Spielmatrix");
    for (var i = 0; i < byClass.length; i++) {
      var sm = byClass[i].Spielmatrix;
      if (sm) f(sm);
    }
  }

  var globalsRegistered = false;
  function ensureGlobalHandlers() {
    if (globalsRegistered) return;
    registerGlobalHandlers();
    globalsRegistered = true;
  }
  function registerGlobalHandlers() {
    // When the window loses focus, we want to show the editor as blurred
    on(window, "blur", function() {
      forEachSpielmatrix(onBlur);
    });
  }

  // FOCUS/BLUR EVENTS

  function onFocus(sm) {
    if (!sm.state.focused) {
      signal(sm, "focus", sm);
      sm.state.focused = true;
      addClass(sm.display.wrapper, "Spielmatrix-focused");
    }
  }
  function onBlur(sm) {
    if (sm.state.focused) {
      signal(sm, "blur", sm);
      sm.state.focused = false;
      rmClass(sm.display.wrapper, "Spielmatrix-focused");
    }
  }

  // UTILITY FUNCTIONS

  function createObj(base, props) {
    var inst;
    if (Object.create) {
      inst = Object.create(base);
    } else {
      nothing.prototype = base;
      inst = new nothing();
    }
    if (props) copyObj(props, inst);
    return inst;
  };

  function copyObj(obj, target, overwrite) {
    if (!target) target = {};
    for (var prop in obj)
      if (obj.hasOwnProperty(prop) && (overwrite !== false || !target.hasOwnProperty(prop)))
        target[prop] = obj[prop];
    return target;
  }

  function bind(f) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){return f.apply(null, args);};
  }

  // EXTENSIONS

  var initHooks = [];

  // EVENT HANDLING

  // Lightweight event framework. on/off also work on DOM nodes,
  // registering native DOM handlers.

  var on = Spielmatrix.on = function(emitter, type, f) {
    if (emitter.addEventListener)
      emitter.addEventListener(type, f, false);
    else if (emitter.attachEvent)
      emitter.attachEvent("on" + type, f);
    else {
      var map = emitter._handlers || (emitter._handlers = {});
      var arr = map[type] || (map[type] = []);
      arr.push(f);
    }
  };

  var off = Spielmatrix.off = function(emitter, type, f) {
    if (emitter.removeEventListener)
      emitter.removeEventListener(type, f, false);
    else if (emitter.detachEvent)
      emitter.detachEvent("on" + type, f);
    else {
      var arr = emitter._handlers && emitter._handlers[type];
      if (!arr) return;
      for (var i = 0; i < arr.length; ++i)
        if (arr[i] == f) { arr.splice(i, 1); break; }
    }
  };

  var signal = Spielmatrix.signal = function(emitter, type /*, values...*/) {
    var arr = emitter._handlers && emitter._handlers[type];
    if (!arr) return;
    var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < arr.length; ++i) arr[i].apply(null, args);
  };

  var orphanDelayedCallbacks = null;

  // Often, we want to signal events at a point where we are in the
  // middle of some work, but don't want the handler to start calling
  // other methods on the editor, which might be in an inconsistent
  // state or simply not expect any other events to happen.
  // signalLater looks whether there are any handlers, and schedules
  // them to be executed when the last operation ends, or, if no
  // operation is active, when a timeout fires.
  function signalLater(emitter, type /*, values...*/) {
    var arr = emitter._handlers && emitter._handlers[type];
    if (!arr) return;
    var args = Array.prototype.slice.call(arguments, 2), list;
    if (operationGroup) {
      list = operationGroup.delayedCallbacks;
    } else if (orphanDelayedCallbacks) {
      list = orphanDelayedCallbacks;
    } else {
      list = orphanDelayedCallbacks = [];
      setTimeout(fireOrphanDelayed, 0);
    }
    function bnd(f) {return function(){f.apply(null, args);};};
    for (var i = 0; i < arr.length; ++i)
      list.push(bnd(arr[i]));
  }

  function fireOrphanDelayed() {
    var delayed = orphanDelayedCallbacks;
    orphanDelayedCallbacks = null;
    for (var i = 0; i < delayed.length; ++i) delayed[i]();
  }

  // The DOM events that CodeMirror handles can be overridden by
  // registering a (non-DOM) handler on the editor for the event name,
  // and preventDefault-ing the event in that handler.
  function signalDOMEvent(sm, e, override) {
    if (typeof e == "string")
      e = {type: e, preventDefault: function() { this.defaultPrevented = true; }};
    signal(sm, override || e.type, sm, e);
    return e_defaultPrevented(e) || e.codemirrorIgnore;
  }

  function hasHandler(emitter, type) {
    var arr = emitter._handlers && emitter._handlers[type];
    return arr && arr.length > 0;
  }

  // Add on and off methods to a constructor's prototype, to make
  // registering events on such objects more convenient.
  function eventMixin(ctor) {
    ctor.prototype.on = function(type, f) {on(this, type, f);};
    ctor.prototype.off = function(type, f) {off(this, type, f);};
  }

  // THE END

  Spielmatrix.version = "0.1.0";

  return Spielmatrix;
});
