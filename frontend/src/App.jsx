import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "./App.css";
const App = () => {
   return (
      <>
         <ToastContainer />
         <AppRoutes />
      </>
   );
};
export default App;
