function loadCombatHTML(){
    if(data.enemyData === 0) makeFirstTimeEnemy()
    loadCombatBunnyHTML()
    loadEnemyHTML()
    loadBunnyTeamHTML()
    updateEnemyHTML()
}

function getBunnyTeamImg(index){
    if(data.teamData[index] === null) return 'res/fallback.png'
    const bunny = data.teamData[index].data
    return getBunnyImg(bunny.rarity, bunny.id)
}

function loadCombatBunnyHTML(){
    const bunny = data.combat.currentBunny.data
    const wrapper = DOM(`combatWrapper`)

    const combatBox = Object.assign(document.createElement('img'), {
        src: bunny !== null ? getBunnyImg(bunny.rarity, bunny.id) : 'res/fallback.png',
        className: 'combatBoxes',
        id: `combatBox`,
    })

    const paragon = Object.assign(document.createElement('img'), {
        src: bunny !== null ? getParagonNumber(bunny.paragonLevel) : 'res/fallback.png',
        className: 'paragon',
        id: `combatParagon`
    })

    const barOuter = Object.assign(document.createElement('div'), {
        className: 'progressContainer',
        id: `progressContainerCombat`,
        style: 'margin-top: -1rem'
    })

    const barInner = Object.assign(document.createElement('div'), {
        className: 'progressBar',
        id: `healthBarCombat`
    })

    //teamWrapper.addEventListener('click', () => boxControl(i, 'team'))
    wrapper.addEventListener('mouseover', () => {
        if(data.combat.currentBunny !== null) updateBunnyDisplayHTML(data.combat.currentBunny.index)
    })

    barOuter.appendChild(barInner)
    wrapper.appendChild(combatBox)
    wrapper.appendChild(paragon)
    wrapper.appendChild(barOuter)
}

function changeBunnyTeamBorder(index, initElement = null){
    if(data.teamData[index] === null || data.combat.currentBunny === null) return
    const teamIndex = data.teamData[index].index
    const combatIndex = data.combat.currentBunny.index

    if(initElement !== null) initElement.style.borderColor = teamIndex === combatIndex ? '#a18a00' : 'darkgreen'
    else DOM(`teamBox${index}`).style.borderColor = teamIndex === combatIndex ? '#a18a00' : 'darkgreen'
}

function loadBunnyTeamHTML(){
    const teamColumn = DOM('combatColumn')
    /*const teamBoxes = Array.from({ length: 3 }, (_, i) => {
        const teamBox = document.createElement('img')
        teamBox.addEventListener('click', () => boxControl(i, 'team'))
        teamBox.src = getBunnyTeamImg(i)
        teamBox.className = 'teamBox'
        teamBox.id = `teamBox${i}`
        changeBunnyTeamBorder(i, teamBox)
        return teamBox
    })
    teamColumn.append(...teamBoxes)
     */

    for (let i = 0; i < 3; i++) {
        const teamWrapper = Object.assign(document.createElement("div"), {
            className: "bunnyWrapper",
            id: `teamWrapper${i}`,
            style: `margin-top: 1rem`
        })

        const teamBox = Object.assign(document.createElement('img'), {
            src: getBunnyTeamImg(i),
            className: 'teamBox',
            id: `teamBox${i}`,
        })

        const paragon = Object.assign(document.createElement('img'), {
            src: data.teamData[i] !== null ? getParagonNumber(data.teamData[i].data.paragonLevel) : 'res/fallback.png',
            className: 'paragon',
            id: `teamParagon${i}`
        })

        const barOuter = Object.assign(document.createElement('div'), {
            className: 'progressContainer',
            id: `progressContainer${i}`
        })

        const barInner = Object.assign(document.createElement('div'), {
            className: 'progressBar',
            id: `healthBar${i}`
        })

        changeBunnyTeamBorder(i, teamBox)
        teamWrapper.addEventListener('click', () => boxControl(i, 'team'))
        teamWrapper.addEventListener('mouseover', () => {
            if(data.teamData[i] !== null) updateBunnyDisplayHTML(data.teamData[i].index)
        })

        barOuter.appendChild(barInner)
        teamWrapper.appendChild(teamBox)
        teamWrapper.appendChild(paragon)
        teamWrapper.appendChild(barOuter)

        teamColumn.appendChild(teamWrapper)
    }
}

function loadEnemyHTML(){
    const enemy = data.enemyData
    const wrapper = DOM(`enemyWrapper`)

    const enemyBox = Object.assign(document.createElement('img'), {
        src: getEnemyImg(enemy.id),
        className: 'combatBoxes',
        id: `enemyBox`,
        style: `border-color: darkred`,
    })

    const barOuter = Object.assign(document.createElement('div'), {
        className: 'progressContainer',
        id: `progressContainerEnemy`,
        style: 'margin-top: -1rem'
    })

    const barInner = Object.assign(document.createElement('div'), {
        className: 'progressBar',
        id: `healthBarEnemy`
    })

    barOuter.appendChild(barInner)
    wrapper.appendChild(enemyBox)
    wrapper.appendChild(barOuter)
}

let currentEnemy = () => data.enemyData.id
let currentEnemyHP = () => data.enemyData.currentHP
let currentEnemyMaxHP = () => data.enemyData.maxHP
let currentEnemyDamage = () => data.enemyData.damage

function updateEnemyStatsHTML(){
    DOM(`enemyStats`).innerHTML = `This is a <span style="color: #a80000">${getEnemyName(currentEnemy())}</span><br><span style="color: #a18a00">${currentEnemyMaxHP()} Health Points</span><br><span style="color: #a56c00">${currentEnemyDamage()} Damage</span>`
}

function updateEnemyHTML(){
    DOM(`enemyBox`).src = getEnemyImg(data.enemyData.id)
    updateEnemyStatsHTML()
}

function updateCombatHeaderHTML(){
    DOM(`subTabFlavour`).innerText = `Combat: Stage ${data.combat.currentStage} (${data.combat.enemiesDefeatedInStage}/10)`
}

function updateCombatHealthBarHTML(isEnemy){
    if(!isEnemy && data.combat.currentBunny === null) return DOM(`healthBarCombat`).style.width = `100%`
    if(isEnemy){
        let progress = (data.enemyData.currentHP / data.enemyData.maxHP) * 100
        DOM(`healthBarEnemy`).style.width = `${progress}%`
    }
    else{
        let progress = (data.combat.currentBunny.data.currentHP / data.combat.currentBunny.data.stats.health) * 100
        DOM(`healthBarCombat`).style.width = `${progress}%`
    }
}

function updateHealthBarHTML(index){
    if(data.teamData[index] === null) return
    const progress = (data.teamData[index].data.currentHP / data.teamData[index].data.stats.health) * 100
    DOM(`healthBar${index}`).style.width = `${progress}%`
}

function updateAllHealthBarHTML(){
    for (let i = 0; i < 3; i++) {
        updateHealthBarHTML(i)
    }
    updateCombatHealthBarHTML(false)
    updateCombatHealthBarHTML(true)
}