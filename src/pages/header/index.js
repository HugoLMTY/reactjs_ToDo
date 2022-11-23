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

		// <Navbar bg="dark" variant="dark">
		// 	<Container>
		// 		<Navbar.Brand href="/">
		// 			{ title }
		// 		</Navbar.Brand>

		// 		{/* <button onClick={ () => navigate('/todo') }> To DO </button>
		// 		<button onClick={ () => navigate('/counter') }> Counter </button> */}

		// 		{/* <Link to="/todo">List</Link> */}
		// 		{/* <Link to="/counter">Counter</Link> */}
		// 	</Container>
		// </Navbar>

	)
}

export default Header