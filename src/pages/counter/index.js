import React, { useState, useEffect } from "react";
import Nav from "../nav";

const Counter = () => {
	const [ count, setCount ] = useState(0);

	useEffect(() => {
		console.log(`${count} clicks`)
	}, [ count ]) 


	//* Consomme - de ressources, good practice
	const setCountValue = (value) => {
		setCount(value)
	}

	return (
		<div>
			<h1>Counter</h1>

			<Nav />

			<h3> { count } </h3>

			<div>
				<button onClick={ () => setCountValue(count - 1) } > - </button>
				<button onClick={ () => setCount(count + 1) } > + </button>
			</div>
		</div>
	)
}

export default Counter