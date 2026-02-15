import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../Sidebar';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#262626] text-[#E2E8CE] font-sans">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <div 
        className={`flex-1 transition-all duration-300 p-4 sm:p-8 ${
          isSidebarOpen ? 'sm:ml-72' : 'sm:ml-20'
        }`}
      >
        <div className="mt-16 sm:mt-4">
             <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
