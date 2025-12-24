import { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";

// Prism languages
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-css";

import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import axios from "axios";
import "./App.css";

/* Language config */
const LANGUAGES = [
  { id: "javascript", label: "JavaScript" },
  { id: "jsx", label: "JSX" },
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "css", label: "CSS" },
];

const CODE_TEMPLATES = {
  javascript: `function sum(a, b) {
  return a + b;
}`,

  jsx: `export default function App() {
  return <h1>Hello JSX</h1>;
}`,

  typescript: `function sum(a: number, b: number): number {
  return a + b;
}`,

  python: `def sum(a, b):
    return a + b`,

  java: `public class Main {
  public static int sum(int a, int b) {
    return a + b;
  }
}`,

  css: `body {
  background-color: #000;
  color: #fff;
}`,
};

/* Prism mapping (safe) */
const PRISM_MAP = {
  javascript: Prism.languages.javascript,
  jsx: Prism.languages.jsx,
  typescript: Prism.languages.typescript,
  python: Prism.languages.python,
  java: Prism.languages.java,
  css: Prism.languages.css,
};

function App() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(CODE_TEMPLATES.javascript);
  const [review, setReview] = useState("🧠 AI review will appear here...");
  const [loading, setLoading] = useState(false);

  async function reviewCode() {
    try {
      setLoading(true);
      setReview("✨ Reviewing your code...");

      const response = await axios.post(
        "http://localhost:3000/ai/get-review",
        { code, language }
      );

      setReview(response.data);
    } catch (err) {
      setReview("❌ Failed to review code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleLanguageChange(e) {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(CODE_TEMPLATES[lang]);
  }

  const prismLanguage =
    PRISM_MAP[language] || Prism.languages.javascript;

  return (
    <main>
      {/* LEFT */}
      <section className="panel left">
        <header className="panel-header">
          <h2>🧑‍💻 Code Editor</h2>

          <select
            className="language-select"
            value={language}
            onChange={handleLanguageChange}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label}
              </option>
            ))}
          </select>
        </header>

        <div className="editor-wrapper">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              Prism.highlight(code, prismLanguage, language)
            }
            padding={16}
            className="editor"
          />
        </div>

        <button
          onClick={reviewCode}
          className="review-btn"
          disabled={loading}
        >
          {loading ? "⏳ Reviewing..." : "🚀 Review with AI"}
        </button>
      </section>

      {/* RIGHT */}
      <section className="panel right">
        <header className="panel-header">
          <h2>🤖 AI Review</h2>
          <span>{language.toUpperCase()}</span>
        </header>

        <div className="review-output">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        </div>
      </section>
    </main>
  );
}

export default App;
