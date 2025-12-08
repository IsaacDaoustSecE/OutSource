import {useState} from 'react'
import './Login.css'
import drawing from '../../assets/drawing.png'

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    console.log ({ email, password });
};

return (
    <div className="login-container">
      <div className="left-section">
        <h1 className="title">OutSource</h1>
        <p className="subtitle">Hire talent. Get hired. All in one place.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

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

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>

      <div className="right-section">
        <img src={drawing} alt="drawing" />
      </div>
    </div>
  );
};

export default Login
