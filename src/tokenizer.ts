import { Token } from "./tokenizer.interface";

export class Tokenizer {
    string: string;
    headers: string[] = [];
    private cursor = 0;
    private lineSeparator = ["\r", "\n"];
    private separators: string[];

    constructor({
        separators,
        string,
    }: {
        string: string;
        separators: string[];
    }) {
        this.string = string;
        this.separators = separators;
    }

    consumeToken(): Token | null {
        // let accLineSeparator = ""
        let start = this.cursor;

        while (true) {
            if (
                this.separators.includes(this.string[this.cursor]) ||
                this.lineSeparator.includes(this.string[this.cursor]) ||
                !this.string[this.cursor]
            ) {
                break;
            }
            this.cursor++;
        }
        if (start === this.cursor) {
            return this.getToken(this.string[this.cursor++]);
        }
        let auxToken = this.string.substring(start, this.cursor);
        return this.getToken(auxToken);
    }

    private getToken(token: string | undefined): Token | null {
        if (!token) return null;
        let isNumber = parseInt(token);

        if (isNumber) return { type: "NUMBER", value: token };

        if (this.separators.includes(token))
            return { type: "SEPARATOR", value: token };

        if (this.lineSeparator.includes(token))
            return { type: "LINESEPARATOR", value: token };

        return { type: "STRING", value: token };
    }
}
