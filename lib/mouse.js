// mouse
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.mouse = {
		initialize : function(sm) {
			sm.state.pixiContainer.mouseover = this.onMouseOver.bind(null, sm);
			sm.state.pixiContainer.mouseout  = this.onMouseOut.bind(null, sm);
			sm.state.pixiContainer.mousedown = this.onMouseDown.bind(null, sm);
			sm.state.pixiContainer.mouseup   = this.onMouseUp.bind(null, sm);
			sm.state.pixiContainer.mousemove = this.onMouseMove.bind(null, sm);
			sm.state.pixiContainer.touchstart = this.onMouseDown.bind(null, sm);
			sm.state.pixiContainer.touchmove = this.onMouseMove.bind(null, sm);
			sm.state.pixiContainer.touchend = this.onMouseUp.bind(null, sm);
		},

		shutdown : function(sm) {
			sm.state.pixiContainer.mouseover = null;
			sm.state.pixiContainer.mouseout  = null;
			sm.state.pixiContainer.mousedown = null;
			sm.state.pixiContainer.mouseup   = null;
			sm.state.pixiContainer.mousemove = null;
			sm.state.pixiContainer.touchstart = null;
			sm.state.pixiContainer.touchmove = null;
			sm.state.pixiContainer.touchend = null;
		},

		setMouseState : function(sm, x, y, onGrid) {
			sm.state.cursor.x = x;
			sm.state.cursor.y = y;
			sm.state.cursor.onGrid = onGrid;
		},

		// Mouse click
		onMouseDown : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			if (sm.options.mousedown) sm.options.mousedown(x, y);
		},

		// Mouse click released
		onMouseUp : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			if (sm.options.mouseup) sm.options.mouseup(x, y);
		},

		// Mouse moved
		onMouseMove : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			// Issue move event if the x or y changed
			var onGrid = x >= 0 && y >= 0 && x < sm.state.width && y < sm.state.height;
			if (sm.state.cursor.x != x || sm.state.cursor.y != y || sm.state.cursor.onGrid != onGrid) {
				if (onGrid && sm.options.mousemove) sm.options.mousemove(sm.state.cursor.x, sm.state.cursor.y, x, y);
				if (sm.state.cursor.onGrid && sm.options.mouseleave) sm.options.mouseleave(sm.state.cursor.x, sm.state.cursor.y);
				if (onGrid && sm.options.mouseenter) sm.options.mouseenter(x, y);
				Spielmatrix.mouse.setMouseState(sm, x, y, onGrid);
			}
		},

		// Mouse moved from off the grid to on the grid
		onMouseOver : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			if (sm.options.mouseover) sm.options.mouseover(x, y);
			Spielmatrix.mouse.setMouseState(sm, x, y, true);
		},

		// Mouse moved from on the grid to off the grid
		onMouseOut : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			if (sm.options.mouseout) sm.options.mouseout(sm.state.cursor.x, sm.state.cursor.y);
			if (sm.options.mouseleave) sm.options.mouseleave(sm.state.cursor.x, sm.state.cursor.y);
			Spielmatrix.mouse.setMouseState(sm, x, y, false);
		}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.mouse);

});
