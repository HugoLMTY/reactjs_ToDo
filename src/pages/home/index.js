import React, { useState, useEffect } from "react";
import Nav from "../../components/nav";
import AdStuff from "../adStuff";

const Home = () => {
	const [ state, setState ] = useState(0);

	useEffect(() => {

	}, [ state ]) 


	return (
		<div>
			<h1> Home </h1>

			<ul>
				<li> <a href="/todo"> Todo List </a> </li>
				<li> <a href="/counter"> Counter </a> </li>
				<li> <a href="/styled"> Styled </a> </li>
				
			</ul>

			<AdStuff />

		</div>
	)
}

export default Home