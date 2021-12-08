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
}

//for loop 
for (var i = 0; i < enemyNames.length; i++) {
  if (playerHealth > 0) {
    window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
    var pickedEnemyName = enemyNames[i];
  enemyHealth = 50;
  fight(pickedEnemyName);
  }
  else {
    window.alert("You have lost your robot in battle! Game Over!");
  }
}