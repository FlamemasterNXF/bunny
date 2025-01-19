const bunnyContainer = document.getElementById(`bunnyContainer`)

function makeBunnyWrapperHTML(index) {
    const bunnyData = data.bunnyData[index]

    const bunnyWrapper = Object.assign(document.createElement("div"), {
        className: "bunnyWrapper",
        id: `bunnyWrapper${index}`,
    })

    const bunny = Object.assign(document.createElement('img'), {
        src: getBunnyImg(bunnyData.rarity, bunnyData.id),
        className: 'bunny',
        id: `bunny${index}`,
        style: `border: 2px solid ${getRarityColor(bunnyData.rarity)}`
    })

    const paragon = Object.assign(document.createElement('img'), {
        src: getParagonNumber(bunnyData.paragonLevel),
        className: 'paragon',
        id: `paragon${index}`
    })

    bunnyWrapper.onmouseover = () => updateBunnyDisplayHTML(index)
    bunnyWrapper.onclick = () => moveBunnyPrep(index)
    bunnyWrapper.appendChild(bunny)
    bunnyWrapper.appendChild(paragon)

    bunnyWrapper.style.display = isBunnyInBox(index, 'paragon') || isBunnyInBox(index, 'team') ? "none" : "block"
    return bunnyWrapper
}

let addBunnyHTML = (index) => bunnyContainer.appendChild(makeBunnyWrapperHTML(index))

let loadBunnyHTML = () => data.bunnyData.forEach((_, i) => addBunnyHTML(i))

function makeBunnyStatsHTML(bunnyData){
    return Object.keys(bunnyData.stats)
        .map((stat, index) => {
            const statColor = getStatColor(index)
            const statName = getStatName(index)
            const statValue = bunnyData.stats[stat]
            const statDisplay = (index > 1) ? statValue * 100 + '%' : statValue
            return `<br><span style="color: ${statColor}">${statDisplay} ${statName}</span>`
        })
        .join('');
}

function updateBunnyDisplayHTML(index){
    const bunnyData = data.bunnyData[index]
    DOM(`bunnyInfoImg`).src = getBunnyImg(bunnyData.rarity, bunnyData.id)
    DOM(`bunnyInfoText`).innerHTML = `This is a <span style="color: ${getRarityColor(bunnyData.rarity)}">${getRarityName(bunnyData.rarity)} ${getBunnyName(bunnyData.rarity, bunnyData.id)}!</span><br><i>${getBunnyDesc(bunnyData.rarity, bunnyData.id)}</i><br><br><span style="color: #a74ebf"><b>Paragon Tier: ${bunnyData.paragonLevel}</b></span>${makeBunnyStatsHTML(bunnyData)}`
}