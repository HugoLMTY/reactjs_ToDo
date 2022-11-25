import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Nav from "../../components/nav";

const TImer = () => {

	const [ timer, setTimer ] = useState({ playing: false, time: 0 })
	const timerRef = useRef(null)

	useEffect(() => {
		clearInterval(timerRef.current)

		if (timer.playing) {
			
			if (timer.time === 0) return (setTimer({ ...timer, playing: false }), alert("done"))

			timerRef.current = setInterval(() => {
				setTimer({ ...timer, time: timer.time - 1 })
			}, 1000)
			
			return () => clearInterval(timerRef.current)
			
		}
	}, [ timer ])


	const updateTimerStatus = (state) => {
		setTimer({ ...timer, playing: state })
	}

	return (
		<div>
			<h1>Timer</h1>

			<Nav />

			<div>
				<h2>Timer: { timer.time }</h2>
				<Button onClick={() => setTimer({ playing: false, time: timer.time - 10	})}> - 10 	</Button>
				<Button onClick={() => setTimer({ playing: false, time: timer.time - 1 	})}> - 1	</Button>
				<Button onClick={() => setTimer({ playing: false, time: 0				})}> 0 		</Button>
				<Button onClick={() => setTimer({ playing: false, time: timer.time + 1 	})}> + 1	</Button>
				<Button onClick={() => setTimer({ playing: false, time: timer.time + 10 })}> + 10	</Button>
			</div>

			<div>
				<Button onClick={ () => updateTimerStatus(!timer.playing) }> { timer.playing ? 'Pause' : 'Play' } </Button>
			</div>

		</div>

	)
}

const Button = styled.button`
	color: #fff;
	
	padding: 10px;
	margin-left: 5px;
	margin-right: 5px;
	border-radius: 5px;

	:hover {
		cursor: pointer;
		background-color: whitesmoke;
	}
`

export default TImer;