import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Ticket from "../../components/cards/ticket";

import Nav from '../../components/nav';

const Styled = () => {

	const [ sentences, setSentences ] = useState(["a", "b", "c"])

	useEffect(() => {
		axios
			.get('http://localhost:3001/')
			.then(res => {
				// setSentences(res.data)
			})
			.catch(err => {
				console.log(err)
			})

	})

	try {
		return (
			<div>
				<h1> Hello world </h1>
	
				<Nav />
	
	
				<Container>				
				{
					sentences.map((text, index) => {
						return <Ticket key={index} text={text} index={index}/>
					})
				}
				</Container>
	
			</div>
		)
	
	} catch(err) {
		console.log(err)
	}
}

const Container = styled.div`
	height: 75vh;

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