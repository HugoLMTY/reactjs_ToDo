//? Native
import React, { useState, useEffect } from 'react';

//? Packages
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

//? Imports
import './style.css'



const swal = withReactContent(Swal)
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

	//#region --------------- DEFINITIONS ---------------
	const [ List, setList ] = useState({
		rows: [
			{ name: "Todo", 		tickets: [ { id: 10, title: "Title todo", 	 	desc: "Desc todo", 		status: "Created"} ], position: 0 },
			{ name: "In Progress", 	tickets: [ { id: 11, title: "Title progress", 	desc: "Desc progress", 	status: "Created"} ], position: 1 },
			{ name: "Done", 		tickets: [ { id: 12, title: "Title done", 		desc: "Desc done", 		status: "Created"} ], position: 2 }
		]
	})
	useEffect(() => {
		const sorted = List.rows.sort((a, b) => a.position - b.position)
		if (sorted !== List.rows) 
			setList({ rows: sorted })
	}, [ List ])
	//#endregion

	//#region --------------- ACTIONS ---------------
	const changeRow = (ticketId, rowPos, action) => {
		const row = List.rows[rowPos]
		const ticket = row.tickets.find(ticket => ticket.id === ticketId)

		if (action === '+') {
			if (rowPos < List.rows.length - 1) {
				const nextRow = List.rows[rowPos + 1]
				nextRow.tickets.push(ticket)
				row.tickets = row.tickets.filter(ticket => ticket.id !== ticketId)
			}
		} else if (action === '-') {
			if (rowPos > 0) {
				const prevRow = List.rows[rowPos - 1]
				prevRow.tickets.push(ticket)
				row.tickets = row.tickets.filter(ticket => ticket.id !== ticketId)
			}
		}

		setList({ rows: List.rows })
	}

	const editTicket = (ticketId) => {
		const row = List.rows.find(row => row.tickets.find(ticket => ticket.id === ticketId))
		const ticket = row.tickets.find(ticket => ticket.id === ticketId)

		swal.fire({
			title: 'Edit ticket',
			input: 'text',
			inputValue: ticket.desc,
			inputPlaceholder: 'Description',
			showCancelButton: true,
			confirmButtonText: 'Save',
			showLoaderOnConfirm: true,
			showDenyButton: true,
			denyButtonText: 'Delete',
			preConfirm: (desc) => {
				try {
					ticket.desc = desc
					setList({ rows: List.rows })
					swal.fire({
						icon: 'success',
						title: 'Saved!',
					})
				} catch(err) {
					swal.showValidationMessage(
						`Request failed: ${err}`
					)
				}
			}
		}).then(res => {
			if (res.isDenied) {
				try {
					row.tickets = row.tickets.filter(ticket => ticket.id !== ticketId)
					setList({ rows: List.rows })
	
					swal.fire({
						icon: 'success',
						title: 'Deleted !',
					})	
				} catch(err) {
					swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong!',
					})
				}
			}
		})
	}

	const createRow = async () => {

		const name = await swal.fire({
			title: 'Create new row',
			input: 'text',
			inputValue: 'New row',
			inputPlaceholder: '',
			showCancelButton: true,
			confirmButtonText: 'Create',
			preConfirm: (name) => {
				if (name === '') {
					swal.showValidationMessage(
						`Please enter a name`
					)
				}
				return name
			}

		})
		if (!name.isConfirmed) return

		const row = {
			name: name.value,
			tickets: [],
			position: List.rows.length,
			status: "Created"
		}

		console.log({ List, row })

		setList({ rows: [...List.rows, row] })
	}

	const createTicket = async (row) => {

		const title = await swal.fire({
			title: 'Create ticket',
			input: 'text',
			inputValue: '',
			inputPlaceholder: 'Title',
			showCancelButton: true,
			confirmButtonText: '➡️',
			preConfirm: (title) => {
				if (title === '') {
					swal.showValidationMessage(
						`Title can't be empty`
					)
				}
				return title
			}
		})
		if (!title.isConfirmed) return


		const desc = await swal.fire({
			title: 'Create ticket',
			input: 'text',
			inputValue: '',
			inputPlaceholder: 'Description',
			showCancelButton: true,
			confirmButtonText: 'Create',
			preConfirm: (desc) => {
				if (desc === '') {
					swal.showValidationMessage(
						`Description can't be empty`
					)
				}
				return desc
			}
		})
		if (!desc.isConfirmed) return
		

		const ticket = {
			id: Math.floor(Math.random() * 1000),
			title: title.value,
			desc: desc.value,
			status: "Created"
		}

		row.tickets.push(ticket)
		setList({ rows: List.rows })
	}

	//#endregion

	//#region --------------- DATA MAPPING ---------------
	const getRows = () => {
		try {

			return (
				<div className="rowsHolder">
					{
						List.rows.map(row => {	
						return (
							
							//? https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/
							<Droppable key={row.name} droppableId={row.position.toString()} index={row.position}>
								{(provided) => (

									<div className='row' key={ row.position } { ...provided.droppableProps } ref={ provided.innerRef }>

										<div className="rowTitleHolder">
											<h2 className='rowTitle'> { row.name } </h2>
										</div>

										{ getTickets(row) }

										{ getNewTicketButton(row) }

										{ provided.placeholder }
									</div>
								)}
							</Droppable>
					
						)
					})
				}

					<div className="row new-row">
						<div className="rowTitleHolder">
							<h2 className='rowTitle'> New row </h2>
						</div>

						{ getNewRowButton() }
					</div>
				</div>
			)

		} catch(err) { console.log({ err }); return <h1> Error getting rows </h1>}
	}

	const getTickets = (row) => {
		try {

			if (row.tickets.length >= 1) {
				return row.tickets.map((ticket, i) => {
					return (
						//? https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/
						<Draggable key={ ticket.id } draggableId={ ticket.id.toString() } index={ i }>
							{(provided) => (

							<div className={ `ticket ${ i === row.tickets.length - 1 ? ' last-ticket': '' }` } 
								ref={ provided.innerRef } { ...provided.draggableProps } { ...provided.dragHandleProps }>

								<h3> { ticket.title } </h3>
								<p> { ticket.desc } </p>
								<div>
									<button onClick={ () => editTicket(ticket.id) }> Edit </button>
									<button onClick={ () => changeRow(ticket.id, row.position, "-") }> ⬅️ </button>
									<button onClick={ () => changeRow(ticket.id, row.position, "+") }> ➡️ </button>
								</div>
							</div>
							)}
						</Draggable>
					)
				})
			} else {
				return <h3 className='no-ticket'> No tickets </h3>
			}

		} catch(err) { return <h1> Error getting tickets </h1>}
	}

	const getNewTicketButton = (row) => {
		return (
			<div onClick={ () => createTicket(row) } className="ticket new-ticket"> + </div>
		)
	}

	const getNewRowButton = (row) => {
		return (
			<div onClick={ () => createRow(row) } className="ticket new-ticket"> + </div>
		)
	}
	//#endregion


	return (
		<div>
			<h1> TODO List </h1>

			<DragDropContext onDragEnd={ ($event) => logStuff($event) }>
				{ getRows(List) }				
			</DragDropContext>
		</div>
	)
}

const logStuff = (stuff) => {
	console.log({ stuff })
}

export default TodoList;