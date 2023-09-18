import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { projectData } from '../data/projectData';

// style
import './ProjectList.css';

export default function ProjectList() {
  const { color1, textColor } = useTheme();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/project/${id}`);
  };

  const projects = projectData;

  return (
    <div className="built-container ">
      {projects.map((project) => (
        <div
          onClick={() => handleClick(project.details.id)}
          style={{ maxWidth: '450px' }}
          className="build"
          key={project.details.id}
          to={`/project/ ${project.details.id}`}
        >
          <div className="built-projects">
            <div className="title">
              <h3 style={{ color: textColor }}>{project.projectTitle}</h3>
              <h4 style={{ color: color1 }}>{project.details.title}</h4>
            </div>
            <img
              src={project.img[0]}
              style={{ border: `${color1} solid 2px` }}
            />
            <small>Last Edited: {project.details.lastEdit}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
