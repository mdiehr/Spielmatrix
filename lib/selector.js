// selector
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

/*	PS Extend
	by Mark Diehr - mdiehr@gmail.com
	
	A small functional extension for Perlenspiel.

	The basic item of logic is a list of bead objects.

	There are a set of methods which create or filter the lists,
	and another set of methods which do things to the beads
	in a list.
	
	Bead objects store a simplified copy of the engine's bead
	properties, and provides methods for modifying the bead.


	Beads([filter])
		PARAMS: filter, or nothing
		RETURN: beadlist
		Takes an optional filter, and then either returns a
		beadlist of every bead in the grid, if no filter is given,
		or a list of every bead which matches the filter.

	beadlist.exec(func)
		PARAMS: function that takes an x and y coordinate
		RETURN: the beadlist
		Applies a function to every set of coordinates in the
		beadlist.

	beadlist.rand()
		PARAMS: none
		RETURN: one random bead from the beadlist
		Fails if the list is empty.
	
	beadlist.where(properties)	
		PARAMS: properties object
		RETURN: a new beadlist where each bead has the given
				properties
		Bead objects by default have the following properties:
			x, y, color, alpha, fade, scale, radius, data, exec,
			visible, active, border, borderColor, borderAlpha,
			borderFade, glyph, glyphColor, glyphAlpha, glyphScale,
			glyphFade
		If a property is listed, beads must have the same value
		for that proprety. For example, the properties object
		{data:1} will match every bead where the data has been
		set to 1.

	beadlist.not(properties)
		PARAMS: properties object
		RETURN: a new beadlist where each bead does not have the
				given properties
		The complement to beadlist.where.

	beadlist.filter(func)
		PARAMS: function that takes an x and y coordinate and
				returns true or false
		RETURN: the beadlist of every bead where the function
				returns true
		Applies a function to every set of coordinates in the
		beadlist. Beads that pass the function (return value of
		true) are included in the returned beadlist.
	
	beadlist.reject(func)
		PARAMS: function that takes an x and y coordinate and
				returns true or false
		RETURN: the beadlist of every bead where the function
				returns false
		The opposite of beadlist.filter.

	beadlist.set()
		PARAMS: properties object
		RETURN: the beadlist
		Changes every bead in the beadlist by setting its
		properties to match those of the properties object.
		Properties included:
			data, color, glyph, glyphColor

	The beadlist also has a collection of convenience functions for setting
	the bead properties of every bead in the list. They have the same functionality
	as invoking the corresponding PS.______ method on each bead in the list.
	Functions included:
		color, alpha, fade, scale, radius, data, exec, visible, active, border,
		borderColor, borderAlpha, borderFade, glyph, glyphColor, glyphAlpha,
		glyphScale, glyphFade

*/

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

    ////////////////////////////////////////
	// Functional style

	// Calls a function with each item in the list as an argument
	var _each = function(list, func) {
		for (var i = 0; i < list.length; ++i)
			func(list[i]);
	}

	var _where = function(list, properties) {
		var result = [];
		for (var i = 0; i < list.length; ++i) {
			var item = list[i];
			for(var prop in properties) {
				if(properties.hasOwnProperty(prop))
					if(item[prop] === properties[prop])
						result.push(item);
			}
		}
		return result;
	}

	// Returns a copy of list that doesn't include values
	var _without = function(list, values) {
		var result = [];
		for (var i = 0; i < list.length; ++i) {
			if(values.indexOf(list[i]) === -1 )
				result.push(list[i]);
		}
		return result;
	}

	// Writes useful functions into a list object so you can chain them
	var _decorateList = function(list) {
		// Apply a function on every bead in the bead list
		list.exec = function(func) {
			if (this instanceof Array) {
				for(var i = 0; i < this.length; ++i)
					func.call(null, this[i]);
			}
			return this;
		};

		// Choose a random element from an array
		list.rand = function() {
			return this[Math.floor(Math.random() * this.length)];
		};

		list.where = function(properties) {
			var tiles = _where(this, properties);
			return _decorateList(tiles);
		};

		list.not = function(properties) {
			var tilesWith = this.where(properties);
			var tiles = _without(this, tilesWith);
			return _decorateList(tiles);
		}

		// Returns tiles that pass a truth test
		list.filter = function(func) {
			var tiles = [];
			for (var i = 0; i < this.length; ++i) {
				if (func.call(null, this[i]))
					tiles.push(this[i]);
			}
			return _decorateList(tiles);
		};

		// Returns tiles that fail a truth test
		list.reject = function(func) {
			var tiles = [];
			for (var i = 0; i < this.length; ++i) {
				if (!func(this[i].x, this[i].y))
					tiles.push(this[i]);
			}
			return _decorateList(tiles);
		};

		// Modifies tile based on property object
		list.set = function(properties) {
			properties = properties || {};
			if (properties.hasOwnProperty("data"))
				this.exec(function(tile) {tile.setData(properties.data)});
			if (properties.hasOwnProperty("color"))
				this.exec(function(tile) {tile.setColor(properties.color)});
			if (properties.hasOwnProperty("glyph"))
				this.exec(function(tile) {tile.setGlyph(properties.glyph)});
			if (properties.hasOwnProperty("glyphColor"))
				this.exec(function(tile) {tile.setGlyphColor(properties.glyphColor)});
		}

		// Bead modification API

		list.data = function(data) {
			return this.exec(function(tile) {tile.setData(data);});
		};

		list.color = function(color) {
			return this.exec(function(tile) {tile.setColor(color);});
		};

		list.glyph = function(glyph) {
			return this.exec(function(tile) {tile.setGlyph(glyph);});
		};

		list.glyphColor = function(glyphColor) {
			return this.exec(function(tile) {tile.setGlyphColor(glyphColor);});
		};

		return list;
	};

	// Get all tiles
	Spielmatrix.getAllTiles = function(sm) {
		var tiles = [];
		for (var i = 0, imax = sm.state.tiles.length; i < imax; ++i) {
			tiles.push(sm.state.tiles[i]);
		}
		return _decorateList(tiles);
	};

	// Get a collection of tiles that pass the test function/properties
	Spielmatrix.getTiles = function(sm, test) {
		// All beads
		var list = Spielmatrix.getAllTiles(sm);
		if(test == undefined)
			return list;

		// Object test
		if(typeof test === "object")
			return list.where(test);

		// Function test
		return list.filter(test);
	};

	Spielmatrix.getTileList = function(sm, x, y) {
		return _decorateList([Spielmatrix.getTile(sm, x, y)]);
	};

	// Interface for other files to use
	Spielmatrix.selector = Spielmatrix.getTiles;

});