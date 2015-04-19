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

		this.options = options = options ? Spielmatrix.copyObj(options) : {};
		// Determine effective options based on given values and defaults.
		Spielmatrix.copyObj(defaults, options, false);

		this.state = {
			tiles: [], // stores tile list
			stage: null,
			renderer: null,
			width: this.options.width,
			height: this.options.height,
			tileSize: 50,
			dirty: true
		};

		var sm = this;

		initializeRenderer(sm);
		initializeTiles(sm);

		registerEventHandlers(sm);

		for (var opt in optionHandlers)
			if (optionHandlers.hasOwnProperty(opt))
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
			renderTiles(sm);
			sm.state.renderer.render(sm.state.stage);
		}

		function onMouseMove(data) {
			if (sm.mousemove) sm.mousemove(data);
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
	

	// GAME INTERNALS

	// The private workings of Spielmatrix

	function drawTile(sm, x, y, color) {
		var tile = getTile(sm, x, y);
		if (tile != null) {
			tile.color = color;
			tile.dirty = true;
			sm.state.dirty = true;
		}
	}

	function getTile(sm, x, y) {
		var i = x + y * sm.state.width;
		if (i < 0 || i >= sm.state.tiles.length) {
			error(["Tile out of bounds:",x,y].join(" "));
			return null;
		}
		return sm.state.tiles[i];
	}

	function error(obj) {
		console.error(obj);
	}

	function initializeRenderer(sm) {
		// create an new instance of a pixi stage
		var stage = new PIXI.Stage(0x3da8bb);
		stage.interactive = true;

		var rendererOptions = {
			antialias: true
		};
		// create a renderer instance
		var w = sm.state.width * sm.state.tileSize;
		var h = sm.state.height * sm.state.tileSize;
		var renderer = PIXI.autoDetectRenderer(w, h, rendererOptions);

		sm.state.stage = stage;
		sm.state.renderer = renderer;

		// add the renderer view element to the DOM
		document.body.appendChild(renderer.view);
	};

	function initializeTiles(sm) {
		var w = sm.state.width;
		var h = sm.state.height;
		var size = sm.state.tileSize;
		var color = sm.options.defaultColor;
		for (var y = 0; y < h; ++y) {
			for (var x = 0; x < w; ++x) {
		 		// Set up the graphics
				var graphics = new PIXI.Graphics().beginFill(color);
	   			sm.state.stage.addChild(graphics);
				sm.state.tiles.push(new Spielmatrix.Tile(graphics, x, y, color))
			}
		}
	};

	function renderTiles(sm) {
		if (!sm.state.dirty)
			return;
		sm.state.dirty = false;
		var len = sm.state.tiles.length;
		var graphics = sm.state.graphics;
		var size = sm.state.tileSize;
		var tile;
		for (var i = 0; i < len; ++i) {
			sm.state.tiles[i].render(size);
		}
	};

	// GAME EVENTS

	function onMouseDown(sm, data) {
		var x = Math.floor(data.global.x / sm.state.tileSize);
		var y = Math.floor(data.global.y / sm.state.tileSize);
		if (sm.mousedown) sm.mousedown(x, y);
	}

	function onMouseUp(sm, data) {
		var x = Math.floor(data.global.x / sm.state.tileSize);
		var y = Math.floor(data.global.y / sm.state.tileSize);
		if (sm.mouseup) sm.mouseup(x, y);
	}

	function onMouseMove(sm, data) {
		var x = Math.floor(data.global.x / sm.state.tileSize);
		var y = Math.floor(data.global.y / sm.state.tileSize);
		if (sm.mousemove) sm.mousemove(x, y);
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

	// These two are, on init, called from the constructor because they
	// have to be initialized before the editor can start at all.
	option("width", 10);
	option("height", 10);
	option("defaultColor", 0x336699);
	// EVENT HANDLERS

	// Attach the necessary event handlers when initializing the editor
	function registerEventHandlers(sm) {
		sm.state.stage.mousedown = onMouseDown.bind(null, sm);
		sm.state.stage.mouseup = onMouseUp.bind(null, sm);
		sm.state.stage.mousemove = onMouseMove.bind(null, sm);
	}

	// EXTENSIONS

	var initHooks = [];

	// THE END

	Spielmatrix.version = "0.1.0";

	return Spielmatrix;
});
