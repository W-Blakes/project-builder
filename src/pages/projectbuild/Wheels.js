import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { usePaintBuild } from '../../hooks/usePaintBuild';

import Menu from '../../components/Menu';
import Preview from '../../components/Preview';
import { wheels, finishes } from '../../data/wheelData';

export default function Wheels() {
  const { background, backgroundMain, backgroundActive, color1, textColor } =
    useTheme();
  const { wheelStyle, dispatch } = usePaintBuild();
  const [error, setError] = useState(null);

  const types = ['steel', 'alloy', 'wire', 'forged'];
  const wheelFinishes = finishes;
  const wheelStyles = wheels;

  const getUrlName = (url) => {
    return url.split('/', 4).pop().split('.')[0];
  };

  const handleSelected = (clicked) => {
    try {
      dispatch({ type: 'WHEEL_TYPE_SELECTED', payload: `${clicked}` });
    } catch (err) {
      setError("sorry this option isn't ready", err);
    }
  };

  return (
    <div
      className="menu"
      style={{
        borderRight: `solid 1px ${color1}`,
        background: `linear-gradient(${backgroundActive}, transparent)`,
      }}
    >
      {/* create wheel/build Context that holds wheel, type and style state. 
       dispatch chocie inside menu component*/}
      <Preview selectedImg={wheelStyle} selectedName={getUrlName(wheelStyle)} />
      <div
        className="menu-container wheel"
        style={{
          background: `linear-gradient(transparent, ${background})`,
        }}
      >
        <Menu item={[]} title={'Wheel type'} error={error} />
        <div className="selection-types">
          {types.map((type) => (
            <div className="selection" key={type.length.toString() + type}>
              <NavLink
                onClick={() => handleSelected(type)}
                // to={`/${type}`}
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
                {type}
              </NavLink>
            </div>
          ))}
        </div>

        <Menu item={wheelStyles} title={'Wheel style'} />

        <Menu item={wheelFinishes} title={'Wheel finish'} />
        {/* <div className="wheel-types">
          {wheelFinishes.map((finish) => (
            <div className="wheel-link" key={finish.length.toString() + finish}>
              <NavLink
                // onClick={() => handleSelected(finish)}
                // to={`/${finish}`}
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
                {finish}
              </NavLink>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
