function checkEmail(email) {
    var nodot = /[.]/
    if (nodot.test(email) && typeof email == "string") {
        email = "Valid"
    } else if (typeof email == "string") {
        email = "Invalid"
    } else {
        //throw Error("No Parameter")
    }
    return email;
}


console.log(checkEmail('apranata@binar.co.id'))
console.log(checkEmail('apranata@binar.com'))
console.log(checkEmail('apranata@binar'))
console.log(checkEmail('apranata'))
console.log(checkTypeNumber(checkEmail(3322)))
console.log(checkEmail())