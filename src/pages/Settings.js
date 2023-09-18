import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import Toggle from '../components/Toggle';

import './Settings.css';

export default function Settings() {
  const { dispatch, color1, background, backgroundActive, storeTheme } =
    useTheme();

  return (
    <div
      className="themeSelector"
      style={{ background: background, border: `${color1} solid 2px` }}
    >
      <h1 className="settingsTitle">Settings</h1>

      <h4 className="themeTitle">Current Theme</h4>
      <div className="themeIcon">
        <div
          className="themeIconA"
          style={{
            borderRadius: '0',
            background: backgroundActive,
            border: `${color1} solid 2px`,
          }}
        >
          <div
            className="themeIconB"
            style={{ borderRadius: '0', background: color1 }}
          ></div>
          <div
            className="themeIconC"
            style={{ borderRadius: '0', background: color1 }}
          ></div>
        </div>
      </div>

      <h4 className="themeTitle">Change Color</h4>
      <ul>
        <li>
          <NavLink
            onClick={() => {
              dispatch({ type: 'DEFAULT_THEME' });
              storeTheme('DEFAULT_THEME');
            }}
            style={{ background: 'lightslategrey' }}
          />
        </li>
        <li>
          <NavLink
            onClick={() => {
              dispatch({
                type: 'APPLE_THEME',
              });
              storeTheme('APPLE_THEME');
            }}
            style={{ background: 'red' }}
          />
        </li>
        <li>
          <NavLink
            onClick={() => {
              dispatch({
                type: 'SUNSET_THEME',
              });
              storeTheme('SUNSET_THEME');
            }}
            style={{ background: '#d98414' }}
          />
        </li>
        <li>
          <NavLink
            onClick={() => {
              dispatch({
                type: 'JADE_THEME',
              });
              storeTheme('JADE_THEME');
            }}
            style={{ background: 'limegreen' }}
          />
        </li>
        <li>
          <NavLink
            onClick={() => {
              dispatch({
                type: 'DAYTONA_THEME',
              });
              storeTheme('DAYTONA_THEME');
            }}
            style={{ background: '#1c50ed' }}
          />
        </li>
        <li>
          <NavLink
            onClick={() => {
              dispatch({
                type: 'PLUM_THEME',
              });
              storeTheme('PLUM_THEME');
            }}
            style={{ background: '#bd26e3' }}
          />
        </li>
      </ul>

      <h4 className="themeTitle">Change Mode</h4>
      <Toggle />
    </div>
  );
}
