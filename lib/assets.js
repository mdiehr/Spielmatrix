// assets
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.assets = {
		initialize : function(sm) {
			Spielmatrix.assets.initializeAsset(Spielmatrix.assets.petscii);
		},

		initializeAsset : function(asset) {
			asset.texture = PIXI.BaseTexture.fromImage(asset.url, false, PIXI.SCALE_MODES.NEAREST);
			var size = 8, tileHeight = 8, texWidth = 128, texHeight = 128;
			var numTilesX = Math.floor(texWidth / size);
			var numTilesY = Math.floor(texHeight / tileHeight);
			for (var y = 0; y < numTilesY; ++y ) {
				for (var x = 0; x < numTilesX; ++x ) {
					var tex = new PIXI.Texture(asset.texture, new PIXI.Rectangle(x*size, y*size,size,size));
					asset.glyphs.push(tex);
				}
			}
		},

		petscii : {
			texture : null,
			glyphs : [],
			tileSize : 8,
			w : 16,
			h : 16,
			url : 'data:image/png;base64,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',
			EMPTY : 0x00,
			FILLED : 0xFF,
		}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.assets);

});
