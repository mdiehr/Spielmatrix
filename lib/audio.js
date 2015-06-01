// audio
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";
	Spielmatrix.audio = {
		initialize : function(sm) {
			// Preload all sounds
			if (sm.options.preloadSounds) {
				for (var i = 0, imax = this.soundNames.length; i < imax; ++i) {
					var name = this.soundNames[i];
					this.sounds[name] = new Howl({
						src : this.getUrls(name)
					});
				}
			}
		},

		play : function(sm, name) {
			var sound = this.sounds[name];
			if (sound) {
				sound.play();
			} else {
				sound = new Howl({src : this.getUrls(name)});
				this.sounds[name] = sound;
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
		formats : ['ogg', 'mp3'],
		soundNames : [
			'Appear',
			'Blip1',
			'Blip2',
			'Blip3',
			'Blip4',
			'Coin1',
			'Coin2',
			'Coin3',
			'Explosion1',
			'Explosion2',
			'Explosion3',
			'Export',
			'Hit1',
			'Hit2',
			'Jump1',
			'Jump2',
			'Laser1',
			'Laser2',
			'Laser3',
			'Modem',
			'Powerup1',
			'Powerup2',
			'Powerup3',
			'UhOh1',
			'UhOh2',
			'UhOh3',
			'Yarp'
		],
		sounds : {}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.audio);

});
