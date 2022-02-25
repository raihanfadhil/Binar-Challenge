function getAngkaTerbesarKedua(personName) {
    if (typeof personName == "undefined" || typeof personName == "number") {
        return Error("Bukan Array")
    }
    const dataNumbers = personName.sort((a, b) => a - b); //
    const angkaTerbesarKedua = dataNumbers[personName.length - 2]; //Jumlah data dalam array = 9

    if (typeof angkaTerbesarKedua == "number") {
        return angkaTerbesarKedua
    }
}

const dataAngka = [9, 4, 7, 7, 4, 3, 2, 2, 8] //Jika di sort = [2, 2, 3, 4, 4, 7, 7, 8, 9]


console.log(getAngkaTerbesarKedua(dataAngka))
console.log(getAngkaTerbesarKedua(0))
console.log(getAngkaTerbesarKedua())