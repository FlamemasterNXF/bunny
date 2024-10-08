function openLootbox(){
    let rarity = getRarityByNumber(getRandom(0, 1001))
    let bunnyID = getRandom(0, getBunniesByRarity(rarity).length)

    let bunny = {
        rarity: rarity,
        id: bunnyID
    }

    console.log(bunny)
    //data.bunnyData.append(bunny)
}

let getSavedBunny = (i) => bunnyData[i]
let getSavedBunnyRarity = (i) => bunnyData[i].rarity
let getSavedBunnyID = (i) => bunnyData[i].id

function getRarityByNumber(n){
    if (n === 1) return 5 // 0.1%: Mythical
    if (1 < n && n <= 31) return 4 // 3%: Legendary
    if (31 < n && n <= 91) return 3 // 6%: Ultra Rare
    if (91 < n && n <= 211) return 2 // 12%: Rare
    if (211 < n && n <= 391) return 1 // 18%: Uncommon
    if (341 < n) return 0 // ~60.9%: Common
}