<script>
import * as d3 from "d3";
import { scaleOrdinal } from "d3-scale";
import { arc as d3Arc, pie as d3Pie } from "d3-shape";
import { csvParse } from "d3-dsv";
import dataCsv from "./data";

export default {
  name: "donut",
  data() {
    return {
      settings: {
        width: 960,
        height: 500
      },
      radius: Math.min(960, 500) / 2,
      color: scaleOrdinal(d3.schemeSet3)
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
            return d.population;
          });
      },
      datos: function() {
        return this.pie(
          csvParse(dataCsv, d => {
            d.population = +d.population;
            return d;
          })
        );
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
	<svg :width="settings.width" :height="settings.height">
		<g class="container" :transform="`translate(${settings.width /2},${settings.height / 2})`">
			<g v-bind:key="d.data.age" v-for="d in datos" class="arc">
				<path :d="`${arc(d)}`" :fill="`${color(d.data.age)}`" />
				<text :transform="`translate(${arc.centroid(d)})`" dy=".35em">
					{{d.data.age}}
				</text>
			</g>
		</g>
	</svg>
</template>