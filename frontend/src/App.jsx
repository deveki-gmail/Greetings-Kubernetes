import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getGreeting = async () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `/api/greeting?name=${encodeURIComponent(name.trim())}`
      );

      if (!response.ok) {
        throw new Error("Unable to get greeting");
      }

      const data = await response.json();

      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getGreeting();
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Kubernetes Greeting App</h1>

        <p className="description">
          Enter your name to receive a greeting from our microservices.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your name</label>

          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Say Hello"}
          </button>
        </form>

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;