export const ObjectInfo = object => {
    const sum = object.reduce((prev, curr) => prev + curr, 0)
    const length = object.length
    const average = (length > 1) ? (Math.floor(sum / length)) : sum
    const minVal = (length > 0) ? Math.min(...object) : 0
    const maxVal = (length > 0) ? Math.max(...object) : 0
    const info = () => {
        const data = {}
        data['sum'] = sum
        data['average'] = average
        data['length'] = length
        data['min'] = minVal
        data['max'] = maxVal

        return data
    }
    return { info }
}