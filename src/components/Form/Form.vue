<template>
  <InputContainer>
    <label for="msg">Change the title </label>
    <input @input="changed" name="msg"/>
  </InputContainer>
</template>

<script>
import styled from 'vue-styled-components';

const InputContainer = styled.div`
		input {
		height: 38px;
		border-radius: 8px;
		border: 1px solid #ccc;
		width: calc(100% - 134px);
		line-height: 1.5;
		font-size: 18px;
		padding: 0 5px;
		&:focus {
			outline:none;
		}
		}
`;

export default {
  methods: {
    changed: function(event) {
      this.$store.commit('changeText', event.target.value)
    }
	},
			components: {
				InputContainer
  	}
}
</script>