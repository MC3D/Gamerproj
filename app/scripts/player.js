/* ------------------------------------------------
    Player types and players
*/

var playerTypes = {
    "User": [{
        name: "Mady",
        weapons: [{type:'animalMimicry', points:5}],
        power: 600
    }, {
        name: "Jonathan",
        weapons: [{type:'psychicBlast', points:5}],
        power: 200
    }, {
        name: "Skylar",
        weapons: [{type:'biologicalManipulation', points:5}],
        power: 900
    }, ],
    "Computer": [{
        name: "Mason",
        weapons: [{type:'intellectualStare', points:5}],
        power: 1000
    }, {
        name: "Jake",
        weapons: [{type:'deathWishCoffee', points:5}],
        power: 800
    }, {
        name: "Matt",
        weapons: [{type:'zenKoan', points:5}],
        power: 600
    }]
},
    user,
    computer;

function buildConstructors(playerType) {
    _.each(playerTypes[playerType], function(player) {
        if (playerType == "User")
            window[player.name.toLowerCase()] = new User(player);
        else if (playerType == "Computer")
            window[player.name.toLowerCase()] = new Computer(player);
    });
}

function displayPlayers(data, constructor) {
    _.chain(data).each(function(type) {
        constructor.render({
            "name": type.name
        });
    });
}

var players = playerTypes.Computer.map(function(player){
  return(player.name)
});



$(document).ready(function(){
  var players = ["Jake","Mason","Matt","Mady","Jonathan"]
  var step = 0;
  var limit = players.length - 2;

  setInterval(function(){
    step = (step > limit) ? 0 : step + 1;
    $("#title-image").attr("src","images/"+players[step]+".jpg")

  },5000);
});





function updateHealthBar(){

    $(".human .health span").css({
        width: user.health + "%"
    });
    $(".computer .health span").css({
        width: computer.health + "%"
    });

}


/* ------------------------------------------------
    Add player choices to DOM
*/

userSelect = new Template({
    id: 'select-template',
    where: 'user-select'
});

displayPlayers(playerTypes.User, userSelect);
// displayPlayers(playerTypes.Computer, computerSelect);


/* ------------------------------------------------
    Create Players
*/

function Player(options) {
    options = options || {};
    this.health = 100 || options.health;
    this.id = 1 || options.id;
    this.name = "" || options.name;
    this.voodooFactor = "100" || options.voodooFactor;
    this.weapons = [{type:'sword', points:3}, {type: 'handslap', points: 2}]
}

// Attack prototype
Player.prototype.attack = function(attacked) {
    var hitPoints = Math.floor(Math.random() * 10);
    attacked.health = attacked.health - hitPoints;
    if (this instanceof User) {
        $(".human .attack-history").html("<li>Attacked and took " + hitPoints + " health points from " + computer.name + "</li>");
    } else
        $(".computer .attack-history").html("<li>Attacked and took " + hitPoints + " health points from " + user.name + "</li>");
};


/* ------------------------------------------------
    Create Users (human)
*/

function User(options) {
    if (!options) options = {};
    Player.apply(this, arguments);
    this.weapons = _.union(options.weapons,this.weapons) || "";
    this.power = options.power || "";
    this.name = options.name || "";
}
User.prototype = Object.create(Player.prototype);

buildConstructors("User");


/* ------------------------------------------------
    Create Computers (enemies)
*/

function Computer(options) {
    if (!options) options = {};
    Player.apply(this, arguments);
    this.weapons = _.union(options.weapons,this.weapons) || "";
    this.power = options.power || "";
    this.name = options.name || "";
}
Computer.prototype = Object.create(Player.prototype);

buildConstructors("Computer");


/* ------------------------------------------------
  Click Events
*/

var renderWeapons = new Template({
  id: "weapon-options",
  where: "human-weapons"
});

function addWeapons(user){

  console.log("User:",user);

  _.each(user.weapons, function(weapon){
    renderWeapons.render({
      weapon: weapon.type,
      points: weapon.points
    })
  })

};




// Play
$(document).on("click", ".play", function(e) {
    e.preventDefault();
    var userName = $(".user-select").val();
    // var computerName = $(".computer-select").val();
    var computerName = playerTypes.Computer.map(function(player){
      return(player.name)
    });

    var computerName = computerName[Math.floor(Math.random() * computerName.length)];

    userSelection = new Template({
        id: 'human-name',
        where: 'human'
    });

    userSelection.render({
      "name":userName
    });

    computerSelection = new Template({
        id: 'computer-name',
        where: 'computer'
    });

    computerSelection.render({
      "name":computerName
    });

    user = window[userName.toLowerCase()];
    computer = window[computerName.toLowerCase()];

    addWeapons(user);

    $(".human p").html("<p>" + user.name + "</p>");
    $(".computer p").html("<p>" + computer.name + "</p>");

    $(".main-wrap").removeClass("hide");
    $("#home").addClass("hide");
});


// Attack method
$(document).on("click", ".attack", function(e) {
    e.preventDefault();


    user.attack(computer);
    computer.attack(user);


    if (user.health <= 0 && user.health < computer.health) {
        $(".attack").addClass("hide");
        $(".main-wrap").addClass("hide");
        $(".you-lose").removeClass("hide");
    }

    if (computer.health <= 0 && computer.health < user.health) {
        $(".attack").addClass("hide");
        $(".main-wrap").addClass("hide");
        $(".you-win").removeClass("hide");
    }

    updateHealthBar();

    $('#human-image').toggleClass('human-attack');
    $('#computer-image').toggleClass('computer-attack');
    $('#human-image').toggleClass('human-idle');
    $('#computer-image').toggleClass('computer-idle')


    setTimeout(function(){
    $('#human-image').toggleClass('human-attack');
    $('#computer-image').toggleClass('computer-attack')
    $('#human-image').toggleClass('human-idle');
    $('#computer-image').toggleClass('computer-idle')
  }, 1000);

});

// Magic button
$(document).on("click", ".magic", function(e) {
    e.preventDefault();
    var magicAffectTime = 5,
        i = 0,
        magicInterval;
    magicInterval = setInterval(function(){
            console.log("Using magic - reduction", computer);
            computer.health = computer.health - 5;
            updateHealthBar();
            if (++i === magicAffectTime) {
                window.clearInterval(magicInterval);
            }
        },2000);
});
