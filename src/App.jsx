import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import RootPage from "./pages/Root/Root";
import Dashboard from "./pages/Dashboard/Dashboard";
import SettingsPage from "./pages/Settings/Settings";
import ProductsPage from "./pages/products/Products";
import LoginPage from "./pages/Login/Login";
import Categories from "./pages/Categories/Categories";
import CustomersPage from "./pages/Customers/Customers";
import SuppliersPage from "./pages/Suppliers/Suppliers";
import PruchasesPage from "./pages/Purchases/Purchases";
import OrdersPage from "./pages/Orders/Orders";
import BranchesPage from "./pages/Branches/Branches";
import UsersPage from "./pages/Users/Users";
import POSPage from "./pages/POS/POS";
import CustomerPage from "./pages/Customers/Customer";
import CustomerRoot from "./pages/Root/CustomerRoot";
import SuppliersRoot from "./pages/Root/SuppliersRoot";
import SupplierPage from "./pages/Suppliers/Supplier";

const router = createBrowserRouter([
  {path: '/',element: <RootPage />,children: [
    {index: true, element: <Dashboard />},
    {path: 'dashboard', element: <Dashboard />},
    {path: 'settings', element: <SettingsPage />},
    {path: 'products', element: <ProductsPage />},
    {path: 'categories', element: <Categories />},
    {
      path: 'customers', 
      element: <CustomerRoot />,
      children: [
        {index: true, element: <CustomersPage />},
        {path: ':customerId', element: <CustomerPage />}
      ]
    },
    {
      path: 'suppliers', 
      element: <SuppliersRoot />,
      children: [
        {index: true, element: <SuppliersPage />},
        {path: ':supplierId', element: <SupplierPage />}
      ]
    },
    {path: 'purchases', element: <PruchasesPage />},
    {path: 'orders', element: <OrdersPage />},
    {path: 'branches', element: <BranchesPage /> },
    {path: 'employees', element: <UsersPage />},
    {path: 'pos', element: <POSPage />},
  ]},
  {path: 'login',element: <LoginPage />},
  { path: '*', element: <h1>Not Found</h1> }
])

function App() {
  return(
    <>
      <RouterProvider router={router}/>
      <ToastContainer />
    </>
  )
}

export default App;