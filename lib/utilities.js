// utilities
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	// UTILITY FUNCTIONS

	var createObj = Spielmatrix.createObj = function(base, props) {
		var inst;
		if (Object.create) {
			inst = Object.create(base);
		} else {
			nothing.prototype = base;
			inst = new nothing();
		}
		if (props) copyObj(props, inst);
		return inst;
	};

	var copyObj = Spielmatrix.copyObj = function(obj, target, overwrite) {
		if (!target) target = {};
		for (var prop in obj)
			if (obj.hasOwnProperty(prop) && (overwrite !== false || !target.hasOwnProperty(prop)))
				target[prop] = obj[prop];
		return target;
	}

});
