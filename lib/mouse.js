// mouse
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.mouse = {
		initialize : function(sm) {
			sm.state.stage.mouseover = Spielmatrix.mouse.onMouseOver.bind(null, sm);
			sm.state.stage.mouseout  = Spielmatrix.mouse.onMouseOut.bind(null, sm);
			sm.state.stage.mousedown = Spielmatrix.mouse.onMouseDown.bind(null, sm);
			sm.state.stage.mouseup   = Spielmatrix.mouse.onMouseUp.bind(null, sm);
			sm.state.stage.mousemove = Spielmatrix.mouse.onMouseMove.bind(null, sm);
		},

		setMouseState : function(sm, x, y, onGrid) {
			sm.state.cursor.x = x;
			sm.state.cursor.y = y
			sm.state.cursor.onGrid = onGrid;
		},

		onMouseDown : function(sm, data) {
			var x = Math.floor(data.global.x / sm.state.tileSize);
			var y = Math.floor(data.global.y / sm.state.tileSize);
			if (sm.options.mousedown) sm.options.mousedown(x, y);
		},

		onMouseUp : function(sm, data) {
			var x = Math.floor(data.global.x / sm.state.tileSize);
			var y = Math.floor(data.global.y / sm.state.tileSize);
			if (sm.options.mouseup) sm.options.mouseup(x, y);
		},

		onMouseMove : function(sm, data) {
			var x = Math.floor(data.global.x / sm.state.tileSize);
			var y = Math.floor(data.global.y / sm.state.tileSize);
			// Issue move event if the x or y changed
			var onGrid = x >= 0 && y >= 0;
			if (sm.state.cursor.x != x || sm.state.cursor.y != y || sm.state.cursor.onGrid != onGrid) {
				if (sm.options.mousemove) sm.options.mousemove(sm.state.cursor.x, sm.state.cursor.y, x, y);
				if (sm.state.cursor.onGrid && sm.options.mouseleave) sm.options.mouseleave(sm.state.cursor.x, sm.state.cursor.y);
				if (onGrid && sm.options.mouseenter) sm.options.mouseenter(x, y);
				Spielmatrix.mouse.setMouseState(sm, x, y, onGrid);
			}
		},

		onMouseOver : function(sm, data) {
			// Pixi is sending an onMouseOver event before you even move the mouse. Lame!
			if (!data.originalEvent)
				return;
			var x = Math.floor(data.global.x / sm.state.tileSize);
			var y = Math.floor(data.global.y / sm.state.tileSize);
			if (sm.options.mouseover) sm.options.mouseover(x, y);
			Spielmatrix.mouse.setMouseState(sm, x, y, true);
		},

		onMouseOut : function(sm, data) {
			var x = Math.floor(data.global.x / sm.state.tileSize);
			var y = Math.floor(data.global.y / sm.state.tileSize);
			if (sm.options.mouseout) sm.options.mouseout(x, y);
			if (sm.options.mouseleave) sm.options.mouseleave(x, y);
			Spielmatrix.mouse.setMouseState(sm, x, y, false);
		}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.mouse);

});
