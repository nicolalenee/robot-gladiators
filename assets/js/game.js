//Player information
var playerName = window.prompt("What's your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;
var playerMoney = 10;

//Enemy-Robots information 
var enemyNames = ["Mark", "Jaehyun", "Johnny"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
  //window.alert("Welcome to Robot Gladiators!");

  while(playerHealth > 0 && enemyHealth > 0) {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    //if skip and confirm skip, stop loop
    if(promptFight === "skip" || promptFight === "SKIP") {
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      if (confirmSkip) {
        window.alert(`${playerName} has decided to skip this fight. Goodbye!`);
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney);
        break;
      }
    }
    //if fight
    enemyHealth = Math.max(0, enemyHealth - playerAttack);
    console.log(
      `${playerName} attcked ${enemyName}. ${enemyName} now has ${enemyHealth} health remaining.`
    );
    
    //check enemy's health
    if(enemyHealth <= 0) {
      window.alert(`${enemyName} has died!`);
      playerMoney = playerMoney + 20;
      break;
    } else {
      window.alert(`${enemyName} still has ${enemyHealth} health left.`);
    }

    //remove player health
    var damage = randomNumber(enemyAttack - 3, enemyAttack);
    playerHealth = Math.max(0, playerHealth - damage);
    //TEST
    console.log(playerHealth)
    console.log(
      `${enemyName} attacked ${playerName}. ${playerName} now has ${playerHealth} remaining.`
    );
    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + ' has died!');
      //leave loop if dead
      break;
    } else {
      window.alert(playerName + ' still has ' + playerHealth + ' health left.');
    }
  }
};

// start a new game
var startGame = function () {
  //player stats reset
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
      var pickedEnemyName = enemyNames[i];
      //generate random damage 
      var damage = randomNumber(playerAttack - 3, playerAttack);
      enemyHealth = Math.max(0, enemyHealth - damage);
      //TEST
      console.log(enemyHealth);
      fight(pickedEnemyName);
      //if we're not at the last enemy in the array
      if (playerHealth > 0 && i < enemyNames.length - 1) {
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
  if (playerHealth > 0) {
    window.alert(`Great job, you've survived the game! You now have a score of ${playerMoney}.`);
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
      if(playerMoney >= 7){
      window.alert("Refilling player's health by 20 for 7 dollars.");
      //+health -money
      playerHealth = playerHealth + 20;
      playerMoney = playerMoney - 7;
      } else {
        window.alert("You don't have enough money!");
      }
      break;
    
      case "UPGRADE":
      case "upgrade":
      if(playerMoney >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars");
      //+attack - money
      playerAttack = playerAttack + 6;
      playerMoney = playerMoney -7;
      } else {
        window.alert("You don't have enough money!");
      }
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


//page load game starts
startGame();