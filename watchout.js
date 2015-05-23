// start slingin' some d3 here.

//define svg that game takes place in
//create the obstacles and player inside of the SVG
  //assign object of coordinates to circle
//figure out how to move obstacles
//create timer to invoke the movement of the obstacles
//check the collision in real time
  //keep score for the amount of time player has not
  //been in contact
    //reset score if player is hit

var width = 700;
var height = 450;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("border-width", "2px")
    .attr("border-style", "solid");
/*
var circle = d3.select("svg").append("circle")
    .attr("r",10)
    .attr("cx",100)
    .attr("cy",100);
*/
var randomX = function() {
  return width * Math.random();
}

var randomY = function() {
  return height * Math.random();
}

var Enemy = function(leftOrRight) {
  this.x = randomX();
  this.y = randomY();
  this.moveFirst = leftOrRight;
}

var Player = function() {
  this.x = width / 2;
  this.y = height / 2
}

var allEnemies = function(num) {
  var enemies = [];
  for (var i = 0; i < num; i++) {
    enemies.push(new Enemy(i % 2));
  }
  return enemies;
};

// var createCircle = function(x, y) {
//   var circle = d3.select("svg").append("circle")
//     .attr("r",10)
//     .attr("cx",x)
//     .attr("cy",y)
//     .attr("opacity", 0)
//     .transition()
//     .duration(2000)
//     .attr("opacity", 1);

// }

//function that generates all circles
// var circleGod = function(n) {
//   for (var i = 0; i < n; i++) {
//     createCircle(randomX(), randomY());
//   }
// }

var moveEnemies = function() {
  d3.selectAll("circle")
}

// circleGod(10);
var enemies = allEnemies(10);


// d3.selectAll("circle")
//   .data(enemies);

var createBoard = function() {
  svg.selectAll('circle.enemy')
    .data(enemies)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 10)
    .attr("class", "enemy")
    .attr("opacity", 0)
    .transition()
    .duration(2000)
    .attr("opacity", 1);
//debugger;
  svg.selectAll('circle.player')
    .data([new Player()])
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 10)
    .attr("fill","yellow")
    .attr("class", "player")
    .attr("opacity", 0)
    .transition()
    .duration(2000)
    .attr("opacity", 1);
}


//function
  //after waiting a defined interval of time
  //randomly choose new x and y coordinates for each circle
  //
  //transition to those x and y coordinates

var moveEnemies = function() {
  svg.selectAll('circle').data(allEnemies(10))
    .transition()
    .duration(2000)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
}

createBoard();

// d3.timer(moveEnemies, 3000);
setInterval(moveEnemies, 3000);







