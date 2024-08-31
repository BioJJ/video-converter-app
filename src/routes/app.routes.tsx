import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from '../components/Layout'
import Dashboard from '../pages/Dashboard'
import User from '../pages/User/List'
import Video from '../pages/Video/List'

export enum DashboardRoutesEnum {
	FIRST_SCREEN = '/dashboard'
}

const AppRoutes: React.FC = () => (
	<Layout>
		<Routes>
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/list/user" element={<User />} />
			<Route path="/list/video" element={<Video />} />
		</Routes>
	</Layout>
)

export default AppRoutes
