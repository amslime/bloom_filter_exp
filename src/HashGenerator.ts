export function generator(prime: number, broomLen: number, randomInc = Math.floor(Math.random() * 255)) {
    return (target: string): number => {
        let ret = 0
        for (let i = 0; i < target.length; i++) {
            ret = (ret * 255 + target.charCodeAt(i)) % prime
        }
        return ret % broomLen
    }
}