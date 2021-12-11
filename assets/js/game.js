
//fight function
var fight = function(enemy) {
  while(playerInfo.health > 0 && enemy.Health > 0) {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    //if skip and confirm skip, stop loop
    if(promptFight === "skip" || promptFight === "SKIP") {
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      if (confirmSkip) {
        window.alert(`${playerInfo.name} has decided to skip this fight. Goodbye!`);
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money);
        break;
      }
    }
    //if fight
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - playerInfo.attack);
    console.log(
      `${playerInfo.name} attacked ${enemyInfo.name}. ${enemyInfo.name} now has ${enemy.health} health remaining.`
    );
    
    //check enemy's health
    if(enemy.health <= 0) {
      window.alert(`${enemyInfo.name} has died!`);
      playerInfo.money = playerInfo.money + 20;
      break;
    } else {
      window.alert(`${enemyInfo.name} still has ${enemy.health} health left.`);
    }

    //remove player health
    var damage = randomNumber(enemyInfo.attack - 3, enemyInfo.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      `${enemyInfo.name} attacked ${playerInfo.name}. ${playerInfo.name} now has ${playerInfo.health} remaining.`
    );
    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      //leave loop if dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

// start a new game
var startGame = function () {
  //player stats reset
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
      var pickedEnemyObj = enemyInfo[i];
      //generate random damage 
      //var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      pickedEnemyObj.health = randomNumber(40, 60);
      fight(pickedEnemyObj);
      //if we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        if (storeConfirm) {
        shop(); 
        }
      }
    } else {
      window.alert("You have lost your robot in battle! Game Over!");
    }
  }

  //after loop ends, player has no health or enemies to fight, therefore endGame
  endGame();
};

//end entire game
var endGame = function() {
  //if player is still alive, WIN
  if (playerInfo.health > 0) {
    window.alert(`Great job, you've survived the game! You now have a score of ${playerInfo.money}.`);
  } else {
    window.alert("You've lost your robot in battle.");
  }

  //play again?
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if(playAgainConfirm) {
    //restart game
    startGame();
  } else {
    window.alert("Thanks you for playing Robot Gladiatros! Come back soon!");
  }
};

//shop function
var shop = function () {
  var shopOptionPrompt = window.prompt("Would you like to REFILL, your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

  //shop option switch
  switch(shopOptionPrompt) {
    case "REFILL":
    case "refill":
      playerInfo.refillHealth();
      break;
    
      case "UPGRADE":
      case "upgrade":
      playerInfo.upgradeAttack();
      break;

      case "LEAVE":
      case "leave":
      window.alert("Leaving the store.");
      //do nothing so function ends
      break;
    
    default: 
      window.alert("You did not pick a valid option. Try again.");

    //call shop() again to force player to pick a valid option
    shop();
    break;
  }
}

//function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

//player object
var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You dno't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars");
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

//Enemy-Robots object
var enemyInfo = [
  {
    name: 'Mark',
    attack: randomNumber(10, 14)
  },

  {
    name: 'Jaehyun',
    attack: randomNumber(10, 14)
  },

  {
    name: 'Johnny',
    attack: randomNumber(10, 14)
  }
];

//page load game starts
startGame();