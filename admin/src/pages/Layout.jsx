import { MobileSidebar } from '../components/MobileSidebar';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar'
import { Outlet } from 'react-router-dom';

const Layout = () => {

    return (
        <div>
            <Navbar className="sticky top-0 z-10 md:hidden block" />
            <MobileSidebar/>
            <div className="flex min-h-screen bg-gray-100">

                <Sidebar />
                <div className=" w-[100%]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;