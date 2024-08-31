import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useRequests } from '../../hooks/auth'

import { Container, Logo, Form, FormTitle, FormRegister } from './style'

const SignIn: React.FC = () => {
	const navigate = useNavigate()
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const [register, setRegister] = useState<boolean>(false)

	const { authRequest, newUserRequest, loading } = useRequests()

	const handleLogin = () => {
		authRequest(navigate, {
			email,
			password
		})
	}

	const handleNewUser = () => {
		newUserRequest(navigate, {
			name,
			email,
			password
		})

		setTimeout(toggleRegister, 3000)
	}

	const toggleRegister = () => {
		setRegister(!register)
	}

	return (
		<Container>
			<Logo>
				<img src={logoImg} alt="VideoConverterApp" />
				<h2>Video Converter App</h2>
			</Logo>

			{register ? (
				<FormRegister>
					<FormTitle>Cadastrar</FormTitle>

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

					<Input
						type="password"
						placeholder="Senha"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button
						loading={loading}
						type="primary"
						margin="10px 0px 10px 0px"
						onClick={handleNewUser}
					>
						Cadastrar
					</Button>

					<Button
						type="link"
						margin="10px 0px 16px 0px"
						onClick={toggleRegister}
					>
						Cancelar
					</Button>
				</FormRegister>
			) : (
				<Form>
					<FormTitle>Entrar</FormTitle>

					<Input
						type="email"
						placeholder="e-mail"
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						placeholder="senha"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button
						loading={loading}
						type="primary"
						margin="10px 0px 10px 0px"
						onClick={handleLogin}
					>
						Acessar
					</Button>

					<Button
						type="link"
						margin="10px 0px 16px 0px"
						onClick={toggleRegister}
					>
						Cadastrar
					</Button>
				</Form>
			)}
		</Container>
	)
}

export default SignIn
