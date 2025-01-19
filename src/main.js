function mainLoop() {
    // Calculate diff and usableDiff
    if(data.lastTick === 0) data.lastTick = Date.now()
    let diff = data.offline ? Math.max((Date.now() - data.lastTick), 0) : data.ms
    // Used for Offline Progress
    let uDiff = diff/1000

    // Update lastTick
    data.lastTick = Date.now()

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
