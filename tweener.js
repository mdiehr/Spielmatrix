// tweener example
(function(){
    var screenSize = Math.min(window.innerWidth, window.innerHeight) - 20;
    var numTiles = 64;
    var tileSize = Math.floor(screenSize / numTiles);
    var sm = new Spielmatrix({width:numTiles, height:numTiles, tileSize: tileSize, defaultColor: 0x0});

    // Initialization
    var timeElapsed = 0;

    colorAll(0);

    function sineColor(t) {
        var r = Math.round(255 * 0.5 * (1 + Math.sin(t)));
        var g = Math.round(255 * 0.5 * (1 + Math.sin(t + Math.PI*2/3)));
        var b = Math.round(255 * 0.5 * (1 + Math.sin(t + Math.PI*4/3)));
        return r << 16 | g << 8 | b;
    }

    sm.update = function(data) {
        timeElapsed += data.time * 0.003;
        colorAll(timeElapsed);
    }

    function colorAll(t) {
        for (var y = 0; y < sm.options.height; ++y) {
            for (var x = 0; x < sm.options.width; ++x) {
                tileTime = t + (x + y) * 0.07;
                sm.draw(x, y, sineColor(tileTime));
            }
        }
    }
})();
