<template>
  <div id="app">
    <Balls />
    <Graph :width="width" :height="height"/>
  </div>
</template>

<script>
import Graph from './components/Graph.vue'

export default {
  name: 'app',
  data(){
    return {
      width: 900,
      height: 600
    }
  },
  components: {
    Graph
  },
  mounted(){
    this.width = 900;
    this.height = 600;
  },
  methods:{

  }
}
</script>

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
