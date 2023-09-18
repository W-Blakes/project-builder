import { PaintBuildContext } from '../context/PaintBuildContext';
import { useContext } from 'react';

export const usePaintBuild = () => {
  const context = useContext(PaintBuildContext);

  if (!context) {
    throw Error(
      'usePaintPaintBuildContext must be inside an PaintBuildContextProvider'
    );
  }

  return context;
};
