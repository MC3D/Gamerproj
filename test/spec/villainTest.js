function Player(name){
  this.name = name;
  this.health = 100;
}

function Squirrel(name){
  Player.apply(this, arguments);

  this.hasEvilLaugh = true;
  this.hasNuts = true;
}

Squirrel.prototype = Object.create(Player.prototype);

Squirrel.prototype.useEvilLaugh = function(){
  console.log('Mwahahahahaha!');
};

var Charlie = new Squirrel("Charlie");

Charlie.useEvilLaugh();
