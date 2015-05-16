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
			Spielmatrix.rendering.readViewOptions(sm);
			Spielmatrix.rendering.calculateViewSize(sm);

			// create a renderer instance
			var rendererOptions = { antialias: !sm.options.pixelPerfect };
			sm.state.renderer = PIXI.autoDetectRenderer(sm.state.renderWidth, sm.state.renderHeight, rendererOptions);

			// Create display object container to hold sprites
			sm.state.pixiContainer = new PIXI.Container();
			sm.state.pixiContainer.interactive = true;

			// add the renderer view element to the DOM
			sm.options.place.appendChild(sm.state.renderer.view);
		},

		readViewOptions : function(sm) {
			// Get the element that the renderer will fit into
			var element = sm.options.place;

			if (element.attributes.hasOwnProperty('sm-width-max')) {
				var smWidth = parseInt(element.attributes['sm-width-max'].value);
				if (!isNaN(smWidth))
					sm.options.renderWidthMax = smWidth;
			}

			if (element.attributes.hasOwnProperty('sm-width-min')) {
				var smWidthMin = parseInt(element.attributes['sm-width-min'].value);
				if (!isNaN(smWidthMin))
					sm.options.renderWidthMin = smWidthMin;
			}

			if (element.attributes.hasOwnProperty('sm-pixel-perfect')) {
				sm.options.pixelPerfect = element.attributes['sm-pixel-perfect'].value === 'true';
			}

			if (element.attributes.hasOwnProperty('sm-resize-canvas')) {
				sm.options.resizeCanvas = element.attributes['sm-resize-canvas'].value === 'true';
			}

			// Ideal render width is the max render width
			sm.state.renderWidth = sm.options.renderWidthMax;
		},

		// Determine size of the renderer view
		calculateViewSize : function(sm) {

			// Calculate best-fitting tile size
			if (sm.options.pixelPerfect) {
				var tileBaseSize = Spielmatrix.assets.petscii.tileSize;
				// Fit tiles to render width
				sm.state.tileSize = Math.floor(sm.state.renderWidth / sm.state.width);
				// Shrink tiles to multiple of base texture size
				sm.state.tileSize = Math.max(tileBaseSize, sm.state.tileSize - (sm.state.tileSize % tileBaseSize));
			} else {
				// Fit tiles to render width
				sm.state.tileSize = Math.floor(sm.state.renderWidth / sm.state.width);
			}
			// Determine final rendering width/height based on the calculated tile size
			sm.state.renderWidth = sm.state.width * sm.state.tileSize;
			sm.state.renderHeight = sm.state.height * sm.state.tileSize;
		},

		update : function(sm, data) {
			// Check for canvas resize
			if (sm.options.resizeCanvas && sm.options.renderWidthMax !== sm.options.renderWidthMin) {
				var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				// TODO: Handle window height, as well
				// var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

				var resized = false;

				// Shrink
				if (windowWidth < sm.state.renderWidth && sm.state.renderWidth > sm.options.renderWidthMin) {
					resized = true;
					sm.state.renderWidth = Math.floor(Math.max(windowWidth, sm.options.renderWidthMin));
				}

				// Grow
				if (windowWidth > sm.state.renderWidth && sm.state.renderWidth < sm.options.renderWidthMax) {
					resized = true;
					sm.state.renderWidth = Math.floor(Math.min(windowWidth, sm.options.renderWidthMax));
				}

				if (resized) {
					// Determine the height based on the width
					sm.state.renderHeight = Math.floor(sm.state.height * (sm.state.renderWidth / sm.state.width));
					
					// Note: This modifies the renderWidth & renderHeight
					Spielmatrix.rendering.calculateViewSize(sm);

					sm.state.pixiContainer.width = sm.state.renderWidth;
					sm.state.pixiContainer.height = sm.state.renderHeight;
					sm.state.renderer.resize(sm.state.renderWidth, sm.state.renderHeight);

				}

			}
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
