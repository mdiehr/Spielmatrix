// Key event example for the Spielmatrix game engine

(function(){
    // Game variables
    var w = 18, h = 10;
    var colors = [0x000000, 0xFFFF00, 0x336699];
    var player = {x:1, y:1, color:0x22AA22};

    // Initialize engine
    var sm = new Spielmatrix({
        place : document.getElementById('keys'),
        width : w,
        height : h,
        defaultColor : colors[0],
        tileSize : 50,
        keydown : keydown
    });

    drawPlayer();

    function drawPlayer() {
        sm.color(player.x, player.y, player.color);
    }

    function erasePlayer() {
        sm.color(player.x, player.y, colors[2]);
    }

    function keydown(key) {
        erasePlayer();

        if (key === 'UP' && player.y > 0) {
            player.y--;
        } else if (key === "DOWN" && player.y < h-1) {
            player.y++;
        } else if (key === "LEFT" && player.x > 0) {
            player.x--;
        } else if (key === "RIGHT" && player.x < w-1) {
            player.x++;
        }

        drawPlayer();
    }

})();
