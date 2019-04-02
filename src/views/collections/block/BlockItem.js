import React, { Component } from 'react'

import { ItemContainer, Thumbnail } from './styles.js'

class BlockItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// img: props.data.thumbnail,
			loaded: false
		}
	}

	componentDidMount = () => {

		console.log(this.props)

		const temp = new Image()
		temp.src = this.state.img
		temp.onload = () => {
			this.setState({ loaded: true })
		}
	}

	render() {

		const { name } = this.props
		const { loaded } = this.state

		return (
			<ItemContainer>
				<Thumbnail src={name} loaded={loaded} />
				<h4>{name}</h4>
			</ItemContainer>
		)
	}
}

export default BlockItem