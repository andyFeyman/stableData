import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer"
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function ChainLayout() {

  const location = useLocation();
  const { currentUser, updateUser } = useContext(AuthContext);
  //console.log(currentUser);

  const loginRedirectPath = `/login?redirect=${encodeURIComponent(location.pathname)}`;

  const handleLogout = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/logout`,
      {},
      { withCredentials: true }
    );
    updateUser(null);
    window.location.reload();
  };

  useEffect(() => {

    const isValid = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_API_URL}/session`,
          { withCredentials: true },
        );
        if (isValid.status === 401) {
          updateUser(null);
        } else {
          console.log("session valid!");
        }
        
      } catch (error) {
        updateUser(null);
        console.log("session invalid!");
      }
    }
    isValid();

  }, [currentUser]);

  return (
    <div className="drawer w-full flex flex-col justify-between min-h-screen bg-base-100">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* <!-- Navbar --> */}
        {/* ADDED: fixed top-0 z-10 */}
        <div className="navbar fixed bg-base-300 w-full fixed top-0 z-10">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
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

              {/* ADDED: dropdown-hover */}
              <div className="dropdown dropdown-bottom text-center dropdown-hover">
                <div tabIndex={0} role="button" className="btn btn-ghost text-xl pt-2 "><h5>Bitcoin Data ↓</h5> </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-58 p-1 shadow-sm ">
                  <li><a className="btn btn-ghost bg-gray-700" href="/btc4years">bitcoin 4 year cycle</a></li>
                  <li><a className="btn btn-ghost bg-gray-700" href="/btcCompare"> Bitcoin vs. Stock Market</a></li>
                </ul>
              </div>


              <li><a href="/chainExplorers" className="btn btn-ghost text-xl"><h5>Chains Explorer</h5> </a></li>
              <li><a href="/stablecoin" className="btn btn-ghost text-xl"><h5>StableCoin Data</h5></a></li>
              <li>
                {currentUser ? (
                  <div className="gap-2">
                    <button> {currentUser.username}</button>|
                    <button onClick={handleLogout}>Logout</button>|
                    <button><a href="/reset">Reset</a> </button>
                  </div>
                ) : (
                  <div>
                    <a href={loginRedirectPath}>Login</a> | <a href="/register">Register</a>
                  </div>
                )}
              </li>


            </ul>
          </div>
        </div>
        {/* Page content here */}
        {/* <Outlet context={{ displayChecked }}/> */}
        {/* ADDED: pt-16 to push content down below the fixed navbar */}
        <div className="container px-4 sm:px-6 lg:px-8 flex-grow pt-1">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* <!-- Sidebar content here --> */}
          {/* ADDED: dropdown-hover (for sidebar dropdown) */}
          <div className="dropdown dropdown-bottom text-center dropdown-hover">
            <div tabIndex={0} role="button" className="btn btn-ghost text-xl pt-2 text-center"><h5>Bitcoin Data ↓</h5> </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-58 p-2 shadow-sm">
              <li><a className="btn btn-ghost bg-gray-700" href="/btc4years">bitcoin 4 year cycle</a></li>
              <li><a className="btn btn-ghost bg-gray-700" href="/btcCompare"> Bitcoin vs. Stock Market</a></li>
            </ul>
          </div>
          <li><a href="/chainExplorers" className="btn btn-ghost text-xl"><h5>Chains Explorer</h5> </a></li>
          <li><a href="/stablecoin" className="btn btn-ghost text-xl"><h5>StableCoin Data</h5></a></li>
          <li>
            {currentUser ? (
              <div >
                <button><p> {currentUser.username}</p></button>|
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div>
                <a href={loginRedirectPath}>Login</a> | <a href="/register">Register</a>
              </div>
            )}
          </li>
        </ul>
      </div>
      <Footer />
    </div>


  );
}


export default ChainLayout;