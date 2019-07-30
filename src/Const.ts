export function generatePrimes(begin: number, end: number) {
    const ret = []
    for (let i = Math.max(2, Math.ceil(begin)); i < end; i++) {
        const mt = Math.floor(Math.sqrt(i))
        let factor = i
        for (let j = 2; j <= mt; j++) {
            if (i % j === 0) {
                factor = j
                break
            }
        }
        if (factor === i) ret.push(i)
    }
    return ret
}

export function chooseOneAtRandom(primeList: number[]) {
    return primeList[Math.ceil(Math.random() * primeList.length)]
}


// console.log(chooseOneAtRandom(generatePrimes(1000000, 2000000)))