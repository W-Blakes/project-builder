import { useTheme } from '../hooks/useTheme';
import { Link, useNavigation } from 'react-router-dom';

const Button = ({ handle, e, title, link, linkTitle }) => {
  const { color1, color2, textColor, background, backgroundActive } =
    useTheme();
  const navigate = useNavigation();

  return (
    <button
      onClick={handle}
      style={{
        border: `${color1} solid 2px `,
        color: backgroundActive,
        background: color1,
      }}
      className="btn"
      onMouseEnter={(e) => {
        e.target.style.border = ` ${color1} 2px solid`;
        e.target.style.color = color1;
        e.target.style.background = '#fff';
      }}
      onMouseLeave={(e) => {
        e.target.style.border = ` ${color1} 2px solid`;
        e.target.style.color = backgroundActive;
        e.target.style.background = color1;
      }}
    >
      {link && <Link to={`${link}`}>{linkTitle}</Link>}
      {title}
    </button>
  );
};

export default Button;
