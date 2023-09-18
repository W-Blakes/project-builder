import React, { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useSignup } from '../../hooks/useSignup';
import './Signup.css';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const SignupPage = (e) => {
  const { color1, background, textColor } = useTheme();
  const { isPending, error, signup } = useSignup();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(email, password, displayName, thumbnail);

    setEmail('');
    setPassword('');
    setDisplayName('');
    setThumbnail(null);

    if (user) {
      navigate('/settings');
    }
  };
  // useEffect(() => {
  //   setEmail('');
  //   setPassword('');
  //   setDisplayName('');
  //   setThumbnail(null);
  // }, []);

  return (
    <>
      <h3 style={{ color: color1 }}>Welcome!</h3>
      <small style={{ color: color1 }}>
        Creat an account to start your next project
      </small>

      <form
        className="signup-form"
        onSubmit={handleSubmit}
        style={{ border: `2px solid ${color1}`, background: background }}
      >
        <h1>Sign up</h1>
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

        <label>
          <span>display name:</span>
          <input
            type="text"
            value={displayName}
            onChange={({ target }) => setDisplayName(target?.value)}
            required
            className="noSelect"
            style={{
              background: background,
              color: textColor,
              border: `${color1} solid 2px`,
            }}
          />
        </label>

        <label>
          <span>Thumbnail:</span>
          <input
            type="file"
            onChange={({ target }) => setThumbnail(target?.files[0].name)}
            autoComplete="photo"
            className="noSelect thumbnail-input"
            style={{
              background: background,
              color: color1,
              border: `${color1} solid 2px`,
            }}
          />
        </label>

        <Button title={'Signup'} style={{ color: color1 }} />
        {error && (
          <p style={{ color: 'red' }}>
            {error.replace('Firebase:', 'Whoops...')}
          </p>
        )}
      </form>
    </>
  );
};

export default SignupPage;
