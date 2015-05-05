// Game.js template for Spielmatrix
(function(){
    var sm = new Spielmatrix({
        place : document.getElementById('game'),
        width : 10,
        height : 10,
        defaultColor : 0x000000,
        tileSize : 32,
        mousedown : function(x, y) {
            sm.glyph(x, y, 0xb5);
            sm.glyphColor(x, y, 0xFF0000);
        },
        mouseup : function(x, y) {
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
})();
