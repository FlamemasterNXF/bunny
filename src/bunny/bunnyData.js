let bunnyData = [
    [
        {
            name: "Basic Bunny",
            desc: "A simple fluffy little friend.",
            img: "res/bunnies/Basic-Bunny.svg"
        }
    ],
    [
        {
            name: "Brown Bunny",
            desc: "A different species of fluffy little friend.",
            img: "res/bunnies/Brown-Bunny.svg"
        },
        {
            name: "Mixed Bunny",
            desc: "A combination of a few species of fluffy little friends.",
            img: "res/bunnies/Mixed-Bunny.svg"
        },
    ],
    [
        {
            name: "Lawyer Bunny",
            desc: "A fluffy little friend who can speak very, very fast.",
            img: "res/bunnies/Lawyer-Bunny.svg"
        },
        {
            name: "WeeWoo Bunny",
            desc: "A fluffy little friend who is dedicated to protecting other fluffy little friends.",
            img: "res/bunnies/WeeWoo-Bunny.svg"
        },
        {
            name: "Camo Bunny",
            desc: "A very well hidden fluffy little friend.",
            img: "res/bunnies/Camo-Bunny.svg"
        },
        {
            name: "Murder Bunny",
            desc: "Fluffy, but not a friend (he is secretly still a friend).",
            img: "res/bunnies/Murder-Bunny.svg"
        },
        {
            name: "Hero Bunny",
            desc: "A fluffy little friend who would risk his own life for others.",
            img: "res/bunnies/Hero-Bunny.svg"
        },
    ],
    [
        {
            name: "Angel Bunny",
            desc: "A fluffy little friend who, like all fluffy little friends, was perfect in his lifetime.",
            img: "res/bunnies/Angel-Bunny.svg"
        },
        {
            name: "Devil Bunny",
            desc: "A fluffy little friend who did some devious things, but was still perfect and fluffy.",
            img: "res/bunnies/Devil-Bunny.svg"
        },
        {
            name: "King Bunny",
            desc: "The lord of all fluffy little things who claims to be the fluffiest of them all.",
            img: "res/bunnies/King-Bunny.svg"
        },
        {
            name: "Astronaut Bunny",
            desc: "A fluffy little friend who has seen the fluffy little Moon.",
            img: "res/bunnies/Astronaut-Bunny.svg"
        },
    ],
    [
        {
            name: "Baby Bunny",
            desc: "The true fluffiest little friend of them all.",
            img: "res/bunnies/Baby-Bunny.svg"

        },
        {
            name: "Alien Bunny",
            desc: "He may look different, yet he is still fluffy and friendly.",
            img: "res/bunnies/Alien-Bunny.svg"
        },
        {
            name: "Forg Bunny",
            desc: "A fluffy little friend dressed as a bouncy little friend.",
            img: "res/bunnies/Forg-Bunny.svg"
        },
        {
            name: "Magic Bunny",
            desc: "A fluffy friend as old as time itself, yet as fluffy as ever.",
            img: "res/bunnies/Magic-Bunny.svg"
        },
    ],
    [
        {
            name: "Perfect Bunny",
            desc: "Two halves of a perfect whole, combined. His fluffiness is legendary.",
            img: "res/bunnies/Perfect-Bunny.svg"
        },
        {
            name: "Forg",
            desc: "He gives you a friendly smile, making you feel warm and happy.",
            img: "res/bunnies/Forg.svg"
        },
    ]
]

let getBunniesByRarity = (i) => bunnyData[i]
let getBunny = (i, j) => bunnyData[i][j]
let getBunnyName = (i, j) => bunnyData[i][j].name
let getBunnyDesc = (i, j) => bunnyData[i][j].desc
let getBunnyImg = (i, j) => bunnyData[i][j].img