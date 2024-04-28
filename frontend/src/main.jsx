import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SignIn from './SignIn.jsx'
import Checkout from './Checkout.jsx'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "checkout/",
    element: <Checkout />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />

    {/* <App /> */}
    {/* <SignIn/> */}
    {/* {<Checkout /> } */}
  </React.StrictMode>,
)
