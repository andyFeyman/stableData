import { useState } from "react";
import axios from "axios";

function Reset() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("start"); // start, verify
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStart = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/reset/start`,
        { email },
        { withCredentials: true }
      );
      setStep("verify");
    } catch (err) {
      console.error("Reset start error:", err);
      if (err.response) {
        const { error } = err.response.data;
        setError(error || "Reset start failed");
      } else {
        setError("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/reset/verify`,
        { email, code },
        { withCredentials: true }
      );
      window.location.href = "/register";
    } catch (err) {
      console.error("Reset verify error:", err);
      if (err.response) {
        const { error } = err.response.data;
        setError(error || "Reset failed");
      } else {
        setError("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Account</h2>
      {error && <p className="error">{error}</p>}
      {step === "start" && (
        <form onSubmit={handleStart}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>
      )}
      {step === "verify" && (
        <form onSubmit={handleVerify}>
          <div>
            <label>Verification Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify and Reset"}
          </button>
        </form>
      )}
    </div>
  );
}

export default Reset;