import { NavLink } from 'react-router-dom';
import Profile from './Profile';

//style
import './Sidebar.css';
import { useTheme } from '../hooks/useTheme';
import { useAuthContext } from '../hooks/useAuthContext';

const Sidebar = () => {
  const { bgfaded, textColor, backgroundActive, color2 } = useTheme();
  const { user } = useAuthContext();

  const activeUser = user.email.split('@').shift();

  const message = `hello, ${activeUser ? activeUser : 'User'}`;
  const sidebarLinks = [
    { name: 'dashboard', link: '/' },
    { name: 'create project', link: '/create' },
    { name: 'builder', link: '/projectbuild' },
    { name: 'settings', link: '/settings' },
    { name: 'help', link: '/help' },
    ,
  ];

  return (
    <div className="sidebar" style={{ background: bgfaded }}>
      <Profile msg={message} />
      <div className="sidebar-menu">
        {sidebarLinks.map((li) => (
          <p key={li.name}>
            <NavLink
              to={li.link}
              style={({ isActive }) => {
                return {
                  background: isActive ? backgroundActive : '',
                  color: isActive ? textColor : '',
                  borderTop: isActive ? ` ${color2} 3px solid ` : '',
                  borderLeft: isActive ? ` ${color2} 2px solid ` : '',
                };
              }}
            >
              {li.name}
            </NavLink>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
