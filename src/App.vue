<script>
import Graph from './components/Graph.vue'
import styled from 'vue-styled-components';

const StyledTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
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
    Graph,
    StyledTitle
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
    <StyledTitle>Wellcome to Vue Graph! YaY! 🤘</StyledTitle>
    <Graph :width="width" :height="height"/>
  </div>
</template>

<style>
html, body {
  width:  100%;
  height: 100%;
  margin: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height:100%;
}
</style>
