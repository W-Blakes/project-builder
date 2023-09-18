import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw Error('useThemeContext must be inside a ThemeContextProvider');
  }

  return context;
};
