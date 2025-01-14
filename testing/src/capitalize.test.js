import { capialize } from "./capitalize";
test('capitilize the workd', () => {
    const word = 'random word'
    expect(capialize(word)).toBe('RANDOM WORD')
})
test('should remove trailing spaces', () => {
    const word_with_spaces = "  random word  ";
    expect(capialize(word_with_spaces)).toBe('RANDOM WORD')
})