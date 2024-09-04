import React, { useEffect } from 'react'
import ContentHeader from '../../../components/ContentHeader'
import Layout from '../../../components/Layout'
import { ButtonNewVideo, Container, NewVideo, Content } from './style'
import ListCard from '../../../components/ListCard'
import { useVideo } from './../hooks/useVideo'
import Button from '../../../components/Button'

const List: React.FC = () => {
	const { getVideos, videos } = useVideo()

	useEffect(() => {
		getVideos()
	}, [])

	const pageData = {
		title: 'Videos',
		lineColor: '#4E41F0'
	}

	return (
		<Layout>
			<Container>
				<ContentHeader
					title={pageData.title}
					lineColor={pageData.lineColor}
				></ContentHeader>

				<NewVideo>
					<ButtonNewVideo href="/video/created">
						<Button type="primary" margin="10px 0px 10px 0px">
							Novo Upload
						</Button>
					</ButtonNewVideo>
				</NewVideo>

				<Content>
					{videos.map((item) => (
						<ListCard
							key={item.id}
							tagColor={'#4E41F0'}
							title={item.title as string}
							subtitle={item.videoId as string}
							amount={String(item.status ? 'Ativo' : 'Inativo')}
							url={`/video/${item.id}`}
						/>
					))}
				</Content>
			</Container>
		</Layout>
	)
}

export default List
