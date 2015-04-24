// Test js file for Spielmatrix
(function(){
    var sm = new Spielmatrix({width:10, height:10, defaultColor: 0x007700});
    // Initialization
    var isDown = false;
    var colors = [0x5D0776, 0xEC8A49, 0xAF3666, 0xF6C84C, 0x4C779A];
    var colorCount = 0;
    var color = 0;

    sm.mousedown = function(x, y) {
        drawAll(colors[++colorCount%colors.length]);
        color = colors[++colorCount%colors.length];
        isDown = true;
        sm.draw(x, y, color);

    };

    sm.mouseup = function(x, y) {
        if (isDown) {
            isDown = false;
            sm.draw(x, y, color);
        }
    };

    sm.mousemove = function(oldX, oldY, x, y) {
        // sm.log(["mousemove", oldX, oldY, x, y].join(", "));
        if(isDown) {
            sm.draw(x, y, color);
        }
    };

    sm.mouseenter = function(x, y) {
        // sm.log(["mouseenter", x, y].join(", "));
    };

    sm.mouseleave = function(x, y) {
        // sm.log(["mouseleave", x, y].join(", "));
    };

    sm.update = function(data) {
        // drawAll(colors[++colorCount%colors.length]);
    };

    sm.keydown = function(key) {
        sm.log(["keydown", key].join(", "));
    };

    sm.keyup = function(key) {
        sm.log(["keyup", key].join(", "));
    };

    function drawAll(color) {
        for (var y = 0; y < sm.options.height; ++y) {
            for (var x = 0; x < sm.options.width; ++x) {
                sm.draw(x, y, color);
            }
        }
    }
})();
