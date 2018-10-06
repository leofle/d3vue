<template>
<div>
		<CardFlex>
			<Title>{{ $store.getters.msg || 'Welcome to Vue Graph YaY!' }} </Title>
			<img src="../../assets/logo.svg" width="28px" />
		</CardFlex>
	<Card>
		<Form></Form>
	</Card>
	<Card>
		<DonutContainer>
			<Donut width="960" height="500"></Donut>
		</DonutContainer>
	</Card>
</div>
</template>

<script>
import styled from 'vue-styled-components'
import Form from '../Form/Form'
import Donut from '../Donut/DonutChart'

const Container = styled.div`
	display:flex;
	justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const CardFlex = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	word-break: break-word;
	margin: 24px;
	padding: 16px;
	color: #757575;
	border-radius: 5px;
	background-color: #fff;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
`;

const Card = styled.div`
	margin: 24px;
	padding: 16px;
	color: #757575;
	border-radius: 5px;
	background-color: #fff;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
`;

const DonutContainer = styled.div`
		svg {
			margin: auto;
			display: inherit;
		}
`;
  export default {
		name: 'Hello',
		components: {
			Card,
			CardFlex,
			DonutContainer,
			Title,
			Form,
			Donut
  	},
  }
</script>