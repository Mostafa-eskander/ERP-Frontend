import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/Root";
import Dashboard from "./pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  {path: '/',element: <RootPage />,children: [
    {index: true,element: <Dashboard />},
  ]}
])

function App() {
  return(
    <RouterProvider router={router}/>
  )
}

export default App;