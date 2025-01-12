import { Outlet } from "react-router-dom";
import Footer from "../components/Footer"

function ChainLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
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
            <div className="mx-2 flex-1 px-2"><a href="/" role="button" className="btn btn-ghost text-xl">Crypto Smithy</a></div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li><a href="/l2explorer" className="btn btn-ghost text-xl">Explorer </a></li>
                <li><a href="/stablecoin" className="btn btn-ghost text-xl">StableCoin ATH</a></li>
              </ul>
            </div>
          </div>
          {/* Page content here */}
          <Outlet/>
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
      <Footer />
    </div>
  );
}


export default ChainLayout;