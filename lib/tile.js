// tile
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	// UTILITY FUNCTIONS
	var Tile = Spielmatrix.Tile = function(squareSprite, glyphSprite, x, y, size, color) {
		squareSprite.position.x = x * size;
		squareSprite.position.y = y * size;
		glyphSprite.position.x = x * size;
		glyphSprite.position.y = y * size;
		glyphSprite.scale.x = size / 8;
		glyphSprite.scale.y = size / 8;
		this.squareSprite = squareSprite;
		this.glyphSprite = glyphSprite;
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.colorGlyph = color;
		this.dirty = true;
	};

	Tile.prototype.render = function(size) {
		if (this.dirty) {
			this.dirty = false;
			this.squareSprite.tint = this.color;
			this.glyphSprite.tint = this.colorGlyph;
		}
	};

	Tile.prototype.setColor = function(color) {
		this.dirty = true;
		this.color = color;
	}
});
