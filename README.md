# code-review-ai

This project is an AI-powered code reviewer web application built with the MERN-style approach (React frontend + Node/Express backend, plus a cloud AI API). It lets users paste code, choose a language, and get structured AI feedback on errors, improvements, and best practices.

Purpose and features
Goal: Provide automated, AI-based code review for multiple languages (JavaScript, JSX, TypeScript, Python, Java, CSS) to help developers quickly spot issues and improve code quality.

Key features:

Interactive code editor with syntax highlighting and language switcher.

AI review button that sends code and language to a backend API.

AI-generated review rendered with Markdown formatting for headings, bullet points, and code blocks.

Support for long snippets with scrolling editor and responsive UI suitable for desktop and mobile.

Technology stack
Frontend:

React with Vite as the build tool for fast development and production builds.

react-simple-code-editor for the editable code area, with Prism.js providing syntax highlighting for multiple languages.

react-markdown and rehype-highlight to render AI output (including formatted code) in the review panel.

Custom CSS for a dark, glassmorphism-style UI, including a scrollable editor panel and responsive layout.

Backend:

Node.js with Express for the REST API server.

CORS and dotenv for secure configuration and cross-origin access.

Integration with Google’s Gemini (Generative AI) SDK to send the user’s code plus system instructions and receive review text.

Deployment:

Backend deployed on Render as a Node/Express web service, using environment variables for the Gemini API key and a public HTTPS URL for the API.

Frontend deployed on Netlify, configured to call the Render backend URL instead of localhost, with Vite’s npm run build generating the production dist assets.

System design and flow
The user writes or pastes code in the React editor and selects the language.

On clicking “Review with AI”, the frontend sends a POST request (code + language) to the Express backend’s /ai/get-review route.

The backend constructs a prompt that explains the AI’s role as an expert code reviewer, passes the code and instructions to the Gemini model, and awaits the generated content.

The AI’s response (review text) is returned as plain text/Markdown to the frontend.

The frontend displays this nicely in the AI Review panel with headings, bullet lists, and code examples, allowing the user to scroll through the feedback.

Strengths and learning outcomes
Demonstrates full-stack skills: building a REST API, integrating a third‑party AI model, and wiring it to a modern React UI.

Shows understanding of environment variables, API keys, and deploying separate frontend/backend services to cloud platforms.

Provides a practical example of how to turn raw AI capabilities into a focused developer tool (code review agent) with clear prompts and UX.

