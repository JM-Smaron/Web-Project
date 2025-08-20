// src/pages/admin/AdminLayout.jsx

import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, List, ChefHat } from 'lucide-react';

const AdminLayout = () => {
  const linkClasses = "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50";
  const activeLinkClasses = "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar Navigation */}
      <div className="hidden border-r bg-gray-100/40 md:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/admin" className="flex items-center gap-2 font-semibold">
              <ChefHat className="h-6 w-6 text-orange-500" />
              <span className="">FlavourScape Admin</span>
            </a>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink
                to="/admin/add-food"
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
              >
                <PlusCircle className="h-4 w-4" />
                Add New Food
              </NavLink>
              <NavLink
                to="/admin/manage-foods"
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
              >
                <List className="h-4 w-4" />
                Manage Foods
              </NavLink>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col">
        <main className="flex-1 bg-gray-50 dark:bg-transparent">
            {/* The Outlet component renders the matched child route component */}
            <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;