# Intro

This small project uses `seedrandom` to seed `Math.random` and make it predictable, and the test case proves it:

    npm run test


However, add some inconsequential code, and the test fails. E.g. [uncomment this line](https://github.com/opyate/jest-seedrandom-testcase/blob/master/src/foo/thing.test.ts#L10).


# Workaround

Using [mocha](https://mochajs.org/) instead of [jest](https://jestjs.io/) works:

    npm run test-mocha

    