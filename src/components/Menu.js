import './Menu.css';
import { useTheme } from '../hooks/useTheme';
import { usePaintBuild } from '../hooks/usePaintBuild';

export default function Menu({ item, title, clicked, error }) {
  const { background, backgroundMain } = useTheme();
  const { dispatch, tintType } = usePaintBuild();

  const handleSelected = (clickedItem) => {
    clicked = clickedItem;
    console.log('clicked:', clicked);
    if (title.includes('kandy')) {
      dispatch({ type: 'KANDY_COLOR_SELECTED', payload: clicked });
    }
    if (title.includes('hyper')) {
      dispatch({ type: 'HYPERSHIFT_COLOR_SELECTED', payload: clicked });
    }
    if (title.toLowerCase().includes('pearl')) {
      dispatch({ type: 'PEARL_COLOR_SELECTED', payload: clicked });
    }
    if (title.toLowerCase().includes('tint')) {
      console.log('tint color selected:', clicked);
      dispatch({ type: 'TINT_COLOR_SELECTED', payload: clicked });
    }
    if (title.toLowerCase().includes('chameleon')) {
      dispatch({ type: 'CHAMELEON_COLOR_SELECTED', payload: clicked });
    }
    if (title.toLowerCase() === 'wheel style') {
      dispatch({ type: 'WHEEL_STYLE_SELECTED', payload: clicked });
    }
  };

  return (
    <div className="item-container">
      <h4>{title}</h4>
      {error && <p>error</p>}
      <div className="swatch-container">
        {item.map((option, i) => (
          <div
            key={option + i}
            onClick={() => handleSelected(option)}
            className="swatchBg"
            style={{
              background: backgroundMain,
              border: `${background} 2px solid`,
            }}
          >
            <img className="swatch" src={option} />
          </div>
        ))}
      </div>
    </div>
  );
}
