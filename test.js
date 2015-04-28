// Test js file for Spielmatrix
(function(){
    // Initialization
    var isDown = false;
    var colors = [0x5D0776, 0xEC8A49, 0xAF3666, 0xF6C84C, 0x4C779A];
    var colorCount = 0;
    var color = 0;
    var glyph = 0;
    var bg = 0;

    var sm = new Spielmatrix({
        width:20,
        height:20,
        defaultColor: 0x007700,
        tileSize: 32,
        mousedown : function(x, y) {
            isDown = true;
            chooseRandom();
            sm.draw(x, y, bg);
            sm.glyph(x, y, glyph);
            sm.glyphColor(x, y, color);
        },
        mouseup : function(x, y) {
            if (isDown) {
                isDown = false;
            }
        },
        mousemove : function(oldX, oldY, x, y) {
            // sm.log(["mousemove", oldX, oldY, x, y].join(", "));
            if(isDown) {
                sm.draw(x, y, bg);
                sm.glyph(x, y, glyph);
                sm.glyphColor(x, y, color);
            }
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
            sm.log(["keydown", key].join(", "));
        },
        keyup : function(key) {
            sm.log(["keyup", key].join(", "));
        }
    });

    function drawAll(color) {
        for (var y = 0; y < sm.options.height; ++y) {
            for (var x = 0; x < sm.options.width; ++x) {
                sm.draw(x, y, bg);
                sm.glyph(x, y, glyph);
                sm.glyphColor(x, y, color);
            }
        }
    }

    function chooseRandom() {
        color = sm.randBetween(0x0, 0xFFFFFF);
        glyph = sm.randBetween(0, 255);
        bg = sm.randBetween(0x0, 0xFFFFFF);
    }
    
    chooseRandom();
    drawAll(color);

})();
