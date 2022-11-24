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
				setSentences(mapped)
			})
			.catch(err => { console.log(err) })

	}, [])

	useEffect(() => {
		const sorted = sentences.sort((a, b) => a.position - b.position)

		if (sentences.map(s => s.id) !== sorted.map(s => s.id)) setSentences(sorted)

	}, [ sentences ])

	const updatePosition = ($event) => {
		const { destination, source } = $event
		if (!destination || source.index === destination.index) return
		
		const current = sentences.find(s => s.id.toString() === source.index.toString())
		const targetIndex = sentences.findIndex(s => s.id.toString() === destination.index.toString())		

		const datas = sentences.filter(s => s.id.toString() !== current.id.toString())
		datas.splice(targetIndex, 0, current)

		setSentences(datas)
	}
	

	return (
		<div>
			<h1> Styled Comps </h1>

			<Nav />

			<Container>				

				<DragDropContext onDragStart={ ($event) => { logStuff($event) }} onDragEnd={ ($event) => { updatePosition($event) } }>

					<Droppable droppableId="dropZone" index={0} >
						{(provided) => (

							<div ref={provided.innerRef} {...provided.droppableProps} >
								{
									sentences.map((s, i) => {
										return (
											<Draggable key={s.id} index={ s.id } draggableId={ s.position.toString() }>
												{($provided) => {
													return <Ticket item={ s } index={ i } provided={ $provided } />
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

const logStuff = (stuff) => { false && console.log(stuff) }

const Container = styled.div`
	/* height: 75vh; */

	margin: 50px;

	background-color: whitesmoke;
`

export default Styled;