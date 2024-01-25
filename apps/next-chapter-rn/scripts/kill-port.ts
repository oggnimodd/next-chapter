import { $ } from "bun";

export async function killPort(port: number) {
  await $`kill -9 \$(lsof -t -i:${port})`;
}

// Read command line arguments
const port = parseInt(process.argv[2]);
// @ts-ignore
await killPort(port);
