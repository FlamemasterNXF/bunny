function getNewBunnyFactor(){
    return data.combat.currentStage / (data.combat.currentStage - getRandom(-1, 1))
}

let newStats = {
    bunny: {
        hp: () => (200 * Math.sqrt(data.combat.currentStage))*getNewBunnyFactor(),
        damage: () => (15 * Math.sqrt(data.combat.currentStage))*getNewBunnyFactor(),
        shield: () => (Math.sqrt(data.combat.currentStage)/100)*getNewBunnyFactor(),
        luck: () => (Math.sqrt(data.combat.currentStage-getRandom(0, data.combat.currentStage))/100)*getNewBunnyFactor()
    },
    enemy: {
        hp: () => 100 * nroot(data.combat.currentStage + (data.combat.enemiesDefeatedInStage / 10 ), 1.5),
        damage: () => 10 * nroot(data.combat.currentStage + (data.combat.enemiesDefeatedInStage / 10 ), 1.5)
    }
}

function getShieldedDamage(damage){
    return damage*(1-data.combat.currentBunny.data.stats.shield);
}