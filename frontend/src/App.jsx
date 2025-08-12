import { useState } from "react";
import "./App.css";

function App() {
  const [trainText, setTrainText] = useState("");
  const [encodeInput, setEncodeInput] = useState("");
  const [decodeInput, setDecodeInput] = useState("");
  const [encoded, setEncoded] = useState([]);
  const [decoded, setDecoded] = useState("");
  const [vocabSize, setVocabSize] = useState(null);

  const API_BASE = "http://localhost:3000";

  const train = async () => {
    const lines = trainText.split("\n").filter((line) => line.trim() !== "");
    const res = await fetch(`${API_BASE}/train`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: lines }),
    });
    const data = await res.json();
    setVocabSize(data.vocabSize);
    alert(`Tokenizer trained. Vocab size: ${data.vocabSize}`);
  };

  const encode = async () => {
    const res = await fetch(`${API_BASE}/encode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: encodeInput }),
    });
    const data = await res.json();
    setEncoded(data.tokenIds);
  };

  const decode = async () => {
    const tokenIds = decodeInput
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));
    const res = await fetch(`${API_BASE}/decode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokenIds }),
    });
    const data = await res.json();
    setDecoded(data.text);
  };

  return (
    <div className="container">
      <h1>🧠 Custom Tokenizer</h1>

      <section>
        <h2>Train</h2>
        <textarea
          rows="5"
          placeholder="Enter texts (one per line)"
          value={trainText}
          onChange={(e) => setTrainText(e.target.value)}
        />
        <br />
        <button onClick={train}>Train Tokenizer</button>
        {vocabSize !== null && <p>Vocab Size: {vocabSize}</p>}
      </section>

      <section>
        <h2>Encode</h2>
        <input
          type="text"
          placeholder="Enter text to encode"
          value={encodeInput}
          onChange={(e) => setEncodeInput(e.target.value)}
        />
        <button onClick={encode}>Encode</button>
        <p>Token IDs: {encoded.join(", ")}</p>
      </section>

      <section>
        <h2>Decode</h2>
        <input
          type="text"
          placeholder="Enter token IDs (e.g. 2, 4, 5, 3)"
          value={decodeInput}
          onChange={(e) => setDecodeInput(e.target.value)}
        />
        <button onClick={decode}>Decode</button>
        <p>Decoded Text: {decoded}</p>
      </section>
    </div>
  );
}

export default App;
