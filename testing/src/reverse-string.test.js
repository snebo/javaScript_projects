import { reverseString } from "./reverse-string";

test('should reverse the string', () => {
    const word = "church"
    expect(reverseString(word)).toBe('hcruhc')
})

test('should trim and keep casing', () => {
    const word = 'alPHabeT  '
    expect(reverseString(word)).toBe('TebaHPla')
})