import { CeaserCipher } from './ceaser-cipher'

describe('CeaserCipher', () => {
    const cc = CeaserCipher()
    test("file exists", () => {

    })
    test("encrypts a word", () => {
        const word = 'good evening lad'
        // const word = 'abcd xyz'
        expect(cc.encode(word, 2)).toBe('iqqf gxgpkpi ncf')
    })
    test("shoud keep casing", () => {
        const word = "AbCd XyZ"
        expect(cc.encode(word, 3)).toBe('DeFg AbC')
    })
    test("should exclude non letters", () => {
        const word = '12AD44!@#FreE-PAC'
        expect(cc.encode(word, 13)).toBe('12NQ44!@#SerR-CNP')
    })
    test('should work on an empty list', () => {
        const word = ''
        expect(cc.encode(word, 3)).toBe('')
    })
    test('should decode a cipter', () => {
        const word = 'DeFg AbC'
        expect(cc.decode(word, 3)).toBe('AbCd XyZ')
    })
    test('should decode for non letter charaters', () => {
        const word = '12NQ44!@#SerR-CNP'
        expect(cc.decode(word, 13)).toBe('12AD44!@#FreE-PAC')
    })
    test('should work on an empty list', () => {
        const word = ''
        expect(cc.decode(word, 3)).toBe('')
    })
})