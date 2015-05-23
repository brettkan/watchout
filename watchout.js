// Inputs
var width = 700;
var height = 450;
var numberOfEnemies = prompt("How many enemies do you want?", 20);
var gameObject = {
  highScore: 0,
  currentScore: 0,
  collisions: 0,
  intervalID: null
};

var currentNode = document.getElementById("current-score");
// var collisionsNode = document.getElementById("collisions");
var highscoreNode = document.getElementById("high-score");
var iterateScore = function() {
  gameObject.currentScore++;
  currentNode.textContent = '' + gameObject.currentScore;
};

var startTimer = function() {
  gameObject.intervalID = d3.timer(iterateScore);
};

var stopTimer = function() {
  if(gameObject.currentScore > gameObject.highScore) {
    gameObject.highScore = gameObject.currentScore;
    highscoreNode.textContent = '' + gameObject.highScore;
  }
  gameObject.currentScore = 0;
  gameObject.collisions++;
  // collisionsNode.textContent = '' + gameObject.collisions;
};

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("border-width", "2px")
    .attr("border-style", "solid");

// Function which random x-coordinate
var randomX = function() {
  return width * Math.random();
};

// Function which creates random y-coordinate
var randomY = function() {
  return height * Math.random();
};

// Constructor function of player class
// with coordinates set at the middle of the board
var Player = function() {
  this.x = width / 2;
  this.y = height / 2
};

// Constructor function of enemy class
// set at random position
var Enemy = function(leftOrRight) {
  this.x = randomX();
  this.y = randomY();
  this.moveFirst = leftOrRight;
};

// Constructor function which creates an array of enemy objects.
var allEnemies = function(num) {
  var enemies = [];
  for (var i = 0; i < num; i++) {
    enemies.push(new Enemy(i % 2));
  }
  return enemies;
};

var createBoard = function() {
  svg.selectAll('circle.enemy')
    .data(allEnemies(numberOfEnemies))
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

  var drag = d3.behavior.drag()
    .on("drag", function(d,i) {
      console.log(d3.event);
      d.x += d3.event.dx;
      d.y += d3.event.dy;
      d3.select(this).attr("cx", d.x);
      d3.select(this).attr("cy", d.y);
    });


  svg.selectAll('circle.player')
    .data([new Player()])
    .enter()
    .append("circle")
    .call(drag)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 10)
    .attr("fill","yellow")
    .attr("class", "player")
    .attr("opacity", 0)
    .transition()
    .duration(2000)
    .attr("opacity", 1);
};


var moveEnemies = function() {

  svg.selectAll('circle.enemy').data(allEnemies(numberOfEnemies))
    .transition()
    .duration(2000)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .tween(this, function(t) {
      var i = d3.interpolateRound(0,50);
      return function(t) {

        if (checkCollisions(this)) {
          stopTimer();
        };

        return i(t);
      }
};

var checkCollisions = function(enemy) {
  var playerX = svg.selectAll('circle.player')[0][0].cx.animVal.value;
  var playerY = svg.selectAll('circle.player')[0][0].cy.animVal.value;

  var enemyX = enemy.cx.animVal.value;
  var enemyY = enemy.cy.animVal.value;
  var distanceX = enemyX - playerX;
  var distanceY = enemyY - playerY;

  var totalDistance = Math.sqrt(Math.pow(distanceX,2)+Math.pow(distanceY,2));
  var playerRadius =  svg.selectAll('circle.player')[0][0].r.animVal.value;
  var enemyRadius = enemy.r.animVal.value;
  var minCollision = playerRadius + enemyRadius;
  if(totalDistance < minCollision) {
    return true;
  }
};

createBoard();
setTimeout(startTimer, 2000);
// d3.timer(moveEnemies, 3000);
setInterval(moveEnemies, 2000);







