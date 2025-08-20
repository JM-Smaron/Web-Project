import { createBrowserRouter } from "react-router-dom";

// Main Layout and Public Pages
import MainLayout from "../layouts/MainLayout";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllFoods from "../pages/AllFoods";
import SingleFoodPage from "../pages/SingleFoodPage";
import Gallery from "../pages/Gallery";
import Chat from "../pages/Chatbot";
import NotFound from "../pages/404Page";

// User-Specific Private Pages
import PrivateRoute from "./PrivateRoute";
import Purchase from "../pages/Purchase";
import MyOrders from "../pages/MyOrders";
import MyFoods from "../pages/MyFoods";

// --- Admin Dashboard Pages ---
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AddFood from "../pages/admin/AddFood"; // Assuming you moved AddFood here
import ManageFoods from "../pages/admin/ManageFoods";


export const router = createBrowserRouter([
  // ## 1. Main Application Routes ##
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />, // A good practice to have an error element at the layout level
    children: [
      {
        index: true, // Makes Homepage the default for "/"
        element: <Homepage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'allFoods',
        element: <AllFoods />,
        loader: () => fetch('https://assignment-11-flame.vercel.app/foodCount'),
      },
      {
        path: 'allFoods/:_id',
        element: <SingleFoodPage />,
        loader: ({ params }) => fetch(`https://assignment-11-flame.vercel.app/allFoods/${params._id}`),
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
      {
        path: 'chat',
        element: <Chat />,
      },
      // User Private Routes
      {
        path: 'purchase/:_id',
        element: <PrivateRoute><Purchase /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://assignment-11-flame.vercel.app/allFoods/${params._id}`),
      },
      {
        path: 'myOrders',
        element: <PrivateRoute><MyOrders /></PrivateRoute>,
      },
      {
        path: 'myFoods',
        element: <PrivateRoute><MyFoods /></PrivateRoute>,
      },
    ],
  },

  // ## 2. Admin Dashboard Routes ##
  {
    path: "/admin",
    element: <PrivateRoute><AdminLayout /></PrivateRoute>, // Protect the whole admin section
    children: [
      {
        index: true, // Default admin page
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "add-food",
        element: <AddFood />, // The AddFood page is now part of the admin dashboard
      },
      {
        path: "manage-foods",
        element: <ManageFoods />,
      },
    ],
  },

  // ## 3. Catch-all Not Found Route ##
  {
    path: "*",
    element: <NotFound />,
  },
]);