// assets
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.assets = {
		initialize : function(sm) {
			Spielmatrix.assets.petscii.texture = PIXI.BaseTexture.fromImage(Spielmatrix.assets.petscii.url, false, PIXI.SCALE_MODES.NEAREST);
			var tileWidth = 8, tileHeight = 8, texWidth = 128, texHeight = 128;
			var numTilesX = Math.floor(texWidth / tileWidth);
			var numTilesY = Math.floor(texHeight / tileHeight);
			Spielmatrix.assets.petscii.glyphs = [];
			for (var y = 0; y < numTilesY; ++y ) {
				for (var x = 0; x < numTilesX; ++x ) {
					var tex = new PIXI.Texture(Spielmatrix.assets.petscii.texture, new PIXI.Rectangle(x*8, y*8,8,8));
					Spielmatrix.assets.petscii.glyphs.push(tex);
				}
			}
		},

		petscii : {
			texture : null,
			glyphs : [],
			url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAABGFJREFUeNrsWtmyqzAMU/7/p+/cLuBFchZKex7CTAuUFBRHthUHtHMD+D5ej1vvf2p7tMMXACAcuHZfAHCePo+A1y8eAF6bOcybb6rP7f3iHc6WPwJgDfH/cmHKnol7QyKG4Nw9DHI/gHUSfgpAeR28hR3SmvWKKJEe8vqXAGSqOo+cBYBzlx+o7nR6hb3RGAB6an2qA8CcGLOfXtDpcQloBEC46i04a/Ka8hQAv9P7eJZ0fQA1KZMFbwdAg5IhRrrX0zznx33Dm9nxYFQGiDCpARzkjcDCLvx/CJG3kLuByWatyue9fN8LyiiG01ggMKjIdiENK4882w/5vo15LpZcskDKhvny0SVKTu4lmQMiu5o4UA+BaWnST6PkGdMHtvmS60w6GjpuSEiGlv3dScaWz5sOZSwcn5KMBZzk7/AjWn1mhuDhhkeKRlKPjtaWjI7GInIyDRrd4wUAkUXO4XPviyHDGAWsR2fkoYsxHqgh66UrgIZQzoFGe14D0P5fTvGQWJ3Y3UJIHvCaFoeaeUEvEt7s/zoOIPQoiFoSD3LSYq75bhzapx/YeDv3U7yIXpT/B/MhcUAFFdoTSlZFGa/Q4QWOBcADjs2KnnONzfctgAgUTQAoXK22QD0ExCmRLI7DGYr4PsUB0z7/z4//S5Il8vW8IM5zcpxIggaFF/x4A+1xOldekk1KI2k1GRnI7zzmKwBMxIa0ZBFgQFzUABIXtCY14pIMgSJhAQChq2LCkg/SELCAE7vCxxr6wUpgKQDGlMGkQXiYMoON603oKi51GIDmc4LM+262zAAQL4im7ZTpvhMAyOz3N4FIl3aL6m8xN416sqHsYq4aRlKm9OZk7kjBluSGJnIBnYCEUJwrJrmKZrOoJyfLho0/iMWHMTkeST8IYFSQsCHgAFJkRhuzQNJeoBxopJhV/P5xPYCq1L1Wprsj1jgOrAJYDVVCyJ81cqKIIgdwQREJAKn0dEGQoBIkYHoAIhfQB3cFiQ9Z/em5WEzJJucFNSa/xfnMki7SA8MCi63VIFZSWPHaVUJKLxAArsSFBS8SVm+iJOSFo9Y5k7FiBgCjIg8ux4gdEwGwRYpcYeQQePKLq2LO2+z8/fmk9/OsDp0FkGfOWVYHGgdLxIlJU1l3jAN5Hm2XIxvd+6nZJIDIgZZqEaby6iqux0qtD4jqcaMc4JWEsEzp4khYhJ0FIKrpsIvTQ3smK9h6I00gpLC+eLABzAOQgf5TAIrO/i0A6fIGsAyAlw0wo0OuaAL52tUsgFUglwFcBfIxAKtAPg5gFshtAEaB3A6gB0S/fHjRvUbdFn2CmFpLDCcTb1GsFChwrGtCrIP51f3zqzvSQwDcqjeKch3f96rUXQDhJV9SZgvvC7FFrDQPWbBAVrOx7scBnGBHS7Xs+WKCkWbtoIvb+aWnGXYir3LxVzYUCd1awv1lutVX+v7AwuUGsAFsABvABrABbAAbwAawAWwAG8AGsAFsAD/e/gkwACB6MbZrXw3eAAAAAElFTkSuQmCC'
		}

	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.assets);

});




