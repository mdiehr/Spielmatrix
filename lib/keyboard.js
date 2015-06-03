// keyboard
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.keyboard = {
		initialize : function(sm) {
			// Register every key available in keydrown
			for (var prop in kd) {
				if (kd.hasOwnProperty(prop)) {
					if (kd[prop] instanceof kd.Key) {
						// TODO: This overwrites every other bound SM instance with this one
						kd[prop].press(Spielmatrix.keyboard.keyEvent.bind(null, sm, true, prop));
						kd[prop].up(Spielmatrix.keyboard.keyEvent.bind(null, sm, false, prop));
					}
				}
			}
		},

		shutdown : function(sm) {
			Spielmatrix.log('Shutting down keyboard module.');
			for (var prop in kd) {
				if (kd.hasOwnProperty(prop)) {
					if (kd[prop] instanceof kd.Key) {
						// TODO: This unbinds the kb events of every SM instance
						kd[prop].unbindPress();
						kd[prop].unbindUp();
					}
				}
			}
		},

		keyEvent : function(sm, down, key) {
			if (down && sm.options.keydown) {
				sm.options.keydown(key);
			}
			if (!down && sm.options.keyup) {
				sm.options.keyup(key);
			}
		},

		isKeyDown : function(key) {
			return kd.isDown(key);
		},

		isKeyUp : function(key) {
			return !kd.isDown(key);
		},

		update : function(sm, data) {
			// Let keydrown process the keys
			kd.tick();
		}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.keyboard);

});
