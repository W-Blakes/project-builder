import { usePaintBuild } from '../../../hooks/usePaintBuild';

//styles
import '../ProjectBuild.css';

import ReflectionShader from '../../../assets/paint/shader/reflection.png';
import MatteShader from '../../../assets/paint/shader/matte.png';

const ColorMix = () => {
  const { paintReflectionType, paintType, kandyColor, hypershiftColor } =
    usePaintBuild();

  return (
    <div className="custom-color-container">
      <img
        className="paint-shaderReflection"
        src={paintReflectionType === 'gloss' ? ReflectionShader : MatteShader}
        style={{
          objectFit: 'cover',
          zIndex: '120',
        }}
      ></img>
      <img
        className="color-container"
        src={paintType === 'kandy' ? kandyColor : hypershiftColor}
        style={{
          objectFit: 'cover',
          zIndex: '100',
        }}
      ></img>
    </div>
  );
};

export default ColorMix;
