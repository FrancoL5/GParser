export interface Token {
    type: "STRING" | "NUMBER" | "SEPARATOR" | "LINESEPARATOR"
    value: string | number
}
