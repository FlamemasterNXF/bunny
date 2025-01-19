function loadCombatHTML(){
    if(data.enemyData === 0) makeFirstTimeEnemy()
    loadCombatBunnyHTML()
    loadBunnyTeamHTML()
    updateEnemyHTML()
}

function getBunnyTeamImg(index){
    if(data.teamData[index] === null) return 'res/fallback.png'
    const bunny = data.teamData[index].data
    return getBunnyImg(bunny.rarity, bunny.id)
}

function loadCombatBunnyHTML(){
    if(data.combat.currentBunny === null) return DOM(`bunnyCombatImg`).src = 'res/fallback.png'
    const bunny = data.combat.currentBunny
    DOM(`bunnyCombatImg`).src = getBunnyImg(bunny.rarity, bunny.id)
}

function changeBunnyTeamBorder(index, initElement = null){
    if(data.teamData[index] === null || data.combat.currentBunny === null) return
    const teamIndex = data.teamData[index].index
    const combatIndex = data.teamData[index].index

    if(initElement !== null) initElement.style.borderColor = teamIndex === combatIndex ? 'goldenrod' : 'darkgreen'
    else DOM(`teamBox${index}`).style.borderColor = teamIndex === combatIndex ? 'goldenrod' : 'darkgreen'
}

function loadBunnyTeamHTML(){
    const teamColumn = DOM('combatColumn')
    const teamBoxes = Array.from({ length: 3 }, (_, i) => {
        const teamBox = document.createElement('img')
        teamBox.addEventListener('click', () => boxControl(i, 'team'))
        teamBox.src = getBunnyTeamImg(i)
        teamBox.className = 'teamBox'
        teamBox.id = `teamBox${i}`
        changeBunnyTeamBorder(i, teamBox)
        return teamBox
    })
    teamColumn.append(...teamBoxes)
}

let currentEnemy = () => data.enemyData.id
let currentEnemyHP = () => data.enemyData.currentHP
let currentEnemyMaxHP = () => data.enemyData.maxHP
let currentEnemyDamage = () => data.enemyData.damage

function updateEnemyStatsHTML(){
    DOM(`enemyStats`).innerHTML = `This is a <span style="color: #a80000">${getEnemyName(currentEnemy())}</span><br><span style="color: #a18a00">${currentEnemyMaxHP()} Health Points</span><br><span style="color: #a56c00">${currentEnemyDamage()} Damage</span>`
}

function updateEnemyHTML(){
    DOM(`enemyImg`).src = getEnemyImg(data.enemyData.id)
    updateEnemyStatsHTML()
}