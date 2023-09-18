import { useTheme } from '../hooks/useTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { projectData } from '../data/projectData';

//styles
import '../pages/projectbuild/ProjectBuild.css';
import { faShareNodes, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

export default function ProjectImage() {
  const [currentProject, setCurrentProject] = useState('');
  const { color1, background, backgroundMain } = useTheme();
  const { id } = useParams();

  const projects = projectData;

  const project = localStorage.getItem('current_project');
  const active_project = JSON.parse(project);
  // console.log(active_project.details.id);

  const projectFinder = (obj) => {
    obj.map((item) => {
      if (item.details.id === id) {
        setCurrentProject(item);
      } else {
        setCurrentProject(active_project);
        // console.log('we have to you storage here:');
      }
    });
  };

  useEffect(() => {
    projectFinder(projects);
  }, []);

  return (
    <div
      className="build-container"
      style={{ border: `2px solid ${background}` }}
    >
      {currentProject && (
        <div
          className="project"
          style={{
            background: backgroundMain,
          }}
        >
          <img
            className="project-img"
            src={currentProject && currentProject.img[0]}
          />

          <div className="icon-container">
            <div>
              <FontAwesomeIcon style={{ color: color1 }} icon={faFloppyDisk} />
            </div>
            <div>
              <FontAwesomeIcon style={{ color: color1 }} icon={faShareNodes} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
