// Glyphs example for the Spielmatrix game engine

(function(){
    // Game variables
    var w = 32, h = 32;
    var colors = [0x000000, 0x003300, 0xBBBBFF, 0xDDDDFF, 0x336699, 0x338899];

    // Initialize engine
    var sm = new Spielmatrix({
        place : document.getElementById('glyphs'),
        width : w,
        height : h,
        defaultColor : colors[0],
        tileSize : 32
    });

    function setupGrid() {
        drawAll(colors[0], 0, colors[2]);

        var glyph = 0;
        var alternate = false;
        for (var y = 0; y < sm.options.height; y += 2) {
            for (var x = 0; x < sm.options.width; x += 2) {
                alternate = ((x/2 + y/2) % 2) === 0;

                sm.color(x, y, colors[alternate ? 0 : 1]);
                sm.color(x+1, y, colors[alternate ? 0 : 1]);
                sm.color(x, y+1, colors[alternate ? 0 : 1]);
                sm.color(x+1, y+1, colors[alternate ? 0 : 1]);
                sm.glyphColor(x, y, colors[alternate ? 2 : 3]);
                sm.glyph(x, y, glyph);

                var glyphCode = glyph.toString(16);
                if (glyphCode.length < 2) glyphCode = "0"+glyphCode;
                var code1 = getGlyph(glyphCode[0]);
                var code2 = getGlyph(glyphCode[1]);

                sm.glyphColor(x, y+1, colors[alternate ? 4 : 5]);
                sm.glyph(x, y+1, code1);
                sm.glyphColor(x+1, y+1, colors[alternate ? 4 : 5]);
                sm.glyph(x+1, y+1, code2);

                // next
                glyph++;
                
            }
        }
    }

    // Really rough mapping of characters from Unicode to PETSCII
    function getGlyph(character) {
        return character.charCodeAt(0);
    }


    function drawAll(bg, glyph, color) {
        for (var y = 0; y < sm.options.height; ++y) {
            for (var x = 0; x < sm.options.width; ++x) {
                sm.draw(x, y, bg);
                sm.glyph(x, y, glyph);
                sm.glyphColor(x, y, color);
            }
        }
    }

    setupGrid();

})();
