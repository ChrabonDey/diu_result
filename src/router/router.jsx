import React from 'react';
import {
    createBrowserRouter,
 
  } from "react-router-dom";
import Home from '../page/Home';
import ResultPage from '../page/ResultPage';
import NotFound from '../Notfound/Not-found';


export const router = createBrowserRouter([
    {
      path: "/",
      element:<Home></Home>,
    },
    {
         path:"/result",
         element:<ResultPage></ResultPage>
    },
    {
       path:"*",
       element:<NotFound></NotFound>
    }
  ]);

