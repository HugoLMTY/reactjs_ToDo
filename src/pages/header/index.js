import React from 'react'
import { useNavigate } from "react-router-dom";

const Header = ({ title = "Dash" }) => {

	const navigate = useNavigate()
	
	return (

		<div>
			<h1 onClick={ () => navigate('/') }>{title}</h1>

			<div>

				<button onClick={ () => navigate('/todo')		}>Todo</button>
				<button onClick={ () => navigate('/counter')	}>Counter</button>

			</div>
		</div>
	)
}

export default Header