import { Tokenizer } from "./src/tokenizer";
import { Token } from "./src/tokenizer.interface";
import * as fs from "fs/promises";
(async () => {
    let cadena = await fs.readFile("./tests.csv", "utf-8");

    const tokenizer = new Tokenizer({
        separators: [","],
        string: cadena,
    });
    type Leaf = { value: Token | null; l: Leaf | null; r: Leaf | null };
    const tree: { head: Leaf } = { head: { value: null, l: null, r: null } };

    const first = tokenizer.consumeToken();
    if (first) {
        tree.head = { value: first, l: null, r: null };
    }
    let head = tree.head;
    while (true) {
        let result = tokenizer.consumeToken();
        console.log(result);
        if (result) {
            if (
                result.type === "SEPARATOR" ||
                result.type === "LINESEPARATOR"
            ) {
                head.r = { value: result, l: null, r: null };
                head = head.r;
            } else {
                head.l = { value: result, l: null, r: null };
            }
        } else {
            break;
        }
    }
    console.log(JSON.stringify(tree,null,2))
})();
