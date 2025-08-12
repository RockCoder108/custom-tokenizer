// backend/index.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const CustomTokenizer = require("./tokenizer");


const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(cors());


const tokenizer = new CustomTokenizer();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.post("/train", (req, res) => {
  try {
    const { texts } = req.body;
    tokenizer.train(texts);
    res.json({ vocabSize: Object.keys(tokenizer.getVocab()).length });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/encode", (req, res) => {
  try {
    const { text } = req.body;
    const tokenIds = tokenizer.encode(text);
    res.json({ tokenIds });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/decode", (req, res) => {
  try {
    const { tokenIds } = req.body;
    const text = tokenizer.decode(tokenIds);
    res.json({ text });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Tokenizer server running at http://localhost:${PORT}`);
});
