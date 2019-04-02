import React from 'react'
import { connect } from 'react-redux'

import { load, loaded, lost } from './../../redux/actions'

import { SError, SLink } from './styles'

export class Error extends React.Component {
	componentDidMount = () => {
		this.props.lost()
		setTimeout(() => {
			this.props.loaded()
		}, 500)
	}

	componentWillUnmount = () => {
		this.props.load()
	}

	render() {
		const { error, message } = this.props
		return (
			<SError>
				<h1>{error}</h1>
				<h2>{message}</h2>
				<SLink to={'/'}>Go back home</SLink>
			</SError >
		)
	}
}

const mapDispatchToProps = {
	load,
	loaded,
	lost
}

export default connect(null, mapDispatchToProps)(Error)