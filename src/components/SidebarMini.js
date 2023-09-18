import { NavLink } from 'react-router-dom';
import Profile from './Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//style
import './Sidebar.css';
import { useTheme } from '../hooks/useTheme';
import { useAuthContext } from '../hooks/useAuthContext';
import {
  faFolderPlus,
  faHouse,
  faHammer,
  faGear,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';

const SidebarMini = () => {
  const { bgfaded, textColor, backgroundActive, color2 } = useTheme();
  const { user } = useAuthContext();

  const activeUser = user.email.split('@').shift();
  const message = `hello, ${activeUser !== '' ? activeUser : 'User'}`;
  //   const message = 'hello, User';

  const sidebarLinks = [
    { iconName: <FontAwesomeIcon icon={faHouse} />, link: '/' },
    { iconName: <FontAwesomeIcon icon={faFolderPlus} />, link: '/create' },
    {
      iconName: <FontAwesomeIcon icon={faHammer} />,
      link: '/projectbuild',
    },
    { iconName: <FontAwesomeIcon icon={faGear} />, link: '/settings' },
    { iconName: <FontAwesomeIcon icon={faCircleInfo} />, link: '/help' },
    ,
  ];

  return (
    <div className="sidebar mini" style={{ background: bgfaded }}>
      <Profile msg={message} />
      <div className="sidebar-menu mini">
        {sidebarLinks.map((li) => (
          <p key={li.iconName.props.icon.iconName}>
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
              {li.iconName}
            </NavLink>
          </p>
        ))}
      </div>
    </div>
  );
};

export default SidebarMini;
