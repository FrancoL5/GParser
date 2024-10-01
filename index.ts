import { Tokenizer } from "./src/tokenizer"
import { Token } from "./src/tokenizer.interface"
import * as fs from "fs/promises"

;(async () => {
    let cadena = await fs.readFile("./tests.csv", "utf-8")

    const tokenizer = new Tokenizer({
        separators: [","],
        string: cadena,
    })
    const acc: Array<Token | null> = []
    while (true) {
        let result = tokenizer.consumeToken()
        console.log(result)
        if (result) {
            acc.push(result)
        } else {
            break
        }
    }
    // console.log(acc)
})()
