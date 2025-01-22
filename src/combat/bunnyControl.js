let isBunnyKnocked = (i) => data.teamData[i].currentHP === 0
function isBunnyFighting(i){
    if(data.combat.currentBunny === null) return false
    return data.combat.currentBunny.teamIndex === i
}

function canBunnyFight(i){
    return !isBunnyKnocked(i) && data.teamData[i].currentHP >= data.teamData[i].stats.health * 0.5
}

function knockBunny(){
    controlCombatBunny(null)
}

function sendHealthyBunny(){
    for (let i = 0; i < data.teamData.length; i++) {
        if(data.teamData[i] === null) continue
        if(canBunnyFight(i)) return controlCombatBunny(data.teamData[i], i)
    }
}

function damageBunny(damage){
    data.combat.currentBunny.data.currentHP -= getShieldedDamage(damage)
    data.teamData[data.combat.currentBunny.teamIndex].currentHP -= getShieldedDamage(damage)
    if(data.combat.currentBunny.data.currentHP <= 0){
        data.combat.currentBunny.currentHP = 0
        data.teamData[data.combat.currentBunny.teamIndex].currentHP = 0
        knockBunny()
    }
}

function getRecoveringBunny(){
    for (let i = 0; i < data.teamData.length; i++) {
        if(data.teamData[i] === null) continue
        if(data.teamData[i].currentHP < data.teamData[i].stats.health && !isBunnyFighting(i)) return i
    }
    return -1
}

function getRecoveryAmount(index){
    return data.teamData[index].stats.health / 300
}

function bunnyRecover(index){
    if(index === -1) return

    const maxHealth = data.teamData[index].stats.health
    data.teamData[index].currentHP += getRecoveryAmount(index)
    if(data.teamData[index].currentHP >= maxHealth){
        data.teamData[index].currentHP = maxHealth
    }
}

function controlCombatBunny(bunny, index = null){
    const isUnassign = bunny === null
    data.combat.currentBunny = isUnassign ? null : {teamIndex: index, data: structuredClone(bunny)}
    DOM(`combatBox`).src = isUnassign ? 'res/fallback.png' : getBunnyImg(bunny.rarity, bunny.id)
    DOM(`combatParagon`).src = isUnassign ? 'res/fallback.png' : getParagonNumber(bunny.paragonLevel)
}