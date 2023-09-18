import { ProjectContext } from '../context/ProjectContext';
import { useContext } from 'react';

export const useProject = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw Error('useProjectContext must be inside a ProjectProvider');
  }

  return context;
};
