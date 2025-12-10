import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import drawing from "../../assets/drawing.png";
import "./OTP.css";

const OTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  // Redirect if no email
  useEffect(() => {
    if (!email) navigate("/signup");
  }, [email, navigate]);

  // Auto focus on first input
  useEffect(() => {
    document.getElementById("otp-0")?.focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move focus to next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    // If all 6 digits filled, auto-submit
    if (newCode.every((digit) => digit !== "")) {
      verifyOTP(newCode.join(""));
    }
  };

  const verifyOTP = async (otp) => {
    try {
      const res = await fetch("http://localhost:3000/users/verify-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (res.ok) {
        const data = await res.json();
        // Save token if needed
        localStorage.setItem("token", data.token);

        // Redirect to home
        navigate("/Home");
      } else {
        const err = await res.json();
        setError(err.errorMessage || "Invalid OTP");
        // Clear inputs for retry
        setCode(["", "", "", "", "", ""]);
        document.getElementById("otp-0")?.focus();
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  const resendCode = async () => {
    try {
      await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setError("OTP resent! Check your email.");
    } catch (err) {
      console.error(err);
      setError("Failed to resend OTP.");
    }
  };

  return (
    <div className="verify-container">
      <div className="left-section">
        <h1 className="title">OutSource</h1>
        <p className="subtitle">Hire talent. Get hired. All in one place.</p>

        <h2>Verify your email</h2>
        <p>
          We sent a 6-digit code to <strong>{email}</strong>. Enter it below.
        </p>

        <div className="code-inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
        </div>

        {error && <p className="error">{error}</p>}

        <button className="resend-btn" onClick={resendCode}>
          I didn’t receive a code
        </button>
      </div>

      <div className="right-section">
        <img src={drawing} alt="drawing" />
      </div>
    </div>
  );
};

export default OTP;
