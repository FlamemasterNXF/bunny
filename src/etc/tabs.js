function switchSubtab(tab){
    if(tab === 'paragon'){
        DOM(`subTabFlavour`).style.color = '#a74ebf'
        DOM(`subTabFlavour`).innerText = 'Paragon Fusion'
    }
    if(tab === 'combat'){
        DOM(`subTabFlavour`).style.color = '#bf4e4e'
        updateCombatHeaderHTML()
    }
    if(tab === 'settings'){
        DOM(`subTabFlavour`).style.color = '#808080'
        DOM(`subTabFlavour`).innerText = 'Settings'
    }

    DOM(`${data.nav}SubTab`).style.display = 'none'

    data.nav = tab
    DOM(`${data.nav}SubTab`).style.display = 'flex'
}