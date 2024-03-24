import type { TokenType } from "./token-type";

export class Token {
	type: (typeof TokenType)[keyof typeof TokenType];
	lexeme: string;
	literal: unknown;
	line: number;

	constructor(
		type: (typeof TokenType)[keyof typeof TokenType],
		lexeme: string,
		literal: unknown,
		line: number,
	) {
		this.type = type;
		this.lexeme = lexeme;
		this.literal = literal;
		this.line = line;
	}

	toString(): string {
		return `${this.type} ${this.lexeme} ${this.literal}`;
	}
}
