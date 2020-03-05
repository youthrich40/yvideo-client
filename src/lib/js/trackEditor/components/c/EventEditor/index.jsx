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
					<EventsTitle>Events</EventsTitle>
				}

				{ !saveTabActive &&
					(event ? <EventEditArea viewstate={{event}} /> : <EventsList eventTypes={eventTypes} />)
				}

				{ saveTabActive &&
					<SaveTab handlers={{saveTracks}} />
				}

			</Style>
		)
	}
}

export default EventEditor