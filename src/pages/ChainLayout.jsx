import { Outlet,useLocation } from "react-router-dom";
import Footer from "../components/Footer"
import { useState } from "react";

function ChainLayout() {

  //const [displayChecked, setDisplayChecked] = useState(true);
  //const location = useLocation();

  // 只在 /l2explorer 路由显示切换按钮
  //const isL2ExplorerRoute = location.pathname === "/l2explorer";

  
  return (
    <div className="w-full flex flex-col justify-between min-h-screen ">
      <div className="drawer ">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2"><a href="/" role="button" className="btn btn-ghost"><h4>ChainMonitor</h4></a></div>
            <div className="">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li><a href="/chainExplorers" className="btn btn-ghost text-xl"><h5>Chains Explorer</h5> </a></li>
                <li><a href="/stablecoin" className="btn btn-ghost text-xl"><h5>StableCoin Data</h5></a></li>
              </ul>
            </div>
          </div>
          {/* Page content here */}
          {/* <Outlet context={{ displayChecked }}/> */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
            <Outlet />
          </div>    
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 min-h-full w-60 p-6">
            {/* Sidebar content here */}
            <li><a href="/l2explorer" className="btn btn-ghost text-xl">L2 Explorer</a></li>
            <li><a href="/stablecoin" className="btn btn-ghost text-xl">StableCoin ATH</a></li>
          </ul>
        </div>
      </div>
      {/* {isL2ExplorerRoute && ( // 只在 /l2explorer 路由显示切换按钮
        <div className="flex justify-end mx-4">
          Change Display
          <input
            type="checkbox"
            className="toggle"
            onClick={() => setDisplayChecked(!displayChecked)}
            defaultChecked={displayChecked}
          />
        </div>
      )} */}
      <Footer />  
    </div>
  );
}


export default ChainLayout;