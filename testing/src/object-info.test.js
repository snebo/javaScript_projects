import { ObjectInfo } from "./obect-info";

describe('return object info', () => {
    test('it exists', () => {
    })
    test("should return the info of the object passed", () => {
        const obj = ObjectInfo([1, 2, 3, 4, 5])
        expect(obj.info()).toEqual({ sum: 15, average: 3, length: 5, min: 1, max: 5 })
    })
    test('works on an empty array', () => {
        const obj = ObjectInfo([])
        expect(obj.info()).toEqual({ sum: 0, average: 0, length: 0, min: 0, max: 0 })
    })
    test('should work with a single val array', () => {
        const obj = ObjectInfo([2])
        expect(obj.info()).toEqual({ sum: 2, average: 2, length: 1, min: 2, max: 2 })
    })
    test('works with negative vals', () => {
        const obj = ObjectInfo([-1, -2, -3, -4, -5])
        expect(obj.info()).toEqual({ sum: -15, average: -3, length: 5, min: -5, max: -1 })
    })
})