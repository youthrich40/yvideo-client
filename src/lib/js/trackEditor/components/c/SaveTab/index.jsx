import React, { PureComponent } from 'react'

import Style, { Description, SaveButton, SaveButtonArea } from './styles'

class SaveTab extends PureComponent {
	render() {

		const {
			saveTracks,
		} = this.props.handlers

		return (
			<Style>
				<SaveButtonArea>
					<Description>Save Your Changes</Description>
					<SaveButton onClick={saveTracks}>Save</SaveButton>
				</SaveButtonArea>
			</Style>
		)
	}
}

export default SaveTab