/* eslint-disable array-bracket-newline */

import React from 'react'

import { Container, Search, SearchIcon, Table } from './styles'

import searchIcon from 'assets/search.svg'

const PermissionTable = props => {

	const { data, header, placeholder } = props

	const handleRemove = e => {
		e.preventDefault()

		alert(`This isn't ready yet!`)
	}

	return (
		<Container>
			<h4>{header}</h4>

			<Search>
				<SearchIcon src={searchIcon} />
				<input type='search' placeholder={placeholder} />
			</Search>

			<Table>
				<thead>
					<tr>
						{
							data !== undefined && Object.keys(data[0]).map((column, index) => <th key={index}>{column}</th>)
						}
						<th className={`small`}>Remove</th>
					</tr>
				</thead>
				<tbody>
						{
							// data !== undefined && data.map(item => item.map((value, index) => ))
							data !== undefined && data.map((item, index) => <tr key={index}>
								{
									Object.keys(item).map((key, index2) => <td key={index2}>{item[key]}</td>)
								}
								<td><button onClick={handleRemove}>-</button></td>
							</tr>)
						}
				</tbody>
			</Table>

		</Container>
	)
}

export default PermissionTable