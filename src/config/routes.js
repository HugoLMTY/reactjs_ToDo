import React from 'react';
import {
	RouterProvider,
	createBrowserRouter
} from "react-router-dom";


import TodoList from '../pages/todoTable'
import Counter from '../pages/counter'


const router = createBrowserRouter([
		{ path: "/", 			element: <TodoList /> 	},
		{ path: "/todo", 		element: <TodoList /> 	},
		{ path: "/counter", 	element: <Counter /> 	}
])

const Navigator = () => {
	return (
		<RouterProvider router={router} />
	)
}

export default Navigator