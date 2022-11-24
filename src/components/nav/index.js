import React from "react";
import { useNavigate } from "react-router-dom";

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
	}
]



const Nav = () => {
	const navigate = useNavigate()


	return (
		<div>
			{pages.map((page, index) => (
				<button key={index} onClick={() => navigate(page.path)}>
					{page.name}
				</button>
			))}
		</div>
	)
}

export default Nav