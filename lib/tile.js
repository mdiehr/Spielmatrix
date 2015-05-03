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
