<template>
<div id="graph">
	<canvas :width="width" :height="height"></canvas>
	<p>{{width}}<br>{{height}}</p>
</div>
</template>

<script>
import * as d3 from 'd3'
import { scaleOrdinal } from 'd3-scale'

export default {
	name: 'graph',
	data(){
		return {
			width:0,
			height:0
		}
	},
	beforeCreate() {
    this.$nextTick(function() {
			window.addEventListener('resize', this.resizeCanvas);

      //Init
			this.resizeCanvas();
    })

	},
	methods: {
	resizeCanvas(){
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.setContext();
	},
	setContext(){
		let canvas = d3.select("canvas"),
			context = canvas.node().getContext("2d"),
			width = this.width,
			height = this.height,
			radius = 10;

		let color = scaleOrdinal()
			.range(['green', 'blue', 'pink', 'red', 'black', 'yellow', 'orange', 'purple','cyan']);

		let simulation = d3.forceSimulation()
			.force("link", d3.forceLink().id(function (d) { return d.id; }))
			.force("charge", d3.forceManyBody().strength(-500))
			.force("center", d3.forceCenter(width / 2, height / 2));

		let drag = d3.drag()
		.subject(dragsubject)
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended);

		d3.json("/flare.json").then(graph => {
			simulation
				.nodes(graph.nodes)
				.on("tick", render);

			simulation.force("link")
				.links(graph.links);

			canvas.call(drag)
			.call(render);

			function render() {
				context.clearRect(0, 0, width, height);
				context.beginPath();
				graph.links.forEach(drawLink);
				context.strokeStyle = "#aaa";
				context.stroke();
				for (let i = 0, n = graph.nodes.length, circle; i < n; ++i) {
					circle = graph.nodes[i];
					context.beginPath();
					drawNode(circle);
					context.fill();
					if (circle.active) {
						context.lineWidth = 2;
						context.stroke();
					}
				}
			}

		});

		function dragsubject() {
			return simulation.find(d3.event.x, d3.event.y);
		}

		function dragstarted() {
			if (!d3.event.active) simulation.alphaTarget(0.3).restart();
			d3.event.subject.fx = d3.event.subject.x;
			d3.event.subject.fy = d3.event.subject.y;
		}

		function dragged() {
			d3.event.subject.fx = d3.event.x;
			d3.event.subject.fy = d3.event.y;
		}

		function dragended() {
			d3.event.subject.active = false;
		}

		function drawLink(circle) {
			context.moveTo(circle.source.x, circle.source.y);
			context.lineTo(circle.target.x, circle.target.y);
		}

		function drawNode(circle) {
			context.moveTo(circle.x + radius, circle.y);
			context.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
			context.fillStyle = color(circle.index);
		}
	}
	},
	beforeDestroy() {
    window.removeEventListener('resize', this.resizeCanvas);
  }
};

</script>


<style scoped>
html, body { width:100%; height:100%; }
</style>
