function loadParagonHTML(){
    const paragonRow = DOM('paragonRow')
    const paragonBoxes = Array.from({ length: 4 }, (_, i) => {
        const paragonBox = document.createElement('img')
        paragonBox.addEventListener('click', () => boxControl(i, 'paragon'))
        paragonBox.src = data.paragonData[i] !== null ? getBunnyImg(data.paragonData[i].data.rarity, data.paragonData[i].data.id) : 'res/fallback.png'
        paragonBox.className = 'paragonBox'
        paragonBox.id = `paragonBox${i}`
        paragonBox.style.borderColor = data.paragonData[i] !== null ? '#52255e' : 'gray'
        return paragonBox
    })
    paragonRow.append(...paragonBoxes)
    updateFuseButtonHTML()
}

function canFuse() {
    const firstParagon = data.paragonData[0]
    if (firstParagon === null) return false

    return data.paragonData.every(paragon => paragon !== null
        && paragon.data.rarity === firstParagon.data.rarity
        && paragon.data.id === firstParagon.data.id
        && paragon.data.paragonLevel === firstParagon.data.paragonLevel
    )
}

function updateFuseButtonHTML(){
    if(canFuse()) DOM(`paragonFuse`).style.boxShadow = '0px 0px 10px 1px rgba(82,37,94,0.75)'
    else DOM(`paragonFuse`).style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,0)'
}

function normalizeBunnyData() {
    data.bunnyData = data.bunnyData.filter(bunny => bunny !== null)
}

function paragonFuse(){
    if(!canFuse()) return

    const firstParagonData = data.paragonData[0].data
    let stats = { damage: -1, health: -1, shield: -1, luck: -1 }

    let bunny = {
        rarity: firstParagonData.rarity,
        id: firstParagonData.id,
        paragonLevel: firstParagonData.paragonLevel+1,
        stats: stats,
        currentHP: stats.health
    }

    for (let i = 0; i < data.paragonData.length; i++) {
        for (const stat in data.paragonData[i].data.stats) {
            const statsObject = data.paragonData[i].data.stats
            if(statsObject[stat] > stats[stat]) stats[stat] = statsObject[stat]
        }
        data.bunnyData[data.paragonData[i].index] = null
        resetBoxData(i, 'paragon', true)
    }

    bunny.stats = stats
    bunny.currentHP = stats.health

    addBunny(bunny)
}

let getParagonNumber = (i) => `res/numbers/${i}.svg`