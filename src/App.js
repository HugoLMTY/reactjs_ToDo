import React from 'react';

import Nav from './components/nav';

import { BrowserRouter, RouterProvider } from "react-router-dom";
import router from "./config/router";

export default function App() {
	return (
	<>
		{/* <Nav /> */}
		<RouterProvider router={router} >
		</RouterProvider>
	</>	
	)

}