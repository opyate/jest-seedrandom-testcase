import * as _ from "lodash"


export default function doStuff(): number[] {
    const result = _.shuffle([1,2,3,4,5])
    console.log(result)
    return result
}
