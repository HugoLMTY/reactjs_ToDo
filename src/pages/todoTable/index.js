//? Native
import React, { useState, useEffect } from 'react'

//? Imports
import './style.css'

//? Packages
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const swal = withReactContent(Swal)


/*
	* List Model
	? columns: [ 
	?		{ 
	?			id: 		Number 	[ 20 | 21 | 22 ]
	?			name: 		String 	[ Column name ], 
	?			tickets: 	Array 	[ Ticket,...], 
	?			position: 	Number 	[ from 0 to n ]
	?		} 
	?	]

	* Ticket Model
	? id: 			Number [ 10 | 11 | 12 ]
	? title: 		String [ New ticket ]
	? desc: 		String [ No description ]
	? status: 		String [ Created | In Progress | Done ]
	? position: 	Number [ from 0 to n ]

*/

/*
	TODO -------------
	? Handling
	* Handle la position du ticket sur le 

	? Swal
	* Lier les swalInput() 
	* Implémenter les swalSuccess()

	? Features
	* Ajouter des users + membres sur les cartes
	* Ajouter des labels sur les cartes
	* Ajouter des dates sur les cartes
*/

const TodoList = () => {
	//#region --------------- STATES ---------------
	const [List, setList] = useState({
		columns: [
			{
				id: 20,
				name: 'Todo',
				tickets: [
					{
						id: 10,
						title: 'Title todo',
						desc: 'Desc todo',
						status: 'Created',
						position: 0
					},
				],
				position: 0,
				expanded: true,
			},
			{
				id: 21,
				name: 'In Progress',
				tickets: [
					{
						id: 11,
						title: 'Title progress',
						desc: 'Desc progress',
						status: 'Created',
						position: 0
					},
				],
				position: 1,
				expanded: true,
			},
			{
				id: 22,
				name: 'Done',
				tickets: [
					{
						id: 12,
						title: 'Title done',
						desc: 'Desc done',
						status: 'Created',
						position: 0
					},
				],
				position: 2,
				expanded: true,
			},
		],
	})
	useEffect(() => {
		const sorted = List.columns.sort((a, b) => a.position - b.position)
		if (sorted !== List.columns) setList({ columns: sorted })
	}, [List])
	//#endregion

	//#region --------------- ACTIONS ---------------	

	//? ------------------ COLUMNS ------------------
	const createColumn = async () => {
		const name = await swal.fire({
			title: 'Create new column',
			input: 'text',
			inputValue: 'New column',
			inputPlaceholder: '',
			showCancelButton: true,
			confirmButtonText: 'Create',
			preConfirm: (name) => {
				if (name.trim().length <= 3) {
					swal.showValidationMessage(`Column name must be at least 3 characters long`)
				}
				return name
			},
		})
		if (!name.isConfirmed) return

		const column = {
			id: List.columns.length + 10,
			name: name.value,
			tickets: [],
			position: List.columns.length,
			status: 'Created',
			expanded: true,
		}

		setList({ columns: [...List.columns, column] })
	}

	const toggleColumnDisplay = (columnId) => {
		const column = List.columns.find(column => column.id === columnId)
		if (!column) return swalError('Column not found') 

		column.expanded = !column.expanded

		setList({ columns: List.columns })
	}

	const updateColumnPosition = (columnId, action) => {
		//? Get the current column
		const column = List.columns.find(column => column.id === columnId)

		//? Get the new position
		const targetPos = action === "+" ? column.position + 1 : column.position - 1

		//? Get the target column
		const target = List.columns.find($column => $column.position === targetPos)

		//? If no target, return
		if (!target) return false

		
		//? Temporarily store the target position
		const temp = target.position

		//? Update the target position
		target.position = column.position

		//? Update the current column position
		column.position = temp


		//? Save the new list
		setList({ columns: List.columns })
	}

	//? ------------------ TICKETS ------------------
	const createTicket = async (column) => {
		// return swalInput({})
		const title = await swal.fire({
			title: 'Create ticket',
			input: 'text',
			inputValue: '',
			inputPlaceholder: 'Title',
			showCancelButton: true,
			confirmButtonText: '➡️',
			preConfirm: (title) => {
				if (title.trim().length <= 3) {
					swal.showValidationMessage(`Title must be more than 3 characters long`)
				}
				return title
			},
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
				if (desc.trim().length <= 3) {
					swal.showValidationMessage(`Description must be more than 3 characters long`)
				}
				return desc
			},
		})
		if (!desc.isConfirmed) return

		const ticket = {
			id: Math.floor(Math.random() * 1000),
			title: title.value,
			desc: desc.value,
			status: 'Created',
		}

		column.tickets.push(ticket)
		setList({ columns: List.columns })
	}

	const editTicket = (ticketId) => {
		const column = List.columns.find((column) =>
			column.tickets.find((ticket) => ticket.id === ticketId)
		)
		const ticket = column.tickets.find((ticket) => ticket.id === ticketId)

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
					setList({ columns: List.columns })
					swal.fire({
						icon: 'success',
						title: 'Saved!',
					})
				} catch (err) {
					swal.showValidationMessage(`Request failed: ${err}`)
				}
			},
		}).then((res) => {
			if (res.isDenied) {
				try {
					column.tickets = column.tickets.filter(
						(ticket) => ticket.id !== ticketId
					)
					setList({ columns: List.columns })

					swal.fire({
						icon: 'success',
						title: 'Deleted !',
					})
				} catch (err) {
					swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong!',
					})
				}
			}
		})
	}

	const updateTicketPosition = (datas) => {
		try {
			console.log(datas)
			const {
				source,
				destination,
				draggableId,
				reason
			} = datas

			//? If the item is dropped outside the list, return 
			if (!destination) return false

			//? If the reason is not drop, return
			if (reason !== 'DROP') return false

			//? If the destination is the same as the source, return
			if (source.droppableId === destination.droppableId) return false

			//? Find the column
			const origin = List.columns.find(column => column.id.toString() === source.droppableId.toString())
			const target = List.columns.find(column => column.id.toString() === destination.droppableId.toString())

			//? Find the ticket in the origin
			const ticket = origin.tickets.find(ticket => ticket.id.toString() === draggableId.toString())

			//? Remove it then push it to the target
			origin.tickets = origin.tickets.filter(ticket => ticket.id.toString() !== draggableId.toString())
			target.tickets.push(ticket)

			setList({ columns: List.columns })
		} catch(err) { 
			console.log(err)
			swalError(err) 
		}
	}	

	const changeColumn = (ticketId, columnId, action) => {
		const column = List.columns.find(column => column.id === columnId)
		const ticket = column.tickets.find((ticket) => ticket.id === ticketId)

		const targetPos = action === "+" ? column.position + 1 : column.position -1
		const targetColumn = List.columns.find($column => $column.position === targetPos)
		if (!targetColumn) return false

		column.tickets = column.tickets.filter($ticket => $ticket.id !== ticketId)
		targetColumn.tickets.push(ticket)

		setList({ columns: List.columns })
	}

	//#endregion

	//#region --------------- DATA MAPPING ---------------
	const getColumns = () => {
		try {
			return (
				<div className="columnsHolder">
					{List.columns.map((column) => {
						return (
							//? https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/
							<Droppable
								key={ column.id }
								index={ column.id }
								droppableId={ column.id.toString() }
							>
								{(provided) => (
									<div
										className="column"
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										<div className="columnTitleHolder">
											<h2 className="columnTitle">
												{ column.name } ({ column.tickets.length })
											</h2>


											{ 
												column.position - 1 >= 0 && 
												( <button onClick={ () => updateColumnPosition(column.id, '-') }> ⬅️{' '} </button> )
											}

											<button onClick={ () => toggleColumnDisplay(column.id) }> { column.expanded ? '-' : '+' } </button>

											{
												column.position + 1 < List.columns.length &&
												( <button onClick={ () => updateColumnPosition(column.id, '+') }> ➡️{' '} </button> )
											}
										</div>

										
										{ column.expanded && getTickets(column) }

										{ column.expanded && getNewTicketButton(column) }

									</div>
								)}
							</Droppable>
						)
					})}

					<div className="column new-column">
						<div className="columnTitleHolder">
							<h2 className="columnTitle"> New column </h2>
						</div>

						{getNewColumnButton()}
					</div>
				</div>
			)
		} catch (err) {
			console.log({ err })
			return <h1> Error getting columns </h1>
		}
	}

	const getTickets = (column) => {
		try {
			if (column.tickets.length >= 1) {
				return column.tickets.map((ticket, i) => {
					return (
						//? https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/
						<Draggable
							key={ ticket.id }
							draggableId={ ticket.id.toString() }
							index={ i }
						>
							{(provided) => (
								<div
									className={`ticket ${
										i === column.tickets.length - 1
											? ' last-ticket'
											: ''
									}`}
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									<h3> {ticket.title} </h3>
									<p> {ticket.desc} </p>
									<div>
										<button onClick={() => editTicket(ticket.id) } >
											Edit{' '}
										</button>

										
										<button onClick={() => changeColumn(ticket.id, column.id, '-') } >
											⬅️{' '}
										</button>

										<button onClick={() => changeColumn(ticket.id, column.id, '+') } >
											➡️{' '}
										</button>
									</div>
								</div>
							)}
						</Draggable>
					)
				})
			} else {
				return <h3 className="no-ticket"> No tickets </h3>
			}
		} catch (err) {
			console.log({ err })
			// return <h1> Error getting tickets </h1>
		}
	}

	const getNewTicketButton = (column) => {
		return (
			<div
				onClick={() => createTicket(column)}
				className="ticket new-ticket"
			>
				{' '}
				+{' '}
			</div>
		)
	}

	const getNewColumnButton = (column) => {
		return (
			<div onClick={() => createColumn(column)} className="ticket new-ticket">
				{' '}
				+{' '}
			</div>
		)
	}
	//#endregion

	return (
		<div>
			<h1> TODO List </h1>

			<DragDropContext onDragEnd={($event) => updateTicketPosition($event)}>
				{ getColumns(List) }
			</DragDropContext>
		</div>
	)
}

//#region --------------- SWAL ---------------

const swalInput = ({ title = "Input", text = null, input = "text", placeHolder = "", value = "", buttons = {} }) => {

	const {
		confirm = "Save",
		cancel = "Cancel",
		deny = "Deny",

		showCancelButton = false,
		showDenyButton = false,
	} = buttons

	return swal.fire({
		title,
		text,

		input,
		inputValue: value,
		inputPlaceholder: placeHolder,

		showCancelButton,
		showDenyButton,

		confirmButtonText: confirm,
		cancelButtonText: cancel,
		dentButtonText: deny,

		preConfirm: (value) => {
			console.log({ value })
		}
	})
}

const swalError = (err) => {
	return swal.fire({
		icon: 'error',
		title: 'Une erreur est survenue',
		text: err
	})
}

const swalSuccess = (title = "Succès !") => {
	return swal.fire({
		icon: 'success',
		title
	})
}
//#endregion

//#region --------------- TOOLS ---------------
const logStuff = (stuff) => {
	console.log({ stuff })
}
//#endregion


export default TodoList
