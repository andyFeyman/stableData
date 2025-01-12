import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import L2CardsList from './components/L2CardsList';
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
          element:<L2CardsList />,
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
