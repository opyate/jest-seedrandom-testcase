import "../seed"

import doStuff from "./thing"

import { expect, test } from "@jest/globals"

test('doStuff', () => {
    const arr = doStuff()
    console.log("another Math.random from within the test: ", Math.random())

    expect(arr[0]).toBe(1)
    expect(arr).toStrictEqual([1,4,5,3,2])
})