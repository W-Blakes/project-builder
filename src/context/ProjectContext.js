import { useReducer, createContext } from 'react';

export const ProjectContext = createContext();

const projectReducer = (state, action) => {
  switch (action.type) {
    case 'CURRENT_PROJECT_DATA':
      return { ...state, currentProjectData: action.payload };
    default:
      return state;
  }
};

export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, {
    currentProjectData: '',
  });

  const storeCurrentProjectData = (project = currentProjectData) => {
    localStorage.setItem('current_project', project);
  };
  const getCurrentProjectData = (project = currentProjectData) => {
    localStorage.getItem('current_project', project);
  };

  const currentProjectData = (currentProjectData) => {
    dispatch({ type: 'CURRENT_PROJECT_DATA', payload: currentProjectData });
  };


  return (
    <ProjectContext.Provider
      value={{
        ...state,
        dispatch,
        storeCurrentProjectData,
        getCurrentProjectData,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
