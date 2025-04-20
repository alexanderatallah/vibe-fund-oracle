
# Vibe Fund: AI Model Stock Price Prediction Benchmark

## Project Brief

"Create a benchmark webapp called Vibe Fund. Two phases to it:

PHASE A:

1. for each reasoning model on OpenRouter with at least 200k context,
2. for each of the most popular stocks in the S&P 500,
3. at the start of each day,
4. while feeding each LLM a list of fundamentals and news about each stock in the prompt,
5. predict the closing price, using a single LLM request with maximum reasoning

For the models, we can start with just openai o3, claude 3.7 sonnet, gemini 2.5 pro, and DeepSeek R1.

Each prediction should be stored and clearly viewable in a stock-chart-like UI.

PHASE B:

At the close of the stock market each day,
1. for each stock,
2. find the closing price,
3. grade each model (show how far off it was),
4. update a total score (weighted mean) for each model

The total scores of each model should be shown in a table, sorted highest score descending, at the very top of the front page."

## Project info

**URL**: https://lovable.dev/projects/7369c68f-3299-49b9-90f2-bed90d4bab18

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7369c68f-3299-49b9-90f2-bed90d4bab18) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7369c68f-3299-49b9-90f2-bed90d4bab18) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
