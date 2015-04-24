// keyboard
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.keyboard = {
		initialize : function(sm) {
			sm.state.updaters.push(Spielmatrix.keyboard.update);
			kd.UP.press(   Spielmatrix.keyboard.keyevent.bind(null, sm, true, 'UP'));
			kd.DOWN.press( Spielmatrix.keyboard.keyevent.bind(null, sm, true, 'DOWN'));
			kd.LEFT.press( Spielmatrix.keyboard.keyevent.bind(null, sm, true, 'LEFT'));
			kd.RIGHT.press(Spielmatrix.keyboard.keyevent.bind(null, sm, true, 'RIGHT'));
			kd.UP.up(      Spielmatrix.keyboard.keyevent.bind(null, sm, false, 'UP'));
			kd.DOWN.up(    Spielmatrix.keyboard.keyevent.bind(null, sm, false, 'DOWN'));
			kd.LEFT.up(    Spielmatrix.keyboard.keyevent.bind(null, sm, false, 'LEFT'));
			kd.RIGHT.up(   Spielmatrix.keyboard.keyevent.bind(null, sm, false, 'RIGHT'));
		},
		
		keyevent : function(sm, down, key) {
			if (down && sm.keydown) {
				sm.keydown(key);
			}
			if (!down && sm.keyup) {
				sm.keyup(key);
			}
		},

		update : function(sm, data) {
			kd.tick();
		}
	};
});
