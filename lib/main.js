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
