// backend/tokenizer.js
class CustomTokenizer {
  constructor(specialTokens = ["<PAD>", "<UNK>", "<BOS>", "<EOS>"]) {
    this.vocab = {};
    this.invVocab = {};
    this.specialTokens = specialTokens;
    this.trained = false;
    this._initSpecial();
  }

  _initSpecial() {
    this.specialTokens.forEach((t, i) => (this.vocab[t] = i));
    this.offset = this.specialTokens.length;
  }

  train(texts) {
    const words = new Set();
    texts.forEach((txt) => txt.split(/\s+/).forEach((w) => words.add(w)));
    let idx = this.offset;
    for (const w of words) {
      if (!(w in this.vocab)) this.vocab[w] = idx++;
    }
    this.invVocab = Object.fromEntries(
      Object.entries(this.vocab).map(([k, v]) => [v, k])
    );
    this.trained = true;
  }

  encode(text) {
    if (!this.trained) throw new Error("Tokenizer not trained.");
    const tokens = [
      "<BOS>",
      ...text
        .split(/\s+/)
        .map((w) => (this.vocab[w] !== undefined ? w : "<UNK>")),
      "<EOS>",
    ];
    return tokens.map((t) => this.vocab[t]);
  }

  decode(tokenIds) {
    return tokenIds
      .map((id) => this.invVocab[id] ?? "<UNK>")
      .filter((tok) => !["<BOS>", "<EOS>", "<PAD>"].includes(tok))
      .join(" ");
  }

  getVocab() {
    return this.vocab;
  }
}

module.exports = CustomTokenizer;
// Usage example:
// const tokenizer = new CustomTokenizer();
// tokenizer.train(["Hello world", "This is a test"]);
// const encoded = tokenizer.encode("Hello world");
// console.log(encoded); // Outputs token IDs
// const decoded = tokenizer.decode(encoded);
// console.log(decoded); // Outputs "Hello world"