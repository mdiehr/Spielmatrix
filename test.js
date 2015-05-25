// Test js file for Spielmatrix
(function(){
    // Initialization
    var isDown = false;
    // var colors = [0x5D0776, 0xEC8A49, 0xAF3666, 0xF6C84C, 0x4C779A];
    // var colorCount = 0;
    var color = 0;
    var glyph = 0;
    var bg = 0;

    var SM = new Spielmatrix({
        place : document.getElementById('test'),
        width : 20,
        height : 20,
        mousedown : function(x, y) {
            isDown = true;
            chooseRandom();
            SM.color(x, y, bg);
            SM.glyph(x, y, glyph);
            SM.glyphColor(x, y, color);
            SM.play('Blip_Select4');
        },
        mouseup : function(x, y) {
            if (isDown) {
                isDown = false;
            }
        },
        mousemove : function(oldX, oldY, x, y) {
            // SM.log(["mousemove", oldX, oldY, x, y].join(", "));
            if(isDown) {
                SM.color(x, y, bg);
                SM.glyph(x, y, glyph);
                SM.glyphColor(x, y, color);
            }
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
            SM.log(["keydown", key].join(", "));
        },
        keyup : function(key) {
            SM.log(["keyup", key].join(", "));
        }
    });

    var S = SM.selector();

    function drawAll() {
        S().color(bg).glyph(glyph).glyphColor(color);
    }

    function chooseRandom() {
        color = SM.randBetween(0x0, 0xFFFFFF);
        glyph = SM.randBetween(0, 255);
        bg = SM.randBetween(0x0, 0xFFFFFF);
    }
    
    chooseRandom();
    drawAll();

    S().rand(20).set({glyph:0x40, glyphColor:0xFFFFFF});

})();
