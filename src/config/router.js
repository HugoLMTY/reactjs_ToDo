import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Home from '../pages/home'
import TodoList from '../pages/todoTable'
import Counter from '../pages/counter'
import Styled from '../pages/styled'

const router = createBrowserRouter([
		{ path: "/", 			element: <Home /> 		},
		{ path: "/todo", 		element: <TodoList /> 	},
		{ path: "/counter", 	element: <Counter /> 	},
		{ path: "/styled", 		element: <Styled /> 	},
])

export default router