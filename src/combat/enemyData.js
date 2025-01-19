let enemyData = [
    {
        name: 'Enraged Bee',
        img: 'res/enemies/Bee-Not-Friend.svg',

        friendlyName: 'Fluffy Bee',
        friendlyDesc: 'A strange fluffy little friend... with wings!',
        friendlyImg: 'res/friends/Bee-Friend.svg'
    },
    {
        name: 'Vicious Fox',
        img: 'res/enemies/Fox-Not-Friend.svg',

        friendlyName: 'Snugly Fox',
        friendlyDesc: 'A fluffy little friend that is incredibly protective of his friends',
        friendlyImg: 'res/friends/Fox-Friend.svg'
    },
    {
        name: 'Devious Raccoon',
        img: 'res/enemies/Raccoon-Not-Friend.svg',

        friendlyName: 'Helpful Raccoon',
        friendlyDesc: 'A fluffy little friend that is happy to help with anything in exchange for hugs',
        friendlyImg: 'res/friends/Raccoon-Friend.svg'
    },
    {
        name: 'Hateful Snake',
        img: 'res/enemies/Snake-Not-Friend.svg',

        friendlyName: 'Loving Snake',
        friendlyDesc: 'A not-so-fluffy little friend that just wanted to have friends the whole time',
        friendlyImg: 'res/friends/Snake-Friend.svg'
    },
    {
        name: 'Wolf',
        img: 'res/enemies/Wolf-Not-Friend.svg',

        friendlyName: 'Puppy',
        friendlyDesc: 'A fluffy little friend who is a very, very good boy',
        friendlyImg: 'res/friends/Wolf-Friend.svg'
    }
]

let getEnemyName = (i) => enemyData[i].name
let getEnemyImg = (i) => enemyData[i].img
let getFriendName = (i) => enemyData[i].friendlyName
let getFriendDesc = (i) => enemyData[i].friendlyDescff
let getFriendImg = (i) => enemyData[i].friendlyImg