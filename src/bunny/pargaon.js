function loadParagonHTML(){
    const paragonRow = DOM('paragonRow')

    // TODO: possibly standardize this type of "wrapper creation" stuff...? it may be too unique to standardize.
    for (let i = 0; i < 4; i++) {
        const paragonWrapper = Object.assign(document.createElement("div"), {
            className: "bunnyWrapper",
            id: `paragonWrapper${i}`,
        })

        const paragonBox = Object.assign(document.createElement('img'), {
            src: data.paragonData[i] !== null ? getBunnyImg(data.paragonData[i].rarity, data.paragonData[i].id) : 'res/fallback.png',
            className: 'paragonBox',
            id: `paragonBox${i}`,
            style: `border-color: ${data.paragonData[i] !== null ? '#52255e' : 'gray'}`
        })

        const paragon = Object.assign(document.createElement('img'), {
            src: data.paragonData[i] !== null ? getParagonNumber(data.paragonData[i].paragonLevel) : 'res/fallback.png',
            className: 'paragon',
            id: `paragonParagon${i}`,
            style: `margin-top: 1.9rem; margin-right: 0.8rem`
        })

        paragonWrapper.addEventListener('mouseover', () => {
            if(data.paragonData[i] !== null) updateBunnyDisplayHTML(data.paragonData[i])
        })
        paragonBox.addEventListener('click', () => boxControl(i, 'paragon'))

        paragonWrapper.appendChild(paragonBox)
        paragonWrapper.appendChild(paragon)

        paragonRow.appendChild(paragonWrapper)
    }
    updateFuseButtonHTML()
}

function canFuse() {
    const firstParagon = data.paragonData[0]
    if (firstParagon === null) return false

    return data.paragonData.every(paragon => paragon !== null
        && paragon.rarity === firstParagon.rarity
        && paragon.id === firstParagon.id
        && paragon.paragonLevel === firstParagon.paragonLevel
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

    const firstParagonData = data.paragonData[0]
    let stats = { damage: -1, health: -1, shield: -1, luck: -1 }

    let bunny = {
        rarity: firstParagonData.rarity,
        id: firstParagonData.id,
        paragonLevel: firstParagonData.paragonLevel+1,
        stats: stats,
        currentHP: stats.health
    }

    for (let i = 0; i < data.paragonData.length; i++) {
        for (const stat in data.paragonData[i].stats) {
            const statsObject = data.paragonData[i].stats
            if(statsObject[stat] > stats[stat]) stats[stat] = statsObject[stat]
        }
        //data.bunnyData[data.paragonData[i].index] = null
        resetBoxData(i, 'paragon', true)
    }

    stats.damage *= 1 + (bunny.paragonLevel * 0.25)
    stats.health *= 1 + (bunny.paragonLevel * 0.25)
    bunny.stats = stats
    bunny.currentHP = stats.health

    addBunny(bunny)
}

let getParagonNumber = (i) => `res/numbers/${i}.svg`