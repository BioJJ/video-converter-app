import { User } from './User'

export interface Video {
	id?: number
	title?: string
	videoId?: string
	status?: string
	user?: User | null
	file?: File
}
