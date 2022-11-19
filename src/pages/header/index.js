import React from 'react'

import { Container, Navbar } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

const Header = ({ title = "Dash" }) => {

	// const navigate = useNavigate()
	
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">
					{ title }
				</Navbar.Brand>

				{/* <button onClick={ () => navigate('/todo') }> To DO </button>
				<button onClick={ () => navigate('/counter') }> Counter </button> */}

				{/* <Link to="/todo">List</Link> */}
				{/* <Link to="/counter">Counter</Link> */}
			</Container>
		</Navbar>

	)
}

export default Header