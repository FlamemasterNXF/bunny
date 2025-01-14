const bunnyContainer = document.getElementById(`bunnyContainer`)

function makeBunnyWrapperHTML(index) {
    const bunnyData = data.bunnyData[index]

    const bunnyWrapper = Object.assign(document.createElement("div"), {
        className: "bunnyWrapper",
        id: `bunnyWrapper${index}`
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

    bunnyWrapper.appendChild(bunny)
    bunnyWrapper.appendChild(paragon)

    return bunnyWrapper
}

let addBunnyHTML = (index) => bunnyContainer.appendChild(makeBunnyWrapperHTML(index))

let loadBunnyHTML = () => data.bunnyData.forEach((_, i) => addBunnyHTML(i))