function loadCombatHTML(){
    if(data.enemyData === 0) makeFirstTimeEnemy()
    loadCombatBunnyHTML()
    loadEnemyHTML()
    loadBunnyTeamHTML()
    updateEnemyHTML()
}

function getBunnyTeamImg(index){
    if(data.teamData[index] === null) return 'res/fallback.png'
    const bunny = data.teamData[index]
    return getBunnyImg(bunny.rarity, bunny.id)
}

function loadCombatBunnyHTML(){
    const bunny = data.combat.currentBunny !== null ? data.combat.currentBunny.data : null
    const wrapper = DOM(`combatWrapper`)

    const combatBox = Object.assign(document.createElement('img'), {
        src: bunny !== null ? getBunnyImg(bunny.rarity, bunny.id) : 'res/fallback.png',
        className: 'combatBoxes',
        id: `combatBox`,
    })

    const paragon = Object.assign(document.createElement('img'), {
        src: bunny !== null ? getParagonNumber(bunny.paragonLevel) : 'res/fallback.png',
        className: 'paragon',
        id: `combatParagon`,
        style: `margin-top: -0.1rem; margin-right: -0.3rem`
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
        if(data.combat.currentBunny !== null) updateBunnyDisplayHTML(data.combat.currentBunny.data)
    })

    barOuter.appendChild(barInner)
    wrapper.appendChild(combatBox)
    wrapper.appendChild(paragon)
    wrapper.appendChild(barOuter)
}

function changeBunnyTeamBorder(index, initElement = null){
    if(data.teamData[index] === null || data.combat.currentBunny === null)
        return initElement === null ? DOM(`teamBox${index}`).style.borderColor = '#153000' : null
    //const teamIndex = data.teamData[index].index
    //const combatIndex = data.combat.currentBunny.index

    //if(initElement !== null) initElement.style.borderColor = teamIndex === combatIndex ? '#a18a00' : '#153000'
    //else DOM(`teamBox${index}`).style.borderColor = teamIndex === combatIndex ? '#a18a00' : '#153000'
}

function loadBunnyTeamHTML(){
    const teamColumn = DOM('combatColumn')
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
            src: data.teamData[i] !== null ? getParagonNumber(data.teamData[i].paragonLevel) : 'res/fallback.png',
            className: 'paragon',
            id: `teamParagon${i}`,
            style: `margin-top: 0.2rem; margin-right: -0.3rem`
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
            if(data.teamData[i] !== null) updateBunnyDisplayHTML(data.teamData[i])
        })

        barOuter.appendChild(barInner)
        teamWrapper.appendChild(teamBox)
        teamWrapper.appendChild(paragon)
        teamWrapper.appendChild(barOuter)

        teamColumn.appendChild(teamWrapper)
    }
}

function updateCombatBunnyHTML(bunny){
    if(bunny === null && data.teamData.some(team => team !== null)){
        //controlCombatBunny(data.teamData.find(team => team !== null)) <-- Sad, had to abandon for indexing
        for (let i = 0; i < data.teamData.length; i++) {
            if(data.teamData[i] !== null){
                controlCombatBunny(data.teamData[i], i)
            }
        }
    }
    if(data.teamData.every(team => team === null)) controlCombatBunny(bunny, 0)
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
    DOM(`enemyStats`).innerHTML = `This is a <span style="color: #a80000">${getEnemyName(currentEnemy())}</span><br><span style="color: #a18a00">${formatNumber(currentEnemyMaxHP())} Health Points</span><br><span style="color: #a56c00">${formatNumber(currentEnemyDamage())} Damage</span>`
}

function updateEnemyHTML(){
    DOM(`enemyBox`).src = getEnemyImg(data.enemyData.id)
    updateEnemyStatsHTML()
}

function updateCombatHeaderHTML(){
    DOM(`subTabFlavour`).innerText = `Combat: Stage ${data.combat.currentStage} (${data.combat.enemiesDefeatedInStage}/${getStageRequirement()})`
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
    const progress = (data.teamData[index].currentHP / data.teamData[index].stats.health) * 100
    DOM(`healthBar${index}`).style.width = `${progress}%`
}

function updateAllHealthBarHTML(){
    for (let i = 0; i < 3; i++) {
        updateHealthBarHTML(i)
    }
    updateCombatHealthBarHTML(false)
    updateCombatHealthBarHTML(true)
}