await Bun.build({
  entrypoints: ["../vercel/index.ts"],
  outdir: "./build",
  target: "node",
});
