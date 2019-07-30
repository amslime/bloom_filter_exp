import { generator } from "./HashGenerator"
import { generatePrimes, chooseOneAtRandom} from "./Const"
import * as RandomString from "string-random"
import Client from "./client";

const primes = generatePrimes(10000000, 20000000)

const m = 300000
const k = 4
const n = 50000
const testn = 1000000

const randStrlen= 16

const hashFunctions: ((target: string)=>number)[] = []
for (let i = 0; i < k; i++) {
    hashFunctions.push(generator(chooseOneAtRandom(primes), m))
}

const bits = new Array<boolean>(m)
const bitsCount: number[] = []
for (let i = 0; i < m; i++) {
    bits[i] = false
    bitsCount[i] = 0
}

function getInsertBits(target: string): number[] {
    const ret = []
    for (const f of hashFunctions)  ret.push(f(target))
    return ret
}

function addBits(bitsOffset: number[]) {
    for (const offset of bitsOffset) {
        if (0 <= offset && offset < m) {
            bits[offset] = true
            bitsCount[offset]++
        }
    }
}

function hasBits(bitsOffset: number[]) {
    for (const offset of bitsOffset) {
        if (0 <= offset && offset < m) {
            if (bits[offset] === false) return false
        } else {
            return false
        }
    }
    return true
}
/*
const s = RandomString.default(20)
console.log(s)
console.log(getInsertBits(s))
*/


async function startTest() {
    let mySet = new Set<string>()
    /*
    const client = new Client("mongodb://localhost:27017")
    const db = await client.getDb("bloom_fliter")
    await db.dropCollection("exp").then().catch((err) => {})
    await db.createCollection("exp").then().catch((err) => {})
    const collection = db.collection("exp")
    collection.createIndex({d: 1})
    */
    for (let i = 0; i < n; i++) {
        while (true) {
            const s = RandomString.default(randStrlen)
            // const arr = await collection.findOne({"d" : s})
            // if (arr === null) {
            if (!mySet.has(s)) {
                // await collection.insertOne({"d": s})
                mySet.add(s)
                addBits(getInsertBits(s))
                break
            }

        }
    }
    
    let bt = 0
    for (let i = 0; i < m; i++) {
        if (bits[i]) bt++
    }

    let match = 0
    let exactMatch = 0
    for (let i = 0; i < testn; i++) {
        const s = RandomString.default(randStrlen)
        if (hasBits(getInsertBits(s))) {
            match++
            if (mySet.has(s)) exactMatch++
            // const arr = await collection.findOne({"data" : s})
            // if (arr !== null) exactMatch++
        }
    }

    console.log(`data size(n): ${n}, bit size(m): ${m}, hash function number(k): ${k}`)
    // console.log(`db size bits (not compressed)= ${(await collection.stats()).size * 8}`)
    console.log(`bits coverage(1's of total): ${(bt * 100 / m).toFixed(3)}%`)
    console.log(`false positive%: ${((match - exactMatch)/testn * 100).toFixed(3)}%, false-match: ${match - exactMatch}, total-test: ${testn}`)
    //await client.close()
}

startTest()


