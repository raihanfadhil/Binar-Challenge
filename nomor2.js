const checkTypeNumber = (givenNumber) => {
    if (givenNumber % 2 == 0 && typeof Number && typeof givenNumber != "object") {
        givenNumber = "Genap"
    } else if (typeof givenNumber == "string") {
        givenNumber = "Error: Invalid data type"
    } else if (typeof givenNumber == "object") {
        givenNumber = "Error: Invalid data type"
    } else if (givenNumber % 2 >= 0 && typeof Number) {
        givenNumber = "Ganjil"
    } else (
        givenNumber = "Error: Bro, where is the parameter?"
    )
    return givenNumber
}

console.log(checkTypeNumber(10))
console.log(checkTypeNumber(3))
console.log(checkTypeNumber("3"))
console.log(checkTypeNumber({}))
console.log(checkTypeNumber([]))
console.log(checkTypeNumber())