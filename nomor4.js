function isValidPassword(email) {
    let checkM = email.toString().charAt()
    if (email.length >= 8 && checkM == 'M' && typeof email == "string") {
        email = true
    } else if (email.length >= 8 && checkM != 'M' && typeof email == "string") {
        email = false
    } else if (email.length <= 8 && typeof email == "string") {
        email = false
    } else if (typeof email != "string") {
        throw Error("Invalid Password")
    }
    return email
}

console.log(isValidPassword('Meong2021'))

console.log(isValidPassword('meong2021'))

console.log(isValidPassword('@eong'))

console.log(isValidPassword('Meong2'))

console.log(isValidPassword(0))

console.log(isValidPassword())