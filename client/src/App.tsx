import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Login Page Component
const Login: React.FC = () => (
  <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
    <h2>Login</h2>
    <form>
      <div>
        <label>Email:</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account? <Link to="/signup">Sign up</Link>
    </p>
  </div>
);

// Signup Page Component
const Signup: React.FC = () => (
  <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
    <h2>Sign Up</h2>
    <form>
      <div>
        <label>Email:</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <p>
      Already have an account? <Link to="/login">Login</Link>
    </p>
  </div>
);

// Main App Component
const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </Router>
);

export default App;