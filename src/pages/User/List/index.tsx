import React, { useEffect } from 'react'
import ContentHeader from '../../../components/ContentHeader'
import Layout from '../../../components/Layout'
import { Container, Content } from './style'
import { useUser } from './../hooks/useUser'
import ListCard from '../../../components/ListCard'

const List: React.FC = () => {
	const { getUsers, userList } = useUser()

	useEffect(() => {
		getUsers()
	}, [])

	const pageData = {
		title: 'User',
		lineColor: '#4E41F0'
	}

	return (
		<Layout>
			<Container>
				<ContentHeader
					title={pageData.title}
					lineColor={pageData.lineColor}
				></ContentHeader>

				<Content>
					{userList.map((item) => (
						<ListCard
							key={item.id}
							tagColor={'#4E41F0'}
							title={item.name}
							subtitle={item.email}
							amount={String(item.status ? 'Ativo' : 'Inativo')}
							url={`/user/${item.id}`}
						/>
					))}
				</Content>
			</Container>
		</Layout>
	)
}

export default List
