// LightsOut example for the Spielmatrix game engine

(function(){
    
    // Game constants
    var w = 17;
    var h = 10;
    var uiHeight = 7;
    var bombCount = 10;
    var safeCount = (w * h) - bombCount;

    // Game states
    var playing;
    var processFirstClick;
    var mode;
    var modes = {'reveal':{}, 'flag':{}};

    // Tile display options
    var types = {'empty':{}, 'bomb':{}, 'ui':{}};
    var states = {'hidden':{}, 'revealed':{}};
    var marks = {'none':{}, 'flagged':{}, 'questioned':{}};

    function Behavior() {
        this.type = types.empty;
        this.state = states.hidden;
        this.mark = marks.none;
        this.clicked = null;
        this.activate = function() {
            if (this.clicked) this.clicked();
        };
    }

    function GameBehavior() {
        Behavior.call(this);
        this.clicked = reveal;
    }
    GameBehavior.prototype = Object.create(Behavior.prototype);

    function RevealBehavior() {
        Behavior.call(this);
        this.type = types.ui;
        this.clicked = function(tile) {
            setInteractionMode(modes.reveal);
        };
    }
    RevealBehavior.prototype = Object.create(Behavior.prototype);

    function FlagBehavior() {
        Behavior.call(this);
        this.type = types.ui;
        this.clicked = function(tile) {
            setInteractionMode(modes.flag);
        };
    }
    FlagBehavior.prototype = Object.create(Behavior.prototype);

    function ResetBehavior() {
        Behavior.call(this);
        this.type = types.ui;
        this.clicked = function(tile) { reset(); };
    }
    ResetBehavior.prototype = Object.create(Behavior.prototype);

    var behaviors = {
        "game" : GameBehavior,
        "reveal" : RevealBehavior,
        "flag" : FlagBehavior,
        "reset" : ResetBehavior
    };

    var styles = {
        "empty" :   {data:"empty",      color:0x666666, glyph:0xFC, glyphColor:0x333333},
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
            if (tile.data.activate) {
                tile.data.activate(tile);
            } else {
                if (tile.data === "empty" || tile.data === "bomb") {
                    reveal(SM.tile(x, y));
                }
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
        S().set(styles.empty);
        drawUI();

        playing = true;
        processFirstClick = true;
        setInteractionMode(modes.reveal);
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

    function drawUI() {
        S(function(tile){return tile.y < uiHeight;}).set(styles.ui);
        wrtieGUI(1, 1, "\x8d MINESWEEPER \x8d", {glyphColor:0xEDFF00});
        wrtieGUI(3, 1, "MINESWEEPER", {glyphColor:0xED7700});
        S(function(tile){return tile.y < 3;}).color(0);
        wrtieGUI(1, 4, "Reveal", {glyphColor:0x449933}, 'reveal');
        wrtieGUI(9, 4, "Flag",   {glyphColor:0x998833}, 'flag');
        wrtieGUI(15, 4, "\xb9",  {glyphColor:0x994433}, 'reset');
        S({y:uiHeight-1}).color(0);
    }

    function setInteractionMode(interactionMode) {
        mode = interactionMode;
        var revealColor = mode === modes.reveal ? 0xDDDDDD : styles.ui.color;
        var flagColor = mode === modes.flag ? 0xDDDDDD : styles.ui.color;
        outlineArea(0, 3, 8, 3, revealColor);
        outlineArea(8, 3, 6, 3, flagColor);
    }

    // Writes text to a location
    function wrtieGUI(x, y, text, properties, behaviorType) {
        var behavior = behaviorType ? behaviors[behaviorType] : null;
        properties = properties || {};
        for (var i = 0; i < text.length; ++i) {
            var tile = S(x+i, y).glyph(text[i]).set(properties);
            if (behavior)
                tile.data(new behavior());
        }
    }

    function outlineArea(x, y, w, h, highlightColor) {
        S({y:y}).where(function(tile){return tile.x > x && tile.x < x + w - 1;}).glyph(0x0b).glyphColor(highlightColor);
        S({y:y+h-1}).where(function(tile){return tile.x > x && tile.x < x + w - 1;}).glyph(0x0b).glyphColor(highlightColor);
        S({x:x}).where(function(tile){return tile.y > y && tile.y < y + h - 1;}).glyph(0x0a).glyphColor(highlightColor);
        S({x:x+w-1}).where(function(tile){return tile.y > y && tile.y < y + h - 1;}).glyph(0x0a).glyphColor(highlightColor);
        S(x, y).glyph(0x14).glyphColor(highlightColor);
        S(x+w-1, y).glyph(0x15).glyphColor(highlightColor);
        S(x, y+h-1).glyph(0x16).glyphColor(highlightColor);
        S(x+w-1, y+h-1).glyph(0x17).glyphColor(highlightColor);
    }

    // Set initial style
    reset();

})();
