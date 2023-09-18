import { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { usePaintBuild } from '../../../hooks/usePaintBuild';
import { useTheme } from '../../../hooks/useTheme';
import { pearlPaint } from '../../../data/paintData';
import { tintPaint } from '../../../data/paintData';
import { chameleonPaint } from '../../../data/paintData';
import { projectData } from '../../../data/projectData';
import { useParams } from 'react-router-dom';
import { useProject } from '../../../hooks/useProject';

import PreviewCustom from '../../../components/PreviewCustom';
import Menu from '../../../components/Menu';

//styles
import '../ProjectBuild.css';
import None from '../../../assets/paint/shader/none.png';
import CustomMaterial from './CustomMaterial';

const CustomMix = () => {
  const [fillColor, setFillColor] = useState('#ffae00');
  const [paintReflection, setPaintReflection] = useState('gloss');
  const [paintBase, setPaintBase] = useState('solid');
  const [triCoat, setTriCoat] = useState(None);
  const [tintCoat, setTintCoat] = useState(None);
  const [currentProject, setCurrentProject] = useState('');

  const { background, backgroundMain, backgroundActive, color1, textColor } =
    useTheme();

  const { currentProjectData } = useProject();
  const buildData = currentProjectData.build;

  const {
    pearlType,
    tintColor,
    paintColor,
    tintType,
    paintBaseType,
    pearlColor,
    chameleonColor,
    paintReflectionType,
    dispatch,
  } = usePaintBuild();
  const { id } = useParams();
  // console.log('custom mix id:', id);

  const projects = projectData;

  // console.log(tintPaint);

  const reflectionTypes = ['gloss', 'matte'];
  const baseTypes = ['solid', 'metallic'];
  const tricoatTypes = ['none', 'tri-coat'];
  const tintedTypes = ['none', 'kandy'];

  const projectFinder = (obj) => {
    obj.map((item) => {
      if (item.details.id === id) {
        setCurrentProject(item);
        // console.log('currentProject:', currentProject.build);
      }
    });
  };
  useEffect(() => {
    setFillColor(paintColor ? paintColor : '#ffae00');
  }, []);

  useEffect(() => {
    projectFinder(projects);
  }, []);

  const getUrlName = (url) => {
    if (url.split('/', 4).pop().split('.')[0] === 'none') {
      return '';
    }
    // eslint-disable-next-line
    if (url) {
      return url.split('/', 4).pop().split('.')[0];
    }
  };

  const getUrlType = (url) => {
    if (url === 'solid') {
      return 'solid';
    }
    if (url === 'metallic') {
      return 'metallic';
    }
    if (url === 'gloss') {
      return;
    }
    if (url === 'matte') {
      return 'matte';
    }
  };

  const handleReflectionType = (clicked) => {
    setPaintReflection(clicked);
    dispatch({ type: 'PAINT_REFLECTION_SELECTED', payload: clicked });
  };
  const handleBaseType = (clicked) => {
    setPaintBase(clicked);
    dispatch({ type: 'PAINT_BASE_SELECTED', payload: clicked });
  };
  const handleTriCoatType = (clicked) => {
    clicked === 'none' ? setTriCoat(None) : setTriCoat(clicked);
    dispatch({ type: 'PEARL_TYPE_SELECTED', payload: clicked });
    dispatch({ type: 'PEARL_COLOR_SELECTED', payload: None });
  };
  const handleTintType = (clicked) => {
    // console.log('tint type:', clicked, 'selected');
    clicked === 'kandy' ? setTintCoat(clicked) : setTintCoat('none');
    dispatch({ type: 'TINT_TYPE_SELECTED', payload: clicked });
    dispatch({ type: 'TINT_COLOR_SELECTED', payload: None });
  };

  const handleColorChange = (color, event) => {
    setFillColor(color.hex);
  };
  const handleColorChangeComplete = () => {
    dispatch({ type: 'PAINT_COLOR_SELECTED', payload: fillColor });
  };

  return (
    <div
      className="menu custom"
      style={{
        borderRight: `solid 1px ${color1}`,
        background: `linear-gradient(${backgroundActive}, transparent)`,
      }}
    >
      <PreviewCustom
        chameleonColor={getUrlName(chameleonColor)}
        previewPearl={getUrlName(pearlColor)}
        previewMetallic={getUrlType(paintBaseType)}
        previewReflection={paintReflectionType}
        previewTint={getUrlName(tintColor)}
        previewColor={<CustomMaterial />}
        selectedName={paintColor ? paintColor : fillColor}
      />
      {/* {error && <p>{error}</p>} */}
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
                  color: textColor,
                  background: backgroundMain,
                }}
              >
                {type}
              </div>
            </div>
          ))}
        </div>

        <Menu item={[]} title={'Base Type'} />

        <div className="selection-types">
          {baseTypes.map((type) => (
            <div className="selection" key={type.length.toString() + type}>
              <div
                onClick={() => handleBaseType(type)}
                style={{
                  border:
                    paintBaseType === type
                      ? `${color1} 2px solid`
                      : `${background} 2px solid`,
                  color: textColor,
                  background: backgroundMain,
                }}
              >
                {type}
              </div>
            </div>
          ))}
        </div>

        <Menu item={[]} title={`Paint Color: HEX ${fillColor}`} />
        <ChromePicker
          styles={{ background: `${color1} !important` }}
          className="color-picker"
          color={fillColor}
          onChange={handleColorChange}
          onChangeComplete={handleColorChangeComplete}
          disableAlpha={true}
        />

        {/* <Menu item={[]} title={`Tri-coat: ${getUrlName(pearlColor)}`} /> */}

        <Menu item={[]} title={'Pearl Type'} />

        <div className="selection-types">
          {tricoatTypes.map((type) => (
            <div className="selection" key={type.length.toString() + type}>
              <div
                onClick={() => handleTriCoatType(type)}
                style={{
                  border:
                    pearlType === type
                      ? `${color1} 2px solid`
                      : `${background} 2px solid`,
                  color: textColor,
                  background: backgroundMain,
                }}
              >
                {type}
              </div>
            </div>
          ))}
        </div>

        {pearlType === 'none' || pearlType === '' ? (
          ''
        ) : (
          <>
            <Menu item={pearlPaint} title={'Pearl Color'} />
            <Menu item={chameleonPaint} title={'Chameleon Color'} />
          </>
        )}

        <Menu item={[]} title={'Tint Type'} />

        <div className="selection-types">
          {tintedTypes.map((type) => (
            <div className="selection" key={type.length.toString() + type}>
              <div
                onClick={() => handleTintType(type)}
                style={{
                  border:
                    tintType === type
                      ? `${color1} 2px solid`
                      : `${background} 2px solid`,
                  color: textColor,
                  background: backgroundMain,
                }}
              >
                {type}
              </div>
            </div>
          ))}
        </div>

        {tintType === 'none' || tintType === '' ? (
          ''
        ) : (
          <>
            <Menu item={tintPaint} title={'Tint Color'} />
          </>
        )}
      </div>
    </div>
  );
};

export default CustomMix;
