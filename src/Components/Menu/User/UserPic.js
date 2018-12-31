import React from 'react'
import styled from 'styled-components'

const StyledUserPic = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	
	height: 3.6rem;
	width: 3.6rem;

	border: .1rem solid black;
	border-radius: 50%;

	outline: none;

	font-weight: 500;
	font-size: 1.8rem;

	background-color: white;

	:hover {
		cursor: pointer;
	}
`,

	UserPic = props => {
		return (
			<StyledUserPic onClick={props.toggleMenu}>
				{props.initials}
			</StyledUserPic>
		)
	}

export default UserPic