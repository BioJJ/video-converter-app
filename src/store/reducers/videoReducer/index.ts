import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Video } from '../../../types/Video'

interface VideoState {
	videos: Video[]
	video: Video
}

const initialState: VideoState = {
	videos: [],
	video: {
		model: '',
		color: '',
		plate: '',
		user: null
	}
}

export const counterSlice = createSlice({
	name: 'videoReducer',
	initialState,
	reducers: {
		setVideosAction: (state, action: PayloadAction<Video[]>) => {
			state.videos = action.payload
		},
		setVideoAction: (state, action: PayloadAction<Video>) => {
			state.video = action.payload
		}
	}
})

export const { setVideoAction, setVideosAction } = counterSlice.actions

export default counterSlice.reducer
