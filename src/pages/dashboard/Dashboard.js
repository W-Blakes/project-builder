import { useTheme } from '../../hooks/useTheme';
import './Dashboard.css';

import ProjectList from '../../components/ProjectList.js';

export default function Dashboard() {
  const { color1, textColor } = useTheme();

  return (
    <div className="dashboard">
      <h1 style={{ color: color1, height: '40px' }}>Recent Projects</h1>
      <small style={{ color: textColor }} className="subtext">
        Click an image below to view or continue editing your build
      </small>
      <ProjectList />
    </div>
  );
}
