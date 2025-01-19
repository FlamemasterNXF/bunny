//Version Flags
const VERSION = "0.0"
const VERSION_DATE = "October 8th, 2024"
const IS_BETA = true
const SAVE_PATH = () => IS_BETA ? "bunnyGamefnxfSaveBeta" : "bunnyGamefnxfSave"

//create all the variables in a data object for saving
function getDefaultObject() {
    return {
        nav: "combat",

        bunnyData: [],
        paragonData: Array(4).fill(null),
        teamData: Array(3).fill(null),
        combat: {completedStages: 0, currentStage: 1, currentBunny: null},
        enemyData: 0, // 0 is a placeholder for null here

        lastTick: 0,
        loadedVersion: VERSION,
        isBeta: IS_BETA,
        offline: true,
        ms: 50,
    }
}
let data = getDefaultObject()

//saving and loading
function save(){
    try{ window.localStorage.setItem(SAVE_PATH(), JSON.stringify(data)) }
    catch (e) {
        createAlert('Error', `Save failed.\n${e}`, 'Dang.');
        console.error(e);
    }
}
function load() {
    let savedata = JSON.parse(window.localStorage.getItem(SAVE_PATH()))
    if (savedata !== undefined) fixSave(data, savedata)
    fixOldSaves()
    createAlert('Welcome Back!', `You're playing Bunny Game v${VERSION}\nEnjoy!`, 'Thanks!')
}

//fix saves
function fixSave(main=getDefaultObject(), data) {
    if(data === null) return getDefaultObject()
    else if (typeof data === "object") {
        Object.keys(data).forEach(i => {
            if (typeof main[i]  == "object" && main[i] !== null) {
                fixSave(main[i], data[i])
            } else {
                main[i] = data[i]
            }
        })
        return main
    }
    else return getDefaultObject()
}

function fixOldSaves(){
    if(data.bunnyData.length > 0) data.bunnyData = data.bunnyData.filter(bunny => bunny !== null)
}

function exportSave(){
    try {
        save()
        let exportedData = btoa(JSON.stringify(data))
        const exportedDataText = document.createElement("textarea");
        exportedDataText.value = exportedData;
        document.body.appendChild(exportedDataText);
        exportedDataText.select();
        exportedDataText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        document.body.removeChild(exportedDataText);
        createAlert('Export Successful', 'Your Data has been copied to the clipboard!', 'Thanks!')
    }
    catch (e){
        createAlert('Error', `Save export failed.\n${e}`, 'Dang.');
        console.error(e);
    }
}
async function downloadSave() {
    try {
        const file = new Blob([btoa(JSON.stringify(data))], {type: "text/plain"});
        window.URL = window.URL || window.webkitURL;
        const a = document.createElement("a")
        let date = new Date()
        date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
        a.href = window.URL.createObjectURL(file)
        a.download = `Ordinal-Pringles-save-${VERSION}-${date}.txt`
        a.click()
        createAlert("Success!", 'Your save has been successfully downloaded!', 'Thanks!');
    } catch (e) {
        createAlert('Error', `Save download failed.\n${e}`, 'Dang.');
        console.error(e);
        closeModal(1)
    }
}
function importSave(x) {
    try {
        if(x.length <= 0) {
            DOM('promptContainer').style.display = 'none'
            createAlert('Failure', 'No data found.', `Oops.`)
            return
        }
        data = Object.assign(getDefaultObject(), JSON.parse(atob(x)))
        if(data.isBeta && !IS_BETA) return createAlert('Beta Save detected!', 'You tried to load a Beta Save into the main version. This is not allowed, sorry :(', 'Dang it!')
        save()
        location.reload()
    }
    catch (e){
        closeModal('prompt')
        createAlert('Error', `Save import failed.\n${e}`, 'Dang.');
        console.error(e);
    }
}
window.setInterval(function(){
    save()
}, 10000);
//full reset
function fullReset(){
    exportSave()
    deleteSave()
}
function deleteSave(){
    window.localStorage.removeItem(SAVE_PATH())
    location.reload()
}
