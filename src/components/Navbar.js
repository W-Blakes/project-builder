import { useTheme } from '../hooks/useTheme';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { NavLink } from 'react-router-dom';

//styles
import './Navbar.css';
import logo from '../assets/sqBodyLogo.jpg';
import Button from './Button';

export default function Navbar() {
  const { color1, color2, textColor, background } = useTheme();
  const { error, isPending, logOut } = useLogout();
  const { user } = useAuthContext();

  const handleLogoOut = (e) => {
    e.preventDefault();
    console.log('user logout');
    logOut();
  };

  return (
    <nav className="nav">
      <NavLink to="/">
        <div className="brand">
          <img
            src={logo}
            className="logo-img"
            style={{
              background: color1,
              border: `${color2} solid 2px`,
            }}
          />
          <p className="brand-text">Dream Whip Builder</p>
        </div>
      </NavLink>

      <ul>
        {!user && (
          <li>
            <NavLink
              to="/login"
              style={({ isActive }) => {
                return {
                  color: isActive ? color1 : textColor,
                };
              }}
            >
              Login
            </NavLink>
          </li>
        )}

        {!user && (
          <li>
            <NavLink
              to="/signup"
              style={({ isActive }) => {
                return {
                  color: isActive ? color1 : textColor,
                };
              }}
            >
              Signup
            </NavLink>
          </li>
        )}

        {user && (
          <Button
            handle={handleLogoOut}
            onClick={(e) => handleLogoOut}
            title={'Logout'}
            style={{ color: color1 }}
            className="btn"
          />
        )}
      </ul>
    </nav>
  );
}
