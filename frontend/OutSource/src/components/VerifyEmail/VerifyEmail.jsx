import { useLocation } from "react-router-dom";
import drawing from "../../assets/drawing.png";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const location = useLocation();
  const email = location.state?.email || "";

  return (
    <div className="verify-container">
      <div className="left-section">
        <h1 className="title">OutSource</h1>
        <p className="subtitle">Hire talent. Get hired. All in one place.</p>

        <h2>Verify your email</h2>
        <p>
          We sent a 6-digit code to <strong>{email}</strong>. Please enter it
          below to verify your account.
        </p>

        <div className="code-inputs">
          <input maxLength="1" />
          <input maxLength="1" />
          <input maxLength="1" />
          <input maxLength="1" />
          <input maxLength="1" />
          <input maxLength="1" />
        </div>

        <button className="resend-btn">I didn't receive a code</button>
      </div>

      <div className="right-section">
        <img src={drawing} alt="drawing" />
      </div>
    </div>
  );
};

export default VerifyEmail;
