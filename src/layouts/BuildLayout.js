import { Link, NavLink, Outlet } from 'react-router-dom';
import ProjectImage from '../pages/ProjectImage';
import { useParams } from 'react-router-dom';
import PreviewCustom from '../components/PreviewCustom';
import Preview from '../components/Preview';
import ColorMix from '../pages/projectbuild/Paint/ColorMix';
import CustomMaterial from '../pages/projectbuild/Paint/CustomMaterial';
import { useProject } from '../hooks/useProject';
import { useState, useEffect } from 'react';

//style
import '../layouts/Layout.css';
import { useTheme } from '../hooks/useTheme';
import { usePaintBuild } from '../hooks/usePaintBuild';
import Button from '../components/Button';

export default function BuildLayout() {
  const { previewType, color1, textColor, previewZoom } = useTheme();
  const { id } = useParams();

  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (localStorage.getItem('current_project')) {
      const project = localStorage.getItem('current_project');
      const active_project = JSON.parse(project);
      setActiveId(active_project.details.id);
    } else {
      setActiveId('id');
    }
  }, []);

  const {
    paintType,
    kandyColor,
    hypershiftColor,
    chameleonColor,
    pearlColor,
    paintPreviewType,
    paintColor,
    paintBaseType,
    paintReflectionType,
    tintColor,
  } = usePaintBuild();
  const { currentProjectData } = useProject();

  const getUrlName = (url) => {
    if (paintPreviewType === 'create') {
      // create
      if (url.split('/', 4).pop().split('.')[0] === 'none') {
        return '';
      }
      // eslint-disable-next-line
      if (url) {
        return url.split('/', 4).pop().split('.')[0];
      }
    } else {
      // pick
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
  return (
    <div className="build-layout">
      <div className="buildLayout-container">
        {activeId === 'id' && (
          <div
            style={{
              display: 'flex',
              flexFlow: 'column',
              margin: 'auto',
            }}
          >
            <h2
              style={{
                padding: '0 10vw',
                color: color1,
              }}
            >
              Create or choose an exsisting project to start building
            </h2>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '1rem auto',
              }}
            >
              <Button
                linkTitle={'create'}
                link={'/create'}
                style={{
                  color: textColor,
                }}
              />
              <Button
                linkTitle={'projects'}
                link={'/'}
                style={{ color: textColor }}
              />
            </div>
          </div>
        )}
        {!previewZoom && <ProjectImage />}
        <div className="show-preview">
          {previewZoom && paintPreviewType === 'create' ? (
            <PreviewCustom
              chameleonColor={getUrlName(chameleonColor)}
              previewPearl={getUrlName(pearlColor)}
              previewMetallic={getUrlType(paintBaseType)}
              previewReflection={paintReflectionType}
              previewTint={getUrlName(tintColor)}
              previewColor={<CustomMaterial />}
              selectedName={paintColor}
            />
          ) : (
            previewZoom && (
              <Preview
                // selectedImg={wheelStyle}
                previewColor={<ColorMix />}
                selectedName={getUrlName(
                  paintType === 'kandy' ? kandyColor : hypershiftColor
                )}
              />
            )
          )}
        </div>

        <div className="build-menu">
          <ul>
            <li>
              <NavLink
                to={
                  paintPreviewType
                    ? paintPreviewType !== 'pick'
                      ? `${activeId ? activeId : 'id'}/paint/custommix`
                      : `${activeId ? activeId : 'id'}/paint/factorypaint`
                    : `${activeId ? activeId : 'id'}/paint/factorypaint`
                }
                style={({ isActive }) => {
                  return {
                    color: isActive ? color1 : textColor,
                    borderBottom: isActive ? `${color1} solid 4px` : 'none',
                  };
                }}
              >
                paint
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${activeId}/wheels`}
                style={({ isActive }) => {
                  return {
                    color: isActive ? color1 : textColor,
                    borderBottom: isActive ? `${color1} solid 4px` : 'none',
                  };
                }}
              >
                wheels
              </NavLink>
            </li>
            <li>
              <NavLink
                to="trim"
                style={({ isActive }) => {
                  return {
                    color: isActive ? color1 : textColor,
                    borderBottom: isActive ? `${color1} solid 4px` : 'none',
                  };
                }}
              >
                trim
              </NavLink>
            </li>
            <li>
              <NavLink
                to="misc"
                style={({ isActive }) => {
                  return {
                    color: isActive ? color1 : textColor,
                    borderBottom: isActive ? `${color1} solid 4px` : 'none',
                  };
                }}
              >
                misc
              </NavLink>
            </li>
            <li>
              <NavLink
                to="interior"
                style={({ isActive }) => {
                  return {
                    color: isActive ? color1 : textColor,
                    borderBottom: isActive ? `${color1} solid 4px` : 'none',
                  };
                }}
              >
                interior
              </NavLink>
            </li>
            <li>
              <NavLink
                to="enginebay"
                style={({ isActive }) => {
                  return {
                    color: isActive ? color1 : textColor,
                    borderBottom: isActive ? `${color1} solid 4px` : 'none',
                  };
                }}
              >
                enginebay
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
