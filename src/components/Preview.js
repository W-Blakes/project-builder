import { useTheme } from '../hooks/useTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
} from '@fortawesome/free-solid-svg-icons';

import '../pages/projectbuild/ProjectBuild.css';
import './Preview.css';

const Preview = ({ selectedImg, selectedName, previewColor }) => {
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
        {previewColor && <>{previewColor}</>}
        {selectedImg && (
          <>
            <img
              className="pick-shader"
              src={selectedImg}
              style={{
                objectFit: 'cover',
              }}
            ></img>
          </>
        )}

        <small
          className="preview-title"
          style={{ textTransform: 'capitalize', color: color1 }}
        >
          {selectedName}
        </small>
      </div>
    </div>
  );
};

export default Preview;
