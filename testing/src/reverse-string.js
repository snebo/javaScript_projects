export const reverseString = word => {
    const letters = word.split('')
    const reversed_letters = letters.map((item, idx) => letters[letters.length - 1 - idx]).join('').trim()
    return reversed_letters
}