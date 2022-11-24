import React, { useEffect, useRef, useState } from "react";
import Nav from "../../components/nav";


const Player = () => {
	const audioRef = useRef(null)

	const [ player, setPlayer ] = useState({ playing: false, playlist: [ ] })
	useEffect(() => {
		player.playing
			? audioRef.current.play()
			: audioRef.current.pause()
	}, [player.playing])

	const toggleAudioState = () => {
		setPlayer({ playing: !player.playing })
	}

	return (
		<div>
			<h1> Player </h1>

			<audio 
				ref={ (ref) => ( audioRef.current = ref ) } 
				src="https://cdn.discordapp.com/attachments/1043073684023300110/1045346711004008499/summoners.mp3"
				onEnded={ () => setPlayer({ playing: false }) }
				controls>

			</audio>

			<button onClick={ () => toggleAudioState() }> { player.playing ? "Pause" : "Play" } </button>
		</div>
	)

}

export default Player