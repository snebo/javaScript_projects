import { Calculator } from "./calculator";


describe('calculator test', () => {
    const calculator = Calculator()
    describe('sum function', () => {
        test('it is initilized', () => { })
        test('sum two values', () => {
            expect(calculator.sum(2, 3)).toBe(5)
        })
        test('sum is always greater than 0', () => {
            const positive_ints = [3, 2, 5, 4, 6, 1]
            positive_ints.forEach(a => expect(calculator.sum(a, positive_ints[Math.floor(Math.random() * positive_ints.length)]))
                .toBeGreaterThan(1))// used one here because its possible the rand no is itself
        })
    })
    describe('minus function', () => {
        test('should minus value a from b', () => {
            expect(calculator.minus(5, 3)).toBe(2)
        })
        test('should be negative for double negative', () => {
            expect(calculator.minus(-3, -1)).toBeLessThan(0)
        })
    })
    describe('mulitply function', () => {
        test('should multiply value a and b', () => {
            expect(calculator.product(3, 5)).toBe(15)
        })
        test('should be positive for double negative', () => {
            expect(calculator.product(-3, -1)).toBeGreaterThan(0)
        })
        test('be zero when multipled by 0', () => {
            expect(calculator.product(34, 0)).toBe(0)
        })
        test('shoud remain unchanged when multiplied by 1', () => {
            expect(calculator.product(3, 1)).toBe(3)
        })
    })
    describe('divide function', () => {
        test('should multiply value a and b', () => {
            expect(calculator.divide(4, 2)).toBe(2)
        })
        test('should be a float', () => {
            expect(calculator.divide(7, 2)).toBe(3.5)
        })
        test('be zero when multipled by 0', () => {
            expect(() => calculator.divide(34, 0)).toThrow()
        })
        test('shoud remain unchanged when multiplied by 1', () => {
            expect(calculator.divide(3, 1)).toBe(3)
        })
    })
})