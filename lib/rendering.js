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
			var place = sm.options.place || document.body;
			place.appendChild(renderer.view);
		},

		initializeTiles : function(sm) {
			// Rectangle texture
			sm.state.squareTexture = Spielmatrix.assets.petscii.glyphs[Spielmatrix.assets.petscii.FILLED];
			sm.state.glyphTexture = Spielmatrix.assets.petscii.glyphs[Spielmatrix.assets.petscii.EMPTY];

			var squareContainer = new PIXI.Container();
			var glyphContainer = new PIXI.Container();
			sm.state.pixiContainer.addChild(squareContainer);
			sm.state.pixiContainer.addChild(glyphContainer);
			
			// Scale the overall container to fit the rendering view
			var size = Spielmatrix.assets.petscii.tileSize;
			var scale = sm.state.tileSize / size;
			sm.state.pixiContainer.scale.x = scale;
			sm.state.pixiContainer.scale.y = scale;

			var w = sm.state.width;
			var h = sm.state.height;
			
			var color = sm.options.defaultColor;
			for (var y = 0; y < h; ++y) {
				for (var x = 0; x < w; ++x) {
			 		// Set up the graphics
			 		var squareSprite = new PIXI.Sprite(sm.state.squareTexture);
			 		var glyphSprite = new PIXI.Sprite(sm.state.glyphTexture);
		   			squareContainer.addChild(squareSprite);
		   			glyphContainer.addChild(glyphSprite);
					sm.state.tiles.push(new Spielmatrix.Tile(squareSprite, glyphSprite, Spielmatrix.assets.petscii.glyphs, x, y, size, color));
				}
			}
		},

		render : function(sm) {
			var len = sm.state.tiles.length;
			for (var i = 0; i < len; ++i) {
				sm.state.tiles[i].render();
			}

			sm.state.renderer.render(sm.state.pixiContainer);
		}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.rendering);

});
