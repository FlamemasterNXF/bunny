let rarityData = [
    {
        name: 'Common',
        probability: 0.609,
        border: '#727272',
    },
    {
        name: 'Uncommon',
        probability: 0.18,
        border: '#6e8a3f',
    },
    {
        name: 'Rare',
        probability: 0.12,
        border: '#00ab4a',
    },
    {
        name: 'Ultra-Rare',
        probability: 0.06,
        border: '#3554d7',
    },
    {
        name: 'Legendary',
        probability: 0.03,
        border: '#ae2fcb',
    },
    {
        name: 'Mythical',
        probability: 0.001,
        border: 'goldenrod',
    },
]

let getRarityName = (i) => rarityData[i].name
let getRarityColor = (i) => rarityData[i].border
