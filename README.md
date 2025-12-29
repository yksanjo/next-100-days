# Next 100 Days - Challenge Tracker

A beautiful, modern web application for tracking your 100-day challenges. Build habits, track progress, and celebrate your journey one day at a time.

![Next 100 Days](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🎯 **Multiple Challenges** - Track multiple 100-day challenges simultaneously
- 📊 **Visual Progress** - Beautiful progress bars and day-by-day grid visualization
- 🔥 **Streak Tracking** - Monitor your current streak and stay motivated
- 📅 **Smart Day Calculation** - Automatically calculates current day based on start date
- 💾 **Local Storage** - Your data is saved locally in your browser
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd next-100-days
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📖 How to Use

1. **Create a Challenge**
   - Click "Add New Challenge"
   - Enter a name (required)
   - Add an optional description
   - Set your start date
   - Click "Create"

2. **Track Your Progress**
   - Each challenge shows a grid of 100 days
   - Click on a day to mark it as complete
   - Green days = completed
   - Blue day = today
   - Gray days = past (incomplete) or future (locked)

3. **Monitor Statistics**
   - Current day in your challenge
   - Number of completed days
   - Current streak
   - Days remaining

4. **Delete Challenges**
   - Click the X button in the top-right of any challenge card

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **LocalStorage** - Data persistence

## 📁 Project Structure

```
next-100-days/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── README.md           # This file
```

## 🎨 Customization

You can customize the colors by editing `tailwind.config.js`. The default theme uses a purple gradient, but you can change it to match your preferences.

## 📝 License

MIT License - feel free to use this project for your own challenges!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 💡 Tips for Success

- Start with one challenge at a time
- Be consistent - even 5 minutes counts
- Review your progress weekly
- Celebrate milestones (25, 50, 75, 100 days)
- Don't break the chain!

---

**Made with ❤️ for building better habits**

