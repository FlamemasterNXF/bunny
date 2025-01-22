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

function resetBoxData(index, name, skipRecreate = false) {
    DOM(`${name}Box${index}`).src = 'res/fallback.png'
    DOM(`${name}Paragon${index}`).src = 'res/fallback.png'
    if(name === 'paragon') DOM(`${name}Box${index}`).style.borderColor = 'gray'

    if(!skipRecreate){
        addBunny(data[`${name}Data`][index])
    }

    data[`${name}Data`][index] = null
    if(name === 'team') updateCombatBunnyHTML(null)
    if(name === 'team') changeBunnyTeamBorder(index)
}

function boxControl(index, name) {
    if(data[`${name}Data`][index] === null) {
        if(tempSelectedBunnyData.data === null) return
        data.bunnyData[tempSelectedBunnyData.index] = null
        DOM(`bunnyWrapper${tempSelectedBunnyData.index}`).remove()

        DOM(`${name}Box${index}`).src = getBunnyImg(tempSelectedBunnyData.data.rarity, tempSelectedBunnyData.data.id)
        if(name === 'paragon') DOM(`${name}Box${index}`).style.borderColor = '#52255e'
        if(name === 'team') updateCombatBunnyHTML(tempSelectedBunnyData.data)
        data[`${name}Data`][index] = structuredClone(tempSelectedBunnyData.data)

        DOM(`${name}Paragon${index}`).src = getParagonNumber(data[`${name}Data`][index].paragonLevel)
        if(name === 'team') changeBunnyTeamBorder(index)

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