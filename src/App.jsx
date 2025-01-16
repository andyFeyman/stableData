import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import L2DataPage from './pages/L2DataPage';
import ChainLayout from './pages/ChainLayout';
import HomePage from "./components/HomePage"
import { l2DataLoader,stableLoader } from './lib/loaders';
import StableCoinPage from './pages/StablecoinPage';




export default function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<ChainLayout />,
      children:[
        {
          path:"/",
          element:<HomePage />,
        },
        {
          path:"/l2explorer",
          element:<L2DataPage />,
          loader:l2DataLoader,
        },
        {
          path:"/stablecoin",
          element:<StableCoinPage />,
          loader:stableLoader,
        },
      ]
    }

  ]);

  return (
    <RouterProvider router={router}/>
  );
}
