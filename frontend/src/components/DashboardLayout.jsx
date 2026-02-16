import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../Sidebar';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#F0F9FF] text-[#1E3A8A] font-sans">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <div 
        className={`flex-1 transition-all duration-300 p-4 pt-[90px] sm:p-8 sm:pt-8 ${
          isSidebarOpen ? 'sm:ml-72' : 'sm:ml-20'
        }`}
      >
        <div className="mt-0">
             <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
