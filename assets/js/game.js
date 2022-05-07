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

//function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

// function to check if player wants to fight or skip
var fightOrSkip = function() {
  // ask fight or flight
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // validate
  if (promptFight === "" || promptFight === null ) {
    window.alert("You need to provide a valid answer! Please try again.");
    // call the function again to interrupt the following function
    return fightOrSkip();
  }
  promptFight = promptFight.toLowerCase();

  if(promptFight === "skip") {
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if true exit fight
    if (confirmSkip) {
      window.alert(playerInfor.name + " has decided to skip this fight. Goodbye!");
      // subtract money for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);
    // break out of function and enter next fight
      return true;
    }
  }
  return false;
}



//fight function
var fight = function(enemy) {
  // who goes first
  var isPlayerTurn = true;

  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }
  while(playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // fight or skip
      if (fightOrSkip()) {
        // if true leave fight and break loop
        break;
      }
      var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);

      // remove enemy health by sub the amount above
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        `${playerInfo.name} attacked ${enemy.name}. ${enemy.name} now has ${enemy.health} health remaining.`
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
        // award player money
        playerInfo.money = playerInfo.money + 20;
        // leave loop since enemy is dead
        break;
      } else {
        window.alert(`${enemy.name} still has ${enemy.health} health left.`);
      }
      // player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack -3, enemy.attack);
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(`${enemy.name} attacked ${playerInfo.name}. ${playerInfo.name} now has ${playerInfo.health} health remaining.`);

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave loop
        break;
      } else { 
        window.alert(`${playerInfo.name} still has ${playerInfo.health} health left.`);
      }
    }
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
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
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
  var highScore = localStorage.getItem("highscore");
  if (highScore === null) {
    highScore = 0;
  }

  // if player has more money than the high score, player has a new high score!
  if (playerInfo.money > highScore) {
    localStorage.setItem("highscore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);

    alert(`${playerInfo.name} now has the high score of ${playerInfo.money}!`);
  } else {
    alert(`${playerInfo.name} did not beat the high score of ${highScore}. Maybe next time!`);
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

//shop function
var shop = function () {
  var shopOptionPrompt = window.prompt("Would you like to REFILL, your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
  // convert answer to an actual number
  shopOptionPrompt = shopOptionPrompt.toLowerCase();
  //shop option switch
  switch(shopOptionPrompt) {
    case 'refill':
      playerInfo.refillHealth();
      break;
    
    case 'upgrade':
      playerInfo.upgradeAttack();
      break;

    case 'leave':
      window.alert("Leaving the store.");
      break;
    
    default: 
      window.alert("You did not pick a valid option. Try again.");
      shop();
      break;
  }
};
//END THE GAME

// function to set player name
var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log(`Your robot's name is ${name}`);
  return name;
}


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