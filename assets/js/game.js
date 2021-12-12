//function to generate a random numeric value\
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};


//fight or skip round logic function
var fightOrSkip = function() {
  //ask player if they'd like to fight or skip using the fightOrSkip function
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
  //Conditonal Recursive Function Call
  if (!promptFight){
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  //if player picks "skip", confirm then stop the loop
  promptFight = promptFight.toLowerCase();
  if(promptFight === "skip") {
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    //if yes then leave the fight
    if (confirmSkip) {
      window.alert(`${playerInfo.name} has decided to skip this fight. Goodbye!`);
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      //return true if player wants to leave
      return true;
    }
  }

  // if fight return false (player does NOT want to skip the fight)
  return false;
}

//fight function
var fight = function(enemy) {
  //keep track of who goes first
  var isPlayerTurn = true;
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }
  while (playerInfo.health > 0 && enemy.health > 0) {
    //ask player if they'd like to fight or skip using the fightOrSkip function
    if (fightOrSkip()) {
      //if true, break loop (yes the player DOES want to skip the fight)
      break;
    }
    //generate random damage value based on player's attack value
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      `${playerInfo.name} attacked ${enemy.name}. ${enemy.name} now has ${enemy.health} health remaining.`
    );
    
    //check enemy's health
    if(enemy.health <= 0) {
      window.alert(`${enemy.name} has died!`);
      playerInfo.money = playerInfo.money + 20;
      break;
    } else {
      window.alert(`${enemy.name} still has ${enemy.health} health left.`);
    }

    //remove player health
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      `${enemy.name} attacked ${playerInfo.name}. ${playerInfo.name} now has ${playerInfo.health} remaining.`
    );
    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      //leave loop if dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
    //switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

// start a new game
var startGame = function() {
  //player stats reset
  playerInfo.reset();
  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
      var pickedEnemyObj = enemyInfo[i];
      //generate random damage 
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
      break;
    }
  }

  //after loop ends, player has no health or enemies to fight, therefore endGame
  endGame();
};

//end entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");
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
  var shopOptionPrompt = window.prompt("Would you like to REFILL, your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for 'REFILL', 2 for 'UPGRADE', or 3 for 'LEAVE'.");

  //convert case statement data type
  shopOptionPrompt = parseInt(shopOptionPrompt);
  //shop option switch
  switch(shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    
    case 2:
      playerInfo.upgradeAttack();
      break;

    case 3:
      window.alert("Leaving the store.");
      //do nothing so function ends
      break;
    
    default: 
      window.alert("You did not pick a valid option. Try again.");

    //call shop() again to force player to pick a valid option
    shop();
    break;
  }
};
//END THE GAME

//variable definition and objects

//function to set player name
var getPlayerName = function() {
  var name = "";

  //add loop here with prompt and conditon
  while (name === "" || name === "null") {
    name = prompt("What is your robot's name?");
  }
  console.log(`Your robot's name is ${name}`);
  return name;
};

//player info object
var playerInfo = {
  name: getPlayerName(),
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
      window.alert("You don't have enough money!");
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

//Enemy-Robots info object
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

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);


//page load game starts
startGame();