import React, { PureComponent } from 'react'

import Style, { EventType } from './styles'

class EventsList extends PureComponent {
	render() {

		const { eventTypes } = this.props

		return (
			<Style>
				{ eventTypes.map(eventType => {
					return <EventType>{eventType.type}</EventType>
				})}
			</Style>
		)
	}
}

export default EventsList