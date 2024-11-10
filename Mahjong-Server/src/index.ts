//man (characters) 0-9, pin (circles) 9-18, sou (sticks) 18-27, winds ESWN 27-31, dragons WGR 31-34
let hand = [0,0,0,1,1,1,2,2,2]

let isSuit = (x: number) => x < 27
let sameSuit = (x: number, y:number) => isSuit(x) && Math.floor(x/9) === Math.floor(y/9)

let popPair = (hand: number[]) => {
    if (hand[0] !== undefined && hand[0] === hand[1]) {
        return [hand.slice(0,2), hand.slice(2)]
    } 
    else {
        return [undefined, hand]
    }
}
let popTriplet = (hand: number[]) => {
    if (hand[0] !== undefined && hand[0] === hand[1] && hand[1] === hand[2]) {
        return [hand.slice(0,3), hand.slice(3)]
    } 
    else {
        return [undefined, hand]
    }
}
let popSequence = (hand: number[]) => {
    let index1 = hand.findIndex(x => x === hand[0]+1)
    let index2 = hand.findIndex(x => x === hand[0]+2)

    if (hand[0] !== undefined && sameSuit(hand[0], hand[0]+2) && index1 >= 0 && index2 >= 0) {
        return [[hand[0], hand[0]+1, hand[0]+2], [...hand.slice(1,index1), ...hand.slice(index1+1,index2), ...hand.slice(index2+1)]]
    } 
    else {
        return [undefined, hand]
    }
}

let isWinning = (hand: number[]) => {
    hand = hand.sort()
    let isWinningR = (hand: number[], pairPopped: boolean) => {
        if (hand.length === 0) {
            return []
        }

        let [meld, restOfHand] = popSequence(hand)
        if(meld) {
            let winningHand = isWinningR(restOfHand, pairPopped)
            if (winningHand) {
                return [meld, ...winningHand]
            }
        }

        [meld, restOfHand] = popPair(hand)
        if(meld && !pairPopped ) {
            let winningHand = isWinningR(restOfHand, true)
            if (winningHand) {
                return [meld, ...winningHand]
            }
        }

        [meld, restOfHand] = popTriplet(hand)
        if(meld) {
            let winningHand = isWinningR(restOfHand, pairPopped)
            if (winningHand) {
                return [meld, ...winningHand]
            }
        }

        return undefined

    }
    return isWinningR(hand, false)
}

import { mainCombo } from "./combinatorics"
mainCombo()