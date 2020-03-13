import styled from 'styled-components'

const Style = styled.div`

`

export default Style

export const Form = styled.form`

`

export const StartEndArea = styled.div`
	padding: 10px 20px;
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: ${props => `repeat(${props.count}, 17.8rem)`};
	grid-gap: 5rem;
`