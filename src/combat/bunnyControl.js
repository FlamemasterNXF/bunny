let isBunnyKnocked = (i) => bunnyData[i].currentHP === 0

function damageBunny(index, damage){
    bunnyData[index].currentHP -= damage
    if(bunnyData[index].currentHP < 0) bunnyData[index].currentHP = 0
    if(bunnyData[index].currentHP === 0) knockBunny(index)
}

function getRecoveringBunny(){
    for (let i = 0; i < bunnyData.length; i++) {
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