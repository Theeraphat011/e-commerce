import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

const Layouts = () => {
   return (
      <>
         <main className="bg-gray-100 overflow-x-hidden h-screen">
            <MainNav />
            <div className="flex justify-center items-center py-20 h-full">
               <Outlet />
            </div>
         </main>
      </>
   );
};
export default Layouts;
