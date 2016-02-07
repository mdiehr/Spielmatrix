// tile
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";


	// Tile object constructor

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
		this.glyph = 0;
		this.glyphColor = 0x000000;
		this.data = null;
		this.dirty = true;
	};


	// Public tile interface

	Tile.prototype.render = function() {
		if (this.dirty) {
			this.dirty = false;
			this.squareSprite.tint = this.color;
			this.glyphSprite.tint = this.glyphColor;
		}
	};

	Tile.prototype.setColor = function(color) {
		this.dirty = true;
		this.color = color;
		return this;
	};

	Tile.prototype.setGlyphColor = function(color) {
		this.dirty = true;
		this.glyphColor = color;
		return this;
	};

	Tile.prototype.setGlyph = function(index) {
		// Handle case where the glyph was set as a string
		if (typeof index === 'string') {
			index = index.charCodeAt(0);
		}

		if (index >= 0 && index < this.glyphSheet.length) {
			this.glyph = index;
			this.glyphSprite.texture = this.glyphSheet[index];
		} else {
			Spielmatrix.error("Glyph index "+index+" out of range.");
		}
		return this;
	};

	Tile.prototype.setData = function(data) {
		this.data = data;
		return this;
	};

	Tile.prototype.set = function(properties) {
		properties = properties || {};
		if (properties.hasOwnProperty("data"))
			this.setData(properties.data);
		if (properties.hasOwnProperty("color"))
			this.setColor(properties.color);
		if (properties.hasOwnProperty("glyph"))
			this.setGlyph(properties.glyph);
		if (properties.hasOwnProperty("glyphColor"))
			this.setGlyphColor(properties.glyphColor);
		return this;
	};

	// Helper functions for accessing tiles

	Spielmatrix.getTile = function(sm, x, y) {
		var i = x + y * sm.state.width;
		if (i < 0 || i >= sm.state.tiles.length) {
			Spielmatrix.error(["Tile out of bounds:",x,y].join(" "));
			return null;
		}
		return sm.state.tiles[i];
	};

	Spielmatrix.setTileColor = function(sm, x, y, color) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile !== null) {
			tile.setColor(color);
		}
	};

	Spielmatrix.setTileGlyph = function(sm, x, y, index) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile !== null) {
			tile.setGlyph(index);
		}
	};

	Spielmatrix.setTileGlyphColor = function(sm, x, y, color) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile !== null) {
			tile.setGlyphColor(color);
		}
	};

	Spielmatrix.setTileProperties = function(sm, x, y, properties) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile !== null) {
			tile.set(properties);
		}
	};

	Spielmatrix.setTileData = function(sm, x, y, properties) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile !== null) {
			tile.setData(properties);
		}
	};

});
