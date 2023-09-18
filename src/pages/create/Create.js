import React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import Button from '../../components/Button';

import './Create.css';

const Create = () => {
  const { color1, color2, background, textColor } = useTheme();

  const [type, setType] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [style, setStyle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(type, make, year, model, style);
  };

  useEffect(() => {
    // reset fields
  }, []);

  return (
    <div>
      <h1 style={{ color: color1 }}>Create Project</h1>
      <small className="subtext" style={{ color: textColor }}>
        What type of project are we working on?
      </small>
      <form className="create-form" onSubmit={handleSubmit}>
        <label>
          <span style={{ color: color1 }}>Vehicle type</span>
          <select
            type="select"
            value={type}
            className="noSelect"
            style={{
              background: background,
              color: textColor,
              border: `${color1} solid 2px`,
            }}
            onChange={({ target }) => setType(target.value)}
          >
            <option></option>
            <option>Car</option>
            <option>Truck</option>
          </select>
        </label>

        {type && (
          <label>
            <span style={{ color: color1 }}>Make</span>
            <select
              value={make}
              type="select"
              className="noSelect"
              style={{
                background: background,
                color: textColor,
                border: `${color1} solid 2px`,
              }}
              onChange={({ target }) => setMake(target.value)}
            >
              <option></option>
              <option>Chevy</option>
              <option>Dodge</option>
              <option>Ford</option>
              <option>Buick</option>
            </select>
          </label>
        )}
        {make && (
          <label>
            <span style={{ color: color1 }}>Year</span>
            <select
              value={year}
              type="select"
              className="noSelect"
              style={{
                background: background,
                color: textColor,
                border: `${color1} solid 2px`,
              }}
              onChange={({ target }) => setYear(target.value)}
            >
              <option></option>
              <option>50s</option>
              <option>60s</option>
              <option>70s</option>
              <option>80s</option>
            </select>
          </label>
        )}
        {year && (
          <label>
            <span style={{ color: color1 }}>Model</span>
            <select
              value={model}
              type="select"
              className="noSelect"
              style={{
                background: background,
                color: textColor,
                border: `${color1} solid 2px`,
              }}
              onChange={({ target }) => setModel(target.value)}
            >
              <option></option>
              <option>Chevelle</option>
              <option>Caprice</option>
              <option>Cutlass</option>
              <option>Camaro</option>
            </select>
          </label>
        )}
        {model && (
          <label>
            <span style={{ color: color1 }}>Style</span>
            <select
              type="select"
              value={style}
              className="noSelect"
              style={{
                background: background,
                color: textColor,
                border: `${color1} solid 2px`,
              }}
              onChange={({ target }) => setStyle(target.value)}
            >
              <option></option>
              <option>Coupe</option>
              <option>Sedan</option>
              <option>Convertable</option>
              <option>Quad Cab</option>
              <option>Longbed</option>
              <option>Dually</option>
            </select>
          </label>
        )}
        <Button title={'Create'} style={{ color: color1 }} />
      </form>
    </div>
  );
};

export default Create;
