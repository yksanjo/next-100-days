# How to Use the Prompt Library Browser

## Quick Start

### Method 1: Open Directly in Browser

1. Navigate to the `week-01-prompt-library` directory
2. Open `index.html` in your web browser
3. That's it! The browser will load prompts from `prompts.json`

### Method 2: Use a Local Server (Recommended)

For best results, especially if loading from a different directory:

**Using Python:**
```bash
cd tools/week-01-prompt-library
python3 -m http.server 8000
```
Then open: http://localhost:8000

**Using Node.js (http-server):**
```bash
npx http-server tools/week-01-prompt-library -p 8000
```
Then open: http://localhost:8000

**Using PHP:**
```bash
cd tools/week-01-prompt-library
php -S localhost:8000
```

## Features

### 🔍 Search
- Type in the search box to filter prompts
- Searches across titles, content, and tags
- Real-time filtering as you type

### 🏷️ Category Filter
- Click category buttons to filter by type
- "All" shows everything
- Combine with search for precise results

### 📋 Copy to Clipboard
- Click "Copy Prompt" on any card
- Prompt is copied to your clipboard
- Button shows confirmation when copied

### 📊 Stats
- See how many prompts match your filters
- Updates in real-time

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Troubleshooting

**Prompts not loading?**
- Make sure `prompts.json` is in the same directory as `index.html`
- Check browser console for errors
- Try using a local server instead of opening file directly

**Copy not working?**
- Make sure you're using HTTPS or localhost (clipboard API requirement)
- Some browsers require user interaction first

**Styling looks broken?**
- Make sure `styles.css` is in the same directory
- Check browser console for missing file errors

## Next Steps

1. Find a prompt that fits your need
2. Copy it to clipboard
3. Paste into your AI coding tool (ChatGPT, Claude, Cursor, etc.)
4. Customize with your specific requirements
5. Iterate based on results

---

**Enjoy browsing the prompts!** 🚀



