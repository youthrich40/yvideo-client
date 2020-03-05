import React, { PureComponent } from 'react'
import {
	EventEditor,
	Player,
	TimelineEditor,
} from './../..'

import Style, { LeftStyle } from './styles'

class TrackEditor extends PureComponent {
	render() {

		const {
			content,
			event,
			eventTypes,
			playing,
			saveTabActive,
			time,
		} = this.props.viewstate

		const {
			toggleEventsTab,
			togglePlay,
			toggleSaveTab,
			saveTracks,
		} = this.props.handlers

		const playerViewstate = {
			content,
		}

		const timelineEditorViewstate = {
			playing,
			time,
		}

		const timelineEditorHandlers = {
			togglePlay,
		}

		const eventEditorViewstate = {
			event,
			eventTypes,
			saveTabActive,
		}

		const eventEditorHandlers = {
			toggleEventsTab,
			toggleSaveTab,
			saveTracks,
		}

		return (
			<Style>
				<LeftStyle>
					<Player viewstate={playerViewstate} />
					<TimelineEditor viewstate={timelineEditorViewstate} handlers={timelineEditorHandlers}/>
				</LeftStyle>
				<EventEditor viewstate={eventEditorViewstate} handlers={eventEditorHandlers} />
			</Style>
		)
	}
}

export default TrackEditor