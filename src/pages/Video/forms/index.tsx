import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContentHeader from '../../../components/ContentHeader'
import Layout from '../../../components/Layout'
import { ButtonCanceled, CenteredImage, Container } from './style'
import { useVideo } from '../hooks/useVideo'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { VideoRoutesEnum } from '../routes'

export interface SelectedFile {
	name: string
	size: number
	type: string
}

const Form: React.FC = () => {
	const { videoId } = useParams<{ videoId: string }>()

	const navigate = useNavigate()

	const [title, setTitle] = useState<string>('')
	const [gifUrl, setGifUrl] = useState<string | null>(null)
	const [videoFile, setVideoFile] = useState<File>({} as File)

	const [update, setUpdate] = useState<boolean>(false)

	const { addNewVideo, getVideoById, updateVideo, loading, video, getGifById } =
		useVideo()

	const pageData = {
		title: update ? 'Atualizar Upload' : 'Novo Upload',
		lineColor: '#4E41F0'
	}

	const handleNewVideo = () => {
		if (update) {
			const id = Number(videoId)
			updateVideo({
				id,
				title,
				file: videoFile
			})
		} else {
			addNewVideo({
				title,
				file: videoFile
			})
		}

		setTitle('')
		setGifUrl(null)

		navigate(VideoRoutesEnum.LIST)
	}

	useEffect(() => {
		mapperActivity()
	}, [video])

	useEffect(() => {
		if (videoId) {
			setUpdate(true)
			getVideoById(Number(videoId))
		}
	}, [])

	useEffect(() => {
		const fetchGif = async () => {
			if (videoId) {
				setUpdate(true)
				await getVideoById(Number(videoId))

				const response = await getGifById(Number(videoId))
				setGifUrl(response)
			}
		}
		fetchGif()
	}, [videoId])

	const mapperActivity = async () => {
		if (video) {
			setTitle(video.title as string)
			setGifUrl(video.videoId as string)
		}
	}
	return (
		<Layout>
			<Container>
				<ContentHeader title={pageData.title} lineColor={pageData.lineColor} />

				<Input
					type="text"
					placeholder="Titulo"
					required
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				{videoId && gifUrl && (
					<CenteredImage>
						<img
							src={gifUrl}
							alt={gifUrl}
							style={{ width: '350px', height: 'auto' }}
						/>
					</CenteredImage>
				)}

				{!gifUrl && (
					<Input
						type="file"
						accept="video/*"
						onChange={(e) => {
							if (e.target.files) {
								setVideoFile(e.target.files[0])
							}
						}}
						required
					/>
				)}

				<Button
					loading={loading}
					type="primary"
					margin="10px 0px 10px 0px"
					onClick={handleNewVideo}
				>
					{update ? 'Atualizar' : 'Cadastrar'}
				</Button>

				<ButtonCanceled href="/list/video">
					<Button type="link" margin="10px 0px 10px 0px">
						Cancelar
					</Button>
				</ButtonCanceled>
			</Container>
		</Layout>
	)
}

export default Form
