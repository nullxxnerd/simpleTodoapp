import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Register from './Register.tsx'
import Login from './login.tsx'
import BlogPost from './blog.tsx'
import Todos from './todos.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:"/sign",
    element:<Register/>,
  },
  {
    path:"/login",
    element:<Login/>
  },  
  {
    path:"/blog",
    element:<BlogPost/>
  },
  {
    path:"/todos",
    element:<Todos/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
