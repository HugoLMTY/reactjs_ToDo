import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const pages = [
	{
		name: "Home",
		path: "/"
	},
	{
		name: "Todo List",
		path: "/todo"
	},
	{
		name: "Counter",
		path: "/counter"
	},
	{
		name: "Styled",
		path: "/styled"
	},
	{
		name: "Player",
		path: "/player"
	},
	{
		name: "Ad Stuff",
		path: "/adStuff"
	}
]



const Nav = (props) => {
	// const navigate = useNavigate()
	const navigate = () => {}


	const currentPage = window.location.href.split('localhost:3000')[1]

	return (
		<>
			{pages.map((page, index) => (
				<NavItem key={index} onClick={() => navigate(page.path)} active={ currentPage == page.path }>
					{page.name}
				</NavItem>
			))}

			{ props.children }
		</>
	)
}


const NavItem = styled.button`
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