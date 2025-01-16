let tempSelectedBunnyData = { data: null, index: null }
let tempParagonData = Array(4).fill(null)

function loadParagonHTML(){
    const paragonRow = DOM('paragonRow')
    const paragonBoxes = Array.from({ length: 4 }, (_, i) => {
        const paragonBox = document.createElement('img')
        paragonBox.addEventListener('click', () => paragonBoxControl(i))
        paragonBox.src = 'res/fallback.png'
        paragonBox.className = 'paragonBox'
        paragonBox.id = `paragonBox${i}`
        return paragonBox
    })
    paragonRow.append(...paragonBoxes)
}

function resetTempSelectedBunnyData() {
    tempSelectedBunnyData = { data: null, index: null }
}

function resetTempParagonData(index, skipRecreate = false) {
    DOM(`paragonBox${index}`).src = 'res/fallback.png'
    DOM(`paragonBox${index}`).style.borderColor = 'gray'
    if(!skipRecreate) DOM(`bunnyWrapper${tempParagonData[index].index}`).style.display = 'block'
    tempParagonData[index] = null
}

function canFuse() {
    const firstParagon = tempParagonData[0]
    if (firstParagon === null) return false

    return tempParagonData.every(paragon => paragon !== null
        && paragon.data.rarity === firstParagon.data.rarity
        && paragon.data.id === firstParagon.data.id
        && paragon.data.paragonLevel === firstParagon.data.paragonLevel
    )
}

function updateFuseButtonHTML(){
    if(canFuse()) DOM(`paragonFuse`).style.boxShadow = '0px 0px 10px 1px rgba(82,37,94,0.75)'
    else DOM(`paragonFuse`).style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,0)'
}

function paragonBoxControl(index) {
    if(tempParagonData[index] === null) {
        if(tempSelectedBunnyData.data === null) return
        DOM(`paragonBox${index}`).src = getBunnyImg(tempSelectedBunnyData.data.rarity, tempSelectedBunnyData.data.id)
        DOM(`paragonBox${index}`).style.borderColor = '#52255e'

        tempParagonData[index] = structuredClone(tempSelectedBunnyData)
        resetTempSelectedBunnyData()
    }
    else if(tempSelectedBunnyData !== null) {
        resetTempParagonData(index)
        paragonBoxControl(index)
    }
    else {
        resetTempParagonData(index)
    }
    updateFuseButtonHTML()
}

function paragonPrep(index){
    if(tempSelectedBunnyData.data === null) {
        DOM(`bunnyWrapper${index}`).style.display = 'none'
        tempSelectedBunnyData.data = data.bunnyData[index]
        tempSelectedBunnyData.index = index
    }
    else {
        DOM(`bunnyWrapper${tempSelectedBunnyData.index}`).style.display = 'block'
        resetTempSelectedBunnyData()
        paragonPrep(index)
    }
}

function paragonFuse(){
    if(!canFuse()) return

    const firstParagonData = tempParagonData[0].data
    let stats = { damage: -1, health: -1, shield: -1, luck: -1 }

    let bunny = {
        rarity: firstParagonData.rarity,
        id: firstParagonData.id,
        paragonLevel: firstParagonData.paragonLevel+1,
        stats: stats
    }

    for (let i = 0; i < tempParagonData.length; i++) {
        for (const stat in tempParagonData[i].data.stats) {
            const statsObject = tempParagonData[i].data.stats
            if(statsObject[stat] > stats[stat]) stats[stat] = statsObject[stat]
        }
        data.bunnyData[tempParagonData[i].index] = null
        resetTempParagonData(i, true)
    }

    bunny.stats = stats
    addBunny(bunny)
}

let getParagonNumber = (i) => `res/numbers/${i}.svg`