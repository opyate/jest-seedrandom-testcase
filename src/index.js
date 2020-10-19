require("./seed")
var thing = require("./foo/thing")
thing.default()
console.log("another Math.random() yields the 7th random number in the list:", Math.random())
