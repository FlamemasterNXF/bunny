function switchTab(tab){
    data.nav.last = data.nav.current
    data.nav.current = tab
    DOM(`${data.nav.last}Page`).style.display = 'none'
    DOM(`${tab}Page`).style.display = 'flex'
}


//let classTab = ""

function switchSubtab(t, mode){
    if(!isTabUnlocked(t)) return

}

function isTabUnlocked(t){
    switch (t) {
        default: return true
    }
}