import { configureStore } from '@reduxjs/toolkit'

import globalReducer from './reducers/globalReducer'

import userReducer from './reducers/userReducer'
import videoReducer from './reducers/videoReducer'

export const store = configureStore({
	reducer: {
		globalReducer,
		userReducer,
		videoReducer
	}
})

export type RootState = ReturnType<typeof store.getState>

export default store
