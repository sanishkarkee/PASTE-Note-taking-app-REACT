import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <NavBar />
        <Home />
      </div>
    ),
  },
  {
    path: '/pastes',
    element: (
      <div>
        <NavBar />
        <Paste />
      </div>
    ),
  },
  {
    path: '/pastes/:id',
    element: (
      <div>
        <NavBar />
        <ViewPaste />
      </div>
    ),
  },
  // for SHARE button
  {
    path: '/view/:id',
    element: (
      <div>
        <ViewPaste />
      </div>
    ),
  },
]);

function App() {
  return (
    <>
      <div className='w-[50rem]'>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
