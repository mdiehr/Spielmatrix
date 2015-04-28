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
			url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAABLxJREFUeNrsWouSozAMU/7/p29mu5RYlkxCG7ibgxm625YSEb9lo+0HsL32Z3j9OfH64P1NuGz2wDEAvFbMwOgP/X4IEWAB4Pfob7NdoNd335frix3o3wFyQfBdwk/ewBGu5Pfb9cXmIC7d/U93PrkDb63yX78fSSonI3A6wECi6h6LoLtyV0qBwD6wBrDBaMuPWhKQShZl2WvX/jm/b0nHtLFhl8xLCZXDSfaOKNHqnBHBjxm+LCbiZLViZQxqbDxndlfZPH4BgLUoGHx++kJkGFOB3qIzcnpE9gdOZFbf7A78+gEZdOST1wC8/Rs/wFYAdLJWUS9pu7eaxqJWVnDkCRfbv/IDtxxI9jugyWUsYv1p9fNFPwCSnNSBoNZ+p3OQJDPuPCGUnQcgZYa035B2gDK2PcHpTtiFsgnuK9Xmt1/fhgEUfj37+SwCDSDlrGgKALtSsF0nv5CVTfkN/nx7oc/xgZnDBb8Zs17qiFRQPQPgpJ/aBbItw3XE5gcKHUAfI2TRIj4nO3ZZMxA9oc9utNm9TQgpb6DoHkURgx7gFyat108Kn467HYh+QYlAJ9DJ3FRSCpORQeZouwhUEAlbhxaU453QiWKV8gnA5RHNAPjc6qasSlXHEXHYYVkf5GjpXHrtCU0NuPl0lemZWNCv1Yu0O/tY0KrE0zyJTF5dChnKbfYrQP4iKzOQc88tj+Aw3QFgoGg1gPkdqEUgknSgAz4ggjM60F2ffyfzAUNIeCvQStsoNePY8PV84ItpeX7i9P5MNGyymE4XD9T7NhpKAExtGgBRw06G41aG4ybYAHEbwYLp4GHzAS5S+5hEWtsS9i4YscNx4TjlA5o5BQLTeKADZFa0pTofYL+uq4NBHejLyIqihVCxDCDnDaUOLCcIjnTA5BMsQcXc2Io87X7BII0mNIcAwo4uBOBpMZX+XAlAmTw3RJJlCgDimlIEhfPUUWUZgEIHoFpDZwGMMJgjAJDNTAMAlEEKANrtjwNwWhuro4QKZscgahbJty4CgPUAnMc0xGYJAPYYACCbkdAtwKsAMGdmOS3RhGmqlBgC0FdYo8XyKgDtXgATdIH2A8/8wDM/8MwPPPMDz/zAMz/wzA/8z/MDN/ULVIv10n4BsdeX9wsS7391v2Co0F3aL6jmB67pFxxQtU+/4IPu+dj8wLJ+wfj8wKJ+wfj8wJJ+wdz8wIJ+wcz8wKJ+wYn5ge/2C0bnB24wfVg+b2qMQZH2FcEhaStms6vUMpe7cwAMzygIE8OxTwBAzOoFt8hpws5IJC7XkNeCF5C7FZdVhdYBAC8KNz5oqiCzM8M6cATAsZcpI+c85UgHJqzgWHnFzhyB/i6AFKJ13yCyztLGTJ8hsh6mdWsYf9HXSDRdlKMZ8SRdcgDS1hhazXHvOVNSzbKmopMqu0cBALAVFBOFZn6AJyY9ADHeB8gMSLYL7fwAMeoJQGxuCFeWitRZHSA/zL4suFH9fKSEgj0v2vexpwMcR2DZkzfXSwZVKaG8+6fzA8jp56XzAwHvDe17sV83AGjtzvmBlC1dPD+gGuRXzg8IC7x2fgDtQwD/XPv+754fmATw3fZ9VYhdCeC++QHXJr2qfV+Xc38hgD8CDAAf+Stw2I620QAAAABJRU5ErkJggg=='
		}

	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.assets);

});




