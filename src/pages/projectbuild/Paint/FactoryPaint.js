import '../ProjectBuild.css';
import { useEffect, useState } from 'react';
import { usePaintBuild } from '../../../hooks/usePaintBuild';
import { useTheme } from '../../../hooks/useTheme';

import Preview from '../../../components/Preview';
import Menu from '../../../components/Menu';
import { kandyPaint } from '../../../data/paintData';
import { hypershiftPaint } from '../../../data/paintData';
import { useParams } from 'react-router-dom';
import ColorMix from './ColorMix';

const FactoryPaint = () => {
  const [paintReflection, setPaintReflection] = useState('gloss');
  const [error, setError] = useState(null);
  const { background, backgroundMain, backgroundActive, color1, textColor } =
    useTheme();
  const { id } = useParams();

  const {
    kandyColor,
    hypershiftColor,
    paintType,
    paintReflectionType,
    dispatch,
  } = usePaintBuild();
  const types = ['kandy', 'hypershift'];
  const reflectionTypes = ['gloss', 'matte'];

  const handleReflectionType = (clicked) => {
    setPaintReflection(clicked);
    dispatch({ type: 'PAINT_REFLECTION_SELECTED', payload: clicked });
  };

  //Get Preview
  const getUrlName = (url) => {
    if (paintType && paintType === 'kandy') {
      // eslint-disable-next-line
      return url.split('/', 4).pop().split('.')[0] + ' ' + 'Kandy';
    }
    if (paintType && paintType === 'hypershift') {
      console.log(url);
      return url
        .split('/', 4)
        .pop()
        .split('.')[0]
        .replace('_', ' to ')
        .replace('white', 'over whitebase')
        .replace('black', 'over blackbase');
    }
  };

  let finishType;

  if (paintType) {
    paintType === 'kandy'
      ? (finishType = kandyPaint)
      : (finishType = hypershiftPaint);
  }

  const handleSelected = (clicked) => {
    console.log('handle selected: ', clicked);

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
    <div
      className="menu factory"
      style={{
        borderRight: `solid 1px ${color1}`,
        background: `linear-gradient(${backgroundActive}, transparent)`,
      }}
    >
      <Preview
        previewColor={<ColorMix />}
        selectedName={getUrlName(
          paintType === 'kandy' ? kandyColor : hypershiftColor
        )}
      />
      {error && <p>{error}</p>}
      <div
        className="menu-container"
        style={{
          background: `linear-gradient(transparent, ${background})`,
        }}
      >
        <Menu item={[]} title={'Reflection'} />

        <div className="selection-types">
          {reflectionTypes.map((type) => (
            <div className="selection" key={type.length.toString() + type}>
              <div
                onClick={() => handleReflectionType(type)}
                style={{
                  border:
                    paintReflectionType === type
                      ? `${color1} 2px solid`
                      : `${background} 2px solid`,
                  color: paintReflectionType === type ? color1 : textColor,
                  background: backgroundMain,
                }}
              >
                {type}
              </div>
            </div>
          ))}
        </div>

        <Menu item={[]} title={'Paint type'} />

        <div className="selection-types">
          {types.map((type) => (
            <div className="selection" key={type.length.toString() + type}>
              <div
                onClick={() => handleSelected(type)}
                style={{
                  border:
                    paintType === type
                      ? `${color1} 2px solid`
                      : `${background} 2px solid`,
                  color: paintType === type ? color1 : textColor,
                  background: backgroundMain,
                }}
              >
                {type}
              </div>
            </div>
          ))}
        </div>

        <Menu item={paintType && finishType} title={paintType + ' color'} />
      </div>
    </div>
  );
};

export default FactoryPaint;
