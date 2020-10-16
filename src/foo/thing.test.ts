import "../seed"

import doStuff from "./thing"

import { expect, test } from "@jest/globals"

test('doStuff', () => {
    const arr = doStuff()

    // var uncomment = "me"
    expect(arr).toStrictEqual([1,2,3,4,5])
})