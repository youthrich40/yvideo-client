import styled from 'styled-components'

const Style = styled.div`
	background-color: #F1F1F1;
	height: 100%;
`

export default Style

const SaveButtonArea = styled.div`
	height: 100px;
	margin: 0;
	padding: 0 20px;
	background: #FFF;
	border-bottom: 1px solid #cccccc;
`

const Description = styled.div`
	color: #0157b8;
	font-weight: 550;
	font-size: 15px;
	line-height: 1;
	padding: 20px 0 10px 0;
	text-transform: capitalize;
	margin: 0;
`

const SaveButton = styled.button`
	background: #0157b8;
	color: #FFF;
	padding: 0 10px;
	line-height: 33px;
	border: 1px solid #001e8b;
	border-top-color: #00319a;
	border-bottom-color: #000b35;
	border-radius: 2px;
	box-shadow: inset 0 1px 0 #226acf;
	outline: none;
`

export {
	Description,
	SaveButton,
	SaveButtonArea,
}