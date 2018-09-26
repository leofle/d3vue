<template>
  <Container>
    <Title>{{ msg }}</Title>
  </Container>
</template>

<script>
import styled from 'vue-styled-components';

const Container = styled.div`
	display:flex;
	justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

  export default {
    name: 'Hello',
    data () {
      return {
        msg: 'Welcome to Vue Graph YaY! 🤘'
      }
		},
		components: {
			Container,
			Title
  	},
  }
</script>