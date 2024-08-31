import { useDispatch } from 'react-redux'

import { UserType } from '../../../types/UserType'
import { User } from '../../../types/User'
import { useAppSelector } from '../../hooks'
import { setUsersAction, setCollaboratorsAction, setUserAction } from '.'

export const useUserReducer = () => {
	const dispatch = useDispatch()
	const { users, user, userList } = useAppSelector((state) => state.userReducer)

	const setUsers = (users: UserType[]) => {
		dispatch(setUsersAction(users))
	}

	const setCollaborators = (users: User[]) => {
		dispatch(setCollaboratorsAction(users))
	}

	const setUser = (user: User) => {
		dispatch(setUserAction(user))
	}

	return {
		users,
		user,
		userList,
		setUsers,
		setUser,
		setCollaborators
	}
}
