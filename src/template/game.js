// Game.js template for Spielmatrix
(function(){
    var SM = new Spielmatrix({
        place : document.getElementById('game'),
        width : 10,
        height : 10,
        defaultColor : 0x000000,
        mousedown : function(x, y) {
            // SM.log(["mousedown", x, y].join(", "));
            SM.glyph(x, y, 0xb5);
            SM.glyphColor(x, y, 0x00FFFF);
            SM.play('Blip1');
        },
        mouseup : function(x, y) {
            // SM.log(["mouseup", x, y].join(", "));
        },
        mousemove : function(oldX, oldY, x, y) {
            // SM.log(["mousemove", oldX, oldY, x, y].join(", "));
        },
        mouseenter : function(x, y) {
            // SM.log(["mouseenter", x, y].join(", "));
        },
        mouseleave : function(x, y) {
            // SM.log(["mouseleave", x, y].join(", "));
        },
        mouseout : function(x, y) {
            // SM.log(["mouseout", x, y].join(", "));
        },
        mouseover : function(x, y) {
            // SM.log(["mouseover", x, y].join(", "));
        },
        update : function(data) {
            // drawAll(colors[++colorCount%colors.length]);
        },
        keydown : function(key) {
            // SM.log(["keydown", key].join(", "));
        },
        keyup : function(key) {
            // SM.log(["keyup", key].join(", "));
        }
    });

    // Get a reference to the tile selector
    var S = SM.selector();
    // Draw a glyph & glyph in every bead 
    S().glyph(0xFC).glyphColor(0x232355);

})();
