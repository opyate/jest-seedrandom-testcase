# Intro

This small project uses [seedrandom](https://github.com/davidbau/seedrandom) to seed `Math.random` and make it predictable, and the test case proves it:

    npx jest --clearCache ; npx jest --no-cache

Running the test outputs:

> Calling Math.random for the very first time matches the first expected random number 0.9282578795792454
> [ 1, 4, 5, 3, 2 ]
> another Math.random from within the test:  0.9776037585079486

The random number `0.9776037585079486` matches the 65th random number in the expected list below, which means the Node/Jest internals must call Math.random 58 more times.

```
1 from the first Math.random in seed.ts
58 from internals (1 + 58 = 59)
5 from lodash shuffle (59 + 5 = 64)
1 more in the test (64 + 1 = 65)
```

(In fact, debugging shuffle shows that its Math.random calls happen at the end, just before the last Math.random call in the test.)

However, add some inconsequential code, and the test fails. E.g. [uncomment this line](https://github.com/opyate/jest-seedrandom-testcase/blob/master/src/foo/thing.test.ts#L11).


# `seedrandom` random numbers

The first 70 seeded random numbers in Node REPL:

```
Welcome to Node.js v12.19.0.
Type ".help" for more information.
> var sr = require("seedrandom")
undefined
> var rng = sr("hello.")
undefined
> for (let i=1; i<=70; i++) { console.log(i, "->", rng()); }
1 -> 0.9282578795792454
2 -> 0.3752569768646784
3 -> 0.7316977468919549
4 -> 0.23707962084956113
5 -> 0.06057665448709666
6 -> 0.6449496351611882
7 -> 0.827952903744234
8 -> 0.7990236606285069
9 -> 0.7986139626450445
10 -> 0.705477573478549
11 -> 0.959300020541289
12 -> 0.15168786604944906
13 -> 0.765113823351725
14 -> 0.30672159547234396
15 -> 0.4847109237276021
16 -> 0.2178831232629724
17 -> 0.06714897817140844
18 -> 0.1543469134923661
19 -> 0.3518956602338352
20 -> 0.41407083891633295
21 -> 0.9183522089416544
22 -> 0.14495367497733044
23 -> 0.850139003128941
24 -> 0.6298110259571698
25 -> 0.6244211695424469
26 -> 0.9206851814339225
27 -> 0.8263300334373005
28 -> 0.7209769220427694
29 -> 0.8106874428304394
30 -> 0.26521166068396834
31 -> 0.7109076379567834
32 -> 0.19899250498806748
33 -> 0.44517261836117145
34 -> 0.6216861095655336
35 -> 0.10664763261613154
36 -> 0.15907173152165963
37 -> 0.6557751666129908
38 -> 0.07912555566277223
39 -> 0.6596497975781873
40 -> 0.8103435782076676
41 -> 0.06671762016494566
42 -> 0.4420789886627748
43 -> 0.8368901326857567
44 -> 0.7750053988479135
45 -> 0.7590411544635162
46 -> 0.5431683157708096
47 -> 0.019177981636972725
48 -> 0.5531710217909477
49 -> 0.31440794653593285
50 -> 0.02564379703256482
51 -> 0.08746923710699106
52 -> 0.3997993482818222
53 -> 0.25837584165282107
54 -> 0.9217691274600593
55 -> 0.6554934338974564
56 -> 0.5340697344668207
57 -> 0.2472385214971424
58 -> 0.5982730182930052
59 -> 0.575811473849893
60 -> 0.19790559040345226
61 -> 0.5635492514098784
62 -> 0.9678100274907969
63 -> 0.8671647483873091
64 -> 0.4823357122161481
65 -> 0.9776037585079486
66 -> 0.8709664659241905
67 -> 0.3042172451024229
68 -> 0.07556249244730054
69 -> 0.8717278135220908
70 -> 0.47973040770936354
```

# Running with Node


    npx ts-node src/index.js

Output:

> Calling Math.random for the very first time matches the first expected random number 0.9282578795792454
> [ 2, 4, 3, 1, 5 ]
> another Math.random() yields the 7th random number in the list: 0.827952903744234


The array above does not match the array in the test, although the first random number is `0.9282578795792454` (which means seeding works).

We also call `Math.random` again after the shuffle, which outputs the 7th random number `0.827952903744234`, which is consistent with the [shuffle implementation](https://github.com/lodash/lodash/blob/master/shuffle.js) which would call `Math.random` five times internally (five being the length of the input array).

# Explanation

With line 11 in the test commented, the first Math.random in shuffle is the 60th Math.random call. (i.e. `0.19790559040345226`)

With line 11 un-commented, it becomes the 69th Math.random call. (i.e. `0.8717278135220908`)

**So, somehow adding another `expect` calls Math.random another 9 times before the tested code is called.**