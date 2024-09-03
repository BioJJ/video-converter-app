import styled from 'styled-components'

export const Container = styled.div``

export const ButtonCanceled = styled.a`
	color: ${(props) => props.theme.colors.info};
	text-decoration: none;

	margin: 7px 0;
	display: flex;
	align-items: center;

	transition: opacity 0.3s;

	&:hover {
		opacity: 0.7;
	}

	> svg {
		font-size: 18px;
		margin-right: 5px;
	}
`

export const CenteredImage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px 0;
`
