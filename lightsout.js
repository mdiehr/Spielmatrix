// LightsOut example for the Spielmatrix game engine

(function LightsOut () {
    // Game variables
    var w = h = 5;
    var colors = [0x000000, 0xFFFF00];
    var playing = true;

    // Initialize engine
    var sm = new Spielmatrix({width:w, height:h, defaultColor: colors[1]});

    sm.mousedown = function(x, y) {
        if (playing) {
            // Toggle the 5 tiles
            toggle(x, y);
            toggle(x-1, y);
            toggle(x+1, y);
            toggle(x, y-1);
            toggle(x, y+1);
            if (didWin()) {
                // Won game
                playing = false;
                drawSmiley(0x009900);
            }
        } else {
            // Reset
            playing = true;
            drawAll(colors[1]);
        }
    };

    function drawAll(color) {
        for (var y = 0; y < h; ++y) {
            for (var x = 0; x < w; ++x) {
                sm.draw(x, y, color);
            }
        }
    }

    function toggle(x, y) {
        if (x >= 0 && x < w && y >= 0 && y < h) {
            var tile = sm.tile(x, y);
            if (tile.color == colors[0]) {
                tile.setColor(colors[1]);
            } else {
                tile.setColor(colors[0]);
            }
        }
    }

    function didWin() {
        for (var y = 0; y < h; ++y) {
            for (var x = 0; x < w; ++x) {
                if (sm.tile(x, y).color == colors[1])
                    return false;
            }
        }
        return true;
    }

    function drawSmiley(color) {
        sm.draw(1, 1, color);
        sm.draw(3, 1, color);
        sm.draw(0, 3, color);
        sm.draw(1, 4, color);
        sm.draw(2, 4, color);
        sm.draw(3, 4, color);
        sm.draw(4, 3, color);
    }

})();
