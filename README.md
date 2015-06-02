# Spielmatrix
A tile-based game engine for prototyping abstract games.

## Getting Started
Download the game template [Spielmatrix.zip](https://github.com/mdiehr/Spielmatrix/blob/master/release/Spielmatrix.zip) and unzip it somewhere on your hard drive.

The template contains a game.js file [like this one](https://github.com/mdiehr/Spielmatrix/blob/master/template/game.js) that you can modify to create your game.

## API
Creating a Spielmatrix instance:
```js
var sm = new Spielmatrix(options);
```
'options' is an object which specifies how the Spielmatrix instance will look and behave.

This is done for you in the template.

### Basic options
- place: The HTML node to place the game inside. Defaults to document.body.
- width: The number of horizontal tiles. Defaults to 10.
- height: The number of vertical tiles. Defaults to 10.
- defaultColor : The starting color of all tiles. Defaults to 0x336699.
- tileSize: The pixel size of all tiles. Defaults to 50.
- renderWidthMax: The maximum width of the rendering area, in pixels. Defaults to 480.
- renderWidthMin: The minimum width of the rendering area, in pixels. Defaults to 240.
- pixelPerfect: Set to true if you want to ensure tiles are rendered at an integer multiple of their base size, to avoid distortion. Defaults to true.
- resizeCanvas: Set to true if you want the canvas to resize dynamically. Defaults to true.
- audioPath: The location to load sound effects from. Defaults to "./sounds/".
- preloadAudio: An array of sound effects to preload. Defaults to null.

### HTML Attribute Options

You can add attributes to the node that the game runs in to override certain basic options.

#### data-width-max
Sets the maximum width of the drawing area, in pixels. Overrides the "renderWidthMax" option. Defaults to 480.
```html
data-width-max="480"
```

#### data-width-min
Sets the minimum width of the drawing area, in pixels. Overrides the "renderWidthMin" option. Defaults to 240.
```html
data-width-min="240"
```

#### data-pixel-perfect
Changes the behavior of how the rendering area is allowed to resize. Overrides the "pixelPerfect" option. If true, the tiles are forced to render at an integer multiple of their base size (8px). If false, the tiles can be any integer size. Defaults to true.
```html
data-pixel-perfect="true"
```

#### data-resize-canvas
If set to true, the canvas is allowed to dynamically resize. Otherwise, it is set to the renderWidthMax initially, and does not change. Overrides the "resizeCanvas" option. Defaults to true.
```html
data-resize-canvas="true"
```

### Complete div example

```html
<div id="test" data-width-max="1024" data-width-min="320" data-pixel-perfect="true" data-resize-canvas="true"></div>
```


### Spielmatrix Events
You can register event methods which are called whenever something of interest happens in the engine.

#### update
Called every rendering frame. The amount of time that passed is sent in the variable data.time. Measured in seconds.
```js
update : function(data) {
    SM.log("Delta time: " + data.time);
}
```

#### keydown
A key was pressed.
```js
keydown : function(key) {
    SM.log("Key down: " + key);
}
```

#### keyup
A key was released.
```js
keyup : function(key) {
    SM.log("Key up: " + key);
}
```

#### mousedown
The mouse button was pressed.
```js
mousedown : function(x, y) {
    SM.log("Mouse down: " + x + ", " + y);
}
```

#### mouseup
The mouse button was released.
```js
mouseup : function(x, y) {
    SM.log("Mouse up: " + x + ", " + y);
}
```

#### mousemove
The mouse moved from one tile to another.
```js
mousemove : function(oldX, oldY, x, y) {
    SM.log("Mouse moved: " + oldX + ", " + oldY + " " + x + ", " + y);
}
```

#### mouseenter
The mouse entered a tile.
```js
mouseenter : function(x, y) {
    SM.log("Mouse entered: " + x + ", " + y);
}
```

#### mouseleave
The mouse left a tile.
```js
mouseleave : function(x, y) {
    SM.log("Mouse left: " + x + ", " + y);
}
```

#### mouseover
The mouse entered the tile area.
```js
mouseover : function(x, y) {
    SM.log("Mouse over: " + x + ", " + y);
}
```

#### mouseout
The mouse left the tile area.
```js
mouseout : function(x, y) {
    SM.log("Mouse out: " + x + ", " + y);
}
```


### Spielmatrix Methods

#### SM.color(x, y, color)
Sets the color of the tile at x, y
```js
SM.color(x, y, 0x229922);
```

#### SM.glyph(x, y, glyph)
Changes the glyph of the tile at x, y.
```js
SM.glyph(x, y, 0x40);
```

#### SM.glyphColor(x, y, color)
Changes the color of the glyph of the tile at x, y.
```js
SM.glyphColor(x, y, color);
```

#### SM.data(x, y, data)
Changes the stored data of the tile at x, y.
```js
SM.data(x, y, {temperature:72});
```

#### SM.set(x, y, properties)
Sets multiple properties of the tile at x, y.
```js
SM.set(x, y, {color:color, glyph:glyph, glyphColor:glyphColor, data:data});
```

#### SM.tile(x, y)
Returns a reference to the tile at x, y.
```js
var tile = SM.tile(2, 4);
```

#### SM.randBetween(lo, hi)
Returns an integer between lo and hi, inclusive.
```js
var result = SM.randBetween(1, 20);
```

#### SM.log(message)
Logs a message to the debug console.
```js
SM.log("Hello");
```


### Audio

#### SM.play(soundName)
Plays the specified sound file. The following sounds are built into the engine:

```
'Appear', 'Blip1', 'Blip2', 'Blip3', 'Blip4', 'Coin1', 'Coin2', 'Coin3', 'Explosion1', 'Explosion2', 'Explosion3', 'Export', 'Hit1', 'Hit2', 'Jump1', 'Jump2', 'Laser1', 'Laser2', 'Laser3', 'Modem', 'Powerup1', 'Powerup2', 'Powerup3', 'UhOh1', 'UhOh2', 'UhOh3', 'Yarp'
```

It's recommended to use the 'preloadAudio' option for any sounds that you plan on using in your game.


### Tile Methods

#### Tile.prototype.setColor(color)
Changes the color of the tile.
```js
tile.setColor(0x336699);
```

#### Tile.prototype.setGlyphColor(color)
Changes the color of the glyph on the tile.
```js
tile.setColorGlyph(0x336699);
```

#### Tile.prototype.setGlyph(glyph)
Changes the glyph on the tile.
```js
tile.setGlyph(0x40);
```

#### Tile.prototype.setData(data)
Changes the stored data in the tile.
```js
tile.setData({type:"Tree"});
```

#### Tile.prototype.set(properties)
Sets multiple properties of the tile.
```js
tile.set({color:0x000000, glyph:0x26, glyphColor:0xFF0000, data:"A red &"});
```


### Tile Properties

#### Tile.color
The color of a tile.

```js
var color = tile.color;
```

#### Tile.glyph
The glyph of a tile.

```js
var glyph = tile.glyph;
```

#### Tile.glyphColor
The color of the glyph of a tile.

```js
var glyphColor = tile.glyphColor;
```

#### Tile.data
The data property of a tile.

```js
var data = tile.data;
```


### Tile Selector
You can get a reference to the powerful Tile Selector by invoking the selector() method.

The selector, when invoked, will return a list of tiles that match your query, or every tile in your game if no query is passed.

```js
// Get a reference to the tile selector.
var S = SM.selector();

// Return a list of every tile in your game.
var tiles = S();
```


#### Tile Selection query
The selector can take as an argument either a predicate function, an object describing which properties you are looking for, or a pair of coordinates.

By default, if you don't pass any arguments, it will return a list of every tile in your game.

```js
// Returns every tile in column x=2
var tilesCol = S({x:2});

// Returns every tile in row y=3
var tilesRow = S(function(tile) {
        return tile.y === 3;
    });

// Returns every tile
var allTiles = S();
```

All of the examples below assume that you have a variable S that is set to the tile selector.

### Tile List Methods
Lists of tiles can have operations performed on them to modify the tiles themselves.

#### TileList.color(color)
Sets the color of every tile in the list.

```js
// Set every tile to red.
S().color(0xFF0000);
```

#### TileList.glyph(glyph)
Sets the glyph of every tile in the list.

```js
// Set every tile to show '@'.
S().glyph(0x40);
```

#### TileList.glyphColor(glyphColor)
Sets the glyphColor of every tile in the list.

```js
// Set every tile's glyph color to dark green.
S().glyphColor(0x005500);
```

#### TileList.data(data)
Sets the data of every tile in the list.

```js
// Set every tile have the data "Hello".
S().data("Hello");
```

#### TileList.set(properties)
Sets everything at once on every tile in the list.

```js
// Set all of the properties of every tile in the list.
S().set({color:0x000000, glyph:0x86, glyphColor:0x333333, data:"Dark"});
```

#### TileList.exec(func)
Invokes the function once per tile in the list, passing in tile as the only parameter.

```js
// Increments the data of every tile that has numerical data
S().exec(function(tile) {
    if (typeof tile.data === 'number') {
        tile.data += 1;
    }
});
```

#### TileList.rand(count)
Selects some tile from the list, randomly. If count is omitted, select one tile.

```js
// Chooses 5 tiles and makes them landmines
S().rand(5).set({data:"Landmine"});
```

#### TileList.where(query)
Filter the list to only tiles that satisfy the properties or predicate that you pass in.

Similar to the main selector query, except that passing in nothing at all will result in an empty list.

```js
var tilesX3 = S().where({x:3});
var tilesYGreater2 = S().where(function(tile){ return tile.y > 2; });
```

#### TileList.not(query)
Filter the list to exclude tiles that satisfy the properties or predicate that you pass in.

```js
var tilesThatAreNotBlack = S().not({color:0x000000});
var tilesThatAreNotOnTheDiagonal = S().not(function(tile) { return tile.x === tile.y; });
```
