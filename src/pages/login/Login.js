import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useLogin } from '../../hooks/useLogin';

//style
import './Login.css';
import Button from '../../components/Button';

const LoginPage = (e) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { color1, background, textColor } = useTheme();
  const { error, isPending, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  return (
    <>
      <h3 style={{ color: color1 }}>Welcome!</h3>
      <small style={{ color: color1 }}>
        Log in to finish your next project
      </small>
      <form
        className="login-form"
        onSubmit={handleSubmit}
        style={{ border: `2px solid ${color1}`, background: background }}
      >
        <h1>Login</h1>
        <label>
          <span>Email</span>
          <input
            value={email}
            type="email"
            onChange={({ target }) => setEmail(target?.value)}
            required
            autoComplete="current-email"
            className="noSelect"
            style={{
              background: background,
              color: textColor,
              border: `${color1} solid 2px`,
            }}
          />
        </label>

        <label>
          <span>Password</span>
          <input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target?.value)}
            required
            autoComplete="current-password"
            className="noSelect"
            style={{
              background: background,
              color: textColor,
              border: `${color1} solid 2px`,
            }}
          />
        </label>

        <Button title={'Login'} style={{ color: color1 }} />
        {error && (
          <p style={{ color: 'red' }}>
            {error.replace('Firebase: Error', 'Whoops...')}
          </p>
        )}
      </form>
    </>
  );
};

export default LoginPage;
