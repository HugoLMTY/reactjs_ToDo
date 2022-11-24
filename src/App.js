import React from 'react';

import Nav from './components/nav';

import { RouterProvider } from "react-router-dom";
import router from "./config/router";

export default function App() {
	return (
		<div>

			{/* <Nav /> */}

			<RouterProvider router={router}>
			</RouterProvider>
		</div>
	)
}