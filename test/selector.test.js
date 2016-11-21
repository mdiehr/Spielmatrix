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

SMTest.prototype.testSelectFunction = function(){
    var tilesCheckerboard = S(function(tile){return (tile.x + tile.y) % 2 === 0;});
    assertEquals(gridWidth * gridHeight / 2, tilesCheckerboard.length);
    var tilesLines = S(function(tile){return tile.x % 2 === 0;});
    assertEquals(gridWidth * gridHeight / 2, tilesLines.length);
};

SMTest.prototype.testSelectNot = function(){
    var middleTiles = S().not({x:0}).not({y:0}).not({x:9}).not({y:9});
    assertEquals((gridWidth-2)*(gridHeight-2), middleTiles.length);
};

SMTest.prototype.testSelectWhere = function(){
    var upperLeft = S({x:0}).where({y:0});
    assertEquals(1, upperLeft.length);
};

SMTest.prototype.testSelectRand = function(){
    var amounts = [0, 1, 8, 17, 65, 99, 100];
    for (var i = 0; i < amounts.length; ++i) {
        var tiles = S().rand(amounts[i]);
        assertEquals(amounts[i], tiles.length);
    }
};
