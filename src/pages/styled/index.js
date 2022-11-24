import axios from "axios";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Ticket from "../../components/cards/ticket";

import Nav from '../../components/nav';

const Styled = () => {
	const [ sentences, setSentences ] = useState([
		{ id: 20, content: "Lorem ipsum dolor sit amet", 	position: 1 	},
		{ id: 21, content: "consectetur adipiscing elit.", 	position: 2 	},
		{ id: 22, content: "adipiscing elit.", 				position: 3 	},
		{ id: 23, content: "elit.", 						position: 4		}
	])
	useEffect(() => {
		axios
			.get('http://localhost:3001/')
			.then(res => {
				const mapped = res.data.map((sentence, index) => ({ content: sentence, id: index + 10, position: index + 1 }))
				// setSentences(mapped)
			})
			.catch(err => { console.log(err) })

	}, [])

	const updatePosition = ($event) => {
		const { destination, source } = $event

		console.log({ $event })
		// if (!destination) return

		// setSentences(newSentences)
	}
	

	return (
		<div>
			<h1> Styled Comps </h1>

			<Container>				

				<DragDropContext onDragEnd={ ($event) => { updatePosition($event) } }>

					<Droppable droppableId="dropZone" index={0} >
						{(provided) => (

							<div ref={provided.innerRef} {...provided.droppableProps} >
								{
									sentences.map(s => {
										return (
										<Draggable key={s.id} index={ s.id } draggableId={ s.position.toString() }>
											{(provided) => {
												return <Ticket item={ s } provided={ provided } />
											}}
										</Draggable>
										)
									})
								}
							</div>
						)} 
					</Droppable>

				</DragDropContext>

			</Container>

		</div>
	)
}

const Container = styled.div`
	/* height: 75vh; */

	margin: 50px;

	background-color: whitesmoke;
`

const Button = styled.button`
	background-color: red;
	color: white;
	border-radius: 5px;
	margin: 20px;
	padding: 20px;
`

export default Styled;