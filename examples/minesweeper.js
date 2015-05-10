// LightsOut example for the Spielmatrix game engine

(function(){
    
    // Game variables
    var w = 15;
    var h = 10;
    var bombCount = 20;
    var styles = {
        "start" :   {data:"empty",      color:0x666666, glyph:0xFC, glyphColor:0x333333},
        "revealed": {data:"revealed",      color:0x444444, glyph:0x00, glyphColor:0x777777},
        "flag":     {data:"flag",       color:0x666666, glyph:0xCA, glyphColor:0xAA2222},
        "question": {data:"question",   color:0x666666, glyph:0x3F, glyphColor:0x998822},
        "right":    {data:"right",      color:0x333333, glyph:0xba, glyphColor:0x11AA11},
        "bomb":     {data:"bomb",       color:0x333333, glyph:0x2A, glyphColor:0xFF0000},
        "wrong":    {data:"wrong",      color:0x333333, glyph:0xb9, glyphColor:0xFF0000}
    };
    var playing = true;
    var processFirstClick = true;

    // Initialize engine
    var SM = new Spielmatrix({
        place : document.getElementById('minesweeper'),
        width : w,
        height : h,
        tileSize : 50,
        mousedown : handleMouse
    });

    var S = SM.selector();

    function handleMouse(x, y) {
        if (playing) {
            reveal(SM.tile(x, y));
            if (didWin()) {
                playing = false;
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
            recur = 0 === determineNumber(tile);
        }

        switch(tile.data) {
            case 'empty':
                tile.set(styles.revealed);
                recur = 0 === determineNumber(tile);
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
        drawAll("start");
        playing = true;
    }

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

    // Sets every bead to the same style
    function drawAll(style) {
        S().set(styles[style]);
    }

    // Returns true if there are no more light tiles
    function didWin() {
        return S({color:styles.start.color}).length === 0;
    }

    // Set initial style
    reset();

})();
