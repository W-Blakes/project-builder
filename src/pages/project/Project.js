import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme.js';
import { projectData } from '../../data/projectData.js';
import Preview from '../../components/Preview.js';
import { useProject } from '../../hooks/useProject.js';

// style
import Button from '../../components/Button.js';
import './Project.css';

const Project = () => {
  const projects = projectData;
  const [currentProject, setCurrentProject] = useState('');
  const [editable, setEditable] = useState(false);
  const [error, setError] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const { color1, textColor, background } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentProjectData, dispatch, storeCurrentProjectData } =
    useProject();

  const handleClick = (id) => {
    navigate(`/projectbuild/${currentProject.details.id}`);
    dispatch({ type: 'CURRENT_PROJECT_DATA', payload: id });
    storeCurrentProjectData(JSON.stringify(currentProject));
  };

  const projectFinder = (obj) => {
    obj.map((item) => {
      if (item.details.id === id) {
        setCurrentProject(item);
      }
    });
  };

  useEffect(() => {
    projectFinder(projects);
    setEditable(false);
  }, []);

  const handleProjectView = (clicked) => {
    setEditable(true);
    setPreviewImg(clicked);
  };

  return (
    <div className="show-container ">
      {error && <h1>Could't load vehicle</h1>}

      {currentProject && (
        <div className="show">
          <div className="show-project">
            {/* Title  */}
            <div className="show-title">
              <h1 style={{ color: color1 }}>{currentProject.projectTitle}</h1>
              <h4 style={{ color: textColor }}>
                {currentProject.details.title}
              </h4>
            </div>

            {/* images  */}
            <div className="showImg-container">
              {previewImg && (
                <Preview
                  className="imgA"
                  selectedImg={previewImg}
                  selectedName={[]}
                />
              )}
              {/* <img className="imgA" src={currentProject.details.img} /> */}
              <div className="editProject-btn">
                <small className="edited">
                  Last Edited: {currentProject.details.lastEdit}
                </small>
                {editable && (
                  <Button
                    title={'Edit'}
                    style={{ color: color1 }}
                    handle={() => handleClick(currentProject)}
                  />
                )}
              </div>
              {currentProject.img ? (
                currentProject.img.map((image, i) => (
                  <img
                    key={i}
                    className="imgB"
                    src={image}
                    onClick={() => handleProjectView(image)}
                  />
                ))
              ) : (
                <div
                  className="error"
                  style={{
                    border: `1px solid ${color1}`,
                    color: color1,
                    background: background,
                  }}
                >
                  <p>Sorry no project images to show</p>
                </div>
              )}
            </div>

            {/* details  */}

            <div>
              <p className="show-details">
                “It first had white paint and then Grotto Blue paint over the
                original Fathom Green, and is now blistering Torch Red,” Ed
                says. He went on to say, “It was also driven back and forth to
                work for many years while my daughters were in school.” Since
                then, the changes have evolved, including a digital
                Intellitronix dash, Fatman Fabrications front suspension, and
                more with Cragar SS rollers.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
