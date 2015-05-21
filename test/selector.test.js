SMTest = TestCase("Spielmatrix Selector Test");

var SM, S;
var gridWidth = 10;
var gridHeight = 10;

SMTest.prototype.setUp = function(){
    SM = new Spielmatrix({
        width : gridWidth,
        height : gridHeight,
        defaultColor : 0x000000
    });

    S = SM.selector();
};

SMTest.prototype.testSelectAll = function(){
    var tiles = S();
    assertEquals(gridWidth * gridHeight, tiles.length);
};

SMTest.prototype.testSelectCoordinate = function(){
    var tiles = S(1, 2);
    var tile = tiles[0];
    assertEquals(1, tiles.length);
    assertEquals(tile.x, 1);
    assertEquals(tile.y, 2);
};

SMTest.prototype.testSelectProperties = function(){
    var tilesX = S({x:2});
    assertEquals(gridHeight, tilesX.length);
    var tilesY = S({y:3});
    assertEquals(gridWidth, tilesY.length);
    var tilesXY = S({x:2, y:3});
    assertEquals(1, tilesXY.length);
};
