import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import About from '../pages/About'
import History from '../pages/History'
import Checkout from '../pages/Checkout'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Layout from '../layouts/Layouts'
import LayoutAdmin from '../layouts/LayoutAdmin'
import Dashboard from '../pages/admin/Dashboard'
import Category from '../pages/admin/Category'
import Product from '../pages/admin/Product'
import Manage from '../pages/admin/Manage'
import LayoutUser from '../layouts/LayoutUser'
import HomeUser from '../pages/user/HomeUser'
import ProtectUser from './ProtectUser'
import ProtectAdmin from './ProtectAdmin'
import EditProduct from "../pages/admin/EditProduct"
import Order from "../pages/admin/Order"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "about", element: <About /> },
      { path: "history", element: <History /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ]
  },

  {
    path: "/admin",
    element: <ProtectAdmin element={<LayoutAdmin />} />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'category', element: <Category /> },
      { path: 'product', element: <Product /> },
      { path: 'product/:id', element: <EditProduct /> },
      { path: 'manage', element: <Manage /> },
      { path: 'Order', element: <Order /> },
    ]
  },

  {
    path: "/user",
    // element: <LayoutUser />,
    element: <ProtectUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser /> }
    ]
  }
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default AppRoutes    // Render a div with text "AppRoute"

