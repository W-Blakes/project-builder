import { NavLink, Outlet } from 'react-router-dom';

import { useTheme } from '../hooks/useTheme';

// styles
import '../layouts/Layout.css';

const PaintLayout = () => {
  const {
    dispatch,
    color1,
    background,
    textColor,
    backgroundMain,
    previewType,
  } = useTheme();

  return (
    <div className="paint-layout">
      <div className="paint-selection-types ">
        <NavLink
          to="factorypaint"
          onClick={() => {
            dispatch({ type: 'PREVIEW_TYPE_PICK', payload: previewType });
          }}
          className="btn paint"
          style={({ isActive }) => {
            return {
              border: isActive
                ? `${color1} 2px solid`
                : `${background} 2px solid`,
              color: isActive ? color1 : textColor,
              background: backgroundMain,
            };
          }}
        >
          Pick color
        </NavLink>
        <NavLink
          to="custommix"
          onClick={() => {
            dispatch({ type: 'PREVIEW_TYPE_CREATE', payload: previewType });
          }}
          className="btn paint"
          style={({ isActive }) => {
            return {
              border: isActive
                ? `${color1} 2px solid`
                : `${background} 2px solid`,
              color: isActive ? color1 : textColor,
              background: backgroundMain,
            };
          }}
        >
          Create color
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default PaintLayout;
