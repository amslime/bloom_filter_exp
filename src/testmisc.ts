function checkRandomAvg(slot: number, times: number = slot * 10000, insert: (arr: number[]) => void =(arr)=>{
    for (let i = 0; i < times; i++) {
        arr[Math.floor(Math.random() * slot)]++
    }
}, percent: number = 0.05) {
    const arr: number[] = []
    for (let i = 0; i < slot; i++) arr.push(0)

    insert(arr)

    const low = times / slot * (1 - percent)
    const up = times / slot * (1 + percent)
    for (let i = 0; i < times; i++) {
        if (arr[i] < low || arr[i] > up) return false
    }
    return true
}

console.log(checkRandomAvg(1000))