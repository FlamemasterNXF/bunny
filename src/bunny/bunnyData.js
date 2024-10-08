let bunnyData = [
    [
        {
            name: "Basic Bunny",
            desc: "A simple fluffy little friend.",
        }
    ],
    [
        {
            name: "Brown Bunny",
            desc: "A different species of fluffy little friend.",
        },
        {
            name: "Mixed Bunny",
            desc: "A combination of a few species of fluffy little friends.",
        },
    ],
    [
        {
            name: "Lawyer Bunny",
            desc: "A fluffy little friend who can speak very, very fast.",
        },
        {
            name: "WeeWoo Bunny",
            desc: "A fluffy little friend who is dedicated to protecting other fluffy little friends.",
        },
        {
            name: "Camo Bunny",
            desc: "A very well hidden fluffy little friend.",
        },
        {
            name: "Murder Bunny",
            desc: "Fluffy, but not a friend (he is secretly still a friend).",
        },
        {
            name: "Hero Bunny",
            desc: "A fluffy little friend who would risk his own life for others.",
        },
    ],
    [
        {
            name: "Angel Bunny",
            desc: "A fluffy little friend who, like all fluffy little friends, was perfect in his lifetime.",
        },
        {
            name: "Devil Bunny",
            desc: "A fluffy little friend who did some devious things, but was still perfect and fluffy.",
        },
        {
            name: "King Bunny",
            desc: "The lord of all fluffy little things who claims to be the fluffiest of them all.",
        },
        {
            name: "Astronaut Bunny",
            desc: "A fluffy little friend who has seen the fluffy little Moon.",
        },
    ],
    [
        {
            name: "Baby Bunny",
            desc: "The true little friend fluffiest of them all.",
        },
        {
            name: "Alien Bunny",
            desc: "He may look different, yet he is still fluffy and friendly.",
        },
        {
            name: "Forg Bunny",
            desc: "A fluffy little friend dressed as a bouncy little friend.",
        },
        {
            name: "Magic Bunny",
            desc: "A fluffy friend as old as time itself, yet as fluffy as ever.",
        },
    ],
    [
        {
            name: "Perfect Bunny",
            desc: "Two halves of a perfect whole, combined. His fluffiness is legendary.",
        },
        {
            name: "Forg",
            desc: "He gives you a friendly smile, making you feel warm and happy.",
        },
    ]
]

let getBunniesByRarity = (i) => bunnyData[i]
let getBunny = (i, j) => bunnyData[i][j]
let getBunnyName = (i, j) => bunnyData[i][j].name
let getBunnyDesc = (i, j) => bunnyData[i][j].desc