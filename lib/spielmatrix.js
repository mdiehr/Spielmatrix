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
			cursor: {x:-1, y:-1, onGrid:false},
			time: Spielmatrix.getMS()
		};

		var sm = this;

		Spielmatrix.initializeRenderer(sm);
		Spielmatrix.initializeTiles(sm);
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
		};
	}

	Spielmatrix.updateModules = function(sm, data) {
		for (var i = 0; i < Spielmatrix.modules.length; ++i) {
			var module = Spielmatrix.modules[i];
			if (typeof module.update === 'function')
				module.update(sm, data);
		};
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
			render();
			// Get next animation frame
			window.requestAnimationFrame(animate);
		}

		function render() {
			Spielmatrix.renderTiles(sm);
			sm.state.renderer.render(sm.state.pixiContainer);
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
		document.body.appendChild(renderer.view);
	};

	Spielmatrix.initializeTiles = function(sm) {
		// Create rectangle texture
		var rectGraphics = new PIXI.Graphics().beginFill(0xFFFFFF);
		rectGraphics.drawRect(0, 0, sm.state.tileSize, sm.state.tileSize);
		rectGraphics.endFill();
		sm.state.tileTexture = rectGraphics.generateTexture(1, PIXI.SCALE_MODES.NEAREST);

		var w = sm.state.width;
		var h = sm.state.height;
		var size = sm.state.tileSize;
		var color = sm.options.defaultColor;
		for (var y = 0; y < h; ++y) {
			for (var x = 0; x < w; ++x) {
		 		// Set up the graphics
		 		var tileSprite = new PIXI.Sprite(sm.state.tileTexture);
	   			sm.state.pixiContainer.addChild(tileSprite);
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
	option("tileSize", 50);

	// THE END

	Spielmatrix.version = "0.1.0";

	return Spielmatrix;
});
