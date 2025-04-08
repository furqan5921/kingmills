import { FaBars, FaTimes } from "react-icons/fa";
import { useSidebar } from "../contextAPI/sidebarContext";

export const Navbar = () => {
    const { mobileSidebarOpen, toggleMobileSidebar } = useSidebar();
    // console.log("Navbar mobileSidebarOpen:", mobileSidebarOpen);
  
    return (
      <div className="w-full h-[10vh] bg-slate-600 flex items-center justify-between px-4 md:hidden">
        <h1 className="text-2xl font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
          Ecommerce
        </h1>
        {mobileSidebarOpen ? (
          <FaTimes
            className="text-3xl text-white cursor-pointer hover:text-blue-500 transition-colors duration-200"
            onClick={toggleMobileSidebar}
          />
        ) : (
          <FaBars
            className="text-3xl text-white cursor-pointer hover:text-blue-500 transition-colors duration-200"
            onClick={toggleMobileSidebar}
          />
        )}
      </div>
    );
  };
  