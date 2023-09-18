import { useReducer } from 'react';
import { createContext } from 'react';
import NONE from '../assets/paint/shader/none.png';

export const PaintBuildContext = createContext();

const buildReducer = (state, action) => {
  switch (action.type) {
    case 'PAINT_REFLECTION_SELECTED':
      return { ...state, paintReflectionType: action.payload };
    case 'PEARL_TYPE_SELECTED':
      return { ...state, pearlType: action.payload };
    case 'CHAMELEON_COLOR_SELECTED':
      return {
        ...state,
        pearlColor: NONE,
        paintBaseType: 'solid',
        chameleonColor: action.payload,
      };
    case 'PEARL_COLOR_SELECTED':
      return {
        ...state,
        chameleonColor: NONE,
        tintColor: NONE,
        tintType: 'none',
        pearlColor: action.payload,
      };
    case 'TINT_COLOR_SELECTED':
      return {
        ...state,
        tintColor: action.payload,
      };
    case 'TINT_TYPE_SELECTED':
      return {
        ...state,
        pearlType: 'none',
        chameleonColor: NONE,
        pearlColor: NONE,
        tintType: action.payload,
      };
    case 'PAINT_BASE_SELECTED':
      return {
        ...state,
        paintBaseType: action.payload,
      };
    case 'PAINT_COLOR_SELECTED':
      return { ...state, paintColor: action.payload };
    case 'PAINT_TYPE_SELECTED':
      return {
        ...state,
        paintType: action.payload,
      };
    case 'KANDY_COLOR_SELECTED':
      return {
        ...state,
        kandyColor: action.payload,
        paintType: 'kandy',
      };
    case 'HYPERSHIFT_COLOR_SELECTED':
      return {
        ...state,
        hypershiftColor: action.payload,
        paintType: 'hypershift',
      };
    case 'WHEEL_STYLE_SELECTED':
      return { ...state, wheelStyle: action.payload };
    case 'WHEEL_TYPE_SELECTED':
      return { ...state, wheelType: action.payload };
    case 'WHEEL_FINISH_SELECTED':
      return { ...state, wheelFinish: action.payload };

    default:
      return state;
  }
};

const initialState = {
  chameleonColor: '/static/media/none.6b2cabd85bfe9124f6a1.png',
  hypershiftColor: '/static/media/blue_purple.d38c6eaa22fd7970307a.png',
  kandyColor: '/static/media/gold.5ef268a903e50ebdd03a.png',
  paintBaseType: 'solid',
  paintColor: '#ffae00',
  paintReflectionType: 'gloss',
  paintType: 'kandy',
  pearlType: 'none',
  pearlColor: '/static/media/none.6b2cabd85bfe9124f6a1.png',
  paintPreviewType: 'create',
  tintColor: '/static/media/none.6b2cabd85bfe9124f6a1.png',
  tintType: 'none',
  wheelType: 'forged',
  wheelStyle: '/static/media/azioni.c0307b9040a8c7c52084.png',
  wheelFinish: '/static/media/chrome.3bd81bb0f279c5f7e02e.png',
};

const storeBuild = (type = 'DEFAULT_SELECTED') => {
  localStorage.setItem('build', type);
};

export const BuildProvider = ({ children }) => {
  const [state, dispatch] = useReducer(buildReducer, initialState);

  const paintReflectionSelected = (paintReflectionType) => {
    dispatch({
      type: 'PAINT_REFLECTION_SELECTED',
      payload: paintReflectionType,
    });
  };
  const pearlTypeSelected = (pearlType) => {
    dispatch({ type: 'PEARL_TYPE_SELECTED', payload: pearlType });
  };
  const pearlColorSelected = (pearlColor) => {
    dispatch({ type: 'PEARL_COLOR_SELECTED', payload: pearlColor });
  };
  const paintBaseSelected = (paintBase) => {
    dispatch({ type: 'PAINT_BASE_SELECTED', payload: paintBase });
  };
  const paintColorSelected = (paintColor) => {
    dispatch({ type: 'PAINT_COLOR_SELECTED', payload: paintColor });
  };
  const paintTypeSelected = (paintType) => {
    dispatch({ type: 'PAINT_TYPE_SELECTED', payload: paintType });
  };
  const chameleonColorSelected = (chameleonColor) => {
    dispatch({ type: 'CHAMELEON_COLOR_SELECTED', payload: chameleonColor });
  };
  const hypershiftColorSelected = (hypershiftColor) => {
    dispatch({ type: 'HYPERSHIFT_COLOR_SELECTED', payload: hypershiftColor });
  };
  const tintTypeSelected = (tintType) => {
    dispatch({ type: 'TINT_TYPE_SELECTED', payload: tintType });
  };
  const tintColorSelected = (tintColor) => {
    dispatch({ type: 'TINT_COLOR_SELECTED', payload: tintColor });
  };
  const kandyColorSelected = (kandyColor) => {
    dispatch({ type: 'KANDY_COLOR_SELECTED', payload: kandyColor });
  };
  const wheelSelected = (wheelType) => {
    dispatch({ type: 'WHEEL_TYPE_SELECTED', payload: wheelType });
  };
  const wheelStyleSelected = (wheelStyle) => {
    dispatch({ type: 'WHEEL_STYLE_SELECTED', payload: wheelStyle });
  };
  const wheelFinishSelected = (wheelFinish) => {
    dispatch({ type: 'WHEEL_FINISH_SELECTED', payload: wheelFinish });
  };

  // console.log('PaintBuildContext state:', state);

  return (
    <PaintBuildContext.Provider value={{ ...state, dispatch, storeBuild }}>
      {children}
    </PaintBuildContext.Provider>
  );
};
