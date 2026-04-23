import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import RootPage from "./pages/Root/Root";
import Dashboard from "./pages/Dashboard/Dashboard";
import SettingsPage from "./pages/Settings/Settings";
import ProductsPage from "./pages/products/Products";

const router = createBrowserRouter([
  {path: '/',element: <RootPage />,children: [
    {index: true,element: <Dashboard />},
    {path: 'settings', element: <SettingsPage />},
    {path: 'products', element: <ProductsPage />},
  ]}
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