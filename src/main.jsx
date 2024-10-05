import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import BlogPost from "./Pages/BlogPost.jsx";
import Profile from "./Pages/Profile.jsx";
import SingleUser from "./Pages/SingleUser.jsx";
import SingleUserBlogs from "./Pages/SingleUserBlogs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "blogpost",
        element: <BlogPost />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "singleuser/:userId",
        element: <SingleUser />,
      },
      {
        path:"singleuserblogs/:userId",
        element:<SingleUserBlogs/>
      },
      {
        path: "*",
        element: (
          <strong>
            <h2 className="mt-5 p-5 text-2xl flex justify-center text-red-600 bg-yellow-400">
              404 | Not Found
            </h2>
          </strong>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
