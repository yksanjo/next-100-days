# Push to GitHub Guide 🚀

## Quick Steps

### 1. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `next-100-days` (or your preferred name)
3. Description: "Ship tools weekly. Build in public. Create the community that rides the AI coding wave together."
4. Visibility: Public (recommended for community project)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 2. Push Your Code

```bash
cd /Users/yoshikondo/next-100-days

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/next-100-days.git

# Rename branch to main (GitHub standard)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Features

After pushing:

1. **Enable Discussions:**
   - Go to Settings → General → Features
   - Enable "Discussions"
   - Create categories: General, Q&A, Show and Tell, Ideas, Announcements

2. **Set up GitHub Pages (optional):**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: / (root)

3. **Add Topics:**
   - Click on the gear icon next to "About"
   - Add topics: `ai`, `coding-tools`, `community`, `build-in-public`, `100-days-of-code`, `open-source`

### 4. Create First Discussion

1. Go to Discussions tab
2. Create new discussion: "Introduce yourself and share your AI coding journey"
3. Pin it as an announcement

### 5. Verify Everything

- [ ] README displays correctly
- [ ] All files are present
- [ ] Week 1 tool is accessible
- [ ] Links work
- [ ] Discussions enabled
- [ ] Topics added

## Post-Launch Checklist

After pushing:

- [ ] Star your own repo (helps with discovery)
- [ ] Follow LAUNCH_STRATEGY.md for Day 3-4 announcements
- [ ] Share on social media
- [ ] Engage with early adopters
- [ ] Track metrics

## Troubleshooting

**If you get "remote already exists":**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/next-100-days.git
```

**If you get authentication errors:**
- Use GitHub CLI: `gh auth login`
- Or use SSH: `git remote set-url origin git@github.com:YOUR_USERNAME/next-100-days.git`

**If branch name conflicts:**
```bash
git branch -M main
git push -u origin main
```

---

**Ready? Let's launch! 🚀**

