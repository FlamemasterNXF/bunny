let tempSelectedBunnyData = { data: null, index: null }

function resetTempSelectedBunnyData() {
    tempSelectedBunnyData = { data: null, index: null }
}

function moveBunnyPrep(index){
    if(tempSelectedBunnyData.data === null) {
        DOM(`bunnyWrapper${index}`).style.display = 'none'
        tempSelectedBunnyData.data = data.bunnyData[index]
        tempSelectedBunnyData.index = index
    }
    else {
        DOM(`bunnyWrapper${tempSelectedBunnyData.index}`).style.display = 'block'
        resetTempSelectedBunnyData()
        moveBunnyPrep(index)
    }
}

function isBunnyInBox(index, name){
    for (let i = 0; i < data.paragonData.length; i++) {
        if(data[`${name}Data`][i] === null) continue
        if(data[`${name}Data`][i]?.index === index) return true
    }
    return false
}

function resetBoxData(index, name, skipRecreate = false) {
    DOM(`${name}Box${index}`).src = 'res/fallback.png'
    if(name === 'paragon') DOM(`${name}Box${index}`).style.borderColor = 'gray'
    if(name === 'team'){
        DOM(`teamParagon${index}`).src = 'res/fallback.png'
        changeBunnyTeamBorder(index)
    }
    if(!skipRecreate){
        let bunnyID = data[`${name}Data`][index].index
        DOM(`bunnyWrapper${bunnyID}`).style.display = 'block'
    }
    data[`${name}Data`][index] = null
}

function boxControl(index, name) {
    if(data[`${name}Data`][index] === null) {
        if(tempSelectedBunnyData.data === null) return
        DOM(`${name}Box${index}`).src = getBunnyImg(tempSelectedBunnyData.data.rarity, tempSelectedBunnyData.data.id)
        if(name === 'paragon') DOM(`${name}Box${index}`).style.borderColor = '#52255e'

        data[`${name}Data`][index] = structuredClone(tempSelectedBunnyData)

        if(name === 'team'){
            DOM(`teamParagon${index}`).src = getParagonNumber(data.teamData[index].data.paragonLevel)
            changeBunnyTeamBorder(index)
        }

        resetTempSelectedBunnyData()
    }
    else if(tempSelectedBunnyData !== null) {
        resetBoxData(index, name)
        boxControl(index, name)
    }
    else {
        resetBoxData(index, name)
    }
    if(name === 'paragon') updateFuseButtonHTML()
}