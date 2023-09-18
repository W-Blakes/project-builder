import Sidebar from '../components/Sidebar';
import SidebarMini from '../components/SidebarMini';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuthContext } from '../hooks/useAuthContext';
import BackgroundMotion from '../components/BackgroundMotion';
//styles
import '../App.css';
import { useState, useEffect } from 'react';

export default function RootLayout() {
  const { textColor, backgroundMain, title: scrollColor } = useTheme();
  const { user } = useAuthContext();
  const { dispatch } = useTheme();
  const theme = localStorage.getItem('appTheme');
  const mode = localStorage.getItem('appMode');

  const [windowSize, setWindowSize] = useState([window.innerWidth]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  //Add Themes
  useEffect(() => {
    dispatch({ type: `${theme}` });
    dispatch({ type: `${mode}` });
    // return () => {
    //   cleanup
    // };
  }, []);

  const sidebar = () => {
    return windowSize >= 1240 ? <Sidebar /> : <SidebarMini />;
  };

  return (
    <div
      className={`app ${scrollColor}`}
      style={{ background: backgroundMain, color: textColor }}
    >
      {user && sidebar()}
      {/* {user && <SidebarMini />} */}
      {user && <BackgroundMotion />}
      <div className="app-container ">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
