import React, { useState } from 'react';

const Ticket = (ticket) => {
	const [ state, setstate ] = useState(null)

	const {
		title = "New ticket",
		description = "No description",
		status = "Created"
	} = ticket

	return (
		<div>
			<h1> { title } </h1>
			<p> { description } </p>
			<p> { status } </p>

			<button > Edit </button>
		</div>
	)
}

export default Ticket;