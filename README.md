# reflecto

Reflecto is a single-page journaling app built with React 18, Vite 5 and Tailwind CSS 3. You write a journal entry in a text area; the app saves it to the browser's localStorage and sends it to a locally running Ollama server, which is prompted to reply with two or three Cognitive Behavioral Therapy style questions rather than advice. The questions are shown under the editor and the list of past entries is shown below that. There is no backend of its own: the only network call is to Ollama at `http://localhost:11434`.

## Requirements

- Node.js 18 or newer and npm.
- Ollama running locally with the `mistral:instruct` model pulled (`ollama pull mistral:instruct`). The model name and URL are hard-coded in `src/api/reflectoApi.js` and can be changed there.
- A browser that allows the page to call `http://localhost:11434`. Ollama may need `OLLAMA_ORIGINS` set to allow the Vite dev origin, for example `OLLAMA_ORIGINS=http://localhost:5173 ollama serve`.

## Setup

```bash
git clone https://github.com/samarthpaliwal/reflecto.git
cd reflecto
npm install
```

The committed `src/App.jsx` and `src/components/JournalEditor.jsx` do not include their `import` lines (`useState`, the three components, and `getReflection`), so the page will throw a ReferenceError at runtime until those imports are added at the top of each file:

```js
// src/App.jsx
import { useState } from 'react'
import JournalEditor from './components/JournalEditor'
import EntryList from './components/EntryList'
import ReflectionResponse from './components/ReflectionResponse'
import { getReflection } from './api/reflectoApi'

// src/components/JournalEditor.jsx
import { useState } from 'react'
```

## Usage

Start Ollama in one terminal, then the dev server in another:

```bash
ollama serve
npm run dev
# open http://localhost:5173
```

Type an entry in the text area and click `Reflect on this entry`. While the request is in flight the page shows "Thinking..."; when it returns, the model's questions appear under "Reflecto asks:". Entries accumulate under "Your Journal" and persist in localStorage between reloads.

Other scripts:

```bash
npm run build     # production build to dist/
npm run preview   # serve the built dist/ locally
```

`vercel.json` configures Vercel to run `npm run build` and serve `dist`. The `deploy` script references `gh-pages`, which is not a declared dependency.

## How it works

`src/main.jsx` mounts `App` into `#root`. `App` keeps two pieces of state: the entries array, initialised from `localStorage['reflecto_entries']`, and the latest reflection string. `addEntry` prepends the new text, writes the array back to localStorage, and awaits `getReflection`. `src/api/reflectoApi.js` builds a prompt that instructs the model to act as a CBT journaling assistant, never diagnose or advise, and to point users mentioning self-harm to professional help; it posts that to Ollama's `/api/generate` endpoint with `stream: false` and returns `response.data.response`. `JournalEditor` is a controlled textarea in a form, `ReflectionResponse` renders the returned text, and `EntryList` renders the saved entries. Styling is Tailwind utility classes plus a few base rules in `src/index.css`. A green "Tailwind is working" test box is still present in `App.jsx`.

## Project layout

```
index.html                      Vite entry page
src/main.jsx                    React root
src/App.jsx                     state, localStorage, layout
src/api/reflectoApi.js          Ollama request and CBT prompt
src/components/JournalEditor.jsx
src/components/EntryList.jsx
src/components/ReflectionResponse.jsx
src/index.css                   base styles and Tailwind directives
vite.config.js                  Vite with the React plugin
tailwind.config.js, postcss.config.cjs
vercel.json                     Vercel build settings
package.json, package-lock.json
```

`node_modules/`, `dist/`, and the macOS `._*` resource-fork files currently in the repository are build or system artifacts and should not be tracked; see `.gitignore`.
