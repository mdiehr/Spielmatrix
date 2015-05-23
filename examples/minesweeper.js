// LightsOut example for the Spielmatrix game engine

(function(){
    
    // Game constants
    var w = 15;
    var h = 15;
    var uiHeight = 7;
    var bombCount = 20;
    var safeCount = (w * h) - bombCount;

    // Game states
    var playing;
    var processFirstClick;
    var mode;
    var modes = {'reveal':{}, 'flag':{}};

    // Tile display options
    var types = {'game':{}, 'ui':{}};
    var states = {'hidden':{}, 'revealed':{}};
    var marks = {'none':{}, 'flag':{}, 'question':{}};

    function Behavior() {
        this.clicked = null;
    }

    Behavior.prototype.activate = function(tile) {
        if (this.clicked) this.clicked(tile);
    };

    // Behavior for tiles that could have a bomb or be empty
    function GameBehavior() {
        Behavior.call(this);
        this.type = types.game;
        this.state = states.hidden;
        this.mark = marks.none;
        this.hasBomb = false;
        this.clicked = gameTileClick;
    }
    GameBehavior.prototype = Object.create(Behavior.prototype);

    // Reveal button behavior
    function RevealBehavior() {
        Behavior.call(this);
        this.type = types.ui;
        this.clicked = function(tile) {
            setInteractionMode(modes.reveal);
        };
    }
    RevealBehavior.prototype = Object.create(Behavior.prototype);

    // Flag button behavior
    function FlagBehavior() {
        Behavior.call(this);
        this.type = types.ui;
        this.clicked = function(tile) {
            setInteractionMode(modes.flag);
        };
    }
    FlagBehavior.prototype = Object.create(Behavior.prototype);

    // Reset button behavior
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
        "empty" :   {color:0x666666, glyph:0xFC, glyphColor:0x333333},
        "bomb":     {color:0x333333, glyph:0x2A, glyphColor:0xFF0000},
        "revealed": {color:0x444444, glyph:0x00, glyphColor:0x998877},
        "none":     {color:0x666666, glyph:0xFC, glyphColor:0x333333},
        "flag":     {color:0x333333, glyph:0xCA, glyphColor:0xDDDDAA},
        "question": {color:0x333333, glyph:0x3F, glyphColor:0x998822},
        "correct":  {color:0x333333, glyph:0xba, glyphColor:0x11AA11},
        "wrong":    {color:0x333333, glyph:0xb9, glyphColor:0xFF0000},
        "unknown":  {color:0x333333, glyph:'*',  glyphColor:0x000000},
        "ui":       {color:0x335577, glyph:0x00, glyphColor:0x777777}
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
            if (tile.data && tile.data.activate) {
                tile.data.activate(tile);
            }

            if (didWin()) {
                playing = false;
                showVictory();
            }
        } else {
            reset();
        }
    }

    function gameTileClick(tile) {
        if (mode === modes.reveal) {
            reveal(tile);
        } else if (mode === modes.flag) {
            flag(tile);
        }
    }

    function reveal(tile) {
        // Some times can't be revealed
        if (tile.data.state !== states.hidden || tile.data.mark !== marks.none) {
            return;
        }

        var recur = false;

        if (processFirstClick) {
            processFirstClick = false;
            tile.set(styles.revealed);
            tile.data.state = states.revealed;
            placeBombs();
            recur = (0 === determineNumber(tile));
        }

        if(tile.data.hasBomb) {
            tile.set(styles.bomb);
            tile.data.state = states.revealed;
            playing = false;
            showDefeat();
        } else {
            tile.set(styles.revealed);
            tile.data.state = states.revealed;
            recur = (0 === determineNumber(tile));
        }

        if (recur) {
            S(hasGameTile)
                .where(withinDistance.bind(null, 1, tile))
                .exec(reveal);
        }
    }

    function placeBombs() {
        S(hasGameTile)
            .where(function(tile) {return tile.data.state === states.hidden;})
            .rand(bombCount)
            .exec(function(tile) { tile.data.hasBomb = true; });
    }

    function flag(tile) {
        if (tile.data.state === states.hidden) {
            if (tile.data.mark === marks.none) {
                tile.data.mark = marks.flag;
                tile.set(styles.flag);
            } else if (tile.data.mark === marks.flag) {
                tile.data.mark = marks.question;
                tile.set(styles.question);
            } else if (tile.data.mark === marks.question) {
                tile.data.mark = marks.none;
                tile.set(styles.none);
            }
        }
    }

    // Resets game to the initial state
    function reset() {
        drawUI();
        S(function(tile){return tile.y >= uiHeight;})
            .exec(function(tile) { tile.data = new GameBehavior(); })
            .set(styles.empty);

        playing = true;
        processFirstClick = true;
        setInteractionMode(modes.reveal);
    }

    function hasBomb(tile) {
        return tile.data && tile.data.type === types.game && tile.data.hasBomb;
    }

    function hasFlag(tile) {
        return tile.data && tile.data.type === types.game && tile.data.mark === marks.flag;
    }

    function hasGameTile(tile) {
        return tile.data && tile.data.type === types.game;
    }

    // Fills out a number on a particular tile
    function determineNumber(tile) {
        var tiles = S(withinDistance.bind(null, 1, tile));
        var numBombs = tiles.where(hasBomb).length;
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
        return S(function(tile) {
            var data = tile.data;
            return data && data.type === types.game && data.state === states.revealed && !data.hasBomb;
        }).length === safeCount;
    }

    function showVictory() {
        S({y:uiHeight-1}).color(0x449933);
        wrtieGUI(1, uiHeight-1, "You win! Nice!", {glyphColor:0xFFFFFF});
    }

    function showDefeat() {
        // Defeat text
        S({y:uiHeight-1}).color(0x994433);
        wrtieGUI(0, uiHeight-1, "*** KABOOM! ***", {glyphColor:0xFFFFFF});
        // Unrevealed game tiles
        var gameTiles = S(hasGameTile).where(function(tile) {return tile.data.state === states.hidden;});
        // Unknown bomb locations
        gameTiles.where(hasBomb).set(styles.unknown);
        // Correct bomb flags
        gameTiles.where(hasBomb)
            .where(hasFlag)
            .set(styles.correct);
        // Incorrect bomb flags
        gameTiles.not(hasBomb)
            .where(hasFlag)
            .set(styles.wrong);
    }

    function drawUI() {
        S(function(tile){return tile.y < uiHeight;}).set(styles.ui);
        wrtieGUI(1, 1, "MINESWEEPER \x8d", {glyphColor:0xEDFF00});
        wrtieGUI(1, 1, "MINESWEEPER", {glyphColor:0xED7700});
        S(function(tile){return tile.y < 3;}).color(0);
        wrtieGUI(1, 4, "Show", {glyphColor:0x449933}, 'reveal');
        wrtieGUI(7, 4, "Flag",   {glyphColor:0x998833}, 'flag');
        wrtieGUI(13, 4, "\xb9",  {glyphColor:0x994433}, 'reset');
        S({y:uiHeight-1}).color(0);
    }

    function setInteractionMode(interactionMode) {
        mode = interactionMode;
        var revealColor = mode === modes.reveal ? 0xDDDDDD : styles.ui.color;
        var flagColor = mode === modes.flag ? 0xDDDDDD : styles.ui.color;
        outlineArea(0, 3, 6, 3, revealColor);
        outlineArea(6, 3, 6, 3, flagColor);
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
