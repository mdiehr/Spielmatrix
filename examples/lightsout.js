// LightsOut example for the Spielmatrix game engine

(function(){
    
    // Game variables
    var w = 5;
    var h = 5;
    var tileStyles = {
        "dark" : {color:0x000000, glyph:0x86, glyphColor:0x333333},
        "light": {color:0xFFFF00, glyph:0xba, glyphColor:0xFFFFFF},
        "win": {color:0x000000, glyph:0x00, glyphColor:0xFF0000}
    };
    var playing = true;

    // Initialize engine
    var SM = new Spielmatrix({
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

    var S = SM.selector();

    // Resets game to the initial state
    function reset() {
        drawAll("light");
        playing = true;
    }

    // Sets every bead to the same style
    function drawAll(style) {
        S().set(tileStyles[style]);
    }

    // Toggle the 5 tiles in a + pattern
    function togglePlus(x, y) {
        function isWithinOneDist(tile) {
            return Math.abs(tile.x - x) + Math.abs(tile.y - y) <= 1;
        }

        S(isWithinOneDist).exec(toggle);
    }

    // Toggle the style of one tile between light and dark
    function toggle(tile) {
        var style = (tile.color === tileStyles["dark"].color) ? "light" : "dark";
        tile.set(tileStyles[style]);
    }

    // Returns true if there are no more light tiles
    function didWin() {
        return S({color:tileStyles["light"].color}).length === 0;
    }

    // Draws a smiley face, because we won the game
    function drawSmiley() {
        drawAll("win");
        // Eyes
        SM.glyph(1, 1, 0xb4);
        SM.glyph(3, 1, 0xb4);
        // Mouth
        SM.glyph(0, 3, 0x16);
        SM.glyph(1, 3, 0x0b);
        SM.glyph(2, 3, 0x0b);
        SM.glyph(3, 3, 0x0b);
        SM.glyph(4, 3, 0x17);
    }

    // Set initial style
    reset();

})();
