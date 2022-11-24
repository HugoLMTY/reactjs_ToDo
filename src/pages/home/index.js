import React, { useState, useEffect } from "react";
import Nav from "../../components/nav";

const Home = () => {
	const [ state, setState ] = useState(0);

	useEffect(() => {

	}, [ state ]) 


	return (
		<div>
			<h1> Home </h1>

			<Nav />


			<ul>
				<li> <a href="/todo"> Todo List </a> </li>
				<li> <a href="/counter"> Counter </a> </li>
				
			</ul>

		</div>
	)
}

export default Home