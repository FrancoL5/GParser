import { Tokenizer } from "./tokenizer";
import { Token } from "./tokenizer.interface";

type Leaf = { value: Token | null; l: Leaf | null; r: Leaf | null };

export class Parser {
    tree: { head: Leaf } = { head: { value: null, l: null, r: null } };
    head: Leaf;
    cursor: Leaf;
    tokenizer: Tokenizer;

    constructor(options: { string: string; separators: string[] }) {
        this.tokenizer = new Tokenizer(options);
        this.head = this.tree.head;
        this.cursor = this.head;
        this.head.value = this.tokenizer.consumeToken();
    }

    next() {
        const token = this.tokenizer.consumeToken();
        if (token) {
            this.catalogToken(token);
        }

        return token;
    }

    validToken(token: Token) {
        const cursorType = this.cursor.value?.type;
        if (cursorType === "SEPARATOR" || cursorType === "LINESEPARATOR") {
            return token.type !== "SEPARATOR" && token.type !== "LINESEPARATOR";
        }
        if (cursorType?.search(/[STRING, NUMBER]*/g) !== -1) {
            return token.type === "SEPARATOR" || token.type === "LINESEPARATOR";
        }
    }

    catalogToken(token: Token) {
        if (!this.validToken(token)) {
            throw new Error("Invalid Token\n" + JSON.stringify(this.tree));
        }
        if (token.type === "SEPARATOR" || token.type === "LINESEPARATOR") {
            this.cursor.r = { value: token, l: null, r: null };
            this.cursor = this.cursor.r;
        } else {
            this.cursor.l = { value: token, l: null, r: null };
        }
    }
}
