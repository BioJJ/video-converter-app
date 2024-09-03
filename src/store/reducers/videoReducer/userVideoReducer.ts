import { useDispatch } from 'react-redux'

import { Video } from '../../../types/Video'
import { useAppSelector } from '../../hooks'
import { setVideoAction, setVideosAction } from '.'

export const useVideoReducer = () => {
	const dispatch = useDispatch()
	const { videos, video } = useAppSelector((state) => state.videoReducer)

	const setVideos = (Video: Video[]) => {
		dispatch(setVideosAction(Video))
	}
	const setVideo = (Video: Video) => {
		dispatch(setVideoAction(Video))
	}

	return {
		videos, 
		video,
		setVideo,
		setVideos
	}
}
