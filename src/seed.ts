import seedrandom from "seedrandom"
seedrandom("hello.", { global: true })
if (0.9282578795792454 == Math.random()) {
    console.log("Calling Math.random for the very first time matches the first expected random number 0.9282578795792454")    
}
