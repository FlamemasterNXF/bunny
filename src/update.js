const uHTML = {
    update() {
        if(data.nav === 'combat') updateAllHealthBarHTML()
    },
    load(){
        loadBunnyHTML()
        loadParagonHTML()
        loadCombatHTML()

        switchSubtab(data.nav)

        if(data.bunnyData.length === 0) makeFirstBunny()
    }
}