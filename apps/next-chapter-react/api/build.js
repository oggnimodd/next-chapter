import esbuild from "esbuild";

// await Bun.build({
//   entrypoints: ["../vercel/index.ts"],
//   outdir: "./build",
//   target: "node",
// });

esbuild
  .build({
    entryPoints: ["../vercel/index.ts"], // Entry point for your application
    bundle: true, // Bundle all input files into a single output file
    minify: false, // Minify the output code
    sourcemap: true, // Generate source maps for easier debugging
    target: "node14", // Target environment for the compiled code
    outfile: "./build/index.js", // Output file for the compiled code
    format: "esm",
  })
  .catch(() => process.exit(1));
