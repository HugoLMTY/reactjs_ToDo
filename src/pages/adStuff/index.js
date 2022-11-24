import React from "react";
import Nav from "../../components/nav";

import styled from "styled-components";

const AdStuff = () => {
	return <Ad />
}

const Ad = styled.div`
	border: 1px solid red;
	color: white;

	width: 420px;
	height: 69px;

	position: absolute;


	bottom: 10px;

	z-index: 420;
`

export default AdStuff