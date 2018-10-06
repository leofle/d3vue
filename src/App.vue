<script>
import styled from 'vue-styled-components';
import * as d3 from 'd3'

const linksContainer = styled.div`
	display:flex;
	justify-content: center;
  height: 65px;
  align-items: center;
  box-shadow: 4px 0px 15px #ccc;
  background-color: #fff;
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
  	beforeCreate() {
    this.$nextTick(function() {
      this.changed()
      this.getdata()
    })

	},
  mounted(){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  },
  methods:{
    changed: function() {
      d3.json("flare.json").then(graph => {
        this.$store.commit('change', graph)
      });
    },
    getdata: function() {
      d3.json("data.json").then(data => {
        this.$store.commit('getdata', data)
      });
    },
  }
}
</script>

<template>
  <div id="app">
    <linksContainer>
      <router-link :to="{ name: 'Hello' }">Home</router-link>
      <router-link to="/graphsvg">GraphSvg</router-link>
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
  background-color: #eeeeee;
}

</style>
