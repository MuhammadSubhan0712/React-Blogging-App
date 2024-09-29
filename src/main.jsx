
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Layout  from './Layout.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import BlogPost  from './Pages/BlogPost.jsx'
import Profile from './Pages/Profile.jsx'


const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,

  children:[
  {
   path:"",
   element:<Dashboard/>,
  },
  {
    path:"register",
    element:<Register/>,
  },
  {
  path:"login",
  element:<Login/>,
  },
  {
    path:"blogpost",
    element:<BlogPost/>,
  },
  {
    path:"profile",
    element:<Profile/>
  },
  {
    path:"*",
    element:<h2 className='mt-5 p-5 flex justify-center text-red-600 bg-yellow-400'>(!)(!)Not Found(!)(!)</h2>
  }
]
}
])

createRoot(document.getElementById('root')).render(
<RouterProvider router={router}>
  <App />
</RouterProvider>

)
