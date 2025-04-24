import { NavLink } from "react-router-dom";
import {
   House,
   FolderKanban,
   PackageSearch,
   ShoppingBag,
   LogOut,
   ChevronRight,
   ChartPie,
   ChartBarDecreasing, 
   BadgeDollarSign,
   UserCheck,
   Router,
   Settings,
} from "lucide-react";

import logo from "../../assets/images/logo.png";

const SidebarPages = [
   { path: "dashboard", name: "Dashboard", logo: House },
   { path: "manage", name: "manage", logo: FolderKanban  },
   { path: "Category", name: "Category", logo: ChartBarDecreasing  },
   { path: "Product", name: "Products", logo: PackageSearch },
   { path: "Order", name: "Order", logo: ShoppingBag },
   { path: "Analytics", name: "Analytics", logo: ChartPie  },
   { path: "Sales", name: "Sales", logo: BadgeDollarSign  },
   { path: "Customer", name: "Customer", logo: UserCheck  },
   { path: "Services", name: "Services", logo: Router  },
   { path: "Setting", name: "Setting", logo: Settings  },
];

const Sidebar = () => {
   return (
      <div className="bg-gray-100 w-19 flex flex-col min-h-screen fixed top-0 left-0 overflow-y-auto border-r-1 md:w-64 border-gray-300">
         <div className="h-20 flex items-center justify-center border-b-1 border-gray-300">
          <NavLink
          to={'/'}> 
            <img src={logo} alt="logo" width={100} />
          </NavLink>
         </div>

         <div className="flex-1 overflow-y-auto">
            {SidebarPages.map((page, index) => {
               const Icon = page.logo;
               return (
                  <NavLink
                     to={page.path}
                     key={index}
                     className={({ isActive }) => {
                      const baseClasses =
                         "text-gray-800 p-2 flex items-center justify-between m-4 rounded-md gap-2 transition duration-300 ease-in-out";
                      const activeClasses =
                         "bg-green-300 shadow-md font-semibold";
                      const finalClasses = isActive ? `${baseClasses} ${activeClasses}` : baseClasses;
          
                      return finalClasses;
                   }}
                >
                   {({ isActive }) => (
                      <>
                         <div className="flex gap-2 items-center">
                            <Icon />
                            <span className="hidden md:block">{page.name}</span>
                         </div>
                         <ChevronRight
                            className={`transition-transform duration-300 ${isActive ? "text-green-600" : "text-gray-400 rotate-90"}`}
                         />
                      </>
                   )}
                  </NavLink>
               );
            })}

            <div className="mb-4">
               <NavLink
                  className={({ isActive }) =>
                     isActive
                        ? "bg-green-300 text-gray-800 p-2 flex items-center m-4 rounded-md gap-2 shadow-md"
                        : "text-gray-800 p-2 hover:bg-green-300 flex items-center rounded-md m-4 gap-2 transition duration-300 ease-in-out"
                  }
               >
                  <LogOut />
                  <span className="hidden md:block">Logout</span>
               </NavLink>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
