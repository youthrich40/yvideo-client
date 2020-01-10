import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import {
	ListCollection,
	BlockCollection,
} from 'components/bits'

import Style, { ViewToggle } from './styles'

export default class Collections extends PureComponent {

	render() {

		const {
			isProf,
			isAdmin,
			displayBlocks,
			collections,
		} = this.props.viewstate

		const {
			toggleCollectionsDisplay,
		} = this.props.handlers

		console.log(collections)

		return (
			<Style>
				<header>
					<div>
						<h3>Collections</h3>
					</div>
					<div>
						{
							(isProf || isAdmin) &&
							<Link to={`/manager`} >Manage Collections</Link>
						}
						<ViewToggle displayBlocks={displayBlocks} onClick={toggleCollectionsDisplay} />
					</div>
				</header>
				<div className='list'>
					{displayBlocks ?
						Object.keys(collections).map(key => <BlockCollection key={key} data={collections[key]} />)
						:
						Object.keys(collections).map(key => <ListCollection key={key} data={collections[key]} />)
					}
				</div>
			</Style>
		)
	}
}