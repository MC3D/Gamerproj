/* ------------------------------------------------
    Player types and players
*/
var playerTypes = {
    "User": [{
        name: "Mady",
        power: 600
    }, {
        name: "Jonathan",
        power: 200
    }, {
        name: "Skylar",
        power: 900
    }, ],
    "Computer": [{
        name: "Mason",
        weapon: "intellectualStare",
        power: 1000
    }, {
        name: "Jake",
        weapon: "deathWishCoffee",
        power: 800
    }, {
        name: "Matt",
        weapon: "zenKoan",
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
        console.log(type.name);
        constructor.render({
            "name": type.name
        });
    });
}

/* ------------------------------------------------
    Add player choices to DOM
*/

userSelect = new Template({
    id: 'select-template',
    where: 'user-select'
});

computerSelect = new Template({
    id: 'select-template',
    where: 'computer-select'
});

displayPlayers(playerTypes.User, userSelect);
displayPlayers(playerTypes.Computer, computerSelect);


/* ------------------------------------------------
    Create Players
*/

function Player(options) {
    options = options || {};
    this.health = 100 || options.health;
    this.id = 1 || options.id;
    this.name = "" || options.name;
    this.voodooFactor = "100" || options.voodooFactor;
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
    this.weapon = options.weapon || "";
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
    this.weapon = options.weapon || "";
    this.power = options.power || "";
    this.name = options.name || "";
}
Computer.prototype = Object.create(Player.prototype);

buildConstructors("Computer");

/* ------------------------------------------------
  Click Events 
*/

// Play
$(document).on("click", ".play", function(e) {
    e.preventDefault();
    var userName = $(".user-select").val();
    var computerName = $(".computer-select").val();

    user = window[userName.toLowerCase()];
    computer = window[computerName.toLowerCase()];

    $(".human p").html("<p>" + user.name + "</p>");
    $(".computer p").html("<p>" + computer.name + "</p>");

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

    $(".human .health span").css({
        width: user.health + "%"
    });
    $(".computer .health span").css({
        width: computer.health + "%"
    });

});