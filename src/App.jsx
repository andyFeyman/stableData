import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import L2DataPage from './pages/L2DataPage';
import ChainLayout from './pages/ChainLayout';
import HomePage from './pages/HomePage';
import {l1AndL2Loader,stableLoader,latestKeyDataLoader} from "./lib/loaders"
import StableCoinPage from './pages/StablecoinPage';
import NotFoundPage from './pages/404page';
import Btc4Years from './pages/Btc4Years';
import BtcComparePage from './pages/BtcCompare';
import Register from './pages/Register';
import Login from './pages/Login';
import Reset from './components/Reset';

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
          path:"/chainExplorers",
          element:<L2DataPage />,
          loader:l1AndL2Loader,
        },
        {
          path:"/stablecoin",
          element:<StableCoinPage />,
          loader:stableLoader,
        },
        {
          path:"/btc4years",
          element:<Btc4Years />,
          
        },
        {
          path:"/btcCompare",
          element:<BtcComparePage />,
          loader:latestKeyDataLoader,
        },
        {
          path:"*",
          element:<NotFoundPage />,
        },
        {
          path:"/register",
          element:<Register />
        },
        {
          path:"/login",
          element:<Login />
        },
        {
          path:"/reset",
          element:<Reset />
        }
      ],
    }

  ]);

  return (
    <RouterProvider router={router}/>
  );
}
