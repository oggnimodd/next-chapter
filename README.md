Live Demo: [https://sekawan-media-frontend-test-1234.netlify.app](https://sekawan-media-frontend-test-1234.netlify.app)

This application was built using the following technologies:

1. React JS
2. TypeScript
3. Next UI as the UI library
4. Tailwind CSS as the CSS utility
5. TRPC for type-safe client-server communication
6. Clerk authentication for managing users
7. Biome as a linter and prettier
8. Bun as a script runner and package manager
9. Express JS (server in the production environment)
10. Elysia JS (server in the development environment)
11. Netlify serverless function
12. Turso database (SQLite)
13. Prisma as an ORM

The application is set up using bun workspace, and its dashboard is in `apps/react`. To run the project:

1. Clone this repository.
2. At the root of the repository, run `bun install`.
3. Fill in the .env following the `.env.example`.
4. Clerk guidance is available here: [https://clerk.com/docs/quickstarts/react](https://clerk.com/docs/quickstarts/react)
5. Prisma and Turso guidance can be found here: [https://www.prisma.io/blog/prisma-turso-ea-support-rXGd_Tmy3UXX](https://www.prisma.io/blog/prisma-turso-ea-support-rXGd_Tmy3UXX)
6. After filling in `.env` in the root directory, run `bun run dev` in `apps/react` and `bun run dev` in `packages/api`.

##### Sreenshots

<img src="./ss/1.png"/>
<img src="./ss/2.png"/>
<img src="./ss/4.png"/>
<img src="./ss/5.png"/>
<img src="./ss/6.png"/>
<img src="./ss/7.png"/>
<img src="./ss/8.png"/>