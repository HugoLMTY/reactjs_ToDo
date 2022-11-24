import React, { useState } from 'react';

import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const swal = withReactContent(Swal)

const Ticket = ({ text = "ok", index = -1 }) => {
	const [ state, setstate ] = useState(null)

	return (
		<Row>
			{ index }
			{ text }
		</Row>
	)
}

const Row = styled.div`

	width: 50%;

	margin: 10px;
	padding: 10px;

	text-align: center;
	border-radius: 10px;

	background: lightblue;

`

export default Ticket;