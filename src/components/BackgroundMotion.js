import './BackgroundMotion.css';
import { useTheme } from '../hooks/useTheme';

const BackgroundMotion = () => {
  const { color1, textColor, background } = useTheme();
  return (
    <div className="bgContainer">
      <div
        className="linesA"
        style={{
          borderLeft: `2px dashed ${textColor}`,
          borderRight: `2px dashed ${color1}`,
        }}
      ></div>
      <div
        className="dashedA"
        style={{
          borderLeft: `5px solid ${color1}`,
          borderRight: `2px solid ${textColor}`,
        }}
      ></div>

      <div
        className="circlesA"
        style={{
          background: background,
          border: `5px dashed ${color1}`,
          zIndex: 1,
        }}
      >
        <div
          className="circlesB"
          style={{
            background: background,
            border: `2px dashed ${textColor}`,
            zIndex: 1,
          }}
        ></div>
      </div>
      <div
        className="circlesC"
        style={{
          background: background,
          border: `3px dashed ${textColor}`,
          zIndex: 1,
        }}
      >
        <div
          className="circlesD"
          style={{
            background: background,
            border: `12px dashed ${color1}`,
            zIndex: 1,
          }}
        ></div>
      </div>

      <div
        className="linesB"
        style={{
          borderTop: `2px solid ${textColor}`,
          borderBottom: `4px solid ${color1}`,
        }}
      ></div>
      <div
        className="dashedB"
        style={{
          borderLeft: `2px dashed ${color1}`,
          borderRight: `5px dashed ${textColor}`,
        }}
      ></div>
    </div>
  );
};

export default BackgroundMotion;
