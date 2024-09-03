import { useState } from 'react'

import { useVideoReducer } from '../../../store/reducers/videoReducer/userVideoReducer'
import { Video } from '../../../types/Video'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import { URL_VIDEO } from '../../../constants/urls'
import {
	connectionAPIPostFile,
	connectionAPIGet,
	connectionAPIPut
} from '../../../functions/connections/connectionsAPI'
import { getUserLogado } from '../../../functions/connections/auth'

const BASE_URL = 'http://localhost:3000/'

export const useVideo = () => {
	const [loading, setLoading] = useState(false)
	const { setNotification } = useGlobalReducer()

	const { video, videos, setVideo, setVideos } = useVideoReducer()

	const getVideos = async (): Promise<void> => {
		setLoading(true)
		await connectionAPIGet<Video[]>(
			`${URL_VIDEO}/user/${getUserLogado().id}`
		).then((result) => {
			setVideos(result)
			setLoading(false)
		})
	}

	const addNewVideo = async (body: Video): Promise<void> => {
		setLoading(true)
		await connectionAPIPostFile<Video>(URL_VIDEO, body).then((result) => {
			setNotification('Video cadastrada com sucesso!', 'success')
		})

		getVideos().catch(() => {
			setNotification('Erro ao cadastrar Video', 'error')
			return undefined
		})

		setLoading(false)
	}

	const getVideoById = async (id: number): Promise<void> => {
		setLoading(true)

		await connectionAPIGet<Video>(`${URL_VIDEO}/${id}`)
			.then((result) => {
				setVideo(result)

				return result
			})
			.catch(() => {
				setNotification('Erro ao buscar Video', 'error')
				return undefined
			})
		setLoading(false)
	}

	const updateVideo = async (body: Video): Promise<void> => {
		setLoading(true)

		await connectionAPIPut(`${URL_VIDEO}/${body.id}`, body)
			.then((result) => {
				setNotification('Video Atualizada com sucesso!', 'success')
			})
			.catch(() => {
				setNotification('Erro ao Atualizar Video', 'error')
				return undefined
			})

		setLoading(false)
	}

	const getGifById = async (videoId: number): Promise<string | null> => {
		return await connectionAPIGet<string>(`${URL_VIDEO}/${videoId}/gif`).then(
			(result) => {
				return BASE_URL+result
			}
		)
	}

	return {
		addNewVideo,
		getVideoById,
		updateVideo,
		loading,
		video,
		getVideos,
		videos,
		getGifById
	}
}
