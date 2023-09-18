import { Link } from 'react-router-dom';

// style
import './Profile.css';
import pimg from '../assets/profile-icon.png';

import React from 'react';
import { useTheme } from '../hooks/useTheme';

const Profile = ({ msg }) => {
  const { background, color2 } = useTheme();

  return (
    <div className="profile">
      <div className="profile-img" style={{ background: background }}>
        <img src={pimg} />
      </div>
      <p className="edit-btn">
        <Link to="/userprofile">edit</Link>
      </p>
      <p className="greeting" style={{ color: 'black' }}>
        {msg}
      </p>
      <div className="border-bottom" style={{ background: color2 }}></div>
    </div>
  );
};

export default Profile;
