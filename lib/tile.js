// tile
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	// UTILITY FUNCTIONS
	var Tile = Spielmatrix.Tile = function(graphics, x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.dirty = true;
		this.graphics = graphics;
	};

	Tile.prototype.render = function(size) {
		if (this.dirty) {
			this.dirty = false;
			this.graphics.clear();
	        this.graphics.beginFill(this.color);
	        this.graphics.drawRect(this.x * size, this.y * size, size, size);
	        this.graphics.endFill();
		}
	};

	Tile.prototype.setColor = function(color) {
		this.dirty = true;
		this.color = color;
	}
});
