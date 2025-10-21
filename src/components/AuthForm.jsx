// src/components/AuthForm.jsx - COMPLETE & MODIFIED
import React, { useState } from 'react';
import '../styles/AuthForm.css'; 

// --- SIMULATED USER DATABASE (For demonstration and validation) ---
const users = [
    { fullName: 'Test User', username: 'testuser', email: 'test@example.com', password: 'Password1' },
    { fullName: 'Vaishnavi', username: 'vaish', email: 'vaish@mail.com', password: 'Password2' },
];

// --- Sub-Components for Organization ---
const LogoHeader = () => (
    <div className="logo-section">
        {/* 1. Logo */}
        <h1>💃 BeatFlow</h1> 
        
        {/* 2. Primary Tagline */}
        <p className="tagline">watch AI-powered characters dance to your music beats in real-time</p>
        
        {/* 3. Secondary Tagline */}
        <p className="tagline-secondary">✨ Start the music. Watch it sway. From Kuchipudi to Western to Freestyle, the groove never stops</p>
    </div>
);

const PasswordHint = ({ validation, message }) => (
    <p className={validation ? 'valid' : 'invalid'}>
      {validation ? '✔️' : '❌'} {message}
    </p>
);

const renderPasswordHints = (password) => {
    if (password.length === 0) return null;
    
    // Validation checks for display
    const minLength = password.length >= 6;
    const startsWithLetter = /^[a-zA-Z]/.test(password);
    const oneCapital = /[A-Z]/.test(password);

    return (
      <div className="password-hints">
        <PasswordHint validation={minLength} message="At least 6 characters long." />
        <PasswordHint validation={startsWithLetter} message="Must start with a letter." />
        <PasswordHint validation={oneCapital} message="At least one capital letter included." />
      </div>
    );
};


// --- MAIN AUTHFORM COMPONENT ---

function AuthForm({ onLoginSuccess }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  
  // State for forms
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // --- Full Password Validation Logic ---
  const checkPasswordRules = (password) => {
    const minLength = password.length >= 6;
    const startsWithLetter = /^[a-zA-Z]/.test(password);
    const oneCapital = /[A-Z]/.test(password);
    return minLength && startsWithLetter && oneCapital;
  };
  
  // --- SUBMISSION HANDLERS (Same logic as before) ---
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!loginIdentifier || !loginPassword) {
      setFormError('Error: Username/Email and Password are required.');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    const user = users.find(u => 
      u.email === loginIdentifier || u.username === loginIdentifier
    );

    if (!user) {
      setFormError('Error: Username/Email does not exist. Please sign up first.');
    } else if (user.password !== loginPassword) {
      setFormError('Error: Invalid credentials. The password entered is incorrect.');
    } else {
      onLoginSuccess(user.username);
    }
    setIsLoading(false);
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!fullName || !username || !email || !signupPassword || !confirmPassword) {
      setFormError('Error: All fields are required.');
      return;
    }

    if (!checkPasswordRules(signupPassword)) {
        setFormError("Error: Password does not meet all requirements (see hints below).");
        return;
    }

    if (signupPassword !== confirmPassword) {
      setFormError('Error: Password and Confirm Password must match.');
      return;
    }

    if (users.some(u => u.username === username || u.email === email)) {
      setFormError('Error: Username or Email already in use.');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    const newUser = { fullName, username, email, password: signupPassword };
    users.push(newUser); 
    
    alert('Account created successfully! You can now log in.'); 
    setIsLoginMode(true);
    setFormError('');
    setIsLoading(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!loginIdentifier) {
      setFormError('Error: Please enter your registered email or username.');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    const user = users.find(u => 
      u.email === loginIdentifier || u.username === loginIdentifier
    );

    if (user) {
      setFormError(`SUCCESS: A random password has been sent to ${user.email}. (Simulated)`);
    } else {
      setFormError('Error: Account not found.');
    }
    setIsLoading(false);
  }

  const resetAllFields = () => {
    setLoginIdentifier('');
    setLoginPassword('');
    setFullName('');
    setUsername('');
    setEmail('');
    setSignupPassword('');
    setConfirmPassword('');
    setFormError('');
    setShowForgot(false);
  }
  
  return (
    <div className="auth-page-container">
        
      <LogoHeader />

      <div className="auth-box">
        {/* Tab Buttons */}
        <div className="auth-tabs">
          <button 
             className={isLoginMode && !showForgot ? 'active' : ''}
             onClick={() => { setIsLoginMode(true); resetAllFields(); }} 
             aria-pressed={isLoginMode && !showForgot}
          >
             Login
          </button>
          <button 
             className={!isLoginMode && !showForgot ? 'active' : ''}
             onClick={() => { setIsLoginMode(false); resetAllFields(); }} 
             aria-pressed={!isLoginMode && !showForgot}
          >
             Sign Up
          </button>
        </div>
        
        {/* FORM CONTENT SWITCH */}
        {showForgot ? (
          // --- FORGOT PASSWORD FORM ---
          <form className="auth-form forgot-form" onSubmit={handleForgotPassword}>
            {formError && <p className={`error-message ${formError.startsWith('SUCCESS') ? 'success' : 'error'}`}>{formError}</p>}
            <label htmlFor="forgot-identifier-input">Email/Username</label>
            <input type="text" id="forgot-identifier-input" placeholder="Registered Email or Username" required value={loginIdentifier} onChange={(e) => setLoginIdentifier(e.target.value)} />
            
            <button type="submit" className="primary-button" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Password'}
            </button>
            <p className="forgot-password-link back-link" onClick={() => setShowForgot(false)}>
                ← Back to Login
            </p>
          </form>
        ) : isLoginMode ? (
          // --- LOGIN FORM ---
          <form className="auth-form" onSubmit={handleLogin}>
            {formError && <p className="error-message error">{formError}</p>}
            
            <label htmlFor="login-identifier-input">Email/Username</label>
            <input 
                type="text" 
                id="login-identifier-input" 
                placeholder="Enter Email or Username" 
                required 
                value={loginIdentifier} 
                onChange={(e) => setLoginIdentifier(e.target.value)} 
                autoComplete="username" 
            />
            
            <label htmlFor="login-password-input">Password</label>
            <input 
                type="password" 
                id="login-password-input" 
                placeholder="Enter Password" 
                required 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
                autoComplete="current-password"
            />
            
            <p className="forgot-password-link" onClick={() => setShowForgot(true)}>
                Forgot Password?
            </p>
            
            <button type="submit" className="primary-button" disabled={isLoading}>
              {isLoading ? 'Logging In...' : 'Log In'} 
            </button>
          </form>
        ) : (
          // --- SIGN UP FORM ---
          <form className="auth-form" onSubmit={handleSignup}>
            {formError && <p className="error-message error">{formError}</p>}

            <label htmlFor="fullname-input">Full Name</label>
            <input type="text" id="fullname-input" placeholder="Enter Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            
            <label htmlFor="username-input">Username</label>
            <input type="text" id="username-input" placeholder="Enter Username" required value={username} onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="email-input">Email</label>
            <input type="email" id="email-input" placeholder="Enter Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            
            <label htmlFor="signup-password-input">Set Password</label>
            <input type="password" id="signup-password-input" placeholder="Enter Password" required value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} autoComplete="new-password" />
            {renderPasswordHints(signupPassword)}

            <label htmlFor="confirm-password-input">Confirm Password</label>
            <input type="password" id="confirm-password-input" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" />
            
            <button type="submit" className="primary-button" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'} 
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthForm;