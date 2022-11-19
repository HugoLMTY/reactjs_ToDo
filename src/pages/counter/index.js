import React, { useState, useEffect } from "react";

const Counter = () => {

	const [ count, setCount ] = useState(0);

	useEffect(() => {
		console.log(`${count} clicks`)
	},
	//* Tableau de dépendances (liste des states 
	[ count ]
	) 


	//* Consomme - de ressources, good practice
	const setCountValue = (value) => {
		setCount(value)
	}

	return (
		<div>
			<h1>Counter</h1>

			<h3> { count } </h3>

			<div>
				<button onClick={ () => setCountValue(count - 1) } > - </button>
				<button onClick={ () => setCount(count + 1) } > + </button>
			</div>
		</div>
	)
}

export default Counter