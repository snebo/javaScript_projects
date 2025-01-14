export const Calculator = () => {
    const sum = (a, b) => a + b;

    const minus = (a, b) => a - b;
    const product = (a, b) => a * b;
    const divide = (a, b) => {
        if (a === 0 || b === 0) {
            throw new Error("Can't divide by zero");
        }
        return +(a / b).toPrecision()
    }
    return { sum, minus, product, divide }
} 