import { useTheme } from '../hooks/useTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
} from '@fortawesome/free-solid-svg-icons';

import '../pages/projectbuild/ProjectBuild.css';
import './Preview.css';

const PreviewCustom = ({
  selectedName,
  previewColor,
  previewMetallic,
  previewPearl,
  previewTint,
  previewReflection,
  chameleonColor,
}) => {
  const { color1, background, backgroundMain, previewZoom, dispatch } =
    useTheme();

  const handleZoom = () => {
    console.log(previewZoom);
    if (previewZoom === false) {
      console.log('clicked', 'preview_max');
      dispatch({ type: 'PREVIEW_MAX', payload: true });
    } else {
      console.log('clicked:', 'preview_min');
      dispatch({ type: 'PREVIEW_MIN', payload: false });
    }
  };

  return (
    <div className="preview">
      <div
        className="preview-container"
        style={{
          background: backgroundMain,
          border: `${background} solid 2px`,
        }}
      >
        <div
          className="preview-zoom"
          onClick={handleZoom}
          style={{ zIndex: '300' }}
        >
          {previewZoom ? (
            <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
          ) : (
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
          )}
        </div>
        {previewColor}
        <small
          className="preview-title"
          style={{ color: color1, textTransform: 'uppercase' }}
        >
          {chameleonColor &&
            ` ${chameleonColor.replace('_', ' to ')} pearl ${'over '}`}
          {previewTint && ` kandy-${previewTint} ${'over '}`}
          {previewPearl && ` ${previewPearl.replace('X', '')}${'-pearl over '}`}
          {previewReflection && `${previewReflection} `}
          {previewMetallic && `${previewMetallic}`}
          {` ${selectedName}`}
        </small>
      </div>
    </div>
  );
};

export default PreviewCustom;
