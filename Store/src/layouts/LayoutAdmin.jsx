import { Outlet } from "react-router-dom";
import Header from "../components/admin/Header";
import Sidebar from "../components/admin/Sidebar";

const LayoutAdmin = () => {
   return (
      <>
         <div className="flex flex-1 h-screen overflow-x-hidden bg-gray-100 ">
            <Sidebar />
            <hr />
            <div className="flex-1">
               <Header/>
               <main className="flex justify-center w-full pl-68 overflow-y-hidden h-[88vh]">
                  <Outlet />
               </main>
            </div>
         </div>
      </>
   );
};
export default LayoutAdmin;
