import React, { Component } from 'react'

import { connect } from 'react-redux'

import { getContent, toggleModal, updateCollectionStatus, updateCollectionName } from 'redux/actions'

import Overview from './content/Overview'
import Roles from './roles/Roles'
import TitleEdit from './title/TitleEdit'

import CreateContent from 'components/forms/CreateContent'

import {
	Container,
	PublishButton,
	ArchiveButton,
	TabHeader,
	Selector,
	Tab,
	NewContent,
	Icon
} from './styles'

import plus from 'assets/collections/plus_gray.svg'

import { objectIsEmpty, diff } from 'js/util'

/**
 * DO NOT EDIT THIS FILE UNLESS YOU KNOW WHAT YOU'RE DOING
 */

class Editor extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isContent: true
		}

		this.log = false

		if (this.log) console.warn(`Editor: constructor`)
		console.warn(`Props:`, props)
	}

	handlers = {
		handleNameChange: e => {
			const { value } = e.target
			this.setState({ collectionName: value })
		}
	};

	functions = {
		fetchContent: collection => {
			if (this.log) console.log(`Editor: fetchContent`)

			if (collection !== null) {
				const contentIds = collection.content.map(item => item.id)

				if (contentIds.length > 0) this.props.getContent(contentIds)
			}
		},
		updateCollectionName: collectionName => {
			const { collection } = this.props
			this.props.updateCollectionName(collection.id, collectionName)
		},
		togglePublish: e => {
			e.preventDefault()
			const { collection } = this.props
			this.props.updateCollectionStatus(
				collection.id,
				collection.published ? `unpublish` : `publish`
			)
			this.functions.fetchContent(collection)
		},
		createContent: () => {
			this.props.toggleModal({
				component: CreateContent,
				collectionId: this.props.collection.id
			})
		},

		archive: e => {
			e.preventDefault()
			const { collection } = this.props
			this.props.updateCollectionStatus(collection.id, `archive`)
			this.functions.fetchContent(collection)
		},

		setTab: isContent => _e => {
			this.setState({ isContent })
		}
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.log) console.groupCollapsed(`Editor: shouldComponentUpdate`)

		const propDiff = diff(this.props, nextProps)
		const stateDiff = diff(this.state, nextState)

		if (this.log) console.log(`props changes:`, propDiff)
		if (this.log) console.log(`state changes:`, stateDiff)

		const collectionPropDiff = diff(
			this.props.collection,
			nextProps.collection
		)
		const collectionStateDiff = diff(
			this.state.collection,
			nextState.collection
		)
		const collectionChanged =
			!objectIsEmpty(collectionPropDiff) || !objectIsEmpty(collectionStateDiff)

		const contentFetched =
			this.props.contentCache.lastFetched !==
			nextProps.contentCache.lastFetched

		const isContentChanged = stateDiff.hasOwnProperty(`isContent`)

		if (this.log) {
			console.table({
				collectionChanged: {
					value: collectionChanged
				},
				contentFetched: {
					value: contentFetched
				},
				isContentChanged: {
					value: isContentChanged
				}
			})
		}

		const changed = collectionChanged || contentFetched || isContentChanged

		if (this.log) {
			console.log(
				`%c ${changed ? `RENDER` : `NO RENDER`} `,
				`background: ${changed ? `Maroon` : `Teal`}`
			)
		}

		if (this.log) console.groupEnd(`Editor: shouldComponentUpdate`)

		return changed
	};

	render() {
		if (this.log) console.error(`Editor: render`)

		const { isContent } = this.state

		const { collection } = this.props
		const { content } = this.props.contentCache

		if (collection === undefined || collection === null) return `loading...`
		else {
			return (
				<Container>
					<header>
						<TitleEdit
							collection={collection}
							save={this.functions.updateCollectionName}
							key={collection}
						>
						</TitleEdit>
						<div>
							{collection.archived ?
								<p>(archived)</p>
								:
								<>
									<PublishButton
										published={collection.published}
										onClick={this.functions.togglePublish}
									>
										{collection.published ? `Unpublish` : `Publish`}
									</PublishButton>
									<ArchiveButton onClick={this.functions.archive}>
										Archive
									</ArchiveButton>
								</>
							}
						</div>
					</header>
					<TabHeader>
						<button onClick={this.functions.setTab(true)}>Content</button>
						<button onClick={this.functions.setTab(false)}>Roles</button>
						<Selector isContent={isContent} />
					</TabHeader>
					<Tab>
						{isContent ?
							collection.content.map(item => {
								const thisContent = content[item.id]
								return (
									<Overview
										key={item.id}
										collectionId={collection.id}
										content={thisContent}
									/>
								)
							})
							:
							<Roles collection={collection} />
						}
						{isContent &&
							<NewContent onClick={this.functions.createContent}>
								<Icon src={plus} />
							</NewContent>
						}
					</Tab>
				</Container>
			)
		}
	}

	componentDidMount = () => {
		if (this.log) console.warn(`Editor: componentDidMount`)

		if (this.props.collection !== undefined)
			this.functions.fetchContent(this.props.collection)
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (this.log) console.warn(`Editor: componentDidUpdate`)

		if (this.log) console.groupCollapsed(`Editor: componentDidUpdate`)

		const propDiff = diff(prevProps, this.props)
		const stateDiff = diff(prevState, this.state)

		if (this.log) console.log(`props changes:`, propDiff)
		if (this.log) console.log(`state changes:`, stateDiff)

		const collectionPropDiff = diff(
			this.props.collection,
			prevProps.collection
		)
		const collectionStateDiff = diff(
			this.state.collection,
			prevState.collection
		)

		if (this.log) console.log(`collection prop changes:`, collectionPropDiff)
		if (this.log) console.log(`collection state changes:`, collectionStateDiff)

		const collectionPropChanged = !objectIsEmpty(collectionPropDiff)
		const collectionStateChanged = !objectIsEmpty(collectionStateDiff)

		if (this.log) {
			console.table({
				collectionPropChanged: {
					value: collectionPropChanged
				},
				collectionStateChanged: {
					value: collectionStateChanged
				}
			})
		}

		if (collectionStateChanged) {
			if (this.log) console.log(`%c FETCHING CONTENT `, `background: Maroon`)
			this.functions.fetchContent(this.state.collection)
		} else if (this.log) console.log(`%c NO ACTION `, `background: Gray`)

		if (this.log) console.groupEnd(`Editor: componentDidUpdate`)
	};
}

const mapStateToProps = state => ({
	contentCache: state.contentCache,
	collectionsCache: state.collectionsCache
})

const mapDispatchToProps = {
	getContent,
	toggleModal,
	updateCollectionStatus,
	updateCollectionName
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Editor)
