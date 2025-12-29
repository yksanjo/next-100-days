# Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173`

## Pushing to GitHub

### Option 1: Create a new repository on GitHub

1. Go to [GitHub](https://github.com/new) and create a new repository
2. Name it `next-100-days` (or any name you prefer)
3. **Don't** initialize with README, .gitignore, or license (we already have these)
4. Copy the repository URL

5. Add the remote and push:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

### Option 2: If you already have a GitHub repository

```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory. You can deploy these to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Deploy to Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

Or simply connect your GitHub repository to Vercel for automatic deployments.

