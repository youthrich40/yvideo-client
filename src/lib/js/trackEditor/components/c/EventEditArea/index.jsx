import React, { PureComponent } from 'react'

import Style, { Form, StartEndArea } from './styles'

class EventEditArea extends PureComponent {

	render() {

		const {
			event,
		} = this.props.viewstate

		const {
			handleTextChange,
		} = this.props.handlers

		return (
			<Style>
				<Form>
					<StartEndArea>
						<label htmlFor='event-edit-start'>
							Start
							<div>
								<input id='event-edit-start' type='text' name='title' value={event.start} onChange={handleTextChange} required />
							</div>
						</label>

						<label htmlFor='event-edit-end'>
							<span>End</span>
							<div>
								<input id='event-edit-end' type='text' name='url' value={event.end} onChange={handleTextChange} required />
							</div>
						</label>
					</StartEndArea>

					<div>
						<label htmlFor='event-edit-description'>
						Description
							<div>
								<textarea id='event-edit-description' name='description' value={event.text} onChange={handleTextChange} rows={4} required />
							</div>
						</label>
					</div>

				</Form>
			</Style>
		)
	}
}

export default EventEditArea