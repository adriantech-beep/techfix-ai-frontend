import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("http://localhost:5000/api/diagnose", {
        description,
      });
      setResponse(res.data.result);
    } catch (err) {
      console.error(err);
      setResponse("Error connecting to AI service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>🔧 TechFix AI</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe your cellphone or laptop problem..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Diagnosing..." : "Diagnose"}
        </button>
      </form>

      {response && (
        <div className="response">
          <h3>AI Repair Advice:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
