import './Toggle.css';
import { useTheme } from '../hooks/useTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Toggle = () => {
  const { color1, color2, backgroundActive, dispatch, storeMode } = useTheme();
  const mode = localStorage.getItem('appMode');

  //   const handleToggle = (m) => {
  //     if (m === 'DEFAULT_MODE') {
  //       dispatch({
  //         type: 'DEFAULT_MODE',
  //       });
  //       storeMode('DEFAULT_MODE');
  //     } else {
  //       dispatch({
  //         type: 'DARK_MODE',
  //       });
  //       storeMode('DARK_MODE');
  //     }
  //   };

  return (
    <div
      className="toggleContainer"
      style={{ border: `2px solid ${color1}`, background: backgroundActive }}
    >
      <div
        className="darkBtn"
        onClick={() => {
          dispatch({
            type: 'DARK_MODE',
          });
          storeMode('DARK_MODE');
        }}
      >
        <FontAwesomeIcon icon={faMoon} className="moon" />
      </div>
      <div
        className="lightBtn"
        onClick={() => {
          dispatch({
            type: 'DEFAULT_MODE',
          });
          storeMode('DEFAULT_MODE');
        }}
      >
        <FontAwesomeIcon icon={faSun} className="sun" />
      </div>
      <div
        style={{ background: color1 }}
        className={mode === 'DARK_MODE' ? 'toggle dark' : 'toggle light'}
      ></div>
    </div>
  );
};

export default Toggle;
