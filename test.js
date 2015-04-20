(function TestGame () {
    var sm = new Spielmatrix({width:10, height:10, defaultColor: 0x007700});
    // Initialization
    var isDown = false;
    var colors = [0x5D0776, 0xEC8A49, 0xAF3666, 0xF6C84C, 0x4C779A];
    var colorCount = 0;
    var color = 0;

    sm.mousedown = function(x, y) {
        color = colors[++colorCount%colors.length];
        isDown = true;
        sm.draw(x, y, color);
    };

    sm.mouseup = function(x, y) {
        isDown = false;
        sm.draw(x, y, color);
    };

    sm.mousemove = function(x, y) {
        if(!isDown) return;
        sm.draw(x, y, color);
    };

    sm.update = function(data) {
        drawAll(colors[++colorCount%colors.length]);
    }

    function drawAll(color) {
        for (var y = 0; y < sm.options.height; ++y) {
            for (var x = 0; x < sm.options.width; ++x) {
                sm.draw(x, y, color);
            }
        }
    }
})();
