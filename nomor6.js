function getAngkaTerbesarKedua(dataAngka) {
    const dataNumbers = dataAngka.sort((a, b) => a - b); //
    return dataNumbers[dataAngka.length - 2]; //Jumlahh data dalam array = 9
}

const dataAngka = [9, 4, 7, 7, 4, 3, 2, 2, 8] //Jika di sort = [2, 2, 3, 4, 4, 7, 7, 8, 9]

console.log(getAngkaTerbesarKedua(dataAngka))
console.log(getAngkaTerbesarKedua(0))
console.log(getAngkaTerbesarKedua())