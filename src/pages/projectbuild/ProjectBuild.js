import { useTheme } from '../../hooks/useTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { projectData } from '../../data/projectData';
import PreviewCustom from '../../components/PreviewCustom';
import CustomMaterial from './Paint/CustomMaterial';

//styles
import './ProjectBuild.css';
import { faShareNodes, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

export default function ProjectBuild() {
  const [currentProject, setCurrentProject] = useState('');
  const { color1, background, backgroundMain } = useTheme();
  const { id } = useParams();

  const projects = projectData;

  const projectFinder = (obj) => {
    obj.map((item) => {
      if (item.details.id === id) {
        setCurrentProject(item);
      }
    });
  };

  useEffect(() => {
    projectFinder(projects);
  }, []);

  return <></>;
}
