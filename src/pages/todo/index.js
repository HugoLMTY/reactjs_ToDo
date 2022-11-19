import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap'

import Ticket from '../../components/cards/ticket'

/*
	* Ticket Model
	? id: 			Number [ from 0 to n ]
	? title: 		String [ New ticket ]
	? description: 	String [ No description ]
	? status: 		String [ Created | In Progress | Done ]

	? position: 	Numbers [ row : col ]
*/

const TodoList = () => {
	const [ ticketList, setTicketList ] = useState([])
	
	//#region --------------- DATA MAPPING ---------------
	const mapTickets = () => {
		return ticketList.map(ticket => {
			return (
				<Col>
					<Ticket ticket={ticket} />
				</Col>
			)
		})
	}
	//#endregion

	//#region --------------- CRUD ---------------
	const createTicket = ({ title = "New ticket", description = "No description", status = "Created" }) => {
		setTicketList([
			...ticketList,
			{
				title,
				description,
				status,
				position: [0, 0]
			}
		])
	}

	const updateTicket = ({ id, title, desc }) => {
		let $t = ticketList.find(t => t.id === id)

		if (!$t) 
			return alert('No ticket found')

		if (!title || !desc) 
			return alert('Title or description are required')
		

		if (title) 
			$t.title = title

		if (desc) 
			$t.desc = desc

		setTicketList([
			...ticketList
		])
	}

	const deleteTicket = (id) => {
		const list = ticketList.filter(t => t.id === id)
		setTicketList(list)
	}
	//#endregion


	return (
		<div>
			<h1>Todo List</h1>

			<table id="tableHolder">

				<thead>
					<tr>
						<th>Created</th>
						<th>In Progress</th>
						<th>Done</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td> Item 1 </td>
					</tr>
					<tr>
						<td> Item 1 </td>
					</tr>
					<tr>
						<td> Item 1 </td>
					</tr>
				</tbody>

			</table>
			
		</div>
	)	

	return (
		<Container fluid>
			<h1>Todo List</h1>

			<Row>
				{ mapTickets() }
				<Col> <button onClick={ () => createTicket({}) }> Ajouter un ticket </button> </Col>
			</Row>

		</Container>
	)
}

export default TodoList;