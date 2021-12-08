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
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney);
        break;
      }
    }
    //if fight
    enemyHealth = enemyHealth - playerAttack;
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
    playerHealth = playerHealth - enemyAttack;
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
      enemyHealth = 50;
      fight(pickedEnemyName);
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
  var playAgainConfirm = windows.confirm("Would you like to play again?");

  if(playAgainConfirm) {
    //restart game
    startGame();
  } else {
    window.alert("Thanks you for playing Robot Gladiatros! Come back soon!");
  }
};

//page load game starts
startGame();