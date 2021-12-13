
//prints coefficient for a spread
const printCoefficient = (spread) =>{
    let base = 1
    for (const mod in spread){
        const val = spread[mod]
        base *= val
    }
    console.log(`coefficient is ${base / 100000000000}`)
    return base
}
//your mods, change this
const mods = {
        AD: 109,
        CD: 96,
        BD: 104,
        AA: 84,
        PMI: 87,
        SI: 96
}

const old = printCoefficient(mods)

const modtoword = {
    AD: "Attack Damage",
    CD: "Critical Damage",
    BD: "Bonus Damage",
    AA: "All Attack",
    PMI: "PMI",
    SI: "Str/Int"
}
//the bp option on your equipment, change this
const bpOptions = [
    {
        piece: "pants",
        curr: 37,
        max: 41,
        mod: "AD"
    },
    {
        piece: "weapon",
        curr: 30,
        max: 30,
        mod: "SI"
    },
    {
        piece: "sub",
        curr: 17,
        max: 23,
        mod: "BD"
    },
    {
        piece: "ring",
        curr: 11,
        max: 15,
        mod: "PMI"
    }
]

const removeCurrMod = () =>{
    let cleanedMod = mods
    bpOptions.forEach((bpOption)=>{
        cleanedMod[bpOption.mod] = cleanedMod[bpOption.mod] - bpOption.curr
    })
    return cleanedMod;
}
let cleanedMod = removeCurrMod();

const optimizeMod = () =>{
    let finalMods = cleanedMod;
    const sortedBP = bpOptions.sort((first, second)=>{
        return first.max > second.max
    })
    sortedBP.forEach((gear)=>{
        const max = gear.max;
        const name = gear.piece
        let lowestVal = 200;
        let lowestMod = "";
        for (let mod in finalMods){
            if(finalMods[mod]< lowestVal){
                lowestVal = finalMods[mod];
                lowestMod = mod;
            }
        }
        finalMods[lowestMod] = finalMods[lowestMod] + max;
        console.log(`${name} roll ${max}% in ${modtoword[lowestMod]}`)
    })
    console.log("final spread:")
    console.log(`Attack Damage is ${finalMods['AD']}%`)
    console.log(`Crit Damage is ${finalMods['CD']}%`)
    console.log(`Bonus Damage is ${finalMods['BD']}%`)
    console.log(`All Atk is ${finalMods['AA']}%`)
    console.log(`PMI is ${finalMods['PMI']}%`)
    console.log(`Str/Int is ${finalMods['SI']}%`)
    const optimized = printCoefficient(finalMods)
    const delta = (optimized/old - 1) * 100
    console.log(`${delta}% increase`)
}
optimizeMod();

