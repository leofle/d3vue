<script>
import * as d3 from "d3";
import { scaleOrdinal } from "d3-scale";
import { arc as d3Arc, pie as d3Pie } from "d3-shape";
import styled from 'vue-styled-components'

const Flex = styled.div`
  display:flex;
  flex-flow: row;
  align-items: center;
`;

const btnProps = { primary: Boolean };
const Button = styled('button', btnProps)`
    background: ${props=> props.primary? 'cyan' : 'hotpink'};
    height: 40px;
    border: none;
    border-radius: 6px;
    margin: 4px;
    outline:none;
`;

const InputDonut = styled.div`
  input {
		height: 33px;
    outline: none;
    line-height: 30px;
    font-size: 14px;
    margin: 2px;
    padding: 0 10px;
  }
`;

export default {
  name: "donut",
  components: {
    Button,
    InputDonut,
    Flex
  },
  props: {width:Number, height:Number},
  data() {
    return {
      settings: {
        width: this._props.width,
        height: this._props.height
      },
      datos: this.$store.getters.datag,
      radius: Math.min(this._props.width, this._props.height) / 2,
      color: scaleOrdinal(d3.schemeSet3),
      country:'',
      wins:0
    };
  },
  beforeCreate() {
    this.$nextTick(function() {
    });
	},
	computed:{
      arc: function() {
        return d3Arc()
          .outerRadius(this.radius - 10)
          .innerRadius(this.radius - 70);
      },
      pie: function() {
        return d3Pie()
          .sort(null)
          .value(function(d) {
            return d.wins;
          });
      },
      data: function() {
        return JSON.parse(JSON.stringify( this.pie(this.$store.getters.datag) ));
      }
  },
  methods: {
    addCountry: function() {
      if(!this.country || !this.wins) return;
      let data = {
        "team": this.country,
        "wins": this.wins
      }
      let res = JSON.parse(JSON.stringify( [...this.$store.getters.datag,data]));
      this.$store.commit('getdata', res);
    },
    changeCountry: function(event) {
      this.country = event.target.value;
    },
    changeWins: function(event) {
      this.wins = Number(event.target.value)
    }
  }
};

</script>
<style>
svg {
	display:flex;
}
.arc text {
  font: 10px sans-serif;
  text-anchor: middle;
}

.arc path {
  stroke: #fff;
}
</style>
<template>
<div>
	<svg :width="settings.width" :height="settings.height">
		<g class="container" :transform="`translate(${settings.width /2},${settings.height / 2})`">
			<g v-bind:key="d.data.team" v-for="d in data" class="arc">
				<path :d="`${arc(d)}`" :fill="`${color(d.data.team)}`" />
				<text :transform="`translate(${arc.centroid(d)})`" dy=".35em">
					{{d.data.team}}
				</text>
			</g>
		</g>
	</svg>
  <Flex>
    <InputDonut>
    <input type="text"
      placeholder="Add Country"
      @input="changeCountry"
    />
    </InputDonut>
    <InputDonut>
    <input type="text"
      placeholder="Add Wins"
      @input="changeWins"
    />
    </InputDonut>
    <Button primary v-on:click="addCountry">Add</Button>
  </Flex>
    <p>{{country}} {{wins}}</p>
  </div>
</template>