import { Parser } from "./src/parser";
import { Tokenizer } from "./src/tokenizer";
import { Token } from "./src/tokenizer.interface";
import * as fs from "fs/promises";
(async () => {
    let cadena = await fs.readFile("./tests.csv", "utf-8");

    const parser = new Parser({ string: cadena, separators: [","] });

    parser.next()
    parser.next()
    // let head = tree.head;
    // while (true) {
    //     let result = tokenizer.consumeToken();
    //     console.log(result);
    //     if (result) {
    //         if (
    //             result.type === "SEPARATOR" ||
    //             result.type === "LINESEPARATOR"
    //         ) {
    //             head.r = { value: result, l: null, r: null };
    //             head = head.r;
    //         } else {
    //             head.l = { value: result, l: null, r: null };
    //         }
    //     } else {
    //         break;
    //     }
    // }
    console.log(JSON.stringify(parser.head, null, 2));
})();
