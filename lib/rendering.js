// rendering
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.rendering = {
		initialize : function(sm) {
			Spielmatrix.rendering.initializeRenderer(sm);
			Spielmatrix.rendering.initializeTiles(sm);
		},

		update : function(sm, data) {
		},

		// INITIALIZATION

		initializeRenderer : function(sm) {
			// create a renderer instance
			var w = sm.state.width * sm.state.tileSize;
			var h = sm.state.height * sm.state.tileSize;

			var rendererOptions = {
				antialias: false
			};

			var renderer = PIXI.autoDetectRenderer(w, h, rendererOptions);
			sm.state.renderer = renderer;

			// Create display object container to hold sprites
			var pixiContainer = new PIXI.Container();
			pixiContainer.interactive = true;
			sm.state.pixiContainer = pixiContainer;

			// add the renderer view element to the DOM
			document.body.appendChild(renderer.view);
		},

		initializeTiles : function(sm) {
			// Create rectangle texture
			var rectGraphics = new PIXI.Graphics().beginFill(0xFFFFFF);
			rectGraphics.drawRect(0, 0, sm.state.tileSize, sm.state.tileSize);
			rectGraphics.endFill();
			sm.state.tileTexture = rectGraphics.generateTexture(1, PIXI.SCALE_MODES.NEAREST);

			var w = sm.state.width;
			var h = sm.state.height;
			var size = sm.state.tileSize;
			var color = sm.options.defaultColor;
			for (var y = 0; y < h; ++y) {
				for (var x = 0; x < w; ++x) {
			 		// Set up the graphics
			 		var tileSprite = new PIXI.Sprite(sm.state.tileTexture);
		   			sm.state.pixiContainer.addChild(tileSprite);
					sm.state.tiles.push(new Spielmatrix.Tile(tileSprite, x, y, size, color))
				}
			}
		},

		render : function(sm) {
			var len = sm.state.tiles.length;
			var tileSize = sm.state.tileSize;
			for (var i = 0; i < len; ++i) {
				sm.state.tiles[i].render(tileSize);
			}

			sm.state.renderer.render(sm.state.pixiContainer);
		}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.rendering);

});