let tempSelectedBunnyData = { data: null, index: null }
let tempParagonData = Array(4).fill(null)

function loadParagonHTML(){
    const paragonRow = DOM('paragonRow')
    const paragonBoxes = Array.from({ length: 4 }, (_, i) => {
        const paragonBox = document.createElement('img')
        paragonBox.addEventListener('click', () => paragonBoxControl(i))
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
    DOM(`paragonBox${index}`).src = '' // TODO: Make fallback image
    DOM(`paragonBox${index}`).style.borderColor = '#595959'
    if(!skipRecreate) DOM(`bunnyWrapper${tempParagonData[index].index}`).style.display = 'block'
    tempParagonData[index] = null
}

function canFuse() {
    const firstParagon = tempParagonData[0]
    if (firstParagon === null) return false

    return tempParagonData.every(paragon =>
        paragon !== null && paragon.data.rarity === firstParagon.data.rarity && paragon.data.id === firstParagon.data.id
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

    let stats = {
        damage: -1,
        health: -1,
        shield: -1,
        luck: -1,
    }

    let bunny = {
        rarity: tempParagonData[0].data.rarity,
        id: tempParagonData[0].data.id,
        paragonLevel: tempParagonData[0].data.paragonLevel+1,
        stats: stats
    }

    for (let i = 0; i < tempParagonData.length; i++) {
        for (const stat in tempParagonData[i].data.stats) {
            if(tempParagonData[i].data.stats[stat] > stats[stat]) stats[stat] = tempParagonData[i].data.stats[stat]
        }
        console.log(tempParagonData[i].index)
        data.bunnyData[tempParagonData[i].index] = null
        resetTempParagonData(i, true)
    }

    bunny.stats = stats
    addBunny(bunny)
}

let getParagonNumber = (i) => `res/numbers/${i}.svg`