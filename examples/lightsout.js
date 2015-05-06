// LightsOut example for the Spielmatrix game engine

(function(){
    // Game variables
    var w = 5;
    var h = 5;
    var colors = [0x000000, 0xFFFF00, 0x00];
    var glyphs = [0x86, 0xba, 0x00];
    var glyphColors = [0x333333, 0xFFFFFF, 0xFF0000];
    var playing = true;

    // Initialize engine
    var sm = new Spielmatrix({
        place : document.getElementById('lightsout'),
        width : w,
        height : h,
        tileSize : 64,
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

    var S = sm.selector();

    function reset() {
        drawAll(1);
        playing = true;
    }

    function drawAll(index) {
        S().color(colors[index]).glyph(glyphs[index]).glyphColor(glyphColors[index]);
    }

    // Toggle the 5 tiles
    function togglePlus(x, y) {
        function isWithinOneDist(tile) {
            return Math.abs(tile.x - x) + Math.abs(tile.y - y) <= 1;
        };

        S(isWithinOneDist).exec(toggle);
    }

    function toggle(tile) {
        var index = 0;
        if (tile.color == colors[0]) {
            index = 1;
        }
        tile.setColor(colors[index]);
        tile.setGlyph(glyphs[index]);
        tile.setGlyphColor(glyphColors[index]);
    }

    function didWin() {
        return S({color:colors[1]}).length == 0;
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
