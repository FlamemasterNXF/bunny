const uHTML = {
    update() { },
    load(){
        loadBunnyHTML()
        loadParagonHTML()
        loadCombatHTML()

        switchSubtab(data.nav)

        if(data.bunnyData.length === 0) makeFirstBunny()
    }
}