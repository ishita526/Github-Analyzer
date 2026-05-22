# ANSWERS.md

## 1. How to run

Clone the repository:

```bash
git clone <your-repo-link>
cd <repo-name>
npm install
npm run dev
```

The project runs locally using Vite. Node.js and npm must be installed before running the project.

---

## 2. Stack choice

I chose React with Vite and Tailwind CSS because the project mainly focuses on building a fast and responsive frontend that consumes a public API. React made it easy to structure reusable UI components, while Vite provided a lightweight and fast development environment.

A worse choice for this task would have been a heavier backend-focused stack because the project does not require authentication, databases, or server-side rendering.

---

## 3. One real edge case

The project correctly handles the case where a GitHub username does not exist.

File:
`src/services/githubApi.js`

Without this handling, the application would crash or display broken UI when the API returns a 404 response.

The app instead shows a proper error message to the user.

---

## 4. AI usage

I used ChatGPT and Antigravity CLI during development.

AI was used for:
- generating initial React component structure
- helping with GitHub API integration
- improving Tailwind UI styling
- debugging API fetch issues
- generating loading and error handling ideas

One change I made manually was simplifying some generated component logic to make the code easier to understand and maintain. Some AI-generated code was overly complex for a beginner-level project, so I refactored it into smaller and simpler sections.

---

## 5. Honest gap

One limitation in the current submission is that the language analysis is fairly basic and does not include advanced visualizations or deeper repository insights.

With another day, I would improve the analytics section by adding charts, better filtering, and more detailed developer activity insights.