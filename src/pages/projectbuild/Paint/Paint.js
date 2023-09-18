import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { usePaintBuild } from '../../../hooks/usePaintBuild';
import { useTheme } from '../../../hooks/useTheme';
// import FactoryPaint from './FactoryPaint';

import Preview from '../../../components/Preview';
import Menu from '../../../components/Menu';
import { kandyPaint } from '../../../data/paintData';
import { hypershiftPaint } from '../../../data/paintData';

// import { RGBColor } from 'react-color';
// import { SwatchesPicker } from 'react-color';

export default function Paint() {
  // const handleColorChange = ({ hex }) => console.log(hex);
  const types = [
    // 'solid',
    //  'metalic',
    'kandy',
    'hypershift',
  ];

  const { background, backgroundMain, color1, textColor } = useTheme();
  const { paintColor, paintType, dispatch } = usePaintBuild();

  const [error, setError] = useState(null);

  //Get Preview
  const getUrlName = (url) => {
    if (paintType && paintType === 'kandy') {
      // eslint-disable-next-line
      return url.split('/', 4).pop().split('.')[0] + ' ' + 'Kandy';
    }
    if (paintType && paintType === 'hypershift') {
      return url
        .split('/', 4)
        .pop()
        .split('.')[0]
        .replace('_', ' ➡ ')
        .replace('white', '& whitebase')
        .replace('black', '& blackbase');
    }
  };

  const hyperFinish = hypershiftPaint;
  const kandyFinish = kandyPaint;
  let finishType;

  if (paintType) {
    if (paintType === 'kandy') {
      finishType = kandyFinish;
    }
    if (paintType === 'hypershift') {
      finishType = hyperFinish;
    }
  }

  const handleSelected = (clicked) => {
    if (clicked !== 'solid' || clicked !== 'metalic') {
      try {
        dispatch({ type: 'PAINT_TYPE_SELECTED', payload: `${clicked}` });
      } catch (err) {
        setError("sorry this option isn't ready", err);
      }
      // add custom color picker option here //
    } else return [];
  };

  return (
    <div className="menu">
      old paint page
      {/* <div className="menu-container">
        <Menu item={[]} title={'Paint type'} />

        <div className="paint-types">
          {types.map((type) => (
            <div className="paint-link" key={type.length.toString() + type}>
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

        <Menu item={paintType && finishType} title={'Paint Color'} />
      </div>

      <Preview selectedImg={paintColor} selectedName={getUrlName(paintColor)} />
      {error && <p>{error}</p>}
      <Outlet /> */}
    </div>
  );
}
