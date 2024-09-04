import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserType } from '../../../types/UserType'
import { User } from '../../../types/User'

interface UserState {
	users: UserType[]
	userList: User[]
	user: User
}

const initialState: UserState = {
	users: [],
	userList: [],
	user: {
		name: '',
		email: '',
		password: '',
		status: true
	}
}

export const counterSlice = createSlice({
	name: 'userReducer',
	initialState,
	reducers: {
		setUsersAction: (state, action: PayloadAction<UserType[]>) => {
			state.users = action.payload
		},
		setCollaboratorsAction: (state, action: PayloadAction<User[]>) => {
			state.userList = action.payload
		},
		setUserAction: (state, action: PayloadAction<User>) => {
			state.user = action.payload
		}
	}
})

export const { setUsersAction, setCollaboratorsAction, setUserAction } =
	counterSlice.actions

export default counterSlice.reducer
