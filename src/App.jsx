import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/Root/Root";
import Dashboard from "./pages/Dashboard/Dashboard";
import SettingsPage from "./pages/Settings/Settings";

const router = createBrowserRouter([
  {path: '/',element: <RootPage />,children: [
    {index: true,element: <Dashboard />},
    {path: 'setting', element: <SettingsPage />},
  ]}
])

function App() {
  return(
    <RouterProvider router={router}/>
  )
}

export default App;