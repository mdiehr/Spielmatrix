// LightsOut example for the Spielmatrix game engine

(function(){
    // Game variables
    var w = h = 5;
    var colors = [0x000000, 0xFFFF00, 0x00];
    var glyphs = [0x86, 0xba, 0x00];
    var glyphColors = [0x333333, 0xFFFFFF, 0xFF0000];
    var playing = true;

    var container = document.getElementById('lightsout');

    // Initialize engine
    var sm = new Spielmatrix({
        place: container,
        width: w,
        height: h,
        defaultColor: colors[1],
        tileSize: 128,
        mousedown : function(x, y) {
            if (playing) {
                togglePlus(x, y);
                if (didWin()) {
                    playing = false;
                    drawSmiley();
                }
            } else {
                reset();
            }
        }
    });

    function reset() {
        drawAll(1);
        playing = true;
    }

    function drawAll(index) {
        for (var y = 0; y < h; ++y) {
            for (var x = 0; x < w; ++x) {
                sm.draw(x, y, colors[index]);
                sm.glyph(x, y, glyphs[index]);
                sm.glyphColor(x, y, glyphColors[index]);
            }
        }
    }

    // Toggle the 5 tiles
    function togglePlus(x, y) {
        toggle(x, y);
        toggle(x-1, y);
        toggle(x+1, y);
        toggle(x, y-1);
        toggle(x, y+1);
    }

    function toggle(x, y) {
        if (x >= 0 && x < w && y >= 0 && y < h) {
            var tile = sm.tile(x, y);
            var index = 0;
            if (tile.color == colors[0]) {
                index = 1;
            }
            tile.setColor(colors[index]);
            tile.setGlyph(glyphs[index]);
            tile.setGlyphColor(glyphColors[index]);
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

    function drawSmiley() {
        drawAll(2);
        // Eyes
        sm.glyph(1, 1, 0xb4);
        sm.glyph(3, 1, 0xb4);
        // Mouth
        sm.glyph(0, 3, 0x16);
        sm.glyph(1, 3, 0x0b);
        sm.glyph(2, 3, 0x0b);
        sm.glyph(3, 3, 0x0b);
        sm.glyph(4, 3, 0x17);
    }

    // Set initial style
    reset();

})();
