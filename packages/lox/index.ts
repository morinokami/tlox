import { Scanner } from "./scanner";

let hadError = false;

async function runFile(path: string) {
	const file = Bun.file(path);
	run(await file.text());

	if (hadError) {
		process.exit(65);
	}
}

async function runPrompt() {
	process.stdout.write("> ");
	for await (const line of console) {
		run(line);
		hadError = false;
		process.stdout.write("> ");
	}
}

async function run(source: string) {
	const scanner = new Scanner(source);
	const tokens = scanner.scanTokens();

	for (const token of tokens) {
		console.log(token);
	}
}

export function error(line: number, message: string) {
	report(line, "", message);
}

function report(line: number, where: string, message: string) {
	console.error(`[line ${line}] Error${where}: ${message}`);
	hadError = true;
}

function main() {
	if (Bun.argv.length > 3) {
		console.log("Usage: tlox [script]");
		process.exit(64);
	} else if (Bun.argv.length === 3) {
		runFile(Bun.argv[2]);
	} else {
		runPrompt();
	}
}

main();
