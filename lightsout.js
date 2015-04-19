
var sm = new Spielmatrix({width:20, height:10, defaultColor: 0x007700});

(function lightsOut (sm) {
    // Initialization
    var isDown = false;
    var colors = [0x5D0776, 0xEC8A49, 0xAF3666, 0xF6C84C, 0x4C779A];
    var colorCount = 0;
    var color = 0;

    // Fill grid
    for (var y = 0; y < 10; ++y) {
        for (var x = 0; x < 20; ++x) {
            // sm.draw(x, y, 0xAAAAAA);
        }
    }

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
        console.log("Test");
    }

})(sm);