import { useState, useEffect } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
// Routes
import Settings from './pages/Settings';
import Help from './pages/Help';
import Dashboard from './pages/dashboard/Dashboard.js';
import Login from './pages/login/Login.js';
import Signup from './pages/signup/Signup.js';
import Create from './pages/create/Create.js';
import Project from './pages/project/Project.js';
import ProjectBuild from './pages/projectbuild/ProjectBuild';
import Paint from './pages/projectbuild/Paint/Paint.js';
import FactoryPaint from './pages/projectbuild/Paint/FactoryPaint.js';
import CustomMix from './pages/projectbuild/Paint/CustomMix.js';
import Wheels from './pages/projectbuild/Wheels.js';
import Trim from './pages/projectbuild/Trim.js';
import Misc from './pages/projectbuild/Misc.js';
import Interior from './pages/projectbuild/Interior.js';
import Enginebay from './pages/projectbuild/Enginebay.js';

//layouts
import RootLayout from './layouts/RootLayout';
import BuildLayout from './layouts/BuildLayout.js';
import PaintLayout from './layouts/PaintLayout';

export default function App() {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (localStorage.getItem('current_project')) {
      const project = localStorage.getItem('current_project');
      const active_project = JSON.parse(project);
      setActiveId(active_project.details.id);
    } else {
      setActiveId('id');
    }
  }, []);

  const { user } = useAuthContext();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route index element={user ? <Dashboard /> : <Login />}></Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Dashboard />}
        ></Route>
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Dashboard />}
        ></Route>

        <Route path="/create" element={user ? <Create /> : <Login />}></Route>
        <Route
          path="/settings"
          element={user ? <Settings /> : <Login />}
        ></Route>
        <Route path="/help" element={user ? <Help /> : <Login />}></Route>

        <Route path="/project/" element={user ? <Project /> : <Login />}>
          <Route path=":id" element={user ? <Project /> : <Login />}></Route>
        </Route>

        <Route
          path="/projectbuild/"
          element={user ? <BuildLayout /> : <Login />}
        >
          <Route path=":id" element={user ? <ProjectBuild /> : <Login />} />

          <Route
            path={`:${activeId ? activeId : 'id'}/paint/`}
            element={user ? <PaintLayout /> : <Login />}
          >
            <Route
              path="factorypaint"
              element={user ? <FactoryPaint /> : <Login />}
            />
            <Route
              path="custommix"
              element={user ? <CustomMix /> : <Login />}
            />
          </Route>
          <Route
            path={`:${activeId ? activeId : 'id'}/wheels/`}
            element={user ? <Wheels /> : <Login />}
          />
          <Route path="trim" element={user ? <Trim /> : <Login />} />
          <Route path="misc" element={user ? <Misc /> : <Login />} />
          <Route path="interior" element={user ? <Interior /> : <Login />} />
          <Route path="enginebay" element={user ? <Enginebay /> : <Login />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
