export const CeaserCipher = () => {
    // const encode = (word, num) => {
    //     const code = []
    //     const characters = word.split('').map((item) => item.charCodeAt())
    //     // console.log(characters)
    //     // console.log(characters.map((item) => String.fromCharCode(item)))

    //     // increament the letter
    //     characters.forEach((letter) => {
    //         //check for letters only
    //         let new_char;
    //         if (letter.match(/[a-zA-Z]/)) {

    //         }
    //         else{new_char = String.fromCharCode(letter)}
    //         code.push(new_char)
    //     })
    //     return code.join('')
    // }
    const encode = (code, num) => {
        const word = code.split('')
        const new_word = shiftCharacters(word, num, true)
        return new_word.join('')
    }
    const decode = (code, num) => {
        const word = code.split('')
        const new_word = shiftCharacters(word, num, false)
        return new_word.join('')
    }
    const shiftCharacters = (list, spaces, type) => {
        const new_list = []
        list.forEach(char => {
            let new_char = ''
            if (char.match(/[a-zA-Z]/)) {
                const t_char = char.toLowerCase()
                if (type) {
                    new_char = ((t_char.charCodeAt() + spaces) <= 122) ? (t_char.charCodeAt() + spaces) : (t_char.charCodeAt() + spaces - 26)
                    new_char = (char === char.toUpperCase()) ? (String.fromCharCode(new_char)).toUpperCase() : String.fromCharCode(new_char)
                } else {
                    new_char = ((t_char.charCodeAt() - spaces) >= 97) ? (t_char.charCodeAt() - spaces) : (t_char.charCodeAt() - spaces + 26)
                    new_char = (char === char.toUpperCase()) ? (String.fromCharCode(new_char)).toUpperCase() : String.fromCharCode(new_char)
                }
            } else {
                new_char = char
            }
            new_list.push(new_char)
        })
        return new_list
    }
    return { encode, decode }
}