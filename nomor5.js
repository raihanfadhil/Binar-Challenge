function getSplitName(personName) {
    if (typeof personName != "string") {
        return Error("Bukan String")
    }
    const givenNumber = personName.split(' ')
    const [firstName, middleName, lastName] = personName.split(' ')

    var obj = {
        ...(givenNumber.length == 3 && {
            first: firstName,
            middle: middleName,
            last: lastName
        }),
        ...(givenNumber.length == 2 && {
            first: firstName,
            middle: null,
            last: middleName
        }),
        ...(givenNumber.length == 1 && {
            first: firstName,
            middle: null,
            last: null
        })
    }

    if (givenNumber.length > 3) {
        return Error("This Function is only for 3 character name")
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