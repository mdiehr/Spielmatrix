// signal
// by Mark Diehr
// https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	eventMixin(Spielmatrix);

	// EVENT HANDLING

	// Lightweight event framework. on/off also work on DOM nodes,
	// registering native DOM handlers.

	var on = Spielmatrix.on = function(emitter, type, f) {
		if (emitter.addEventListener)
			emitter.addEventListener(type, f, false);
		else if (emitter.attachEvent)
			emitter.attachEvent("on" + type, f);
		else {
			var map = emitter._handlers || (emitter._handlers = {});
			var arr = map[type] || (map[type] = []);
			arr.push(f);
		}
	};

	var off = Spielmatrix.off = function(emitter, type, f) {
		if (emitter.removeEventListener)
			emitter.removeEventListener(type, f, false);
		else if (emitter.detachEvent)
			emitter.detachEvent("on" + type, f);
		else {
			var arr = emitter._handlers && emitter._handlers[type];
			if (!arr) return;
			for (var i = 0; i < arr.length; ++i)
				if (arr[i] == f) {
					arr.splice(i, 1);
					break;
				}
		}
	};

	var signal = Spielmatrix.signal = function(emitter, type /*, values...*/ ) {
		var arr = emitter._handlers && emitter._handlers[type];
		if (!arr) return;
		var args = Array.prototype.slice.call(arguments, 2);
		for (var i = 0; i < arr.length; ++i) arr[i].apply(null, args);
	};

	var orphanDelayedCallbacks = null;

	// Often, we want to signal events at a point where we are in the
	// middle of some work, but don't want the handler to start calling
	// other methods on the editor, which might be in an inconsistent
	// state or simply not expect any other events to happen.
	// signalLater looks whether there are any handlers, and schedules
	// them to be executed when the last operation ends, or, if no
	// operation is active, when a timeout fires.
	function signalLater(emitter, type /*, values...*/ ) {
		var arr = emitter._handlers && emitter._handlers[type];
		if (!arr) return;
		var args = Array.prototype.slice.call(arguments, 2),
			list;
		if (operationGroup) {
			list = operationGroup.delayedCallbacks;
		} else if (orphanDelayedCallbacks) {
			list = orphanDelayedCallbacks;
		} else {
			list = orphanDelayedCallbacks = [];
			setTimeout(fireOrphanDelayed, 0);
		}

		function bnd(f) {
			return function() {
				f.apply(null, args);
			};
		};
		for (var i = 0; i < arr.length; ++i)
			list.push(bnd(arr[i]));
	}

	function fireOrphanDelayed() {
		var delayed = orphanDelayedCallbacks;
		orphanDelayedCallbacks = null;
		for (var i = 0; i < delayed.length; ++i) delayed[i]();
	}

	function hasHandler(emitter, type) {
		var arr = emitter._handlers && emitter._handlers[type];
		return arr && arr.length > 0;
	}

	// Add on and off methods to a constructor's prototype, to make
	// registering events on such objects more convenient.
	function eventMixin(ctor) {
		ctor.prototype.on = function(type, f) {
			on(this, type, f);
		};
		ctor.prototype.off = function(type, f) {
			off(this, type, f);
		};
	}
});
