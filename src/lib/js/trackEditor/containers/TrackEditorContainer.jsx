import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { TrackEditor } from 'lib/js/trackEditor/components'

const TrackEditorContainer = () => {

	const params = useParams()

	const [playing, setPlaying] = useState(false)
	const [time, setTime] = useState(12.55)

	const [event, setEvent] = useState(null)
	const [saveTabActive, setSaveTabActive] = useState(false)
	const eventTypes = [
		{
			type: `Skip`,
		},
		{
			type: `Mute`,
		},
		{
			type: `Pause`,
		},
	]

	const testEvent = {
		type: `Skip`,
		start: 1567.123,
		end: 1777.345,
		id: `TrackEvent0`,
		target: `target-2`,
		text: ``,
	}

	const handleTextChange = () => {
		// do nothing
	}

	const saveTracks = () => {
		// do nothing yet
	}

	const toggleEventsTab = () => {
		if(saveTabActive) setSaveTabActive(false)
		if(event) setEvent(null)
	}

	const toggleSaveTab = () => {
		if(!saveTabActive) setSaveTabActive(true)
		if(event) setEvent(null)
	}

	const togglePlay = () => {
		setPlaying(!playing)
	}

	const viewstate = {
		contentId: params.id,
		content: null,
		event: testEvent,
		eventTypes,
		playing,
		saveTabActive,
		time,
	}

	const handlers = {
		handleTextChange,
		togglePlay,
		toggleEventsTab,
		toggleSaveTab,
		saveTracks,
	}

	return <TrackEditor viewstate={viewstate} handlers={handlers}/>
}

export default TrackEditorContainer