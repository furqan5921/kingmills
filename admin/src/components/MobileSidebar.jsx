import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { useSidebar } from "../contextAPI/sidebarContext";

export const MobileSidebar = () => {
  const { mobileSidebarOpen, toggleMobileSidebar } = useSidebar();
  const user = sessionStorage.getItem("username");
  const navigate = useNavigate();

  const navItems = [
    { title: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { title: "Manage Bets", path: "/admin/manage-bets", icon: <FaBox /> },
    { title: "Random Numbers", path: "/admin/random-numbers", icon: <FaUsers /> },
    { title: "Referal Id", path: "/admin/raferalId", icon: <FaUsers /> },
  ];

  const logout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  console.log("MobileSidebar State:", mobileSidebarOpen);

  return (
    <>
      {/* Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileSidebar} // Close sidebar on overlay click
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed w-full inset-y-0 left-0 bg-black text-white  transform-gpu transition-transform duration-300 ease-in-out z-50 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-5">
          <h1 className="text-2xl font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
            {/* <div className="text-lg font-semibold px-4 mb-6"> */}
          {/* <p> */}
            Welcome, <span className="text-blue-300">{user}</span>
          {/* </p> */}
        {/* </div> */}
          </h1>
          <button
            onClick={toggleMobileSidebar}
            className="text-3xl font-bold text-white hover:text-red-500 transition duration-200"
          >
            ×
          </button>
        </div>

       

        <ul className="space-y-5 px-4 mt-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center p-2 gap-3 rounded-md ${
                    isActive
                      ? "bg-[lightskyblue] text-black"
                      : "hover:bg-[lightskyblue]"
                  } transition-all duration-300`
                }
                onClick={toggleMobileSidebar} // Close sidebar on navigation
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}

          <li className="mt-6">
            <button
              className="w-full flex items-center bg-red-600 p-2 rounded-md text-white hover:bg-red-700 transition duration-200"
              onClick={logout}
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
