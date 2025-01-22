let isBunnyKnocked = (i) => bunnyData[i].currentHP === 0

function damageBunny(index, damage){
    data.bunnyData[index].currentHP -= damage
    if(data.bunnyData[index].currentHP < 0) data.bunnyData[index].currentHP = 0
    if(data.bunnyData[index].currentHP === 0) knockBunny(index)
}

function getRecoveringBunny(){
    for (let i = 0; i < data.bunnyData.length; i++) {
        if(isBunnyKnocked(i)) return i
    }
}

function getRecoveryAmount(index){
    return data.bunnyData[index].stats.health * 0.01
}

function bunnyRecover(index){
    const maxHealth = data.bunnyData[index].stats.health
    data.bunnyData[index].currentHP += getRecoveryAmount(index)
    if(data.bunnyData[index].currentHP > maxHealth) data.bunnyData[index].currentHP = maxHealth
    if(data.bunnyData[index].currentHP === maxHealth) wakeBunny(index)
}

function controlCombatBunny(bunny){
    const isUnassign = bunny === null
    data.combat.currentBunny = isUnassign ? null : structuredClone(bunny)
    DOM(`combatBox`).src = isUnassign ? 'res/fallback.png' : getBunnyImg(bunny.rarity, bunny.id)
    DOM(`combatParagon`).src = isUnassign ? 'res/fallback.png' : getParagonNumber(bunny.paragonLevel)
}