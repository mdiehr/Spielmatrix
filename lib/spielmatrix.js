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
			updaters: [],
			stage: null,
			renderer: null,
			width: this.options.width,
			height: this.options.height,
			tileSize: this.options.tileSize,
			cursor: {x:-1, y:-1},
			time: Spielmatrix.getMS()
		};

		var sm = this;

		Spielmatrix.initializeRenderer(sm);
		Spielmatrix.initializeTiles(sm);
		Spielmatrix.keyboard.initialize(sm);

		registerEventHandlers(sm);

		for (var opt in optionHandlers)
			if (optionHandlers.hasOwnProperty(opt))
				optionHandlers[opt](this, options[opt], Init);

		Spielmatrix.updateLoop(sm);
	}

	// GAME METHODS

	// The public API of Spielmatrix

	Spielmatrix.prototype = {
		constructor: Spielmatrix,
		draw: function(x, y, color) {
			Spielmatrix.drawTile(this, x, y, color);
		},
		tile: function(x, y) {
			return Spielmatrix.getTile(this, x, y);
		},
		setWidth: function(width) {
			// TODO: Reinitialize the tiles
			this.state.width = width;
		},
		setHeight: function(height) {
			// TODO: Reinitialize the tiles
			this.state.height = height;
		},
		log: function(obj) {
			Spielmatrix.log(obj);
		}
	};
	

	// GAME INTERNALS

	// The private workings of Spielmatrix

	Spielmatrix.updateLoop = function(sm) {
		// start animating
		requestAnimFrame(animate);

		function animate() {
			var now = Spielmatrix.getMS();
			var dt = Math.max(1, now - sm.state.time);
			sm.state.time = now;
			onUpdate(sm, {"time":dt});
			render();
			// Get next animation frame
			requestAnimFrame(animate);
		}

		function render() {
			Spielmatrix.renderTiles(sm);
			sm.state.renderer.render(sm.state.stage);
		}
	};

	Spielmatrix.drawTile = function(sm, x, y, color) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile != null) {
			tile.setColor(color);
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

	// INITIALIZATION

	Spielmatrix.initializeRenderer = function(sm) {
		// create an new instance of a pixi stage
		var stage = new PIXI.Stage(0x3da8bb);
		stage.interactive = true;

		var rendererOptions = {
			antialias: false
		};

		// create a renderer instance
		var w = sm.state.width * sm.state.tileSize;
		var h = sm.state.height * sm.state.tileSize;
		var renderer = PIXI.autoDetectRenderer(w, h, rendererOptions);

		sm.state.stage = stage;
		sm.state.renderer = renderer;

		// Create rectangle texture
		var rectGraphics = new PIXI.Graphics().beginFill(0xFFFFFF);
		rectGraphics.drawRect(0, 0, sm.state.tileSize, sm.state.tileSize);
		rectGraphics.endFill();
		sm.state.tileTexture = rectGraphics.generateTexture(1, PIXI.scaleModes.NEAREST);

		// add the renderer view element to the DOM
		document.body.appendChild(renderer.view);
	};

	Spielmatrix.initializeTiles = function(sm) {
		var w = sm.state.width;
		var h = sm.state.height;
		var size = sm.state.tileSize;
		var color = sm.options.defaultColor;
		for (var y = 0; y < h; ++y) {
			for (var x = 0; x < w; ++x) {
		 		// Set up the graphics
		 		var tileSprite = new PIXI.Sprite(sm.state.tileTexture);
	   			sm.state.stage.addChild(tileSprite);
				sm.state.tiles.push(new Spielmatrix.Tile(tileSprite, x, y, size, color))
			}
		}
	};

	// RENDERING

	Spielmatrix.renderTiles = function(sm) {
		var len = sm.state.tiles.length;
		var tileSize = sm.state.tileSize;
		for (var i = 0; i < len; ++i) {
			sm.state.tiles[i].render(tileSize);
		}
	};

	// EVENT HANDLERS

	function registerEventHandlers(sm) {
		sm.state.stage.mousedown = onMouseDown.bind(null, sm);
		sm.state.stage.mouseup = onMouseUp.bind(null, sm);
		sm.state.stage.mousemove = onMouseMove.bind(null, sm);
	}
	
	// GAME EVENTS

	function onUpdate(sm, data) {
		// Notify other modules
		for (var i = 0; i < sm.state.updaters.length; ++i) {
			sm.state.updaters[i](sm, data);
		}
		// Notify game
		if (sm.update) sm.update(data);
	}

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
		// Issue move event if the x or y changed
		if (sm.state.cursor.x != x || sm.state.cursor.y != y) {
			var onGrid = sm.state.cursor.x >= 0 && sm.state.cursor.y >= 0;
			if (onGrid && sm.mouseleave) sm.mouseleave(sm.state.cursor.x, sm.state.cursor.y);
			if (onGrid && sm.mouseenter) sm.mouseenter(x, y);
			if (sm.mousemove) sm.mousemove(sm.state.cursor.x, sm.state.cursor.y, x, y);
			sm.state.cursor.x = x;
			sm.state.cursor.y = y
		}
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
	option("tileSize", 50);

	// THE END

	Spielmatrix.version = "0.1.0";

	return Spielmatrix;
});
