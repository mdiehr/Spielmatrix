// Game.js template for Spielmatrix
(function(){
    var sm = new Spielmatrix({
        place : document.getElementById('game'),
        width : 10,
        height : 10,
        defaultColor : 0x000000,
        tileSize : 32,
        mousedown : function(x, y) {
            // sm.log(["mousedown", x, y].join(", "));
            sm.glyph(x, y, 0xb5);
            sm.glyphColor(x, y, 0x00FFFF);
        },
        mouseup : function(x, y) {
            // sm.log(["mouseup", x, y].join(", "));
        },
        mousemove : function(oldX, oldY, x, y) {
            // sm.log(["mousemove", oldX, oldY, x, y].join(", "));
        },
        mouseenter : function(x, y) {
            // sm.log(["mouseenter", x, y].join(", "));
        },
        mouseleave : function(x, y) {
            // sm.log(["mouseleave", x, y].join(", "));
        },
        mouseout : function(x, y) {
            // sm.log(["mouseout", x, y].join(", "));
        },
        mouseover : function(x, y) {
            // sm.log(["mouseover", x, y].join(", "));
        },
        update : function(data) {
            // drawAll(colors[++colorCount%colors.length]);
        },
        keydown : function(key) {
            // sm.log(["keydown", key].join(", "));
        },
        keyup : function(key) {
            // sm.log(["keyup", key].join(", "));
        }
    });

    // Draw a glyph & glyph in every bead 
    for (var x = 0; x < sm.options.width; ++x) {
        for (var y = 0; y < sm.options.height; ++y) {
            sm.glyph(x, y, 0xFC);
            sm.glyphColor(x, y, 0x232355);
        }
    }
})();
