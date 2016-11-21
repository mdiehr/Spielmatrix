// tweener example
(function(){
    var screenSize = Math.min(window.innerWidth, window.innerHeight) - 20;
    var numTiles = 32;
    var tileSize = Math.floor(screenSize / numTiles);
    var sm = new Spielmatrix({
        place : document.getElementById('tweener'),
        width : numTiles,
        height : numTiles,
        tileSize : tileSize,
        defaultColor : 0x0,
        update : function(data) {
            timeElapsed += data.time * 0.003;
            colorAll(timeElapsed);
        }
    });

    // Initialization
    var timeElapsed = 0;

    colorAll(0);

    function sineColor(t) {
        var r = Math.round(255 * 0.5 * (1 + Math.sin(t)));
        var g = Math.round(255 * 0.5 * (1 + Math.sin(t + Math.PI*2/3)));
        var b = Math.round(255 * 0.5 * (1 + Math.sin(t + Math.PI*4/3)));
        return r << 16 | g << 8 | b;
    }

    function getGlyph(time) {
        return Math.floor(time) % 256;

    }

    function colorAll(t) {
        var tileTime;
        for (var y = 0; y < sm.options.height; ++y) {
            for (var x = 0; x < sm.options.width; ++x) {
                tileTime = t + (x + y + 6*Math.sin(y/6)) * 0.07;
                sm.color(x, y, sineColor(tileTime));
                sm.glyph(x, y, getGlyph(tileTime));
                sm.glyphColor(x, y, sineColor(-tileTime));
            }
        }
    }
})();
