import { RouteObject } from 'react-router-dom'

import List from './List'
import Form from './forms'

export enum VideoRoutesEnum {
	LIST = '/list/video',
	Video_INSERT = '/video/created',
	Video_EDIT = '/video/:videoId'
}

export const listVideo: RouteObject[] = [
	{
		path: VideoRoutesEnum.LIST,
		element: <List />
	},
	{
		path: VideoRoutesEnum.Video_INSERT,
		element: <Form />
	},
	{
		path: VideoRoutesEnum.Video_EDIT,
		element: <Form />
	}
]
