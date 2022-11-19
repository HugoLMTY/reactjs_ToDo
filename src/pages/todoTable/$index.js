import React, { useState, useEffect } from 'react';

/*
		* List Model
		? rows: [ 
		?		{ 
		?			name: "Row name", 
		?			tickets: [ Ticket,...], 
		?			position: 1 | 2 | ... | h 
		?		} 
		?	]

		* Ticket Model
		? id: 			Number [ from 0 to n ]
		? title: 		String [ New ticket ]
		? desc: 		String [ No description ]
		? status: 		String [ Created | In Progress | Done ]

	*/

const TodoList = () => {
	const [ TodoList, setTodoList ] = useState({
		rows: [
			{ name: "Todo", 		tickets: [ { id: 0, title: "Title todo", 	 	desc: "Desc todo", 		status: "Created"} ], position: 0 },
			{ name: "In Progress", 	tickets: [ { id: 0, title: "Title progress", 	desc: "Desc progress", 	status: "Created"} ], position: 1 },
			{ name: "Done", 		tickets: [ { id: 0, title: "Title done", 		desc: "Desc done", 		status: "Created"} ], position: 2 }
		]
	})

	useEffect(() => {
		const sorted = TodoList.rows.sort((a, b) => a.position - b.position)

		if (sorted !== TodoList.rows) 
			setTodoList({ rows: sorted })
	}, [ TodoList ])

	//#region --------------- DATA MAPPING ---------------
	const createTable = () => {

		return (
			<table id='tableHolder'>
				<thead>
					<tr>
						{
							TodoList.rows
								.map(row => {
								return createRow(row)
							})
						}
					</tr>
				</thead>

				<tbody>
					{
						createTickets()
					}
				</tbody>
			</table>
		)
	}

	const createRow = (row) => {
		return (
			<th className='rowHeader' key={ row.position }> 
				{row.name} 
			</th>
		)
	}

	const createTickets = () => {
		return TodoList.rows
		.map(row => {
			return (
				<tr key={ row.position }>
					
					{
						row.tickets.map(ticket => {
							console.log({ row })
							return (
								<td className='ticket' key={ ticket.id }>
									<h2> { ticket.title	}	</h2>
									<p> { ticket.desc	} 	</p>
									<div>
										Actions
										<button onClick={ () => changeColumn(ticket, row.position - 1) }> ⬅️ </button>
										<button onClick={ () => changeColumn(ticket, row.position + 1) }> ➡️ </button>
									</div>
								</td>
							)
						})
					}
					
				</tr>
			)
		})
	}
	//#endregion

	//#region --------------- ACTIONS ---------------
	const changeColumn = (ticket, newPosition) => {
		const { rows } = TodoList

		const oldRow = rows.find(row => row.position === ticket.position)
		const newRow = rows.find(row => row.position === newPosition)

		if (oldRow && newRow) {
			oldRow.tickets = oldRow.tickets.filter(t => t.id !== ticket.id)
			newRow.tickets.push(ticket)

			setTodoList({ rows })
		}
	}
	//#endregion


	return (
		<div>
			<h1>Todo List</h1>
			
			{ createTable() }

		</div>
	)
}

export default TodoList;