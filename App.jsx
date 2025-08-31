import React, { useState } from 'react';
import './App.css'; // You'll need to create this CSS file for styling

function App() {
  const [isLoginView, setIsLoginView] = useState(true);

  // State for login form
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // State for signup form
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    password: '',
    accountType: 'User',
  });

  // Handles input changes for both forms
  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginForm({ ...loginForm, [name]: value });
    } else {
      setSignupForm({ ...signupForm, [name]: value });
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', loginForm);
    // Add your login logic here
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Creating account with:', signupForm);
    // Add your signup logic here
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <span className="star-icon">✨</span>
          Events Booking System
        </div>
        <div className="auth-buttons">
          <button className="login-btn" onClick={() => setIsLoginView(true)}>Login</button>
          <button className="signup-btn" onClick={() => setIsLoginView(false)}>Sign Up</button>
        </div>
      </header>
      <main className="form-container">
        {isLoginView ? (
          <div className="form-card">
            <span className="star-icon large-star">✨</span>
            <h2>Welcome Back</h2>
            <p className="subtitle">Sign in to your Events Booking account</p>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="loginEmail">Email Address</label>
                <input
                  type="email"
                  id="loginEmail"
                  name="email"
                  placeholder="Enter your email"
                  value={loginForm.email}
                  onChange={(e) => handleInputChange(e, 'login')}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  id="loginPassword"
                  name="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={(e) => handleInputChange(e, 'login')}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Sign In
              </button>
            </form>
            <p className="link-text">
              Don't have an account? <span onClick={toggleView} className="toggle-link">Sign up here</span>
            </p>
          </div>
        ) : (
          <div className="form-card">
            <span className="star-icon large-star">✨</span>
            <h2>Join us</h2>
            <p className="subtitle">Create your account to start planning amazing events</p>
            <form onSubmit={handleSignupSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={signupForm.fullName}
                  onChange={(e) => handleInputChange(e, 'signup')}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signupEmail">Email Address</label>
                <input
                  type="email"
                  id="signupEmail"
                  name="email"
                  placeholder="Enter your email"
                  value={signupForm.email}
                  onChange={(e) => handleInputChange(e, 'signup')}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signupPassword">Password</label>
                <input
                  type="password"
                  id="signupPassword"
                  name="password"
                  placeholder="Enter your password"
                  value={signupForm.password}
                  onChange={(e) => handleInputChange(e, 'signup')}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="accountType">Account Type</label>
                <select
                  id="accountType"
                  name="accountType"
                  value={signupForm.accountType}
                  onChange={(e) => handleInputChange(e, 'signup')}
                >
                  <option value="User">User</option>
                  <option value="Organizer">Organizer</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">
                Create Account
              </button>
            </form>
            <p className="link-text">
              Already have an account? <span onClick={toggleView} className="toggle-link">Sign in here</span>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;