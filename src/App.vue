<script>
import styled from 'vue-styled-components';

const linksContainer = styled.div`
	display:flex;
	justify-content: center;
  height: 100px;
  align-items: center;
  box-shadow: 4px 0px 15px #ccc;
  a {
    text-decoration: none;
    color: #000;
    position:relative;
    padding:10px;
    &:hover {
      &:before {
        content:'';
        position:absolute;
        bottom:-3px;
        left:0;
        width:100%;
        height:4px;
        background: #000;
      }
    }
    &.router-link-exact-active.router-link-active {
      &:before {
        content:'';
        position:absolute;
        bottom:-3px;
        left:0;
        width:100%;
        height:4px;
        background: #000;
      }
    }
  }
`;

export default {
  name: 'app',
  data(){
    return {
      width: 900,
      height: 600
    }
  },
  components: {
    linksContainer
  },
  mounted(){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  },
  methods:{

  }
}
</script>

<template>
  <div id="app">
    <linksContainer>
      <router-link :to="{ name: 'Hello' }">Home</router-link>
      <router-link to="/graph">Graph</router-link>
    </linksContainer>
    <router-view></router-view>
  </div>
</template>

<style>
html, body {
  width:  100%;
  height: 100%;
  margin: 0px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
