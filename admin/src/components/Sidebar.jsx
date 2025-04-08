import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaUsers, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useSidebar } from "../contextAPI/sidebarContext";
export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar(); 
  const user = JSON.parse( localStorage.getItem("admin"));
  const navigate = useNavigate();
  console.log(user)

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

  return (
    <div
      className={`bg-black text-white h-screen ${isSidebarOpen ? "w-1/5" : "w-20"} transition-all duration-300 overflow-y-auto px-2 custom-scrollbar relative hidden md:block`}
    >
      <div
        className={`bg-black text-white flex items-center h-auto w-full sticky top-0 py-5 mt-3 ${isSidebarOpen ? "justify-between" : "justify-center"}`}
      >
        {isSidebarOpen && (
          <h1 className="text-3xl font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 rounded-md p-1 ">
           KingMall
          </h1>
        )}
        <FaBars
          className="text-3xl cursor-pointer hover:text-blue-500 transition-colors duration-200"
          onClick={toggleSidebar} 
        />
      </div>

      {isSidebarOpen && (
        <div className="text-lg font-semibold mb-8">
          <p>
            Welcome, <span className="text-blue-300">{user.username.username}</span>
          </p>
        </div>
      )}

      <ul>
        {navItems.map((item) => (
          <li key={item.path} className="mb-4">
            <NavLink
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center  text-base text-white p-2 gap-3 transition-all duration-300 ${
                  isActive ? "bg-[lightskyblue] text-black" : "hover:bg-[lightskyblue]"
                }
                ${isSidebarOpen ? "justify-start" : "justify-center"}
                no-underline`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && <span>{item.title}</span>}
            </NavLink>
          </li>
        ))}

        <li className="mt-8">
          <button
            className={`w-fit flex items-center ${isSidebarOpen ? "justify-start" : "justify-center mx-auto"} bg-red-600 p-2 rounded-md text-white hover:bg-red-700`
        
        }
            onClick={logout} 
          >
            <FaSignOutAlt className="mr-2" />
            {isSidebarOpen && "Logout"}
          </button>
        </li>
      </ul>
    </div>
  );
};
