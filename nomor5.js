function getSplitName(personName) {
    const givenNumber = personName.split(' ')
    const [first, middle, last] = personName.split(' ')

    var obj = {
        ...(givenNumber.length == 3 && {
            firstName: first,
            middle: middle,
            last: last
        }),
        ...(givenNumber.length == 2 && {
            firstName: first,
            middle: null,
            last: middle
        }),
        ...(givenNumber.length == 1 && {
            firstName: first,
            middle: null,
            last: null
        })
    }

    if (givenNumber.length > 3) {
        throw Error("This Function is only for 3 character name")
    }
    if (typeof obj == "object") {
        return obj
    }
}

console.log(getSplitName("Aldi Daniela Pranata"))
console.log(getSplitName("Dwi Kuncoro"))
console.log(getSplitName("Aurora"))
console.log(getSplitName("Aurora Aureliya Sukma Darma"))
console.log(getSplitName(0))