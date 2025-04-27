import { useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("start"); // start, verify-code, register
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStart = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/register/start`,
        { email, username },
        { withCredentials: true }
      );
      setStep("verify-code");
    } catch (err) {
      console.error("Start error:", err);
      setError(err.response?.data?.error || "Registration start failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/register/verify-code`,
        { email, code },
        { withCredentials: true }
      );
      setStep("register");
    } catch (err) {
      console.error("Verify code error:", err);
      setError(err.response?.data?.error || "Code verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const optionsRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/register/options`,
        {},
        { withCredentials: true }
      );
      const options = optionsRes.data;

      const regResponse = await startRegistration(options);

      const verifyRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/register/verify`,
        { ...regResponse, deviceName },
        { withCredentials: true }
      );

      if (verifyRes.data.verified) {
        window.location.href = "/";
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
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
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Code"}
          </button>
        </form>
      )}
      {step === "verify-code" && (
        <form onSubmit={handleVerifyCode}>
          <div>
            <label>Verification Code Of {email}</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      )}
      {step === "register" && (
        <form onSubmit={handleRegister}>
          <div>
            <label>Device Name (Optional)</label>
            <input
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register Passkey"}
          </button>
        </form>
      )}
      <div className="flex flex-row justify-end w-full my-2">
        <p>Already have account? <a href="/login" >login</a></p>
      </div>
    </div>
  );
}

export default Register;