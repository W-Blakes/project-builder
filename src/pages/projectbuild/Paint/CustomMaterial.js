import { useState } from 'react';
import { usePaintBuild } from '../../../hooks/usePaintBuild';
import { useProject } from '../../../hooks/useProject';
import { useParams } from 'react-router-dom';

//styles
import '../ProjectBuild.css';
import BaseShader from '../../../assets/paint/shader/base.png';
import SolidShader from '../../../assets/paint/shader/solid.png';
import MetallicShader from '../../../assets/paint/shader/metallic.png';
import ReflectionShader from '../../../assets/paint/shader/reflection.png';
import MatteShader from '../../../assets/paint/shader/matte.png';

const CustomMaterial = () => {
  const [fillColor, setFillColor] = useState('#ffae00');

  const {
    paintColor,
    paintBaseType,
    pearlColor,
    tintColor,
    paintReflectionType,
    chameleonColor,
  } = usePaintBuild();

  const { currentProjectData } = useProject();
  const buildData = currentProjectData.build;

  const project = localStorage.getItem('current_project');
  const active_project = JSON.parse(project);

  return (
    <div>
      <div className="custom-color-container">
        <img
          className="paint-shaderReflection"
          src={
            active_project.build.paintReflectionType === 'gloss'
              ? ReflectionShader
              : MatteShader
          }
          style={{
            objectFit: 'cover',
            zIndex: '120',
          }}
        ></img>
        <img
          className="paint-shaderKandy"
          src={active_project.build.tintColor}
          style={{
            objectFit: 'cover',
            zIndex: '119',
          }}
        ></img>
        <img
          className="paint-shaderChameleon"
          src={active_project.build.chameleonColor}
          style={{
            objectFit: 'cover',
            zIndex: '118',
          }}
        ></img>
        <img
          className="paint-shaderPearl"
          src={active_project.build.pearlColor}
          style={{
            objectFit: 'cover',
            zIndex: '115',
          }}
        ></img>
        <img
          className="paint-shaderMetallic"
          src={
            active_project.build.paintBaseType === 'solid'
              ? SolidShader
              : MetallicShader
          }
          style={{
            objectFit: 'cover',
            zIndex: '110',
          }}
        ></img>
        <img
          className="paint-shaderBase"
          src={BaseShader}
          style={{
            objectFit: 'cover',
            zIndex: '105',
          }}
        ></img>
        <svg
          className="material-container"
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_2"
          data-name="Layer 2"
          viewBox="0 0 400 400"
          style={{
            fill: active_project.build.paintColor
              ? active_project.build.paintColor
              : fillColor,
            zIndex: '100',
          }}
        >
          <circle
            className="cls-1 material"
            cx="205.37"
            cy="202.9"
            r="149.29"
          />
        </svg>
      </div>
    </div>
  );
};

export default CustomMaterial;
