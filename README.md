# Spielmatrix
A tile-based game engine for prototyping abstract games.

## Getting Started
Create a new .js file and name it game.js.

Create a new .html file and name it whatever you'd like. Place this in it:

```html
<!DOCTYPE HTML>
<html>
<head>
    <title>Spielmatrix</title>
    <script src="./lib/spielmatrix.js"></script>
    <script src="./lib/tile.js"></script>
    <script src="./lib/keyboard.js"></script>
    <script src="./lib/mouse.js"></script>
    <script src="./lib/utilities.js"></script>
    <script src="./bin/keydrown.js"></script>
    <script src="./bin/pixi.js"></script>
</head>
    <body>
        <script src="./game.js"></script>
    </body>
</html>
```

## Example game.js template

```js
// Game.js file for Spielmatrix
(function(){
    // Initialization
    var sm = new Spielmatrix({
        width:10,
        height:10,
        defaultColor: 0x336699,
        tileSize: 32,
        mousedown : function(x, y) {},
        mouseup : function(x, y) {},
        mousemove : function(oldX, oldY, x, y) {},
        mouseenter : function(x, y) {},
        mouseleave : function(x, y) {},
        mouseout : function(x, y) {},
        mouseover : function(x, y) {},
        update : function(data) {},
        keydown : function(key) {},
        keyup : function(key) {}
    });
})();
```

## API
Creating a Spielmatrix instance:
```js
var sm = new Spielmatrix(options);
```
options is an object which specifies how the Spielmatrix instance will look and behave.

### Basic options
- width: The number of horizontal tiles. Defaults to 10.
- height: The number of vertical tiles. Defaults to 10.
- defaultColor : The starting color of all tiles. Defaults to 0x336699.
- tileSize: The pixel size of all tiles. Defaults to 50.

### Event options
You can register event methods which are called whenever something of interest happens in the engine.

#### update
Called every rendering frame. The amount of time that passed is sent in the variable data.time. Measured in seconds.
```js
update : function(data) {
    sm.log("Delta time: " + data.time);
}
```

#### keydown
A key was pressed.
```js
keydown : function(key) {
    sm.log("Key down: " + key);
}
```

#### keyup
A key was released.
```js
keyup : function(key) {
    sm.log("Key up: " + key);
}
```

#### mousedown
The mouse button was pressed.
```js
mousedown : function(x, y) {
    sm.log("Mouse down: " + x + ", " + y);
}
```

#### mouseup
The mouse button was released.
```js
mouseup : function(x, y) {
    sm.log("Mouse up: " + x + ", " + y);
}
```

#### mousemove
The mouse moved from one tile to another.
```js
mousemove : function(oldX, oldY, x, y) {
    sm.log("Mouse moved: " + oldX + ", " + oldY + " " + x + ", " + y);
}
```

#### mouseenter
The mouse entered a tile.
```js
mouseenter : function(x, y) {
    sm.log("Mouse entered: " + x + ", " + y);
}
```

#### mouseleave
The mouse left a tile.
```js
mouseleave : function(x, y) {
    sm.log("Mouse left: " + x + ", " + y);
}
```

#### mouseover
The mouse entered the tile area.
```js
mouseover : function(x, y) {
    sm.log("Mouse over: " + x + ", " + y);
}
```

#### mouseout
The mouse left the tile area.
```js
mouseout : function(x, y) {
    sm.log("Mouse out: " + x + ", " + y);
}
```

### Spielmatrix Methods

#### color
Sets the color of the tile at x, y
```js
sm.color(x, y, color);
```

#### draw
Sets the color of the tile at x, y. Alias of color.
```js
sm.draw(x, y, color);
```

#### glyph
Changes the glyph of the tile at x, y.
```js
sm.glyph(x, y, index);
```

#### glyphColor
Changes the color of the glyph of the tile at x, y.
```js
sm.glyphColor(x, y, color);
```

#### tile
Returns a reference to the tile at x, y.
```js
sm.tile(x, y);
```

#### randBetween
Returns an integer between lo and hi, inclusive.
```js
sm.randBetween(lo, hi);
```

#### log
Logs a message to the debug console.
```js
sm.log(obj);
```

### Tile Methods

#### Tile.prototype.setColor
Changes the color of the tile.
```js
tile.setColor(color);
```

#### Tile.prototype.setColorGlyph
Changes the color of the glyph on the tile.
```js
tile.setColorGlyph(color);
```

#### Tile.prototype.setGlyph
Changes the glyph on the tile.
```js
tile.setGlyph(index);
```
