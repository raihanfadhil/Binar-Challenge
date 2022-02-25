function changeWord(selectedText, changedText, text) {
    return text = text.replace(selectedText, changedText)
}
const kalimat1 = 'Andini sangat mencintaimu selamanya'
const kalimat2 = 'Gunung Bromo tak akan mampu menggambarkan besarnya cintaku padamu'


console.log(changeWord('mencintaimu', 'membencimu', kalimat1))
console.log(changeWord('Bromo', 'Semeru', kalimat2))