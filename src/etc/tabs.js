function switchSubtab(tab){
    if(tab === 'paragon'){
        DOM(`subTabFlavour`).style.color = '#a74ebf'
        DOM(`subTabFlavour`).innerText = 'Paragon Fusion'
    }
    if(tab === 'combat'){
        DOM(`subTabFlavour`).style.color = '#bf4e4e'
        DOM(`subTabFlavour`).innerText = `Combat: Stage ${0}`
    }

    DOM(`${data.nav}SubTab`).style.display = 'none'

    data.nav = tab
    DOM(`${data.nav}SubTab`).style.display = 'flex'
}