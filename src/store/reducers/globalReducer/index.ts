import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserType } from '../../../types/UserType'
import { NotificationType } from '../../../types/NotificationType'

interface GlobalState {
	notification?: NotificationType
	user: UserType
}

const initialState: GlobalState = {
	notification: undefined,
	user: {
		id: 0,
		name: '',
		email: ''
	}
}

export const counterSlice = createSlice({
	name: 'globalReducer',
	initialState,
	reducers: {
		setNotificationAction: (state, action: PayloadAction<NotificationType>) => {
			state.notification = action.payload
		},
		setUserAction: (state, action: PayloadAction<UserType>) => {
			state.user = action.payload
		}
	}
})

export const { setNotificationAction, setUserAction } = counterSlice.actions

export default counterSlice.reducer
