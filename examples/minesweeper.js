// LightsOut example for the Spielmatrix game engine

(function(){
    
    // Game constants
    var w = 15;
    var h = 10;
    var uiHeight = 3;
    var bombCount = 10;
    var safeCount = (w * h) - bombCount;

    // Game states
    var playing;
    var processFirstClick;
    var mode;

    var styles = {
        "start" :   {data:"empty",      color:0x666666, glyph:0xFC, glyphColor:0x333333},
        "bomb":     {data:"bomb",       color:0x333333, glyph:0x2A, glyphColor:0xFF0000},
        "revealed": {data:"revealed",   color:0x444444, glyph:0x00, glyphColor:0x777777},
        "flag":     {data:"flag",       color:0x666666, glyph:0xCA, glyphColor:0xAA2222},
        "question": {data:"question",   color:0x666666, glyph:0x3F, glyphColor:0x998822},
        "right":    {data:"right",      color:0x333333, glyph:0xba, glyphColor:0x11AA11},
        "wrong":    {data:"wrong",      color:0x333333, glyph:0xb9, glyphColor:0xFF0000},
        "ui":       {data:"ui",         color:0x335577, glyph:0x00, glyphColor:0x777777}
    };

    // Initialize engine
    var SM = new Spielmatrix({
        place : document.getElementById('minesweeper'),
        width : w,
        height : h + uiHeight,
        mousedown : handleMouse
    });

    var S = SM.selector();

    function handleMouse(x, y) {
        if (playing) {
            var tile = SM.tile(x, y);
            if (tile.data === "empty" || tile.data === "bomb") {
                reveal(SM.tile(x, y));
            }

            if (didWin()) {
                playing = false;
                showVictory();
            }
        } else {
            reset();
        }
    }

    function reveal(tile) {

        var recur = false;

        if (processFirstClick) {
            processFirstClick = false;
            tile.set(styles.revealed);
            S({data:'empty'}).rand(bombCount).data('bomb');
            recur = (0 === determineNumber(tile));
        }

        switch(tile.data) {
            case 'empty':
                tile.set(styles.revealed);
                recur = (0 === determineNumber(tile));
                break;
            case 'bomb':
                tile.set(styles.bomb);
                break;
        }

        if (recur) {
            S(withinDistance.bind(null, 1, tile)).exec(reveal);
        }
    }

    // Resets game to the initial state
    function reset() {
        S().set(styles.start);
        drawUI();

        playing = true;
        processFirstClick = true;
        mode = "reveal";
    }

    function drawUI() {
        S(function(tile){return tile.y < uiHeight;}).set(styles.ui);
        writeText(1, 1, "Reveal", {glyphColor:0x449933});
        writeText(8, 1, "Flag",   {glyphColor:0x998833});
        writeText(13, 1, "\xb9",  {glyphColor:0x994433});
        // The reveal area
        outlineArea(0, 0, 8, 3);
    }

    // Fills out a number on a particular tile
    function determineNumber(tile) {
        var tiles = S(withinDistance.bind(null, 1, tile));
        var numBombs = tiles.where({data:'bomb'}).length;
        if (numBombs > 0) {
            tile.setGlyph(numBombs.toString());
        }
        return numBombs;
    }

    function withinDistance(distance, tileA, tileB) {
        return distance >= Math.max(Math.abs(tileA.x-tileB.x), Math.abs(tileA.y-tileB.y));
    }

    // Returns true if all safe tiles are revealed
    function didWin() {
        return S({data:"revealed"}).length === safeCount;
    }

    function showVictory() {
        S(0,0).color(0x0000FF);
    }

    // Writes text to a location
    function writeText(x, y, text, properties) {
        properties = properties || {};
        for (var i = 0; i < text.length; ++i) {
            S(x+i, y).glyph(text[i]).set(properties);
        }
    }

    function outlineArea(x, y, w, h) {
        S({y:y}).where(function(tile){return tile.x > x && tile.x < x + w - 1;}).glyph(0x0b).glyphColor(0xDDDDDD);
        S({y:y+h-1}).where(function(tile){return tile.x > x && tile.x < x + w - 1;}).glyph(0x0b).glyphColor(0xDDDDDD);
        S({x:x}).where(function(tile){return tile.y > y && tile.y < y + h - 1;}).glyph(0x0a).glyphColor(0xDDDDDD);
        S({x:x+w-1}).where(function(tile){return tile.y > y && tile.y < y + h - 1;}).glyph(0x0a).glyphColor(0xDDDDDD);
        S(x, y).glyph(0x14).glyphColor(0xDDDDDD);
        S(x+w-1, y).glyph(0x15).glyphColor(0xDDDDDD);
        S(x, y+h-1).glyph(0x16).glyphColor(0xDDDDDD);
        S(x+w-1, y+h-1).glyph(0x17).glyphColor(0xDDDDDD);
    }

    // Set initial style
    reset();

})();
