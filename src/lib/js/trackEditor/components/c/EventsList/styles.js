import styled from 'styled-components'

const Style = styled.div`
	background-color: #f1f1f1;

	padding: 20px;
	height: 100%;
`

export default Style

const EventType = styled.div`
	text-transform: capitalize;
	position: relative;
	background: #FFF;
	box-shadow: 1px 5px 2px -3px rgba(0, 0, 0, 0.1);
	border: 1px solid #CCC;
	border-radius: 2px;
	border-top-color: #E3E3E3;
	border-bottom-color: #BDBDBD;
	color: #555;
	font-size: 13px;
	line-height: 24px;
	cursor: move;
	padding: 8px;
	height: 30px;
	margin-bottom: 10px;
	display: block;
	text-decoration: none;
`

export {
	EventType,
}