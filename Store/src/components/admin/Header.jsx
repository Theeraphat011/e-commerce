import { Search, Bell, MessageCircle } from "lucide-react";


const Header = () => {
   return (
      <div className="bg-gray-100 text-gray-700 h-20 flex items-center justify-between px-5 pl-25 sm:pl-5 md:ml-64 sm:ml-19">
         <h1 className="text-2xl font-bold sm:text-2xl cursor-pointer">KK-Electronic</h1>
         <div className="flex items-center relative sm:w-1/2 text-gray-500">
            <input
               type="text"
               className="bg-white w-full py-2 px-4 focus:outline-0 rounded-xs"
               placeholder="Search"
            />
            <Search className="absolute right-2" size={20} />
         </div>
         <div className="flex gap-4 ">
            <div className="bg-white p-2 cursor-pointer">
               <Bell />
            </div>
            <div className="bg-white p-2 cursor-pointer">
               <MessageCircle />
            </div>
         </div>
      </div>
   );
};

export default Header;
