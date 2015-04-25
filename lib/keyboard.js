// keyboard
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.keyboard = {
		initialize : function(sm) {
			sm.state.updaters.push(Spielmatrix.keyboard.update);

			// Register every key available in keydrown
			for (var prop in kd) {
				if (kd.hasOwnProperty(prop)) {
					if (kd[prop] instanceof kd.Key) {
						kd[prop].press(Spielmatrix.keyboard.keyEvent.bind(null, sm, true, prop));
						kd[prop].up(Spielmatrix.keyboard.keyEvent.bind(null, sm, false, prop));
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
});
