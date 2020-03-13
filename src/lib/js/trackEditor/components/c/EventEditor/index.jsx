import React, { PureComponent } from 'react'

import Style, {
	EventsButton,
	EventsTitle,
	Line,
	SaveTabButton,
	TabBar,
} from './styles'

import { EventsList, EventEditArea, SaveTab } from '../..'

class EventEditor extends PureComponent {
	render() {

		const {
			saveTabActive,
			eventTypes,
			event,
		} = this.props.viewstate

		const {
			handleTextChange,
			toggleEventsTab,
			toggleSaveTab,
			saveTracks,
		} = this.props.handlers

		return (
			<Style>
				<TabBar>
					<EventsButton saveTabActive={saveTabActive} onClick={toggleEventsTab}>Events</EventsButton>
					<SaveTabButton saveTabActive={saveTabActive} onClick={toggleSaveTab}>Save</SaveTabButton>
				</TabBar>

				<Line />

				{ !saveTabActive &&
					<EventsTitle>Events{event ? ` --> ` : ``}{event ? event.type : ``}</EventsTitle>
				}

				{ !saveTabActive &&
					(event ? <EventEditArea viewstate={{event}} handlers={{handleTextChange}}/> : <EventsList eventTypes={eventTypes} />)
				}

				{ saveTabActive &&
					<SaveTab handlers={{saveTracks}} />
				}

			</Style>
		)
	}
}

export default EventEditor