import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer"
import { useState } from "react";

function ChainLayout() {

  //const [displayChecked, setDisplayChecked] = useState(true);
  //const location = useLocation();

  // 只在 /l2explorer 路由显示切换按钮
  //const isL2ExplorerRoute = location.pathname === "/l2explorer";


  return (
    <div className="drawer w-full flex flex-col justify-between min-h-screen">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label for="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
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
          <div className="mx-2 flex-1 px-2 "><a href="/" role="button" className="btn btn-ghost"><h4>ChainMonitor</h4></a></div>
          <div className="hidden flex-none lg:block ">
            <ul className="menu menu-horizontal p-2">
              {/* <!-- Navbar menu content here --> */}

              <div className="dropdown dropdown-bottom text-center">
                <div tabIndex={0} role="button" className="btn btn-ghost text-xl pt-2 "><h5>Bitcoin Data ↓</h5> </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li><a className="btn btn-ghost bg-gray-700" href="/btc4years">bitcoin 4 year cycle</a></li>
                  <li><a className="btn btn-ghost bg-gray-700" href="/btcCompare"> bitcoin compare</a></li>
                </ul>
              </div>


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
        <label for="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* <!-- Sidebar content here --> */}
          <div className="dropdown dropdown-bottom text-center">
            <div tabIndex={0} role="button" className="btn btn-ghost text-xl pt-2 text-center"><h5>Bitcoin Data ↓</h5> </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li><a className="btn btn-ghost bg-gray-700" href="/btc4years">bitcoin 4 year cycle</a></li>
              <li><a className="btn btn-ghost bg-gray-700" href="/btcstock"> bitcoin stock market</a></li>
            </ul>
          </div>
          <li><a href="/chainExplorers" className="btn btn-ghost text-xl"><h5>Chains Explorer</h5> </a></li>
          <li><a href="/stablecoin" className="btn btn-ghost text-xl"><h5>StableCoin Data</h5></a></li>
        </ul>
      </div>
      <Footer />
    </div>
    
  );
}


export default ChainLayout;