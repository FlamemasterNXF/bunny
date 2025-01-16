function getLootboxRarity(){
    const rand = Math.random()
    let cumulativeProbability = 0

    for (let i = 0; i < rarityData.length; i++) {
        cumulativeProbability += rarityData[i].probability
        if (rand < cumulativeProbability) return i
    }

    return alert(`SERIOUS ERROR IN openLootbox()\nrand:${rand}\ncProb:${cumulativeProbability}`)
}

function openLootbox(){
    let rarity = getLootboxRarity()
    let bunnyID = getRandom(0, getBunniesByRarity(rarity).length)

    let stats = {
        damage: 1,
        health: 1,
        shield: 0,
        luck: 0,
    }
    let bunny = {
        rarity: rarity,
        id: bunnyID,
        paragonLevel: 0,
        stats: stats
    }

    console.log(bunny) // TODO: REMOVE DEBUG
    data.bunnyData.push(bunny)
    addBunnyHTML(data.bunnyData.length-1)
}

let getSavedBunny = (i) => bunnyData[i]
let getSavedBunnyRarity = (i) => bunnyData[i].rarity
let getSavedBunnyID = (i) => bunnyData[i].id