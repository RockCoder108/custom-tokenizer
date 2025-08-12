# Custom Tokenizer Web App

A simple full-stack web app with a custom tokenizer backend (Node.js + Express) and React + Vite frontend for training, encoding, and decoding text tokens.

---

## Project Structure

backend/
├─ index.js # Express server & API
├─ tokenizer.js # Tokenizer logic
├─ package.json
frontend/
├─ src/ # React source code
├─ index.html
├─ package.json




---

## Prerequisites

- Node.js v14 or above  
- npm (comes with Node.js)  

---

## Setup & Run

### Backend

```bash
cd backend
npm install
npm start
```


The backend server runs at http://localhost:3000.

Frontend
```
cd frontend
npm install
npm run dev
```
The frontend app runs at http://localhost:5173.

Usage
1 Train: Input multiple texts (one per line) → Click Train Tokenizer → vocabulary is built.
2 Encode: Enter a sentence → Click Encode → get token IDs array.
3 Decode: Enter token IDs (comma-separated) → Click Decode → get the decoded sentence.


API Endpoints
```
| Method | Endpoint  | Request Body             | Response                 |
| ------ | --------- | ------------------------ | ------------------------ |
| POST   | `/train`  | `{ texts: string[] }`    | `{ vocabSize: number }`  |
| POST   | `/encode` | `{ text: string }`       | `{ tokenIds: number[] }` |
| POST   | `/decode` | `{ tokenIds: number[] }` | `{ text: string }`       |
```

Notes
Special tokens used: <PAD>, <UNK>, <BOS>, <EOS>.
Unknown words map to <UNK>.
Tokenizer is case-sensitive.
Vocabulary resets when backend restarts (no persistent storage).
CORS enabled for frontend-backend communication.


.gitignore
Make sure to ignore node_modules and environment files by adding these to .gitignore in both backend and frontend:
```
node_modules/
.env
```


Feel free to open issues or submit pull requests!
---

If you want, I can also help generate `.gitignore` files or the React frontend next!






