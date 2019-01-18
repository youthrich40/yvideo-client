import React, { Component } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import BlockCollectionItem from './BlockCollectionItem'

import arrowLeft from './arrow-left.svg'
import arrowRight from './arrow-right.svg'

const StyledBlockCollection = styled.div`
	padding: 2rem;

	& > div {
		position: relative;
	}
`,

	CollectionHeader = styled.div`
		display: grid;
		grid-template-columns: 18rem auto;
		justify-items: start;
		padding-bottom: 2rem;

		& > p {
			color: #a4a4a4;
		}

		& a {
			color: black;
			text-decoration: none;
		}
	`,

	SlideWrapper = styled.div`
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: ${props => 'repeat(' + props.count + ', 17.8rem)'};
		grid-gap: 5rem;

		overflow-x: scroll;
		overflow-y: hidden;

		::-webkit-scrollbar {
			background: transparent;
		}

		& > div:last-child {
			padding-right: 6rem;
		}
	`,

	Arrow = styled.div`

		display: flex;
		align-items: center;
		justify-content: center;

		position: absolute;
		top: 0;

		height: 10rem;
		width: 6rem;

		cursor: pointer;

		&.right{
			right: 0;
			background-image: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0));

			& > div {
				height: 1.5rem;
				width: 1.5rem;

				transition: opacity .25s ease-in-out;
				opacity: ${props => props.right ? '0' : '1'};
				background-image: url(${arrowRight});
				background-size: cover;
			}
		}

		&.left {
			left: ${props => props.hideLeft ? '-100rem' : '0'};

			transition: opacity .25s ease-in-out;
			opacity: ${props => props.left ? '0' : '1'};
			background-image: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0));

			& > div {
				height: 1.5rem;
				width: 1.5rem;

				transition: opacity .25s ease-in-out;
				opacity: ${props => props.left ? '0' : '1'};
				background-image: url(${arrowLeft});
				background-size: cover;
			}
		}

	`

export default class BlockCollection extends Component {
	constructor(props) {
		super(props)

		this.state = {
			left: true,
			hideLeft: true
		}

		this.wrapper = React.createRef()

		this.scrollListener = this.scrollListener.bind(this)
		this.scrollLeft = this.scrollLeft.bind(this)
		this.scrollRight = this.scrollRight.bind(this)
	}

	componentDidMount() {
		window.addEventListener('scroll', this.scrollListener, { passive: true })
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollListener)
	}

	scrollListener(e) {
		if (e.target.scrollLeft === 0) {
			this.setState({
				left: true
			}, () => {
				setTimeout(() => {
					this.setState({
						hideLeft: true
					})
				}, 250)
			})
		} else {
			this.setState({
				hideLeft: false
			}, () => {
				this.setState({
					left: false
				})
			})
		}
	}

	scrollLeft() {
		const sl = this.wrapper.current.scrollLeft
		this.wrapper.current.scrollLeft = sl - 178
	}

	scrollRight() {
		const sl = this.wrapper.current.scrollLeft
		this.wrapper.current.scrollLeft = sl + 178
	}

	render() {
		const { name, count } = this.props.data
		return (
			<StyledBlockCollection>
				<CollectionHeader>
					<Link to={'/'}>{name}</Link>
					<p>{count} Videos</p>
				</CollectionHeader>
				<div>
					<Arrow className='left' left={this.state.left} hideLeft={this.state.hideLeft} onClick={this.scrollLeft}>
						<div />
					</Arrow>
					<SlideWrapper count={count} onScroll={this.scrollListener} ref={this.wrapper}>
						{
							_VideoPreview.map(item => <BlockCollectionItem key={item.contentId} data={item} />)
						}
					</SlideWrapper>
					<Arrow className='right' onClick={this.scrollRight}>
						<div />
					</Arrow>
				</div>
			</StyledBlockCollection>
		)
	}
}

const _VideoPreview = [
	{
		'contentId': 1,
		'name': 'Emilie Muller',
		'thumbnail': '',
		'collection': 'German Public Content',
		'translation': true,
		'captions': true,
		'annotations': true
	},
	{
		'contentId': 2,
		'name': 'The Longest Yeah Boy Ever',
		'thumbnail': '',
		'collection': 'Collection 117',
		'translation': false,
		'captions': true,
		'annotations': true
	},
	{
		'contentId': 3,
		'name': 'Detroit',
		'thumbnail': '',
		'collection': 'Collection 117',
		'translation': true,
		'captions': false,
		'annotations': false
	},
	{
		'contentId': 4,
		'name': 'Les Choristes',
		'thumbnail': '',
		'collection': 'French Class',
		'translation': false,
		'captions': false,
		'annotations': false
	},
	{
		'contentId': 5,
		'name': 'Pauvre Garcon',
		'thumbnail': '',
		'collection': 'French Class',
		'translation': true,
		'captions': false,
		'annotations': false
	}
]