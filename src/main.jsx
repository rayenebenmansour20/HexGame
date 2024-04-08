import React from 'react'
import App from './App'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const RedirectSite = () => {
  window.location.href = "./src/scripts/NewGame.html";
  return <></>;
};


const router = createBrowserRouter([
  {
    path: "/",
    element : <App/>
  },
    {
      path:'/NewGame',
      element:<RedirectSite/>
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
