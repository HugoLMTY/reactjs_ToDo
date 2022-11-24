import React from 'react';
import styled from 'styled-components';

import { FaGripVertical } from 'react-icons/fa';

const Ticket = ({ item, index, provided }) => {
	return (
		<Row ref={ provided.innerRef } {...provided.draggableProps}  >
			<Position>	{ index + 1 } 	</Position>

			<Sentence>	{ item.content }	</Sentence>

			<Grip  {...provided.dragHandleProps}>		
				<FaGripVertical />	
			</Grip>

			{provided.placeholder}		
		</Row>
)}

const Position = styled.div`
	background-color: lightgreen;
	color: white;
	border-radius: 5px;
	margin: 20px;
	padding: 5px;
`

const Sentence = styled.div`

	user-select: all;

	background-color: white;
	border-radius: 5px;
	padding: 10px;
	margin: 10px;
`

const Grip = styled.div`
	background-color: white;
	border-radius: 5px;
	padding: 10px;
	float: right;
`


const Row = styled.div`

	user-select: none;

	width: 69%;

	display: flex;
	justify-content: space-between;
	align-items: center;

	margin: 10px;
	padding: 10px;

	text-align: center;
	border-radius: 10px;

	/* make me a glowy white border pls */
	box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.5);

	background: lightblue;

	transition-duration: 0.2s;

	&:first-child {
        border: 2px solid yellow
    }

`

export default Ticket;