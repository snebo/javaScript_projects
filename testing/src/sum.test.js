// const sum = require('./sum')
import { sum } from "./sum"

test('add 1+2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3) // to be uses the simple object.is
})

test('check if the objects match', () => {
    const data = { 'one': 1 }
    data['two'] = 2
    expect(data).toEqual({ 'one': 1, 'two': 2 })
    // to equal check the object values
})
test('add positive number is not zero', () => {
    expect(sum(-2, -1)).not.toBe(0)
})
/***
 * toBeNull matches only null
 * toBeUndefined matches only undefined
 * toBeDefined is the opposite of toBeUndefined
 * toBeTruthy matches anything that an if statement treats as true
 * toBeFalsy matches anything that an if statement treats as false
 * toThrow() that also takes an error and can match with that or toThrow(Error)
 */