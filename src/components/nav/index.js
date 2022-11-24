import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import AdStuff from "../../pages/adStuff";
// import Counter from "../../pages/counter";
// import Home from "../../pages/home";
// import Player from "../../pages/player";
// import Styled from "../../pages/styled";
// import TodoList from "../../pages/todoTable";

const pages = [
	{
		name: "Home",
		path: "/",
		// component:  <Home />
	},
	{
		name: "Todo List",
		path: "/todo",
		// component:  <TodoList />
	},
	{
		name: "Counter",
		path: "/counter",
		// component: <Counter />
	},
	{
		name: "Styled",
		path: "/styled",
		// component: <Styled />
	},
	{
		name: "Player",
		path: "/player",
		// component: <Player />
	},
	{
		name: "Ad Stuff",
		path: "/adStuff",
		// component: <AdStuff />
	}
]



const Nav = (props) => {
	const navigate = useNavigate()
	// const navigate = () => {}


	const currentPage = window.location.href.split('localhost:3000')[1]

	return (
		<>
			{pages.map((page, index) => (
				<NavButton key={index} onClick={() => navigate(page.path)} active={ currentPage === page.path }>
					{page.name}
				</NavButton>
			))}

			{ props.children }
		</>
		// <>
		// 	<BrowserRouter>
		// 		<Routes>

		// 			{
		// 				pages.map(page => {
		// 					return (
		// 					<>
		// 						{/* <Route key={page.path} path={page.path} element={ page.component } /> */}
		// 						<NavButton key={page.name} onClick={() => navigate(page.path)} active={currentPage === page.path} >{page.name}</NavButton>
		// 					</>
		// 					)
		// 				})
		// 			}

		// 		</Routes>
		// 	</BrowserRouter>
		// </>
	)
}


const NavButton = styled.button`
	border: 1px solid red;
	color: white;
	border-radius: 15px;
	margin: 5px;
	padding: 5px 20px 5px 20px;

	transition-duration: 0.15s;

	${({ active }) => active && `
		background-color: red;
	`}

	:hover {
		background-color: red;
		opacity: 0.69;
	}
`

export default Nav