// tile
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	// UTILITY FUNCTIONS
	var Tile = Spielmatrix.Tile = function(sprite, x, y, size, color) {
		sprite.position.x = x * size;
		sprite.position.y = y * size;
		this.sprite = sprite;
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.dirty = true;
	};

	Tile.prototype.render = function(size) {
		if (this.dirty) {
			this.dirty = false;
			this.sprite.tint = this.color;
		}
	};

	Tile.prototype.setColor = function(color) {
		this.dirty = true;
		this.color = color;
	}
});
