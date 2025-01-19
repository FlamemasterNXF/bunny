function makeFirstTimeEnemy(){
    data.enemyData = {
        currentHP: 100,
        maxHP: 100,
        damage: 1,
        id: 4,
    }
}

function damageEnemy(damage){
    data.enemyData.currentHP -= damage
    if(data.enemyData.currentHP < 0) defeatEnemy()
}

function defeatEnemy(){

}