# 🎯 Envoy Trivia App

A beautiful, interactive trivia application built with Next.js and styled with the Envoy brand colors. Perfect for workplace displays and team engagement!

## ✨ Features

- **⏱️ Smart Timer**: 30-second question display, 20-second answer reveal
- **🎨 Envoy Branding**: Authentic Envoy red (#FF4B4B) and clean typography
- **📱 Responsive Design**: Works perfectly on all screen sizes
- **🔄 Auto-Cycling**: Seamlessly loops through questions indefinitely
- **📊 Interactive Answers**: Click to select answers with visual feedback
- **📱 QR Code**: Bottom-left QR code for audience participation
- **🎯 Game Show Feel**: Professional, polished interface

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 🎨 Design System

### Colors
- **Primary Red**: `#FF4B4B` (Envoy Red)
- **White**: `#FFFFFF`
- **Dark Gray**: `#2E2E2E`
- **Light Gray**: `#FAFAFA`
- **Border**: `#E5E5E5`

### Typography
- **Font**: Inter (Google Fonts)
- **Question**: 32px, Bold
- **Answers**: 20px, Medium

### Components
- **Timer**: Circular progress with red border
- **Question Block**: White card with soft shadow
- **Answer Cards**: 2×2 grid with hover effects
- **QR Code**: Bottom-left placement with red border

## 🏗️ Architecture

```
src/
├── app/
│   ├── globals.css      # Envoy brand styles
│   ├── layout.tsx       # App layout
│   └── page.tsx         # Main trivia component
├── components/
│   ├── Timer.tsx        # Circular countdown timer
│   └── QRCode.tsx       # QR code component
└── data/
    └── trivia.ts        # Question database
```

## 🎮 How It Works

1. **Question Phase (30s)**: Displays question with 4 answer options
2. **Answer Phase (20s)**: Shows correct answer with explanations
3. **Auto-Advance**: Automatically cycles to next question
4. **Infinite Loop**: Continues indefinitely through all questions

## 🛠️ Customization

### Adding Questions
Edit `src/data/trivia.ts` to add new questions:

```typescript
{
  id: 13,
  question: "Your question here?",
  answers: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: 0, // Index of correct answer
  explanation: "Why this answer is correct"
}
```

### Styling
All Envoy brand colors are defined in `src/app/globals.css` using CSS custom properties.

## 🎯 Perfect For

- **Workplace Displays**: Office lobbies, break rooms
- **Team Events**: Company gatherings, all-hands meetings
- **Training Sessions**: Interactive learning experiences
- **Reception Areas**: Visitor engagement

## 🚀 Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy to Vercel, Netlify, or any hosting platform that supports Next.js.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS