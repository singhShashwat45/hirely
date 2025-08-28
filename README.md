# Hirely – AI-powered Mock Interview Platform

Hirely is a **Next.js** application that allows users to take mock interviews, record answers via webcam and voice, and receive **AI-generated feedback**. All answers and feedback are saved for review, making it easy to track your progress over time.  

## Features

- Start mock interviews for different job positions.  
- Record answers using **voice** (speech-to-text) and **webcam**.  
- Receive **AI-generated ratings and feedback** for each answer.  
- Navigate through multiple questions and track your performance.  
- View past interviews with **exact date and time** of submission.  
- Fully responsive and built with **Next.js**, **React**, **Drizzle ORM**, and **Clerk for authentication**.  

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd hirely
npm install
# or
yarn


## Project Structure

- `app/` – Next.js App Router pages and layouts.
- `app/dashboard/` – Dashboard, interview list, and components for starting/reviewing interviews.
- `utils/` – Utility files, database schema (`schema.js`), and AI integration (`GeminiAiModel.js`).
- `components/` – Reusable UI components (buttons, cards, modals).

## Technologies Used

- Next.js 13+ (App Router)
- React 18+
- Drizzle ORM (PostgreSQL)
- Clerk (Authentication)
- Lucide Icons
- Sonner (Toast notifications)
- Google Gemini AI (for AI feedback)
- react-hook-speech-to-text (Voice recording & transcription)

## Deployment

Deployed on Vercel.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT License