import React, { useEffect, useMemo, useState } from 'react'
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import grinningImg from '../../assets/grinning.svg'
import opsImg from '../../assets/ops.svg'

import { Container, Content } from './style'
import WalletBox from '../../components/Dashboard/WalletBox'
import MessageBox from '../../components/Dashboard/MessageBox'
import PieChartBox from '../../components/Dashboard/PieChartBox'
import Layout from '../../components/Layout'

import { useVideo } from '../Video/hooks/useVideo'
import { useUser } from '../User/hooks/useUser'

const Dashboard: React.FC = () => {
	const [statusSelected, setStatusSelected] = useState<number | undefined>(
		undefined
	)

	const statusOptions = useMemo(
		() => [
			{ value: '', label: 'Todos' },
			{ value: 1, label: 'Ativos' },
			{ value: 0, label: 'Inativos' }
		],
		[]
	)

	const { getAllVideos, loading, videos } = useVideo()
	const { getAllUsers, loading: loadingUser, userList } = useUser()

	useEffect(() => {
		getAllVideos()
		getAllUsers()
	}, [loading, loadingUser])

	const filteredVideos = useMemo(() => {
		return videos.filter((video) => {
			if (statusSelected === undefined) return true

			const isActive = statusSelected === 1

			return Boolean(video.status) === isActive
		})
	}, [statusSelected, videos])

	const handleStatusSelected = (status: string) => {
		const parseStatus = status === '' ? undefined : Number(status)
		setStatusSelected(parseStatus)
	}

	const totalUsers = useMemo(() => {
		let total: number = 0

		userList.forEach((item) => {
			if (item.id) {
				total += 1
			}
		})

		return total
	}, [userList])

	const totalUploadsAtivo = useMemo(() => {
		let total: number = 0

		filteredVideos.forEach((item) => {
			if (item.status) {
				total += 1
			}
		})

		return total
	}, [filteredVideos])

	const totalUploadsInativo = useMemo(() => {
		let total: number = 0

		filteredVideos.forEach((item) => {
			if (!item.status) {
				total += 1
			}
		})

		return total
	}, [filteredVideos])

	const totalBalance = useMemo(() => {
		return totalUploadsAtivo + totalUsers - totalUploadsInativo
	}, [totalUploadsAtivo, totalUsers, totalUploadsInativo])

	const message = useMemo(() => {
		if (totalBalance < 0) {
			return {
				title: 'Que triste!',
				description: 'Neste mês, você não movimentação.',
				footerText: 'Verifique os serviços e usuarios ativos na plataforma.',
				icon: sadImg
			}
		} else if (totalUploadsAtivo === 0 && totalUsers === 0) {
			return {
				title: "Op's!",
				description: 'Neste mês, não há registros de Atividades.',
				footerText:
					'Parece que você não fez nenhum registro no Status selecionado.',
				icon: opsImg
			}
		} else if (totalBalance === 0) {
			return {
				title: 'Ufaa!',
				description: 'Você concluio todas as atividades',
				footerText: 'Parabens.',
				icon: happyImg
			}
		} else {
			return {
				title: 'Muito bem!',
				description: 'Serviços a todo vapor!',
				footerText: 'Foco.',
				icon: grinningImg
			}
		}
	}, [totalBalance, totalUploadsAtivo, totalUsers])

	const relationPendenteVersusAndamentoVersusConcluido = useMemo(() => {
		const total = totalUploadsAtivo + totalUsers + totalUploadsInativo

		const percentPendent = Number(((totalUsers / total) * 100).toFixed(1))
		const percentAndamento = Number(
			((totalUploadsAtivo / total) * 100).toFixed(1)
		)
		const percentConcluido = Number(
			((totalUploadsInativo / total) * 100).toFixed(1)
		)

		const data = [
			{
				name: 'Users',
				value: totalUsers,
				percent: percentPendent ? percentPendent : 0,
				color: '#4E41F0'
			},
			{
				name: 'Uploads Ativos',
				value: totalUploadsAtivo,
				percent: percentAndamento ? percentAndamento : 0,
				color: '#F7931B'
			},
			{
				name: 'Uploads inativo',
				value: totalUploadsInativo,
				percent: percentConcluido ? percentConcluido : 0,
				color: '#E44C4E'
			}
		]

		return data
	}, [totalUploadsAtivo, totalUsers, totalUploadsInativo])

	return (
		<Layout>
			<Container>
				<ContentHeader title="Dashboard" lineColor="#F7931B">
					<SelectInput
						options={statusOptions}
						onChange={(e) => handleStatusSelected(e.target.value)}
						defaultValue={statusSelected}
					/>
				</ContentHeader>

				<Content>
					<WalletBox
						title="Users"
						color="#4E41F0"
						amount={totalUsers}
						footerlabel="atualizado com base nas Atividades de usuarios"
						icon="dolar"
					/>

					<WalletBox
						title="Uploads Ativos"
						color="#F7931B"
						amount={totalUploadsAtivo}
						footerlabel="atualizado com base nas Atividades nos Uploads Ativos"
						icon="arrowUp"
					/>

					<WalletBox
						title="Uploads Inativos"
						color="#E44C4E"
						amount={totalUploadsInativo}
						footerlabel="atualizado com base nos Uploads Inativos"
						icon="arrowDown"
					/>

					<MessageBox
						title={message.title}
						description={message.description}
						footerText={message.footerText}
						icon={message.icon}
					/>

					<PieChartBox
						data={relationPendenteVersusAndamentoVersusConcluido}
						title="Status Atividades"
					/>
				</Content>
			</Container>
		</Layout>
	)
}

export default Dashboard
