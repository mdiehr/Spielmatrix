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
			var place = sm.options.place || document.body
			place.appendChild(renderer.view);
		},

		initializeTiles : function(sm) {
			// Create rectangle texture
			var rectGraphics = new PIXI.Graphics().beginFill(0xFFFFFF);
			rectGraphics.drawRect(0, 0, sm.state.tileSize, sm.state.tileSize);
			rectGraphics.endFill();
			sm.state.squareTexture = rectGraphics.generateTexture(1, PIXI.SCALE_MODES.NEAREST);
			sm.state.glyphTexture = Spielmatrix.assets.petscii.glyphs[0];

			var squareContainer = new PIXI.Container();
			var glyphContainer = new PIXI.Container();
			sm.state.pixiContainer.addChild(squareContainer);
			sm.state.pixiContainer.addChild(glyphContainer);
			
			var w = sm.state.width;
			var h = sm.state.height;
			var size = sm.state.tileSize;
			var color = sm.options.defaultColor;
			for (var y = 0; y < h; ++y) {
				for (var x = 0; x < w; ++x) {
			 		// Set up the graphics
			 		var squareSprite = new PIXI.Sprite(sm.state.squareTexture);
			 		var glyphSprite = new PIXI.Sprite(sm.state.glyphTexture);
		   			squareContainer.addChild(squareSprite);
		   			glyphContainer.addChild(glyphSprite);
					sm.state.tiles.push(new Spielmatrix.Tile(squareSprite, glyphSprite, Spielmatrix.assets.petscii.glyphs, x, y, size, color))
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

	Spielmatrix.drawTile = function(sm, x, y, color) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile != null) {
			tile.setColor(color);
		}
	};

	Spielmatrix.drawGlyph = function(sm, x, y, index) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile != null) {
			tile.setGlyph(index);
		}
	};

	Spielmatrix.drawColorGlyph = function(sm, x, y, color) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile != null) {
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

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.rendering);

});
