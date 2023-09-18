import { createContext } from 'react';
import { useReducer } from 'react';

export const ThemeContext = createContext();
const themeReducer = (state, action) => {
  switch (action.type) {
    // Color Theme
    case 'DEFAULT_THEME':
      return {
        ...state,
        title: 'default',
        color1: 'LightSlateGrey',
        color2: '#808080',
        bgfaded: 'linear-gradient(silver, LightSlateGrey)',
      };
    case 'APPLE_THEME':
      return {
        ...state,
        title: 'apple',
        color1: '#ff0000',
        color2: '#800026',
        bgfaded: 'linear-gradient(#ff0000, #800026)',
      };
    case 'SUNSET_THEME':
      return {
        ...state,
        title: 'sunset',
        color1: 'orange',
        color2: 'orangered',
        bgfaded: 'linear-gradient(orange, orangered)',
      };
    case 'PLUM_THEME':
      return {
        ...state,
        title: 'plum',
        color1: '#bd26e3',
        color2: '#520dd4',
        bgfaded: 'linear-gradient(#bd26e3, #520dd4)',
      };
    case 'DAYTONA_THEME':
      return {
        ...state,
        title: 'daytona',
        color1: '#1c50ed',
        color2: '#31299e',
        bgfaded: 'linear-gradient(#1c50ed, #31299e)',
      };
    case 'JADE_THEME':
      return {
        ...state,
        title: 'jade',
        color1: 'limegreen',
        color2: 'darkgreen',
        bgfaded: 'linear-gradient(limegreen, darkgreen)',
      };
    // Theme Mode
    case 'DARK_MODE':
      return {
        ...state,
        background: '#282c34',
        backgroundActive: '#000',
        backgroundMain: 'linear-gradient(-45deg, #282c34, #000 60%)',
        textColor: '#fff',
      };
    case 'DEFAULT_MODE':
      return {
        ...state,
        title: 'default',
        background: 'darkgrey',
        backgroundActive: '#fff',
        backgroundMain: 'linear-gradient(-45deg, silver, #fff 60%)',
        textColor: '#000000',
      };
    case 'PREVIEW_MAX':
      return {
        ...state,
        previewZoom: true,
      };
    case 'PREVIEW_MIN':
      return {
        ...state,
        previewZoom: false,
      };
    case 'PREVIEW_TYPE_PICK':
      return {
        ...state,
        previewType: 'pick',
      };
    case 'PREVIEW_TYPE_CREATE':
      return {
        ...state,
        previewType: 'create',
      };
  }
};

const storeTheme = (type = 'DEFAULT_THEME') => {
  localStorage.setItem('appTheme', type);
};
const storeMode = (type = 'DEFAULT_MODE') => {
  localStorage.setItem('appMode', type);
};

const initialState = {
  color1: 'LightSlateGrey',
  color2: '#808080',
  bgfaded: 'linear-gradient(silver, LightSlateGrey)',
  background: 'darkgrey',
  backgroundActive: '#fff',
  backgroundMain: 'linear-gradient(-45deg, silver, #fff 60%)',
  textColor: '#000000',
  previewZoom: false,
  previewType: 'pick',
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const previewTypePick = (previewType) => {
    dispatch({ type: 'PREVIEW_TYPE_PICK', payload: previewType });
  };
  const previewTypeCreate = (previewType) => {
    dispatch({ type: 'PREVIEW_TYPE_CREATE', payload: previewType });
  };
  const previewMax = (previewZoom) => {
    dispatch({ type: 'PREVIEW_MAX', payload: previewZoom });
    console.log('MAX', previewZoom);
  };
  const previewMin = (previewZoom) => {
    dispatch({ type: 'PREVIEW_MIN', payload: previewZoom });
    console.log('MIN', previewZoom);
  };
  const defaultTheme = (color1, color2, bgfaded) => {
    dispatch({ type: 'DEFAULT_THEME', payload: color1, color2, bgfaded });
  };
  const appleTheme = (color1, color2, bgfaded) => {
    dispatch({ type: 'APPLE_THEME', payload: color1, color2, bgfaded });
    storeTheme('APPLE_THEME');
  };
  const sunsetTheme = (color1, color2, bgfaded) => {
    dispatch({ type: 'SUNSET_THEME', payload: color1, color2, bgfaded });
  };
  const plumTheme = (color1, color2, bgfaded) => {
    dispatch({ type: 'PLUM_THEME', payload: color1, color2, bgfaded });
  };
  const daytonaTheme = (color1, color2, bgfaded) => {
    dispatch({ type: 'DAYTONA_THEME', payload: color1, color2, bgfaded });
  };
  const jadeTheme = (color1, color2, bgfaded) => {
    dispatch({ type: 'JADE_THEME', payload: color1, color2, bgfaded });
  };
  const darkMode = (background, textColor) => {
    dispatch({ type: 'DARK_MODE', payload: background, textColor });
  };
  const defaultMode = (background, textColor) => {
    dispatch({ type: 'DEFAULT_MODE', payload: background, textColor });
  };

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        dispatch,
        storeTheme,
        storeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
