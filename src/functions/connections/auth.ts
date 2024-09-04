import { NavigateFunction, redirect } from 'react-router-dom'

import { LoginRoutesEnum } from '../../routes/auth.routes'
import {
	AUTHORIZATION_KEY,
	USER_KEY
} from '../../constants/authorizationConstants'
import {
	getItemStorage,
	removeItemStorage,
	setItemStorage
} from './storageProxy'
import { UserType } from '../../types/UserType'

export const unsetAuthorizationToken = () =>
	removeItemStorage(AUTHORIZATION_KEY)

export const setAuthorizationToken = (token?: string) => {
	if (token) {
		setItemStorage(AUTHORIZATION_KEY, token)
	}
}

export const setUserLogado = (user?: UserType) => {
	if (user) {
		setItemStorage(USER_KEY, JSON.stringify(user))
	}
}

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY)

export const getUserLogado = () => {
	return JSON.parse(getItemStorage(USER_KEY) as string) as UserType
}

export const verifyLoggedIn = async () => {
	const token = getAuthorizationToken()

	if (!token) {
		return redirect(LoginRoutesEnum.LOGIN)
	}

	return null
}

export const logout = (navigate: NavigateFunction) => {
	unsetAuthorizationToken()
	navigate(LoginRoutesEnum.LOGIN)
}
