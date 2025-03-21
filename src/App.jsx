import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import L2DataPage from './pages/L2DataPage';
import ChainLayout from './pages/ChainLayout';
import HomePage from "./components/HomePage"
import {l1AndL2Loader,stableLoader} from "./lib/loaders"
import StableCoinPage from './pages/StablecoinPage';
import NotFoundPage from './pages/404page';
import Btc4Years from './pages/Btc4Years';

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
          element:<Btc4Years />
        },
        {
          path:"/btc4years",
          element:<Btc4Years />
        },
        {
          path:"*",
          element:<NotFoundPage />,
        }
      ]
    }

  ]);

  return (
    <RouterProvider router={router}/>
  );
}
