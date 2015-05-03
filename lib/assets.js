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
			url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAABQZJREFUeNrsWguyozAMU+5/6Z19ryW2JTsxLe3ODsy0QKGg2PI3wZgboPfxetxW/8u2n/vwAQAIB+6+DwCYp79HwOMXDwCPzRzy5m/Nz+3z4hPmnV8CYAXx93IhypWIVypJVDB3PwK5HsB5Er4LQHkd+g6r0pr1GVEiPdLrHwLAVHUW2QWAueMXZk+aVmEftAdAnlqbWgAwJ0bs0woWIy4B7QAIV70EuyKvKS8B6Cc9j7ukWwOoSUkSvByAdEqGGPSsX/HMj/uGF7PjwW4akLjJHMBB3ggs7ML/txB5CbkHmGg2qni+ivcrp4xCnUYCgUFFtAthOLPIef+W7Vuf53zJSxKgaMiXjyFJcmorYQ4k0dX4gVoF5k4TfoYkz15+YG8/ZTpNQ8PCDAXJMNjeXco4+Hzkrky545mSKYdD9g6v0erTUcGPGR4hGpQ9OlpbMjoaJ55T5aDRPB4AEFnkDJ5HX6gMexSwFs3IwxCjP8hUtgpXgHShmgNDjrwGkNt/WeKBWE3sHsElb1jNiKpWVrDyhBfbf+4HEEYUklrhDzhoKdN83hzupx+Uvp35ZbyIVsT/g/kIP5A5FTkSSdaMMj5Dh09wLADtcGxU9Jwbqt63ACJQjARAYWq1BGoVCKMESRyHMRT+vcUBcz//z+v/kZIR+VZWEOsc9hOU0KCwgi9vkCOm88xKWKTSk1bFyEZ81z4/A6CS2BCWLAJsJBc1AOJCnpOa5FKoICNhAQBhqEnBwgekAuVw4lC0rpG/OEuwMgBGlEGkIfEwbQbr10eSV+lURwEYPiakcd9VywqAsIIo2kWb7jMOQFS/33FEeWu36P4WtWnMJwfKIXLXMJKSwptLc3catiI2jCQWyAIkuGLumHAXzUZRT04VDYd+kfIPe+l4JP0mgN2ERKlAAyDPjLEnAcq9IDkwRDOr+P3t+QCqVve5Nt0VvsZx4CyAs64qSeRnj1xkRJEDeCEjSgBQ6+mFhARVQgKVDyCJBfLFy4TEu6x1eZ5MprDIdUNNpd/JeWdKF/TCMMFiezWInRTVvHadkNIKEgCv+IUTVpRIfSQtIZ845nlO01d0ACgqaudyaOwoBBCv+6q0hqCDX5wVc9Zm6/ffNz3fF35uAeDKmdPqQOMgCczOENz6AQ1lxQGuo+105JD7EecNOwAiBwb1Ikzn1Sv7OVM734yQE1YQMg7oTkKYpnR+xGumDSDppsNOTm/tVVqh5htlABGN9faBnZ27AXQApI7+XQCKwf5bAOjyDeA0AN02QCcPeSUnSJddhR6C89szumPUCybWwDcAmDrCNxq5smwA2QcwR45h43kmrjaQvgScCtYjXK1R6nNAqqALpMEBlXL25/5XyzQJwKvmtWu25dqkkGLFFZHJGqBeH0Is4TDmNkIRGrvRfnZ/fmG/OKpYDzffl7fr9H7VpSYActktTTiCyvNyKlf7+03Wi/qCu+I5AAA7xWO9jCcrMKhqh5zc5kVPcr5AOxS3FlMXnW7kTEI3l3B9m+7skj6whNXij1gI1a0XNMblCtahJhq5NbfRKUFLcngQAeZbT75Vi9RcFdcCgCcXTQsB7IdMx2OolUrnARwSeIx8aAkUU6HUxruEA64XIucVjdniAivgFhCyRbVNAG91BGem7b673QBuADeAG8AN4AZwA/h/AHDJjqot0u/rtYGICvcjAFIgSHB8SMe5av5bAF9TwddIeNYM/wgwAPgEL2OdLRvSAAAAAElFTkSuQmCC'
		}

	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.assets);

});




