import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContentHeader from '../../../components/ContentHeader'
import Layout from '../../../components/Layout'
import { ButtonCanceled, Container, Select } from './style'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { UserRoutesEnum } from '../routes'
import { useUser } from '../hooks/useUser'

const statusOptions = [
	{ value: 1, label: 'Ativo' },
	{ value: 0, label: 'Inativo' }
]

const Form: React.FC = () => {
	const { userId } = useParams<{ userId: string }>()

	const navigate = useNavigate()

	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [status, setStatus] = useState<number | undefined>(undefined)

	const [update, setUpdate] = useState<boolean>(false)

	const pageData = {
		title: update ? 'Atualizar Usuario' : 'Novo Usuario',
		lineColor: '#4E41F0'
	}

	const { addNewUser, updateUser, getUserById, user, loading } = useUser()

	const handleNewUser = () => {
		if (update) {
			const id = Number(userId)
			updateUser({
				id,
				name,
				email,
				password,
				status
			})
		} else {
			addNewUser({
				name,
				email,
				password,
				status
			})
		}

		navigate(UserRoutesEnum.LIST)
	}

	useEffect(() => {
		mapperActivity()
	}, [user])

	useEffect(() => {
		if (userId) {
			setUpdate(true)
			getUserById(Number(userId))
		}
	}, [])

	const mapperActivity = async () => {
		if (user) {
			setName(user.name)
			setEmail(user.email)
			setPassword(user.password)
			setStatus(user.status ? 1 : 0)
		}
	}
	return (
		<Layout>
			<Container>
				<ContentHeader title={pageData.title} lineColor={pageData.lineColor} />

				<Input
					type="text"
					placeholder="Nome"
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<Input
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				{!update && (
					<Input
						type="password"
						placeholder="Senha"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				)}

				{update && (
					<Select
						value={status}
						onChange={(e) => setStatus(Number(e.target.value))}
					>
						<option value="">Selecione o Status</option>
						{statusOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</Select>
				)}
				<Button
					loading={loading}
					type="primary"
					margin="10px 0px 10px 0px"
					onClick={handleNewUser}
				>
					{update ? 'Atualizar' : 'Cadastrar'}
				</Button>

				<ButtonCanceled href="/list/user">
					<Button type="link" margin="10px 0px 10px 0px">
						Cancelar
					</Button>
				</ButtonCanceled>
			</Container>
		</Layout>
	)
}

export default Form
