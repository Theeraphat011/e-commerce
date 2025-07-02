import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { UserCog, UserCheck, UserPen } from "lucide-react";

const menuLink = [
   { path: "/", name: "home" },
   { path: "/shop", name: "shop" },
   { path: "/cart", name: "cart" },
   { path: "/about", name: "about" },
   { path: "/services", name: "services" },
   { path: "/help", name: "help" },
];

const authLink = [
   { path: "/register", name: "register", logo: UserPen },
   { path: "/login", name: "login", logo: UserCheck },
   { path: "/admin/dashboard", name: "admin", logo: UserCog },
];

const MainNav = () => {
   return (
      <nav className="fixed w-full bg-gray-100 text-gray-700 shadow-xs border-b-1 border-gray-200 text-sm">
         <div className="container mx-auto py-1 px-8">
            <div className="flex justify-between h-16 items-center uppercase font-semibold">
               <Link
                  to={"/"}
                  className="font-bold text-2xl hover:text-green-600 transition duration-300"
               >
                  <img src={logo} alt="logo" width={100} />
               </Link>

               <div className="flex gap-10 ml-50">
                  {menuLink.map((link, index) => (
                     <Link
                        to={link.path}
                        className="hover:text-green-600 transition duration-300"
                        key={index}
                     >
                        {link.name}
                     </Link>
                  ))}
               </div>

               <div className="flex gap-2 items-center">
                  {authLink.map((link, index) => {
                     const Icon = link.logo;
                     return (
                        <Link
                           to={link.path}
                           className="hover:text-green-600 transition duration-300 p-2"
                           key={index}
                        >
                           <span className="flex gap-2">
                              <Icon size={20}/>
                              {link.name}
                           </span>
                        </Link>
                     );
                  })}
               </div>
            </div>
         </div>
      </nav>
   );
};

export default MainNav;
