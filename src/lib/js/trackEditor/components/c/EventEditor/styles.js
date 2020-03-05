import styled from 'styled-components'

const Style = styled.div`
	height: calc(100vh - 8.4rem);
	width: 100%;

	font-family: 'Rambla',sans-serif;

	border: 1px solid black;
`

export default Style

const EventsButton = styled.button`
	color: white;
	background-color: ${props => !props.saveTabActive ? `#0157B8` : `#052938`};
	border: none;

	height: 45px;
	padding: 10px;

	font-size: 12px;
	letter-spacing: 0.05rem;

	cursor: pointer;
	outline: none;
`

const EventsTitle = styled.div`
	color: #0157B8;
	background-color: white;
	border-bottom: 1px solid #cccccc;

	font-size: 16px;
	font-weight: bold;

	width: 100%;
	line-height: 50px;
	padding: 0 20px;
`

const Line = styled.div`
	background-color: #0157B8;

	height: 5px;
	width: 100%;
`

const SaveTabButton = styled.button`
	color: white;
	background-color: ${props => props.saveTabActive ? `#0157B8` : `#052938`};
	border: none;

	height: 45px;
	padding: 10px;

	font-size: 12px;
	letter-spacing: 0.05rem;

	cursor: pointer;
	outline: none;
`

const TabBar = styled.div`
	background-color: #052938;
	width: 100%;
`

export {
	EventsButton,
	EventsTitle,
	Line,
	SaveTabButton,
	TabBar,
}