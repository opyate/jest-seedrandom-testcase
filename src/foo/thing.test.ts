import "../seed"

import doStuff from "./thing"

// import { expect, test } from "@jest/globals"

// test('doStuff', () => {
//     const arr = doStuff()

//     // expect(arr[0]).toBe(1)
//     expect(arr).toStrictEqual([1,2,3,4,5])
// })

import assert from "assert"


describe('doStuff', function() {
    it('should return the same shuffled array, as we are seeding', function() {
        const arr = doStuff()

        // comment or un-comment this line, and the tests still pass, unlike with jest:
        assert.strictEqual(arr[0], 4)
        assert.deepStrictEqual(arr, [4,2,3,1,5]);
    });
});
