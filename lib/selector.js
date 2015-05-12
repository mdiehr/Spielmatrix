// selector
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

/*	
	A small functional extension for Spielmatrix.

	The basic item of logic is a list of tile objects.

	There are a set of methods which create or filter the lists,
	and another set of methods which do things to the tiles
	in a list.
	
	Tile objects store a simplified copy of the engine's tile
	properties, and provides methods for modifying the tile.


	S([filter])
		PARAMS: filter, or nothing
		RETURN: tileList
		Takes an optional filter, and then either returns a
		tileList of every tile in the grid, if no filter is given,
		or a list of every tile which matches the filter.

	tileList.exec(func)
		PARAMS: function that takes an x and y coordinate
		RETURN: the tileList
		Applies a function to every set of coordinates in the
		tileList.

	tileList.rand()
		PARAMS: none
		RETURN: one random tile from the tileList
		Fails if the list is empty.
	
	tileList.where(properties)	
		PARAMS: properties object
		RETURN: a new tileList where each tile has the given
				properties
		Tile objects by default have the following properties:
			x, y, color, alpha, fade, scale, radius, data, exec,
			visible, active, border, borderColor, borderAlpha,
			borderFade, glyph, glyphColor, glyphAlpha, glyphScale,
			glyphFade
		If a property is listed, tiles must have the same value
		for that proprety. For example, the properties object
		{data:1} will match every tile where the data has been
		set to 1.

	tileList.not(properties)
		PARAMS: properties object
		RETURN: a new tileList where each tile does not have the
				given properties
		The complement to tileList.where.

	tileList.where(func)
		PARAMS: function that takes an x and y coordinate and
				returns true or false
		RETURN: the tileList of every tile where the function
				returns true
		Applies a function to every set of coordinates in the
		tileList. Tiles that pass the function (return value of
		true) are included in the returned tileList.
	
	tileList.not(func)
		PARAMS: function that takes an x and y coordinate and
				returns true or false
		RETURN: the tileList of every tile where the function
				returns false

	tileList.set()
		PARAMS: properties object
		RETURN: the tileList
		Changes every tile in the tileList by setting its
		properties to match those of the properties object.
		Properties included:
			data, color, glyph, glyphColor

	The tileList also has a collection of convenience functions for setting
	the tile properties of every tile in the list. They have the same functionality
	as invoking the corresponding PS.______ method on each tile in the list.
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
	};

	// Returns a list of only items that contain the exact properties listed
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
	};

	// Returns a list of only items that satisfy the predicate
	var _filter = function(list, predicate) {
		var filtered = [];
		for (var i = 0; i < list.length; ++i) {
			if (predicate(list[i]) === true)
				filtered.push(list[i]);
		}
		return filtered;
	};

	// Returns a copy of list that doesn't include values
	var _without = function(list, values) {
		var result = [];
		for (var i = 0; i < list.length; ++i) {
			if(values.indexOf(list[i]) === -1 )
				result.push(list[i]);
		}
		return result;
	};

	// Takes count items randomly from a list
	var _takeRandomly = function(list, n) {
	    var result = new Array(n),
	        len = list.length,
	        taken = new Array(len);
	    if (n > len)
	        throw new RangeError("getRandom: more elements taken than available");
	    while (n--) {
	        var x = Math.floor(Math.random() * len);
	        result[n] = list[x in taken ? taken[x] : x];
	        taken[x] = --len;
	    }
	    return result;
	};

	// Writes useful functions into a list object so you can chain them
	var _decorateList = function(list) {
		// Apply a function on every tile in the tile list
		list.exec = function(func) {
			_each(this, func);
			return this;
		};

		// Choose a random element from an array
		list.rand = function(count) {
			count = count || 1;
			var numTiles = this.length;

			// The entire list
			if (numTiles <= count)
				return list;

			// Nothing at all
			if (count <= 0)
				return _decorateList([]);

			return _decorateList(_takeRandomly(this, count));
		};

		list.where = function(query) {
			if (typeof query === 'object') {
				return _decorateList(_where(this, query));
			} else if (typeof query === 'function') {
				return _decorateList(_filter(this, query));
			} else {
				Spielmatrix.error("Invalid query: " + (typeof query));
				return _decorateList([]);
			}
		};

		list.not = function(query) {
			var tilesWith = this.where(query);
			var tiles = _without(this, tilesWith);
			return _decorateList(tiles);
		};

		// Modifies tile based on property object
		list.set = function(properties) {
			properties = properties || {};
			this.exec(function(tile) {tile.set(properties);});
			return this;
		};

		// Tile modification API

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
	Spielmatrix.selector = function(sm, test1, test2) {
		// All tiles
		var list = Spielmatrix.getAllTiles(sm);
		if (test1 === undefined)
			return list;

		// Object test
		if (typeof test1 === "object" || typeof test1 === "function")
			return list.where(test1);

		// Coordinate test
		if(typeof test1 === "number" && typeof test2 === 'number')
			return _decorateList([Spielmatrix.getTile(sm, test1, test2)]);

		// Error case
		Spielmatrix.error("Invalid tile selector: " + (typeof test1));
		return list;
	};
});