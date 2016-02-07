(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// assets
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.assets = {
		initialize : function(sm) {
			Spielmatrix.assets.initializeAsset(Spielmatrix.assets.petscii);
		},

		initializeAsset : function(asset) {
			asset.texture = PIXI.BaseTexture.fromImage(asset.url, false, PIXI.SCALE_MODES.NEAREST);
			var size = 8, tileHeight = 8, texWidth = 128, texHeight = 128;
			var numTilesX = Math.floor(texWidth / size);
			var numTilesY = Math.floor(texHeight / tileHeight);
			for (var y = 0; y < numTilesY; ++y ) {
				for (var x = 0; x < numTilesX; ++x ) {
					var tex = new PIXI.Texture(asset.texture, new PIXI.Rectangle(x*size, y*size,size,size));
					asset.glyphs.push(tex);
				}
			}
		},

		petscii : {
			texture : null,
			glyphs : [],
			tileSize : 8,
			w : 16,
			h : 16,
			url : 'data:image/png;base64,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',
			EMPTY : 0x00,
			FILLED : 0xFF,
		}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.assets);

});

},{}],2:[function(require,module,exports){
// audio
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";
	Spielmatrix.audio = {
		initialize : function(sm) {

			// Preload all sounds
			if (typeof sm.options.preloadSounds === 'object') {
				for (var i = 0, imax = sm.options.preloadSounds.length; i < imax; ++i) {
					var name = sm.options.preloadSounds[i];
					if (typeof name === 'string') {
						this.sounds[name] = new Howl({
							src : this.getUrls(sm, name)
						});
					}
				}
			}
		},

		play : function(sm, name, volume) {
			volume = volume === undefined ? 0.25 : volume;
			var sound = this.sounds[name];
			if (!sound) {
				sound = new Howl({src : this.getUrls(sm, name)});
				this.sounds[name] = sound;
			}
			sound.volume(volume).play();
		},

		getUrls : function(sm, name) {
			var urls = [];
			for (var i = 0, imax = this.formats.length; i < imax; ++i) {
				urls.push([sm.options.audioPath, name, '.', this.formats[i]].join(''));
			}
			return urls;
		},

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

},{}],3:[function(require,module,exports){
/*! howler.js v2.0.0-beta | (c) 2013-2015, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
!function(){"use strict";function e(){try{"undefined"!=typeof AudioContext?n=new AudioContext:"undefined"!=typeof webkitAudioContext?n=new webkitAudioContext:o=!1}catch(e){o=!1}if(!o)if("undefined"!=typeof Audio)try{new Audio}catch(e){t=!0}else t=!0}var n=null,o=!0,t=!1;if(e(),o){var r="undefined"==typeof n.createGain?n.createGainNode():n.createGain();r.gain.value=1,r.connect(n.destination)}var d=function(){this.init()};d.prototype={init:function(){var e=this||u;return e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e.iOSAutoEnable=!0,e.noAudio=t,e.usingWebAudio=o,e.ctx=n,t||e._setupCodecs(),e},volume:function(e){var n=this||u;if(e=parseFloat(e),"undefined"!=typeof e&&e>=0&&1>=e){n._volume=e,o&&(r.gain.value=e);for(var t=0;t<n._howls.length;t++)if(!n._howls[t]._webAudio)for(var d=n._howls[t]._getSoundIds(),a=0;a<d.length;a++){var i=n._howls[t]._soundById(d[a]);i&&i._node&&(i._node.volume=i._volume*e)}return n}return n._volume},mute:function(e){var n=this||u;n._muted=e,o&&(r.gain.value=e?0:n._volume);for(var t=0;t<n._howls.length;t++)if(!n._howls[t]._webAudio)for(var d=n._howls[t]._getSoundIds(),a=0;a<d.length;a++){var i=n._howls[t]._soundById(d[a]);i&&i._node&&(i._node.muted=e?!0:i._muted)}return n},codecs:function(e){return(this||u)._codecs[e]},_setupCodecs:function(){var e=this||u,n=new Audio,o=n.canPlayType("audio/mpeg;").replace(/^no$/,"");return e._codecs={mp3:!(!o&&!n.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!o,opus:!!n.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!n.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!n.canPlayType("audio/aac;").replace(/^no$/,""),m4a:!!(n.canPlayType("audio/x-m4a;")||n.canPlayType("audio/m4a;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(n.canPlayType("audio/x-mp4;")||n.canPlayType("audio/mp4;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),webm:!!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")},e},_enableiOSAudio:function(){var e=this||u;if(!n||!e._iOSEnabled&&/iPhone|iPad|iPod/i.test(navigator.userAgent)){e._iOSEnabled=!1;var o=function(){var t=n.createBuffer(1,1,22050),r=n.createBufferSource();r.buffer=t,r.connect(n.destination),"undefined"==typeof r.start?r.noteOn(0):r.start(0),setTimeout(function(){(r.playbackState===r.PLAYING_STATE||r.playbackState===r.FINISHED_STATE)&&(e._iOSEnabled=!0,e.iOSAutoEnable=!1,window.removeEventListener("touchstart",o,!1))},0)};return window.addEventListener("touchstart",o,!1),e}}};var u=new d,a=function(e){var n=this;return e.src&&0!==e.src.length?void n.init(e):void console.error("An array of source files must be passed with any new Howl.")};a.prototype={init:function(e){var t=this;return t._autoplay=e.autoplay||!1,t._ext=e.ext||null,t._html5=e.html5||!1,t._muted=e.mute||!1,t._loop=e.loop||!1,t._pool=e.pool||5,t._preload="boolean"==typeof e.preload?e.preload:!0,t._rate=e.rate||1,t._sprite=e.sprite||{},t._src="string"!=typeof e.src?e.src:[e.src],t._volume=void 0!==e.volume?e.volume:1,t._duration=0,t._loaded=!1,t._sounds=[],t._endTimers={},t._onend=e.onend?[{fn:e.onend}]:[],t._onfaded=e.onfaded?[{fn:e.onfaded}]:[],t._onload=e.onload?[{fn:e.onload}]:[],t._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],t._onpause=e.onpause?[{fn:e.onpause}]:[],t._onplay=e.onplay?[{fn:e.onplay}]:[],t._webAudio=o&&!t._html5,"undefined"!=typeof n&&n&&u.iOSAutoEnable&&u._enableiOSAudio(),u._howls.push(t),t._preload&&t.load(),t},load:function(){var e=this,n=null;if(t)return void e._emit("loaderror");"string"==typeof e._src&&(e._src=[e._src]);for(var o=0;o<e._src.length;o++){var r,d;if(e._ext&&e._ext[o]?r=e._ext[o]:(d=e._src[o],r=/^data:audio\/([^;,]+);/i.exec(d),r||(r=/\.([^.]+)$/.exec(d.split("?",1)[0])),r&&(r=r[1].toLowerCase())),u.codecs(r)){n=e._src[o];break}}return n?(e._src=n,new i(e),e._webAudio&&s(e),e):void e._emit("loaderror")},play:function(e){var o=this,t=arguments,r=null;if("number"==typeof e)r=e,e=null;else if("undefined"==typeof e){e="__default";for(var d=0,a=0;a<o._sounds.length;a++)o._sounds[a]._paused&&!o._sounds[a]._ended&&(d++,r=o._sounds[a]._id);1===d?e=null:r=null}var i=r?o._soundById(r):o._inactiveSound();if(!i)return null;if(r&&!e&&(e=i._sprite||"__default"),!o._loaded&&!o._sprite[e])return o.once("load",function(){o.play(o._soundById(i._id)?i._id:void 0)}),i._id;if(r&&!i._paused)return i._id;var _=i._seek>0?i._seek:o._sprite[e][0]/1e3,s=(o._sprite[e][0]+o._sprite[e][1])/1e3-_,l=function(){var t=!(!i._loop&&!o._sprite[e][2]);o._emit("end",i._id),!o._webAudio&&t&&o.stop(i._id).play(i._id),o._webAudio&&t&&(o._emit("play",i._id),i._seek=i._start||0,i._playStart=n.currentTime,o._endTimers[i._id]=setTimeout(l,1e3*(i._stop-i._start)/Math.abs(o._rate))),o._webAudio&&!t&&(i._paused=!0,i._ended=!0,i._seek=i._start||0,o._clearTimer(i._id),i._node.bufferSource=null),o._webAudio||t||o.stop(i._id)};o._endTimers[i._id]=setTimeout(l,1e3*s/Math.abs(o._rate)),i._paused=!1,i._ended=!1,i._sprite=e,i._seek=_,i._start=o._sprite[e][0]/1e3,i._stop=(o._sprite[e][0]+o._sprite[e][1])/1e3,i._loop=!(!i._loop&&!o._sprite[e][2]);var f=i._node;if(o._webAudio){var c=function(){o._refreshBuffer(i);var e=i._muted||o._muted?0:i._volume*u.volume();f.gain.setValueAtTime(e,n.currentTime),i._playStart=n.currentTime,"undefined"==typeof f.bufferSource.start?i._loop?f.bufferSource.noteGrainOn(0,_,86400):f.bufferSource.noteGrainOn(0,_,s):i._loop?f.bufferSource.start(0,_,86400):f.bufferSource.start(0,_,s),o._endTimers[i._id]||(o._endTimers[i._id]=setTimeout(l,1e3*s/Math.abs(o._rate))),t[1]||setTimeout(function(){o._emit("play",i._id)},0)};o._loaded?c():(o.once("load",c),o._clearTimer(i._id))}else{var p=function(){f.currentTime=_,f.muted=i._muted||o._muted||u._muted||f.muted,f.volume=i._volume*u.volume(),f.playbackRate=o._rate,setTimeout(function(){f.play(),t[1]||o._emit("play",i._id)},0)};if(4===f.readyState||!f.readyState&&navigator.isCocoonJS)p();else{var m=function(){o._endTimers[i._id]=setTimeout(l,1e3*s/Math.abs(o._rate)),p(),f.removeEventListener("canplaythrough",m,!1)};f.addEventListener("canplaythrough",m,!1),o._clearTimer(i._id)}}return i._id},pause:function(e){var n=this;if(!n._loaded)return n.once("play",function(){n.pause(e)}),n;for(var o=n._getSoundIds(e),t=0;t<o.length;t++){n._clearTimer(o[t]);var r=n._soundById(o[t]);if(r&&!r._paused){if(r._seek=n.seek(o[t]),r._paused=!0,n._webAudio){if(!r._node.bufferSource)return n;"undefined"==typeof r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),r._node.bufferSource=null}else isNaN(r._node.duration)||r._node.pause();arguments[1]||n._emit("pause",r._id)}}return n},stop:function(e){var n=this;if(!n._loaded)return"undefined"!=typeof n._sounds[0]._sprite&&n.once("play",function(){n.stop(e)}),n;for(var o=n._getSoundIds(e),t=0;t<o.length;t++){n._clearTimer(o[t]);var r=n._soundById(o[t]);if(r&&!r._paused)if(r._seek=r._start||0,r._paused=!0,r._ended=!0,n._webAudio&&r._node){if(!r._node.bufferSource)return n;"undefined"==typeof r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),r._node.bufferSource=null}else r._node&&!isNaN(r._node.duration)&&(r._node.pause(),r._node.currentTime=r._start||0)}return n},mute:function(e,o){var t=this;if(!t._loaded)return t.once("play",function(){t.mute(e,o)}),t;if("undefined"==typeof o){if("boolean"!=typeof e)return t._muted;t._muted=e}for(var r=t._getSoundIds(o),d=0;d<r.length;d++){var a=t._soundById(r[d]);a&&(a._muted=e,t._webAudio&&a._node?a._node.gain.setValueAtTime(e?0:a._volume*u.volume(),n.currentTime):a._node&&(a._node.muted=u._muted?!0:e))}return t},volume:function(){var e,o,t=this,r=arguments;if(0===r.length)return t._volume;if(1===r.length){var d=t._getSoundIds(),a=d.indexOf(r[0]);a>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var i;if(!("undefined"!=typeof e&&e>=0&&1>=e))return i=o?t._soundById(o):t._sounds[0],i?i._volume:0;if(!t._loaded)return t.once("play",function(){t.volume.apply(t,r)}),t;"undefined"==typeof o&&(t._volume=e),o=t._getSoundIds(o);for(var _=0;_<o.length;_++)i=t._soundById(o[_]),i&&(i._volume=e,t._webAudio&&i._node?i._node.gain.setValueAtTime(e*u.volume(),n.currentTime):i._node&&(i._node.volume=e*u.volume()));return t},fade:function(e,o,t,r){var d=this;if(!d._loaded)return d.once("play",function(){d.fade(e,o,t,r)}),d;d.volume(e,r);for(var u=d._getSoundIds(r),a=0;a<u.length;a++){var i=d._soundById(u[a]);if(i)if(d._webAudio){var _=n.currentTime,s=_+t/1e3;i._volume=e,i._node.gain.setValueAtTime(e,_),i._node.gain.linearRampToValueAtTime(o,s),setTimeout(function(e,t){setTimeout(function(){t._volume=o,d._emit("faded",e)},s-n.currentTime>0?Math.ceil(1e3*(s-n.currentTime)):0)}.bind(d,u[a],i),t)}else{var l=Math.abs(e-o),f=e>o?"out":"in",c=l/.01,p=t/c;!function(){var n=e,t=setInterval(function(e){n+="in"===f?.01:-.01,n=Math.max(0,n),n=Math.min(1,n),n=Math.round(100*n)/100,d.volume(n,e),n===o&&(clearInterval(t),d._emit("faded",e))}.bind(d,u[a]),p)}()}}return d},loop:function(){var e,n,o,t=this,r=arguments;if(0===r.length)return t._loop;if(1===r.length){if("boolean"!=typeof r[0])return o=t._soundById(parseInt(r[0],10)),o?o._loop:!1;e=r[0],t._loop=e}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var d=t._getSoundIds(n),u=0;u<d.length;u++)o=t._soundById(d[u]),o&&(o._loop=e,t._webAudio&&o._node&&(o._node.bufferSource.loop=e));return t},seek:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var d=t._getSoundIds(),u=d.indexOf(r[0]);u>=0?o=parseInt(r[0],10):(o=t._sounds[0]._id,e=parseFloat(r[0]))}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));if("undefined"==typeof o)return t;if(!t._loaded)return t.once("load",function(){t.seek.apply(t,r)}),t;var a=t._soundById(o);if(a){if(!(e>=0))return t._webAudio?a._seek+t.playing(o)?n.currentTime-a._playStart:0:a._node.currentTime;var i=t.playing(o);i&&t.pause(o,!0),a._seek=e,t._clearTimer(o),i&&t.play(o,!0)}return t},playing:function(e){var n=this,o=n._soundById(e)||n._sounds[0];return o?!o._paused:!1},duration:function(){return this._duration},unload:function(){for(var e=this,n=e._sounds,o=0;o<n.length;o++){n[o]._paused||(e.stop(n[o]._id),e._emit("end",n[o]._id)),e._webAudio||(n[o]._node.src="",n[o]._node.removeEventListener("error",n[o]._errorFn,!1),n[o]._node.removeEventListener("canplaythrough",n[o]._loadFn,!1)),delete n[o]._node,e._clearTimer(n[o]._id);var t=u._howls.indexOf(e);t>=0&&u._howls.splice(t,1)}return _&&delete _[e._src],e=null,null},on:function(e,n,o){var t=this,r=t["_on"+e];return"function"==typeof n&&r.push({id:o,fn:n}),t},off:function(e,n,o){var t=this,r=t["_on"+e];if(n){for(var d=0;d<r.length;d++)if(n===r[d].fn&&o===r[d].id){r.splice(d,1);break}}else r=[];return t},once:function(e,n,o){var t=this,r=function(){n.apply(t,arguments),t.off(e,r,o)};return t.on(e,r,o),t},_emit:function(e,n,o){for(var t=this,r=t["_on"+e],d=0;d<r.length;d++)r[d].id&&r[d].id!==n||setTimeout(function(e){e.call(this,n,o)}.bind(t,r[d].fn),0);return t},_clearTimer:function(e){var n=this;return n._endTimers[e]&&(clearTimeout(n._endTimers[e]),delete n._endTimers[e]),n},_soundById:function(e){for(var n=this,o=0;o<n._sounds.length;o++)if(e===n._sounds[o]._id)return n._sounds[o];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new i(e)},_drain:function(){var e=this,n=e._pool,o=0,t=0;if(!(e._sounds.length<n)){for(t=0;t<e._sounds.length;t++)e._sounds[t]._ended&&o++;for(t=e._sounds.length-1;t>=0;t--){if(n>=o)return;e._sounds[t]._ended&&(e._webAudio&&e._sounds[t]._node&&e._sounds[t]._node.disconnect(0),e._sounds.splice(t,1),o--)}}},_getSoundIds:function(e){var n=this;if("undefined"==typeof e){for(var o=[],t=0;t<n._sounds.length;t++)o.push(n._sounds[t]._id);return o}return[e]},_refreshBuffer:function(e){var o=this;return e._node.bufferSource=n.createBufferSource(),e._node.bufferSource.buffer=_[o._src],e._node.bufferSource.connect(e._panner?e._panner:e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop),e._node.bufferSource.playbackRate.value=o._rate,o}};var i=function(e){this._parent=e,this.init()};if(i.prototype={init:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._muted=n._muted,e._seek=0,e._paused=!0,e._ended=!0,e._id=Math.round(Date.now()*Math.random()),n._sounds.push(e),e.create(),e},create:function(){var e=this,o=e._parent,t=u._muted||e._muted||e._parent._muted?0:e._volume*u.volume();return o._webAudio?(e._node="undefined"==typeof n.createGain?n.createGainNode():n.createGain(),e._node.gain.setValueAtTime(t,n.currentTime),e._node.paused=!0,e._node.connect(r)):(e._node=new Audio,e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener("canplaythrough",e._loadFn,!1),e._node.src=o._src,e._node.preload="auto",e._node.volume=t,e._node.load()),e},reset:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._muted=n._muted,e._seek=0,e._paused=!0,e._ended=!0,e._sprite=null,e._id=Math.round(Date.now()*Math.random()),e},_errorListener:function(){var e=this;e._node.error&&4===e._node.error.code&&(u.noAudio=!0),e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorListener,!1)},_loadListener:function(){var e=this,n=e._parent;n._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(n._sprite).length&&(n._sprite={__default:[0,1e3*n._duration]}),n._loaded||(n._loaded=!0,n._emit("load")),n._autoplay&&n.play(),e._node.removeEventListener("canplaythrough",e._loadFn,!1)}},o)var _={},s=function(e){var n=e._src;if(_[n])return e._duration=_[n].duration,void c(e);if(/^data:[^;]+;base64,/.test(n)){window.atob=window.atob||function(e){for(var n,o,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r=String(e).replace(/=+$/,""),d=0,u=0,a="";o=r.charAt(u++);~o&&(n=d%4?64*n+o:o,d++%4)?a+=String.fromCharCode(255&n>>(-2*d&6)):0)o=t.indexOf(o);return a};for(var o=atob(n.split(",")[1]),t=new Uint8Array(o.length),r=0;r<o.length;++r)t[r]=o.charCodeAt(r);f(t.buffer,e)}else{var d=new XMLHttpRequest;d.open("GET",n,!0),d.responseType="arraybuffer",d.onload=function(){f(d.response,e)},d.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete _[n],e.load())},l(d)}},l=function(e){try{e.send()}catch(n){e.onerror()}},f=function(e,o){n.decodeAudioData(e,function(e){e&&(_[o._src]=e,c(o,e))},function(){o._emit("loaderror")})},c=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e._emit("load")),e._autoplay&&e.play()};"function"==typeof define&&define.amd&&define("howler",function(){return{Howler:u,Howl:a}}),"undefined"!=typeof exports&&(exports.Howler=u,exports.Howl=a),"undefined"!=typeof window&&(window.HowlerGlobal=d,window.Howler=u,window.Howl=a,window.Sound=i)}();
},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
/*! keydrown - v1.1.2 - 2014-09-21 - http://jeremyckahn.github.com/keydrown */
;(function (window) {

var util = (function () {

  var util = {};

  /**
   * @param {Object} obj The Object to iterate through.
   * @param {function(*, string)} iterator The function to call for each property.
   */
  util.forEach = function (obj, iterator) {
    var prop;
    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        iterator(obj[prop], prop);
      }
    }
  };
  var forEach = util.forEach;


  /**
   * Create a transposed copy of an Object.
   *
   * @param {Object} obj
   * @return {Object}
   */
  util.getTranspose = function (obj) {
    var transpose = {};

    forEach(obj, function (val, key) {
      transpose[val] = key;
    });

    return transpose;
  };


  /**
   * Implementation of Array#indexOf because IE<9 doesn't support it.
   *
   * @param {Array} arr
   * @param {*} val
   * @return {number} Index of the found element or -1 if not found.
   */
  util.indexOf = function (arr, val) {
    if (arr.indexOf) {
      return arr.indexOf(val);
    }

    var i, len = arr.length;
    for (i = 0; i < len; i++) {
      if (arr[i] === val) {
        return i;
      }
    }

    return -1;
  };
  var indexOf = util.indexOf;


  /**
   * Push a value onto an array if it is not present in the array already.  Otherwise, this is a no-op.
   *
   * @param {Array} arr
   * @param {*} val
   * @return {boolean} Whether or not the value was added to the array.
   */
  util.pushUnique = function (arr, val) {
    if (indexOf(arr, val) === -1) {
      arr.push(val);
      return true;
    }

    return false;
  };


  /**
   * Remove a value from an array.  Assumes there is only one instance of the value present in the array.
   *
   * @param {Array} arr
   * @param {*} val
   * @return {*} The value that was removed from arr.  Returns undefined if nothing was removed.
   */
  util.removeValue = function (arr, val) {
    var index = indexOf(arr, val);

    if (index !== -1) {
      return arr.splice(index, 1)[0];
    }
  };


  /**
   * Cross-browser function for listening for and handling an event on the document element.
   *
   * @param {string} eventName
   * @param {function} handler
   */
  util.documentOn = function (eventName, handler) {
    if (window.addEventListener) {
      window.addEventListener(eventName, handler, false);
    } else if (document.attachEvent) {
      document.attachEvent('on' + eventName, handler);
    }
  };


  /**
   * Shim for requestAnimationFrame.  See: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   */
  util.requestAnimationFrame = (function () {
    return window.requestAnimationFrame  ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
  })();


  /**
   * An empty function.  NOOP!
   */
  util.noop = function () {};

  return util;

}());

/**
 * Lookup table of keys to keyCodes.
 *
 * @type {Object.<number>}
 */
var KEY_MAP = {
   'A': 65
  ,'B': 66
  ,'C': 67
  ,'D': 68
  ,'E': 69
  ,'F': 70
  ,'G': 71
  ,'H': 72
  ,'I': 73
  ,'J': 74
  ,'K': 75
  ,'L': 76
  ,'M': 77
  ,'N': 78
  ,'O': 79
  ,'P': 80
  ,'Q': 81
  ,'R': 82
  ,'S': 83
  ,'T': 84
  ,'U': 85
  ,'V': 86
  ,'W': 87
  ,'X': 88
  ,'Y': 89
  ,'Z': 90
  ,',': 188
  ,'.': 190
  ,'/': 191
  ,';': 186
  ,'\'': 222
  ,'[': 219
  ,']': 221
  ,'0': 48
  ,'1': 49
  ,'2': 50
  ,'3': 51
  ,'4': 52
  ,'5': 53
  ,'6': 54
  ,'7': 55
  ,'8': 56
  ,'9': 57
  ,'-': 189
  ,'=': 187
  ,'BACKSPACE': 8
  ,'TAB': 9
  ,'DEL': 46
  ,'NUMPAD_0': 96
  ,'NUMPAD_1': 97
  ,'NUMPAD_2': 98
  ,'NUMPAD_3': 99
  ,'NUMPAD_4': 100
  ,'NUMPAD_5': 101
  ,'NUMPAD_6': 102
  ,'NUMPAD_7': 103
  ,'NUMPAD_8': 104
  ,'NUMPAD_9': 105
  ,'NUMPAD_/': 111
  ,'NUMPAD_.': 110
  ,'NUMPAD_*': 106
  ,'NUMPAD_-': 109
  ,'NUMPAD_+': 107
  ,'ENTER': 13
  ,'SHIFT': 16
  ,'CTRL': 17
  ,'ESC': 27
  ,'SPACE': 32
  ,'LEFT': 37
  ,'UP': 38
  ,'RIGHT': 39
  ,'DOWN': 40
  ,'GRAVE': 192
  ,'PAGEUP': 33
  ,'PAGEDOWN': 34
  ,'END': 35
  ,'HOME': 36
};


/**
 * The transposed version of KEY_MAP.
 *
 * @type {Object.<string>}
 */
var TRANSPOSED_KEY_MAP = util.getTranspose(KEY_MAP);

/*!
 * @type Array.<string>
 */
var keysDown = [];

var Key = (function () {

  'use strict';

  /**
   * Represents a key on the keyboard.  You'll never actually call this method directly; Key Objects for every key that Keydrown supports are created for you when the library is initialized (as in, when the file is loaded).  You will, however, use the `prototype` methods below to bind functions to key states.
   *
   * @param {number} keyCode The keyCode of the key.
   * @constructor
   */
  function Key (keyCode) {
    this.keyCode = keyCode;
  }


  /*!
   * The function to be invoked on every tick that the key is held down for.
   *
   * @type {function}
   */
  Key.prototype._downHandler = util.noop;


  /*!
   * The function to be invoked when the key is released.
   *
   * @type {function}
   */
  Key.prototype._upHandler = util.noop;


  /*!
   * The function to be invoked when the key is pressed.
   *
   * @type {function}
   */
  Key.prototype._pressHandler = util.noop;


  /*!
   * Private helper function that binds or invokes a hander for `down`, `up', or `press` for a `Key`.
   *
   * @param {Key} key
   * @param {string} handlerName
   * @param {function=} opt_handler If omitted, the handler is invoked.
   */
  function bindOrFire (key, handlerName, opt_handler) {
    if (opt_handler) {
      key[handlerName] = opt_handler;
    } else {
      key[handlerName]();
    }
  }


  /**
   * Returns whether the key is currently pressed or not.
   *
   * @return {boolean} True if the key is down, otherwise false.
   */
  Key.prototype.isDown = function () {
    return util.indexOf(keysDown, this.keyCode) !== -1;
  };


  /**
   * Bind a function to be called when the key is held down.
   *
   * @param {function=} opt_handler The function to be called when the key is held down.  If omitted, this function invokes whatever handler was previously bound.
   */
  Key.prototype.down = function (opt_handler) {
    bindOrFire(this, '_downHandler', opt_handler);
  };


  /**
   * Bind a function to be called when the key is released.
   *
   * @param {function=} opt_handler The function to be called when the key is released.  If omitted, this function invokes whatever handler was previously bound.
   */
  Key.prototype.up = function (opt_handler) {
    bindOrFire(this, '_upHandler', opt_handler);
  };


  /**
   * Bind a function to be called when the key is pressed.  This handler will not fire again until the key is released — it does not repeat.
   *
   * @param {function=} opt_handler The function to be called once when the key is pressed.  If omitted, this function invokes whatever handler was previously bound.
   */
  Key.prototype.press = function (opt_handler) {
    bindOrFire(this, '_pressHandler', opt_handler);
  };


  /**
   * Remove the handler that was bound with [`kd.Key#down`](#down).
   */
  Key.prototype.unbindDown = function () {
    this._downHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with [`kd.Key#up`](#up).
   */
  Key.prototype.unbindUp = function () {
    this._upHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with [`kd.Key#press`](#press).
   */
  Key.prototype.unbindPress = function () {
    this._pressHandler = util.noop;
  };

  return Key;

}());

var kd = (function (keysDown) {

  'use strict';

  var kd = {};
  kd.Key = Key;

  var isRunning = false;


  /**
   * Evaluate which keys are held down and invoke their handler functions.
   */
  kd.tick = function () {
    var i, len = keysDown.length;
    for (i = 0; i < len; i++) {
      var keyCode = keysDown[i];

      var keyName = TRANSPOSED_KEY_MAP[keyCode];
      if (keyName) {
        kd[keyName].down();
      }
    }
  };


  /**
   * A basic run loop.  `handler` gets called approximately 60 times a second.
   *
   * @param {function} handler The function to call on every tick.  You almost certainly want to call `kd.tick` in this function.
   */
  kd.run = function (handler) {
    isRunning = true;

    util.requestAnimationFrame.call(window, function () {
      if (!isRunning) {
        return;
      }

      kd.run(handler);
      handler();
    });
  };


  /**
   * Cancels the loop created by [`kd.run`](#run).
   */
  kd.stop = function () {
    isRunning = false;
  };


  // SETUP
  //


  // Initialize the KEY Objects
  util.forEach(KEY_MAP, function (keyCode, keyName) {
    kd[keyName] = new Key(keyCode);
  });

  util.documentOn('keydown', function (evt) {
    var keyCode = evt.keyCode;
    var keyName = TRANSPOSED_KEY_MAP[keyCode];
    var isNew = util.pushUnique(keysDown, keyCode);

    if (isNew && kd[keyName]) {
      kd[keyName].press();
    } else if (!kd[keyName]) {
      console.warn("Unhandled key: " + keyCode)
    }
  });

  util.documentOn('keyup', function (evt) {
    var keyCode = util.removeValue(keysDown, evt.keyCode);

    var keyName = TRANSPOSED_KEY_MAP[keyCode];
    if (keyName) {
      kd[keyName].up();
    }
  });

  // Stop firing the "down" handlers if the user loses focus of the browser
  // window.
  util.documentOn('blur', function (evt) {
    // Fire the "up" handler for each key that is currently held down
    util.forEach(keysDown, function (keyCode) {
      var mappedKey = TRANSPOSED_KEY_MAP[keyCode];
      if (mappedKey) {
        kd[mappedKey].up();
      }
    });

    keysDown.length = 0;
  });


  return kd;

/*!
 * The variables passed into the closure here are defined in kd.key.js.
 */ /*!*/
}(keysDown));

if (typeof module === "object" && typeof module.exports === "object") {
  // Keydrown was loaded as a CommonJS module (by Browserify, for example).
  module.exports = kd;
} else if (typeof define === "function" && define.amd) {
  // Keydrown was loaded as an AMD module.
  define(function () {
    return kd;
  });
} else {
  window.kd = kd;
}

} (window));

},{}],6:[function(require,module,exports){
// Main file for browserify to use
require('../lib/spielmatrix.js');
require('../lib/assets.js');
require('../lib/rendering.js');
require('../lib/tile.js');
require('../lib/mouse.js');
require('../lib/utilities.js');
require('../lib/keyboard.js');
require('../lib/selector.js');
require('../lib/audio.js');
window.kd = require('../lib/keydrown/keydrown.js');
window.HowlerBundle = require('../lib/howler/howler.core.min.js');
window.Howl = window.HowlerBundle.Howl;

},{"../lib/assets.js":1,"../lib/audio.js":2,"../lib/howler/howler.core.min.js":3,"../lib/keyboard.js":4,"../lib/keydrown/keydrown.js":5,"../lib/mouse.js":7,"../lib/rendering.js":8,"../lib/selector.js":9,"../lib/spielmatrix.js":10,"../lib/tile.js":11,"../lib/utilities.js":12}],7:[function(require,module,exports){
// mouse
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.mouse = {
		initialize : function(sm) {
			sm.state.pixiContainer.mouseover = this.onMouseOver.bind(null, sm);
			sm.state.pixiContainer.mouseout  = this.onMouseOut.bind(null, sm);
			sm.state.pixiContainer.mousedown = this.onMouseDown.bind(null, sm);
			sm.state.pixiContainer.mouseup   = this.onMouseUp.bind(null, sm);
			sm.state.pixiContainer.mousemove = this.onMouseMove.bind(null, sm);
			sm.state.pixiContainer.touchstart = this.onMouseDown.bind(null, sm);
			sm.state.pixiContainer.touchmove = this.onMouseMove.bind(null, sm);
			sm.state.pixiContainer.touchend = this.onMouseUp.bind(null, sm);
		},

		shutdown : function(sm) {
			sm.state.pixiContainer.mouseover = null;
			sm.state.pixiContainer.mouseout  = null;
			sm.state.pixiContainer.mousedown = null;
			sm.state.pixiContainer.mouseup   = null;
			sm.state.pixiContainer.mousemove = null;
			sm.state.pixiContainer.touchstart = null;
			sm.state.pixiContainer.touchmove = null;
			sm.state.pixiContainer.touchend = null;
		},

		setMouseState : function(sm, x, y, onGrid) {
			sm.state.cursor.x = x;
			sm.state.cursor.y = y;
			sm.state.cursor.onGrid = onGrid;
		},

		// Mouse click
		onMouseDown : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			if (sm.options.mousedown) sm.options.mousedown(x, y);
		},

		// Mouse click released
		onMouseUp : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			if (sm.options.mouseup) sm.options.mouseup(x, y);
		},

		// Mouse moved
		onMouseMove : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			// Issue move event if the x or y changed
			var onGrid = x >= 0 && y >= 0 && x < sm.state.width && y < sm.state.height;
			if (sm.state.cursor.x != x || sm.state.cursor.y != y || sm.state.cursor.onGrid != onGrid) {
				if (onGrid && sm.options.mousemove) sm.options.mousemove(sm.state.cursor.x, sm.state.cursor.y, x, y);
				if (sm.state.cursor.onGrid && sm.options.mouseleave) sm.options.mouseleave(sm.state.cursor.x, sm.state.cursor.y);
				if (onGrid && sm.options.mouseenter) sm.options.mouseenter(x, y);
				Spielmatrix.mouse.setMouseState(sm, x, y, onGrid);
			}
		},

		// Mouse moved from off the grid to on the grid
		onMouseOver : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			if (sm.options.mouseover) sm.options.mouseover(x, y);
			Spielmatrix.mouse.setMouseState(sm, x, y, true);
		},

		// Mouse moved from on the grid to off the grid
		onMouseOut : function(sm, data) {
			var x = Math.floor(data.data.global.x / sm.state.tileSize);
			var y = Math.floor(data.data.global.y / sm.state.tileSize);
			if (sm.options.mouseout) sm.options.mouseout(sm.state.cursor.x, sm.state.cursor.y);
			if (sm.options.mouseleave) sm.options.mouseleave(sm.state.cursor.x, sm.state.cursor.y);
			Spielmatrix.mouse.setMouseState(sm, x, y, false);
		}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.mouse);

});

},{}],8:[function(require,module,exports){
// rendering
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

	Spielmatrix.rendering = {
		initialize : function(sm) {
			Spielmatrix.rendering.initializeRenderer(sm);
			Spielmatrix.rendering.initializeTiles(sm);
		},

		shutdown : function(sm) {
			sm.options.place.removeChild(sm.state.renderer.view);
			sm.state.renderer = null;
		},

		initializeRenderer : function(sm) {
			Spielmatrix.rendering.readViewOptions(sm);
			Spielmatrix.rendering.calculateViewSize(sm);

			// create a renderer instance
			var rendererOptions = { antialias: !sm.options.pixelPerfect };
			sm.state.renderer = PIXI.autoDetectRenderer(sm.state.renderWidth, sm.state.renderHeight, rendererOptions);

			// Create display object container to hold sprites
			sm.state.pixiContainer = new PIXI.Container();
			sm.state.pixiContainer.interactive = true;

			// add the renderer view element to the DOM
			sm.options.place.appendChild(sm.state.renderer.view);
		},

		readViewOptions : function(sm) {
			// Get the element that the renderer will fit into
			var element = sm.options.place;

			if (element.attributes.hasOwnProperty('data-width-max')) {
				var smWidth = parseInt(element.attributes['data-width-max'].value);
				if (!isNaN(smWidth))
					sm.options.renderWidthMax = smWidth;
			}

			if (element.attributes.hasOwnProperty('data-width-min')) {
				var smWidthMin = parseInt(element.attributes['data-width-min'].value);
				if (!isNaN(smWidthMin))
					sm.options.renderWidthMin = smWidthMin;
			}

			if (element.attributes.hasOwnProperty('data-pixel-perfect')) {
				sm.options.pixelPerfect = element.attributes['data-pixel-perfect'].value === 'true';
			}

			if (element.attributes.hasOwnProperty('data-resize-canvas')) {
				sm.options.resizeCanvas = element.attributes['data-resize-canvas'].value === 'true';
			}

			// Ideal render width is the max render width
			sm.state.renderWidth = sm.options.renderWidthMax;
		},

		// Determine size of the renderer view
		calculateViewSize : function(sm) {

			// Calculate best-fitting tile size
			if (sm.options.pixelPerfect) {
				var tileBaseSize = Spielmatrix.assets.petscii.tileSize;
				// Fit tiles to render width
				sm.state.tileSize = Math.floor(sm.state.renderWidth / sm.state.width);
				// Shrink tiles to multiple of base texture size
				sm.state.tileSize = Math.max(tileBaseSize, sm.state.tileSize - (sm.state.tileSize % tileBaseSize));
			} else {
				// Fit tiles to render width
				sm.state.tileSize = Math.floor(sm.state.renderWidth / sm.state.width);
			}
			// Determine final rendering width/height based on the calculated tile size
			sm.state.renderWidth = sm.state.width * sm.state.tileSize;
			sm.state.renderHeight = sm.state.height * sm.state.tileSize;
		},

		update : function(sm, data) {
			// Check for canvas resize
			if (sm.options.resizeCanvas && sm.options.renderWidthMax !== sm.options.renderWidthMin) {
				var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

				// If the window is too short, correct the supposed width
				var aspectRatio = sm.state.width / sm.state.height;
				var aspectW = windowHeight * aspectRatio;
				if (aspectW < windowWidth)
					windowWidth = aspectW;

				var resized = false;

				// Shrink
				if (windowWidth < sm.state.renderWidth && sm.state.renderWidth > sm.options.renderWidthMin) {
					resized = true;
					sm.state.renderWidth = Math.floor(Math.max(windowWidth, sm.options.renderWidthMin));
				}

				// Grow
				if (windowWidth > sm.state.renderWidth && sm.state.renderWidth < sm.options.renderWidthMax) {
					resized = true;
					sm.state.renderWidth = Math.floor(Math.min(windowWidth, sm.options.renderWidthMax));
				}

				if (resized) {
					// Determine the height based on the width
					sm.state.renderHeight = Math.floor(sm.state.height * (sm.state.renderWidth / sm.state.width));
					
					// Note: This modifies the renderWidth & renderHeight
					Spielmatrix.rendering.calculateViewSize(sm);

					sm.state.pixiContainer.width = sm.state.renderWidth;
					sm.state.pixiContainer.height = sm.state.renderHeight;
					sm.state.renderer.resize(sm.state.renderWidth, sm.state.renderHeight);

				}

			}
		},

		initializeTiles : function(sm) {
			// Empty the tile list in the Spielmatrix state
			sm.state.tiles = [];

			// Rectangle texture
			sm.state.squareTexture = Spielmatrix.assets.petscii.glyphs[Spielmatrix.assets.petscii.FILLED];
			sm.state.glyphTexture = Spielmatrix.assets.petscii.glyphs[Spielmatrix.assets.petscii.EMPTY];

			var squareContainer = new PIXI.Container();
			var glyphContainer = new PIXI.Container();
			sm.state.pixiContainer.addChild(squareContainer);
			sm.state.pixiContainer.addChild(glyphContainer);
			
			// Scale the overall container to fit the rendering view
			var size = Spielmatrix.assets.petscii.tileSize;
			var scale = sm.state.tileSize / size;
			sm.state.pixiContainer.scale.x = scale;
			sm.state.pixiContainer.scale.y = scale;

			var w = sm.state.width;
			var h = sm.state.height;
			
			var color = sm.options.defaultColor;
			for (var y = 0; y < h; ++y) {
				for (var x = 0; x < w; ++x) {
					// Set up the graphics
					var squareSprite = new PIXI.Sprite(sm.state.squareTexture);
					var glyphSprite = new PIXI.Sprite(sm.state.glyphTexture);
					squareContainer.addChild(squareSprite);
					glyphContainer.addChild(glyphSprite);
					sm.state.tiles.push(new Spielmatrix.Tile(squareSprite, glyphSprite, Spielmatrix.assets.petscii.glyphs, x, y, size, color));
				}
			}
		},

		render : function(sm) {
			var len = sm.state.tiles.length;
			for (var i = 0; i < len; ++i) {
				sm.state.tiles[i].render();
			}

			sm.state.renderer.render(sm.state.pixiContainer);
		}
	};

	// Register this module
	Spielmatrix.modules.push(Spielmatrix.rendering);

});

},{}],9:[function(require,module,exports){
// selector
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

/*	
	A small functional extension for Spielmatrix.

	The basic item of logic is a list of tile objects.

	There are a set of methods which create or filter the lists,
	and another set of methods which do things to the tiles
	in a list.
	
	Tile objects store a simplified copy of the engine's tile
	properties, and provides methods for modifying the tile.


	S([filter])
		PARAMS: filter, or nothing
		RETURN: tileList
		Takes an optional filter, and then either returns a
		tileList of every tile in the grid, if no filter is given,
		or a list of every tile which matches the filter.

	tileList.exec(func)
		PARAMS: function that takes an x and y coordinate
		RETURN: the tileList
		Applies a function to every set of coordinates in the
		tileList.

	tileList.rand()
		PARAMS: none
		RETURN: one random tile from the tileList
		Fails if the list is empty.
	
	tileList.where(properties)	
		PARAMS: properties object
		RETURN: a new tileList where each tile has the given
				properties
		Tile objects by default have the following properties:
			x, y, color, alpha, fade, scale, radius, data, exec,
			visible, active, border, borderColor, borderAlpha,
			borderFade, glyph, glyphColor, glyphAlpha, glyphScale,
			glyphFade
		If a property is listed, tiles must have the same value
		for that proprety. For example, the properties object
		{data:1} will match every tile where the data has been
		set to 1.

	tileList.not(properties)
		PARAMS: properties object
		RETURN: a new tileList where each tile does not have the
				given properties
		The complement to tileList.where.

	tileList.where(func)
		PARAMS: function that takes an x and y coordinate and
				returns true or false
		RETURN: the tileList of every tile where the function
				returns true
		Applies a function to every set of coordinates in the
		tileList. Tiles that pass the function (return value of
		true) are included in the returned tileList.
	
	tileList.not(func)
		PARAMS: function that takes an x and y coordinate and
				returns true or false
		RETURN: the tileList of every tile where the function
				returns false

	tileList.set()
		PARAMS: properties object
		RETURN: the tileList
		Changes every tile in the tileList by setting its
		properties to match those of the properties object.
		Properties included:
			data, color, glyph, glyphColor

	The tileList also has a collection of convenience functions for setting
	the tile properties of every tile in the list. They have the same functionality
	as invoking the corresponding PS.______ method on each tile in the list.
	Functions included:
		color, alpha, fade, scale, radius, data, exec, visible, active, border,
		borderColor, borderAlpha, borderFade, glyph, glyphColor, glyphAlpha,
		glyphScale, glyphFade

*/

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";

    ////////////////////////////////////////
	// Functional style

	// Calls a function with each item in the list as an argument
	var _each = function(list, func) {
		for (var i = 0; i < list.length; ++i)
			func(list[i]);
	};

	// Returns a list of only items that contain the exact properties listed
	var _where = function(list, properties) {
		var result = [];
		for (var i = 0; i < list.length; ++i) {
			var item = list[i];
			var include = true;
			for(var prop in properties) {
				if(properties.hasOwnProperty(prop)) {
					if(item[prop] !== properties[prop]) {
						include = false;
						break;
					}
				}
			}
			if (include) {
				result.push(item);
			}
		}
		return result;
	};

	// Returns a list of only items that satisfy the predicate
	var _filter = function(list, predicate) {
		var filtered = [];
		for (var i = 0; i < list.length; ++i) {
			if (predicate(list[i]) === true)
				filtered.push(list[i]);
		}
		return filtered;
	};

	// Returns a copy of list that doesn't include values
	var _without = function(list, values) {
		var result = [];
		for (var i = 0; i < list.length; ++i) {
			if(values.indexOf(list[i]) === -1 )
				result.push(list[i]);
		}
		return result;
	};

	// Takes count items randomly from a list
	var _takeRandomly = function(list, n) {
	    var result = new Array(n),
	        len = list.length,
	        taken = new Array(len);
	    if (n > len)
	        throw new RangeError("getRandom: more elements taken than available");
	    while (n--) {
	        var x = Math.floor(Math.random() * len);
	        result[n] = list[x in taken ? taken[x] : x];
	        taken[x] = --len;
	    }
	    return result;
	};

	// Writes useful functions into a list object so you can chain them
	var _decorateList = function(list) {
		// Apply a function on every tile in the tile list
		list.exec = function(func) {
			_each(this, func);
			return this;
		};

		// Choose a random element from an array
		list.rand = function(count) {
			if (count === undefined)
				count = 1;
			
			var numTiles = this.length;

			// The entire list
			if (numTiles <= count)
				return list;

			// Nothing at all
			if (count <= 0)
				return _decorateList([]);

			return _decorateList(_takeRandomly(this, count));
		};

		list.where = function(query) {
			if (typeof query === 'object') {
				return _decorateList(_where(this, query));
			} else if (typeof query === 'function') {
				return _decorateList(_filter(this, query));
			} else {
				Spielmatrix.error("Invalid query: " + (typeof query));
				return _decorateList([]);
			}
		};

		list.not = function(query) {
			var tilesWith = this.where(query);
			var tiles = _without(this, tilesWith);
			return _decorateList(tiles);
		};

		// Modifies tile based on property object
		list.set = function(properties) {
			properties = properties || {};
			this.exec(function(tile) {tile.set(properties);});
			return this;
		};

		// Tile modification API

		list.data = function(data) {
			return this.exec(function(tile) {tile.setData(data);});
		};

		list.color = function(color) {
			return this.exec(function(tile) {tile.setColor(color);});
		};

		list.glyph = function(glyph) {
			return this.exec(function(tile) {tile.setGlyph(glyph);});
		};

		list.glyphColor = function(glyphColor) {
			return this.exec(function(tile) {tile.setGlyphColor(glyphColor);});
		};

		return list;
	};

	// Get all tiles
	Spielmatrix.getAllTiles = function(sm) {
		var tiles = [];
		for (var i = 0, imax = sm.state.tiles.length; i < imax; ++i) {
			tiles.push(sm.state.tiles[i]);
		}
		return _decorateList(tiles);
	};

	// Get a collection of tiles that pass the test function/properties
	Spielmatrix.selector = function(sm, test1, test2) {
		// All tiles
		var list = Spielmatrix.getAllTiles(sm);
		if (test1 === undefined)
			return list;

		// Object test
		if (typeof test1 === "object" || typeof test1 === "function")
			return list.where(test1);

		// Coordinate test
		if(typeof test1 === "number" && typeof test2 === 'number')
			return _decorateList([Spielmatrix.getTile(sm, test1, test2)]);

		// Error case
		Spielmatrix.error("Invalid tile selector: " + (typeof test1));
		return list;
	};
});
},{}],10:[function(require,module,exports){
// Spielmatrix
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	this.Spielmatrix = mod();
})(function() {
	"use strict";

	// GAME CONSTRUCTOR

	// A Spielmatrix instance represents an editor. This is the object
	// that user code is usually dealing with.

	function Spielmatrix(options) {
		if (!(this instanceof Spielmatrix)) return new Spielmatrix(options);

		// Determine effective options based on given values and defaults.
		this.options = options = options ? Spielmatrix.copyObj(options) : {};
		Spielmatrix.copyObj(defaults, options, false);

		// Internal state
		this.state = {
			tiles: [],
			running: true,
			renderer: null,
			width: this.options.width,
			height: this.options.height,
			tileSize: this.options.tileSize,
			cursor: {x:-1, y:-1, onGrid:false},
			time: Spielmatrix.getMS()
		};

		var sm = this;

		registerSpielmatrixInstance(sm);

		Spielmatrix.initializeModules(sm);

		for (var opt in optionHandlers)
			if (optionHandlers.hasOwnProperty(opt))
				optionHandlers[opt](this, options[opt], Init);

		updateLoop(sm);
	}


	// APPLICATION LIFECYCLE

	var globalInstances = null;
	function registerSpielmatrixInstance(sm) {
		if (!globalInstances) {
			globalInstances = [];
		}

		globalInstances.push(sm);
	}

	Spielmatrix.shutdownAll = function() {
		if (globalInstances && globalInstances.length > 0) {
			for (var i = 0; i < globalInstances.length; ++i) {
				Spielmatrix.shutdownInstance(globalInstances[i]);
			}
			globalInstances = [];
		} else {
			Spielmatrix.error('No instances of Spielmatrix to shut down.');
		}
	}

	Spielmatrix.shutdownInstance = function(sm) {
		sm.state.running = false;
		Spielmatrix.shutdownModules(sm);
	}

	// MODULE REGISTRATION

	Spielmatrix.modules = [];

	Spielmatrix.initializeModules = function(sm) {
		for (var i = 0; i < Spielmatrix.modules.length; ++i) {
			var module = Spielmatrix.modules[i];
			if (typeof module.initialize === 'function')
				module.initialize(sm);
		}
	};

	Spielmatrix.updateModules = function(sm, data) {
		for (var i = 0; i < Spielmatrix.modules.length; ++i) {
			var module = Spielmatrix.modules[i];
			if (typeof module.update === 'function')
				module.update(sm, data);
		}
	};

	Spielmatrix.shutdownModules = function(sm) {
		for (var i = 0; i < Spielmatrix.modules.length; ++i) {
			var module = Spielmatrix.modules[i];
			if (typeof module.shutdown === 'function')
				module.shutdown(sm);
		}
	};


	// PUBLIC METHODS

	Spielmatrix.prototype = {
		constructor: Spielmatrix,
		color: function(x, y, color) {
			Spielmatrix.setTileColor(this, x, y, color);
		},
		glyph: function(x, y, index) {
			Spielmatrix.setTileGlyph(this, x, y, index);
		},
		glyphColor: function(x, y, color) {
			Spielmatrix.setTileGlyphColor(this, x, y, color);
		},
		set: function(x, y, properties) {
			Spielmatrix.setTileProperties(this, x, y, properties);
		},
		data: function(x, y, properties) {
			Spielmatrix.setTileData(this, x, y, properties);
		},
		tile: function(x, y) {
			return Spielmatrix.getTile(this, x, y);
		},
		randBetween: function(lo, hi) {
			return Math.floor(Math.random() * (hi+1-lo));
		},
		log: function(obj) {
			Spielmatrix.log(obj);
		},
		selector: function() {
			return Spielmatrix.selector.bind(this, this);
		},
		play: function(name) {
			return Spielmatrix.audio.play(this, name);
		}
	};
	

	// MAIN UPDATE LOOP

	function updateLoop(sm) {
		// start animating
		window.requestAnimationFrame(animate);

		function animate() {
			if (sm.state.running) {
				var now = Spielmatrix.getMS();
				var dt = Math.max(1, now - sm.state.time);
				sm.state.time = now;
				onUpdate(sm, {"time":dt});
				Spielmatrix.rendering.render(sm);
				// Get next animation frame
				window.requestAnimationFrame(animate);
			}
		}
	};
	

	// GAME EVENTS

	function onUpdate(sm, data) {
		// Notify other modules
		Spielmatrix.updateModules(sm, data);
		// Notify game
		if (sm.options.update) sm.options.update(data);
	}


	// OPTION DEFAULTS

	// The default configuration options.
	var defaults = Spielmatrix.defaults = {};
	// Functions to run when options are changed.
	var optionHandlers = Spielmatrix.optionHandlers = {};

	function option(name, deflt, handle, notOnInit) {
		Spielmatrix.defaults[name] = deflt;
		if (handle) optionHandlers[name] =
			notOnInit ? function(cm, val, old) {
				if (old != Init) handle(cm, val, old);
			} : handle;
	}


	// Passed to option handlers when there is no old value.
	var Init = Spielmatrix.Init = { toString: function() { return "Spielmatrix.Init"; } };

	// Default options
	option("width", 10);
	option("height", 10);
	option("defaultColor", 0x336699);
	option("tileSize", 32);
	option("place", document.body);
	option("pixelPerfect", true);
	option("resizeCanvas", true);
	option("renderWidthMax", 480);
	option("renderWidthMin", 240);
	option("audioPath", "./sounds/");
	option("preloadAudio", null);

	// THE END

	Spielmatrix.version = "1.0.1";

	return Spielmatrix;
});

},{}],11:[function(require,module,exports){
// tile
// by Mark Diehr https://github.com/mdiehr/Spielmatrix

(function(mod) {
	mod(Spielmatrix);
})(function(Spielmatrix) {
	"use strict";


	// Tile object constructor

	var Tile = Spielmatrix.Tile = function(squareSprite, glyphSprite, glyphSheet, x, y, size, color) {
		squareSprite.position.x = x * size;
		squareSprite.position.y = y * size;
		glyphSprite.position.x = x * size;
		glyphSprite.position.y = y * size;
		glyphSprite.scale.x = size / 8;
		glyphSprite.scale.y = size / 8;
		this.squareSprite = squareSprite;
		this.glyphSprite = glyphSprite;
		this.glyphSheet = glyphSheet;
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.glyph = 0;
		this.glyphColor = 0x000000;
		this.data = null;
		this.dirty = true;
	};


	// Public tile interface

	Tile.prototype.render = function() {
		if (this.dirty) {
			this.dirty = false;
			this.squareSprite.tint = this.color;
			this.glyphSprite.tint = this.glyphColor;
		}
	};

	Tile.prototype.setColor = function(color) {
		this.dirty = true;
		this.color = color;
		return this;
	};

	Tile.prototype.setGlyphColor = function(color) {
		this.dirty = true;
		this.glyphColor = color;
		return this;
	};

	Tile.prototype.setGlyph = function(index) {
		// Handle case where the glyph was set as a string
		if (typeof index === 'string') {
			index = index.charCodeAt(0);
		}

		if (index >= 0 && index < this.glyphSheet.length) {
			this.glyph = index;
			this.glyphSprite.texture = this.glyphSheet[index];
		} else {
			Spielmatrix.error("Glyph index "+index+" out of range.");
		}
		return this;
	};

	Tile.prototype.setData = function(data) {
		this.data = data;
		return this;
	};

	Tile.prototype.set = function(properties) {
		properties = properties || {};
		if (properties.hasOwnProperty("data"))
			this.setData(properties.data);
		if (properties.hasOwnProperty("color"))
			this.setColor(properties.color);
		if (properties.hasOwnProperty("glyph"))
			this.setGlyph(properties.glyph);
		if (properties.hasOwnProperty("glyphColor"))
			this.setGlyphColor(properties.glyphColor);
		return this;
	};

	// Helper functions for accessing tiles

	Spielmatrix.getTile = function(sm, x, y) {
		var i = x + y * sm.state.width;
		if (i < 0 || i >= sm.state.tiles.length) {
			Spielmatrix.error(["Tile out of bounds:",x,y].join(" "));
			return null;
		}
		return sm.state.tiles[i];
	};

	Spielmatrix.setTileColor = function(sm, x, y, color) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile !== null) {
			tile.setColor(color);
		}
	};

	Spielmatrix.setTileGlyph = function(sm, x, y, index) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile !== null) {
			tile.setGlyph(index);
		}
	};

	Spielmatrix.setTileGlyphColor = function(sm, x, y, color) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile !== null) {
			tile.setGlyphColor(color);
		}
	};

	Spielmatrix.setTileProperties = function(sm, x, y, properties) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile !== null) {
			tile.set(properties);
		}
	};

	Spielmatrix.setTileData = function(sm, x, y, properties) {
		var tile = Spielmatrix.getTile(sm, x, y);
		if (tile !== null) {
			tile.setData(properties);
		}
	};

});

},{}],12:[function(require,module,exports){
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

},{}]},{},[6]);
