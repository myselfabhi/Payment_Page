# Payment Page Setup

This is a code bundle for Payment Page Setup. The original project is available at https://www.figma.com/design/Q5gb13crXkhBs9LfbCK4Mh/Payment-Page-Setup.

## Requirements

- **Node.js 18+** (Vite 6 and dependencies require modern JavaScript). If you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use` in the project directory (see `.nvmrc`).

## Running the code

1. Run `npm i` to install the dependencies.
2. Run `npm run dev` to start the development server.

If you see `Unexpected token '||='`, your current Node version is too old. Use Node 18+ (e.g. `nvm use 20` or set your PATH so the correct Node is used).

## Deploy to Vercel

1. Push the repo to GitHub.
2. In [Vercel](https://vercel.com), import the GitHub repository.
3. Vercel will use the project’s `vercel.json` (build command, output directory, SPA rewrites). No extra config needed.
4. Deploy; the app will be built with `npm run build` and served from `dist/`.

## GitHub build checks

On every push and pull request to `main` or `master`, GitHub Actions runs a build (see `.github/workflows/build.yml`). Fix any failing build before merging.
