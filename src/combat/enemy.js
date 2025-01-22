function makeFirstTimeEnemy(){
    data.enemyData = {
        currentHP: 100,
        maxHP: 100,
        damage: 1,
        id: 4,
    }
}

function getStageRequirement(){
    if(data.combat.currentStage > 9) return 10
    return data.combat.currentStage
}

function advanceStage(){
    data.combat.enemiesDefeatedInStage = 0
    ++data.combat.currentStage
    openLootbox()
}

function defeatEnemy(){
    ++data.combat.enemiesDefeatedInStage
    if(data.combat.enemiesDefeatedInStage === getStageRequirement()) advanceStage()
    data.enemyData = {
        currentHP: newStats.enemy.hp(),
        maxHP: newStats.enemy.hp(),
        damage: newStats.enemy.damage(),
        id: getRandom(0, 5)
    }
    updateEnemyHTML()
    if(data.nav === 'combat') updateCombatHeaderHTML()
}

function damageEnemy(damage){
    data.enemyData.currentHP -= damage
    if(data.enemyData.currentHP < 0) defeatEnemy()
}