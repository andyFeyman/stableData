import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Layout from "./pages/Layout";
import DashboardPage from './pages/DashboardPage';
import BoxPratice from './pages/BoxPratice';
import FlowPage from './pages/FlowPage';
import DashboardLayoutBasic from './pages/ToolPad';
import ChainLayout from './pages/ChainLayout';
import L2CardsList from './components/L2CardsList';
import { l2DataLoader,stableLoader } from './lib/loaders';
import StableCoinPage from './pages/StablecoinPage';
import TinyPage from './pages/TinyPage';

export default function App() {

  const router = createBrowserRouter([
    // {
    //   path:"/",
    //   element:<Layout />,
    //   children:[
    //     {
    //       path:"/dashboard",
    //       element:<DashboardPage/>
    //     },
    //     {
    //       path:"/box",
    //       element:<BoxPratice />
    //     },
    //     {
    //       path:"/flow",
    //       element:<FlowPage/>
    //     },

    //   ]
    // },
    // {
    //   path:"/toolPad",
    //   element:<DashboardLayoutBasic />
    // },
    {
      path:"/",
      element:<ChainLayout />,
      children:[
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
    },
    // {
    //   path:"/tiny",
    //   element:<TinyPage />
    // },

  ]);

  return (
    <RouterProvider router={router}/>
  );
}
