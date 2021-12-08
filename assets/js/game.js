// Game States
//"WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

//Player information
var playerName = window.prompt("What's your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//Enemy-Robots information 
var enemyNames = ["Mark", "Jaehyun", "Johnny"];
var enemyHealth = 50;
var enemyAttack = 12;

//fight function expression
var fight = function(enemyName) {
    //welcome message
    alert('Welcome to Robot Gladiators!');

    while (playerHealth > 0 && enemyHealth > 0) {
        //ask player to play or skip 
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        //if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(`${playerName} has decided to skip this fight. Goodbye!`);
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        //remove enemy's health by subtracting the amount set in the player's attack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(`${playerName} attacked ${enemyName}. ${enemyName} now has ${enemyHealth} health remaining.`);

        //check enemy's health
        if (enemyHealth <= 0) {
            window.alert(`${enemyName} has died!`);

            //award player money for winning
            playerMoney = playerMoney + 20;

            //leave while() loop since enemy is dead
            break;
        } else {
            window.alert(`${enemyName} still has ${enemyHealth} health left.`);
        }

        //remove player's health by subtracting the amount set in the enemy's attack variable
        playerHealth = playerHealth - enemyAttack;
        console.log(`${enemyName} attacked ${playerName}. ${playerName} now has ${playerHealth} health left.`);
        
        //check player's health
        if (playerHealth <= 0) {
            window.alert(`${playerName} has died!`);
            // leave while() loop if player is dead
            break;
        } else {
            window.alert(`${playerName} still has ${playerHealth} health left.`);
        }
    }
};

//calls the fight function multiple times for each enemy-robot
for (var i = 0; i < enemyNames.length; i++) {
    if(playerHealth > 0) {
        //let player know what round they are in 
        window.alert('Welcome to Robot Gladiators! Round ' + ( i + 1) );
    } else {
        window.alert('You have lost your robot in battle! Game Over!');
        break;
    };
    //pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyName = enemyNames[i];
    //reset enemyHealth before starting new fight
    enemyHealth = 50;
    //use debugger to pause script from running and check what's going on
    debugger;
    //pass the pickedEnemyName variable's value into the fight function
    fight(pickedEnemyName);
};