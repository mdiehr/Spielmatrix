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


	// PUBLIC METHODS

	Spielmatrix.prototype = {
		constructor: Spielmatrix,
		color: function(x, y, color) {
			Spielmatrix.setTileColor(this, x, y, color);
		},
		glyph: function(x, y, index) {
			Spielmatrix.setTileGlyph(this, x, y, index);
		},
		glyphColor: function(x, y, color) {
			Spielmatrix.setTileGlyphColor(this, x, y, color);
		},
		set: function(x, y, properties) {
			Spielmatrix.setTileProperties(this, x, y, properties);
		},
		data: function(x, y, properties) {
			Spielmatrix.setTileData(this, x, y, properties);
		},
		tile: function(x, y) {
			return Spielmatrix.getTile(this, x, y);
		},
		randBetween: function(lo, hi) {
			return Math.floor(Math.random() * (hi+1-lo));
		},
		log: function(obj) {
			Spielmatrix.log(obj);
		},
		selector: function() {
			return Spielmatrix.selector.bind(this, this);
		},
		play: function(name) {
			return Spielmatrix.audio.play(this, name);
		}
	};
	

	// MAIN UPDATE LOOP

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
	option("pixelPerfect", true);
	option("resizeCanvas", true);
	option("renderWidthMax", 480);
	option("renderWidthMin", 240);

	// THE END

	Spielmatrix.version = "0.2.0";

	return Spielmatrix;
});
