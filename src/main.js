function mainLoop() {
    // Calculate diff
    if(data.lastTick === 0) data.lastTick = Date.now()
    let diff = data.offline ? Math.max((Date.now() - data.lastTick), 0) : data.ms

    // Used for Offline Progress
    let seconds = diff/1000
    let recoveryMultiplier = seconds > 0.1 ? 0.3 : 1

    // Update lastTick
    data.lastTick = Date.now()

    if(data.combat.currentBunny !== null){
        damageEnemy(data.combat.currentBunny.data.stats.damage*seconds)
        damageBunny(data.enemyData.damage*seconds)
    }
    if(data.teamData.some(bunny => bunny !== null)){
        bunnyRecover(getRecoveringBunny(), recoveryMultiplier)
        if(data.combat.currentBunny === null) sendHealthyBunny()
    }

    // Update HTML
    uHTML.update()
}


window.onload = function () {
    //try { load() } catch(e){ console.log('New Save!\nIf you\'re seeing this, welcome :)') }
    load()
    uHTML.load()

    window.setInterval(function () {
        mainLoop()
    }, data.ms);
}
