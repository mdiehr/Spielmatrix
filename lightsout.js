
var sm = new Spielmatrix();

(function lightsOut (sm) {
    var stage = sm.state.stage;

    var graphics = new PIXI.Graphics().beginFill(0xFF0000);
    var liveGraphics = new PIXI.Graphics().beginFill(0xFF0000);
    stage.addChild(graphics);
    stage.addChild(liveGraphics);

    var path = [];

    var isDown = false;
    var color = 0;

    var colors = [0x5D0776, 0xEC8A49, 0xAF3666, 0xF6C84C, 0x4C779A];
    var colorCount = 0;

    stage.mousedown = function(data) {
        isDown = true;
        path = [];
        color = colors[colorCount++ % colors.length];
    }

    stage.mousemove = function(data) {
        if(!isDown) return;

        path.push(data.global.x);
        path.push(data.global.y);
    }

    stage.mouseup = function() {
        isDown = false;
        graphics.beginFill(color);
        graphics.drawPolygon(path)
        graphics.endFill();
        path = [];
    }

    sm.onUpdate(function(){
        liveGraphics.clear();
        liveGraphics.beginFill(color);
        liveGraphics.drawPolygon(path);
    });

})(sm);