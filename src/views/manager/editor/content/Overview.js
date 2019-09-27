import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getResources, updateContent } from 'redux/actions'

import ContentSettings from './contentSettings/ContentSettings'
// import Content from 'models/Content'

import {
	Container,
	Preview,
	EditButton,
	Icon,
	TitleEdit,
	PublishButton,
	Thumbnail
} from './styles'

import { diff } from 'js/util'

/**
 * DO NOT EDIT THIS FILE UNLESS YOU KNOW WHAT YOU'RE DOING
 */

class Overview extends Component {

	constructor(props) {
		super(props)

		this.state = {
			editing: false,
			resource: null
		}

		this.log = false

		if (this.log) console.warn(`Overview: constructor`)
	}

	handlers = {
		handleEdit: e => {
			e.preventDefault()

			const { content, editing } = this.state

			if (editing) {
				this.props.updateContent(content)
				this.setState({
					editing: false
				})
			} else {
				this.props.getResources(this.props.content.resourceId)
				this.setState({
					editing: true
				})
			}

		},
		handleNameChange: e => {
			this.setState(prevState => ({
				content: {
					...prevState.content,
					name: e.target.value,
					resource: {
						...prevState.content.resource,
						title: e.target.value
					}
				}
			}))
		},
		handleToggle: e => {
			const { key } = e.target.dataset
			this.setState(prevState => ({
				content: {
					...prevState.content,
					settings: {
						...prevState.content.settings,
						[key]: !prevState.content.settings[key]
					}
				}
			}))
		},
		handleDescription: e => {
			this.setState(prevState => ({
				content: {
					...prevState.content,
					description: e.target.value,
					resource: {
						...prevState.content.resource,
						description: e.target.value
					},
					settings: {
						...prevState.content.settings,
						description: e.target.value
					}
				}
			}))
		},
		handleRatio: e => {
			this.setState(prevState => ({
				content: {
					...prevState.content,
					settings: {
						...prevState.content.settings,
						aspectRatio: e.target.value
					}
				}
			}))
		},
		addTag: newTags => {
			this.setState(prevState => ({
				content: {
					...prevState.content,
					resource: {
						...prevState.content.resource,
						keywords: [...newTags, ...prevState.content.resource.keywords]
					}
				}
			}))
		},
		removeTag: e => {
			e.preventDefault()
			this.setState(prevState => ({
				content: {
					...prevState.content,
					resource: {
						...prevState.content.resource,
						keywords: prevState.content.resource.keywords.filter(item => item !== e.target.dataset.value)
					}
				}
			}))
		},
		togglePublish: e => {
			e.preventDefault()
			this.setState(prevState => ({
				content: {
					...prevState.content,
					published: !prevState.content.published
				}
			}))
		}
	}

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.log) console.groupCollapsed(`Overview: shouldComponentUpdate`)

		const propDiff = diff(this.props, nextProps)
		const stateDiff = diff(this.state, nextState)

		if (this.log) console.log(`props changes:`, propDiff)
		if (this.log) console.log(`state changes:`, stateDiff)

		const resourcesFetched = this.props.resourceCache.lastFetched !== nextProps.resourceCache.lastFetched
		const resourceStateChanged = stateDiff.hasOwnProperty(`resource`)
		const editingChanged = stateDiff.hasOwnProperty(`editing`)

		if (this.log) {
			console.table({
				resourcesFetched: {
					value: resourcesFetched
				},
				resourceStateChanged: {
					value: resourceStateChanged
				},
				editingChanged: {
					value: editingChanged
				}
			})
		}

		const changed = resourcesFetched
			|| resourceStateChanged
			|| editingChanged

		if (this.log) console.log(`%c ${changed ? `RENDER` : `NO RENDER`} `, `background: ${changed ? `Maroon` : `Teal`}`)

		if (this.log) console.groupEnd(`Overview: shouldComponentUpdate`)

		return changed
	}

	render() {

		if (this.log) console.error(`Overveiw: render`)

		const { editing } = this.state
		const { content } = this.props

		if (content === undefined) return null

		const { handleNameChange, handleEdit, togglePublish } = this.handlers

		const {
			allowDefinitions,
			showCaptions,
			showAnnotations
		} = content.settings

		const { isFetching } = this.props.resourceCache

		if (isFetching) return null

		return (
			<Container>
				<Preview>
					<div>
						<Thumbnail src={content.thumbnail} />
					</div>
					<div>
						{editing ?
							<TitleEdit type='text' value={content.name} onChange={handleNameChange} />
							:
							<h4>{content.name}</h4>}
						<ul>
							<Icon className='translation' checked={allowDefinitions} />
							<Icon className='captions' checked={showCaptions} />
							<Icon className='annotations' checked={showAnnotations} />
						</ul>
						{
							editing ?
								<PublishButton published={content.published} onClick={togglePublish}>{content.published ? `Unpublish` : `Publish`}</PublishButton>
								:
								<em>{content.published ? `Published` : `Unpublished`}</em>
						}
					</div>
					<div>
						<EditButton onClick={handleEdit}>{editing ? `Save` : `Edit`}</EditButton>
					</div>
				</Preview>
				{
					editing ?
						isFetching || <ContentSettings handlers={this.handlers} content={content} editing={editing} />
						: null
				}
			</Container>
		)
	}

	componentDidUpdate = (prevProps, prevState) => {

		if (this.log) console.warn(`Overview: componentDidUpdate`)

		if (this.log) console.groupCollapsed(`Overview: componentDidUpdate`)

		const propDiff = diff(prevProps, this.props)
		const stateDiff = diff(prevState, this.state)

		if (this.log) console.log(`props changes:`, propDiff)
		if (this.log) console.log(`state changes:`, stateDiff)

		const resourcesFetched = prevProps.resourceCache.lastFetched !== this.props.resourceCache.lastFetched

		if (this.log) {
			console.table({
				resourcesFetched: {
					value: resourcesFetched
				}
			})
		}

		if (resourcesFetched) {
			if (this.log) console.log(`%c SETTING STATE `, `background: Teal`)

			this.props.content.resource = this.props.resourceCache.resources[this.props.content.resourceId]

			this.setState((_prevState, props) => ({
				resource: props.resourceCache.resources[props.content.resourceId]
			}))
		} else if (this.log) console.log(`%c NO ACTION `, `background: Gray`)

		if (this.log) console.groupEnd(`Overview: componentDidUpdate`)

	}

}

const mapStateToProps = state => ({
	resourceCache: state.resourceCache,
	contentCache: state.contentCache
})

const mapDispatchToProps = {
	getResources,
	updateContent
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
