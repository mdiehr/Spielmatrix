// utilities
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	// UTILITY FUNCTIONS

	function Nothing() {}

	Spielmatrix.createObj = function(base, props) {
		var inst;
		if (Object.create) {
			inst = Object.create(base);
		} else {
			Nothing.prototype = base;
			inst = new Nothing();
		}
		if (props) Spielmatrix.copyObj(props, inst);
		return inst;
	};

	Spielmatrix.copyObj = function(obj, target, overwrite) {
		if (!target) target = {};
		for (var prop in obj)
			if (obj.hasOwnProperty(prop) && (overwrite !== false || !target.hasOwnProperty(prop)))
				target[prop] = obj[prop];
		return target;
	};

	// TIMING

	Spielmatrix.getMS = function() {
		return (new Date()).getMilliseconds();
	};

	// LOGGING

	Spielmatrix.log = function(obj) {
		console.log(obj);
	};

	Spielmatrix.error = function(obj) {
		console.error(obj);
	};

});
