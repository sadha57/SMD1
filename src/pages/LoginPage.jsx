import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const toggleForm = () => {
    setIsActive(!isActive);
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (login(email, password)) {
      // Redirect based on email (role)
      if (email === 'admin@entnt.com') {
        navigate('/dashboard');
      } else if (email === 'inspector@entnt.com') {
        navigate('/ships');
      } else if (email === 'engineer@entnt.com') {
        navigate('/jobs');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <section id="reg_login">
      <div className={`container ${isActive ? 'active' : ''}`}>
        {/* Sign In Box */}
        <div className="user signinBx">
          <div className="imgBx">
            <img
              src="https://res.cloudinary.com/diyp1k5z5/image/upload/v1744874379/login-img_cdeenv.jpg"
              alt="Sign In"
            />
          </div>
          <div className="formBx">
            <form onSubmit={handleLogin}>
              <h2>Sign In</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                name="pass"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input type="submit" value="Login" />
              {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
              <p className="signup">
                Don&apos;t have an account?
                <button type="button" onClick={toggleForm}>
                  Sign Up.
                </button>
              </p>
            </form>
          </div>
        </div>

        {/* Sign Up Box */}
        <div className="user signupBx">
          <div className="formBx">
            <form onSubmit={(e) => e.preventDefault()}>
              <h2>Create an account</h2>
              <input type="text" name="Username" placeholder="Username" required />
              <input type="email" name="email" placeholder="Email Address" required />
              <input type="password" name="crpass" placeholder="Create Password" required />
              <input type="password" name="conpass" placeholder="Confirm Password" required />
              <input type="submit" value="Sign Up" />
              <p className="signup">
                Already have an account?
                <button type="button" onClick={toggleForm}>
                  Sign in.
                </button>
              </p>
            </form>
          </div>
          <div className="imgBx">
            <img
              src="https://res.cloudinary.com/diyp1k5z5/image/upload/v1744874376/signup-img_daepqz.png"
              alt="Sign Up"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
