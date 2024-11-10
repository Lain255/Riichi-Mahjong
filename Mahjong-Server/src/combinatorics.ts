const { performance } = require('perf_hooks');


let handStep = (hand:number[], n:number, copies:number) => {
    hand = hand.sort(function(a, b) {
        return a - b;
      })

    //move element n to next avaiable spot.
    //if no space move n-1 to next available spot, and place n in 


    let firstAvailable = (hand:number[],spot:number) => {
        let nextSpot = spot
        while (hand.filter(x=>x===nextSpot).length >= copies && nextSpot < n) {
            nextSpot = nextSpot+1
        }
        if (nextSpot === n) {
            return -1
        }
        else {
            return nextSpot
        }
    }

    let handStepR = (hand:number[], index: number) => {
        if (index < 0) {
            return undefined
        }

        let spot = hand.at(index)
        let nextSpot = firstAvailable([...hand.slice(0, index), ...hand.slice(index+1)],spot+1)
        if(nextSpot === -1) {
            hand = handStepR(hand, index-1)
            if (hand === undefined) {
                return undefined
            }

            nextSpot = firstAvailable([...hand.slice(0, index), ...hand.slice(index+1)],hand.at(index-1))
            hand[index] = nextSpot
            return hand
        }

        hand[index] = nextSpot
        return hand
    }
    return handStepR(hand, hand.length - 1)

}
let nCrLmIteratorMethod = (n:number,k:number,m:number) => {
    let handStart = []
    for (let i = 0; i < k; i++ ) {
        handStart.push(Math.floor(i/m))
    }
    let i = 0
    while (handStart) {
        i = i+1
        if ( i < 0) {
            console.log(handStart, i)
        }
        handStart = handStep(handStart, n, m)
    }
    return i
}

let primeFactors = (n : number) => {
    if (n <= 1) {
        return [n]
    }
    let i = 2
    let factors = []
    while (n !== 1) {
        if (n % i === 0) {
            n = n/i
            factors = [...factors, i]
        }
        else {
            i++
        }
    }
    return factors
}

let mainComboA = () => {
    console.log(primeFactors(24))
    let n = 11
    let k = 10
    for (let i = 1; i <= 10; i++) {
        let m = i
        console.log(`${n} choose ${k} limit ${m} = ${nCrLmIteratorMethod(n,k,m)}}`)
    }
    
}

let handTypes = (k:number,m:number):number[][] => {
    if (k <= 0) {
        return [[]]
    }

    if (k < m) {
        m = k
    }
    if (m <= 1) {
        return [[k]]
    }

    let hands = [[k]]
    // i is iterator for maximum meld size
    for (let i = 2; i <= m; i++) {
        //j iterates over how many melds of max size to take before the recursive call
        for (let j = 1; j <= Math.floor(k / i); j++) {
            let newHands = handTypes(k-j*i, i-1)
            hands = hands.concat(newHands.map(x => x.concat( [...(new Array(i-x.length - 1)).fill(0), j]) ))
        }
    }
    return hands
}
let nCr = (n:number, k:number) => {
    let prod = 1
    for (let i =k; i>0; i--) {
        prod *= (n + 1 - i) / i
    }
    return prod
}
let nCrList = (list:number[]) => {
    let sum = list.reduce((sum,x) => sum + x, 0)
    let prod = 1
    for (let i = 0; i < list.length -1; i++) {
        prod *= nCr(sum, list[i])
        sum -= list[i]
    }
    return prod
}
let countHandTypes = (n: number, hand: number[]) => {
    return nCrList(hand) * nCr(n, hand.reduce((sum, x) => sum+x, 0))
}
let nCrLmPartitionMethod = (n:number, k:number, m:number) => {
    let hands = handTypes(k,m)
    return hands.reduce((sum, x) => sum + countHandTypes(n,x), 0)
}


let handTypesAlt = (k:number,m:number):number[][] => {
    let hands = [[k]]
    for (let i = 2; i <= m; i++) {

    }
    return hands
}
let prettyPrintHandType = (hand : number[]) => {
    let str = ""
    let n = 1
    for (let i = hand.length; i >=0; i--) {
        for (let j = 0; j < hand[i]; j++) {
            str += n.toString(10).repeat(i+1)
            n++ 
        }
    }
    return str
}
let validHandType = (hand: number[], k:number) => {
    return k === hand.reduce((sum,x,i) => sum + x*(i+1), 0)
}

let mainCombo = () => {
    let n = 40
    for(let i = 1; i < n; i++) {
        for(let j = i; j <= i; j++) { 
            //let iterStartTime = performance.now()
            //let numHandsIter = nCrLmIteratorMethod(n, i, j)
            //let iterEndTime = performance.now()

            //let altStartTime = performance.now()
            //let hands = handTypes(i,j)
            //let numHandTypes = hands.length
            //let numHandsAlt = hands.reduce((sum, x) => sum + countHandTypes(i,x), 0)
            //let altEndTime = performance.now()


            //console.log(`hands of size ${i} with ${j} replacements = ${numHandTypes} hands`)
            //console.log(`num hands iter = ${numHandsIter}. ${iterEndTime-iterStartTime}ms`)
            //console.log(`num hands alt = ${numHandsAlt}. ${altEndTime-altStartTime}ms`)

            console.log(`hands of size ${i} with ${i} replacements = ${nCrLmPartitionMethod(i,i,Math.floor(i/4)) / nCrLmPartitionMethod(i,i,i)} hands`)
            console.log(`hands of size ${i} with ${Math.floor(i/8)} replacements = ${2} hands`)



            //console.log(`(${i},${hands.length})`)
            //console.log(`hands of size ${i} with ${j} replacements = ${hands.join("|")} -> ${hands.map(x => prettyPrintHandType(x))}`)
            /*
            if (hands.every(x => validHandType(x, i))) {
                console.log("PASS")
            }
            else {
                console.log("FAIL")
            }
            */
        }
    }
    
}

export {mainCombo}
