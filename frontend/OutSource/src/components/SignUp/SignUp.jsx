import { useState } from 'react';
import './Signup.css';
import drawing from '../../assets/drawing.png';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      fullName,
      email,
      password
    });
  };

  return (
    <div className="SignUp-container">
      <div className="left-section">
        <h1 className="title">OutSource</h1>
        <p className="subtitle">Hire talent. Get hired. All in one place.</p>

        <form className="SignUp-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <h3>Join the marketplace where work finds you</h3>

          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="CreateAcc-btn">
            Create Account
          </button>
        </form>
      </div>

      <div className="right-section">
        <img src={drawing} alt="drawing" />
      </div>
    </div>
  );
};

export default SignUp;
