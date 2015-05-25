// audio
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";
	Spielmatrix.audio = {
		initialize : function(sm) {
			for (var i = 0, imax = this.soundNames.length; i < imax; ++i) {
				var name = this.soundNames[i];
				this.sounds[name] = new Howl({
					src : this.getUrls(name)
				});
			}
		},

		play : function(sm, name) {
			var sound = this.sounds[name];
			if (sound) {
				sound.play();
			}
		},

		getUrls : function(name) {
			var urls = [];
			for (var i = 0, imax = this.formats.length; i < imax; ++i) {
				urls.push([this.path, name, '.', this.formats[i]].join(''));
			}
			return urls;
		},

		path : './sounds/',
		formats : ['wav'],
		soundNames : [
			'Appear',
			'Blip_Select14',
			'Blip_Select16',
			'Blip_Select4',
			'Blip_Select9',
			'Dead',
			'Explosion13',
			'Explosion3',
			'Explosion8',
			'Export',
			'Hit_Hurt2',
			'Hit_Hurt8',
			'Jump32',
			'Jump6',
			'Laser_Shoot20',
			'Laser_Shoot28',
			'Modem',
			'Pickup_Coin25',
			'Pickup_Coin31',
			'Powerup10',
			'Powerup15',
			'Powerup18',
			'Randomize28',
			'UhOh',
			'Yarp',
			'Zap'
		],
		sounds : {}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.audio);

});
