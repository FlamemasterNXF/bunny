function weighProbabilities(luck){
    const probabilities = rarityData.map(rarity => rarity.probability)
    const mythicalProbability = probabilities[probabilities.length - 1] // Mythics are not effected by luck

    const weightedProbabilities = probabilities.map((probability, index) => {
        if(index === probabilities.length - 1) return mythicalProbability
        return probability * (1 + luck * (index / (probabilities.length - 2)))
    })

    // I think this normalizes things... hopefully
    const totalWeightedProbability = weightedProbabilities.reduce((sum, probability) => sum + probability, 0)
    return weightedProbabilities.map(probability => probability / totalWeightedProbability)
}

function getLootboxRarity(luck = 0) {
    const weightedRarityData = weighProbabilities(luck)
    const rand = Math.random()
    let cumulativeProbability = 0

    for (let i = 0; i < rarityData.length; i++) {
        cumulativeProbability += weightedRarityData[i]
        if (rand < cumulativeProbability) return i
    }

    console.error(`SERIOUS ERROR in getLootboxRarity(): rand:${rand}, cumulativeProbability:${cumulativeProbability}`)
    return -1
}

function addBunny(bunny){
    console.log(bunny) // TODO: REMOVE DEBUG
    data.bunnyData.push(bunny)
    addBunnyHTML(data.bunnyData.length-1)
}

function openLootbox(luck = 0){
    let rarity = getLootboxRarity()
    if(rarity === -1) console.error(`SERIOUS ERROR in openLootbox(): luck:${luck}`)
    let bunnyID = getRandom(0, getBunniesByRarity(rarity).length)

    let stats = {
        damage: newStats.bunny.damage(),
        health: newStats.bunny.hp(),
        shield: newStats.bunny.shield(),
        luck: newStats.bunny.luck(),
    }
    let bunny = {
        rarity: rarity,
        id: bunnyID,
        paragonLevel: 0,
        currentHP: stats.health,
        stats: stats,
        stageObtained: data.combat.currentStage-1
    }

    addBunny(bunny)
}

let getSavedBunny = (i) => data.bunnyData[i]
let getSavedBunnyRarity = (i) => data.bunnyData[i].rarity
let getSavedBunnyID = (i) => data.bunnyData[i].id