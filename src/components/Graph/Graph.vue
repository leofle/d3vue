<template>
			<svg style="width:100%;height:100vh;" width="900" height="600">
				<g class="container">
          <g class="links"></g>
          <g class="nodes"></g>
				</g>
			</svg>
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
			this.setContext();
    })

	},
	methods: {
	resizeCanvas(){
			this.width = window.innerWidth;
			this.height = window.innerHeight;
	},
	setContext(){
		let svg = d3.select("svg"),
			width = +svg.attr("width"),
			height = +svg.attr("height");

		let zoomLayer = svg.select("g.container");
		let color = scaleOrdinal(d3.schemeSet3);

		let simulation = d3.forceSimulation()
		.force("link", d3.forceLink()
			.id(function (d) { return d.id; }))
		.force("charge", d3.forceManyBody().strength(-100))
		.force("center", d3.forceCenter(width / 2, height / 2));
		
		let zoomed = function(){
			zoomLayer.attr("transform", d3.event.transform);
		}

		d3.json("flare.json").then(graph => {

			let nodes = graph.nodes,
				nodeById = d3.map(nodes, function (d) { return d.id; }),
				links = graph.links,
				bilinks = [];

			links.forEach(function (link) {
				let s = link.source = nodeById.get(link.source),
					t = link.target = nodeById.get(link.target),
					i = {}; // intermediate node
				nodes.push(i);
				links.push({ source: s, target: i }, { source: i, target: t });
				bilinks.push([s, i, t]);
			});


			let link = zoomLayer.select("g.links")
				.selectAll("link")
				.data(bilinks)
				.enter().append("path")
				.attr("class", "link");

			let node = zoomLayer.select("g.nodes")
				.selectAll("node")
				.data(nodes.filter(d =>d.id))
				.enter().append("g");

			node
				.append("circle")
				.attr("class", "node")
				.attr("r", d => d.id.length)
				.attr("fill", d => color(d.group))
				.attr("stroke", d => color(d.group))
				.on("click", clickNode)
				.on('mouseover', mouseOver)
				.on('mouseout', mouseOut);

			node
				.append("text")
				.attr("class", "nodetext")
				.attr("x", d => d.id.length * -2)
				.attr("y", d=> d.id.length * 2 + 5)
				.attr("text-achor", "middle")
				.attr("stroke", '#000')
				.attr("stroke-width", .5)
				.text(d => d.id );


			node
				.call(d3.drag()
					.subject(dragsubject)
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended));

			svg.call(d3.zoom()
			.scaleExtent([1 / 2, 12])
			.on("zoom", zoomed));

			simulation
				.nodes(nodes)
				.on("tick", ticked);

			simulation.force("link")
				.links(links);

			function ticked() {
				link.attr("d", positionLink);
				node.attr("transform", positionNode);
			}

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
				if (!d3.event.active) simulation.alphaTarget(0);
			}

		});

		function clickNode() {
			d3.select(this)
				.style("fill", "lightcoral")
				.style("stroke", "red");
		}
		function mouseOver() {
			d3.select(this).style('fill', 'black');
		}
		function mouseOut() {
			d3.select(this).style('fill', d => color(d.group));
			d3.select(this).style('stroke', d => color(d.group));
		}
		function positionLink(d) {
			return "M" + d[0].x + "," + d[0].y
				+ "S" + d[1].x + "," + d[1].y
				+ " " + d[2].x + "," + d[2].y;
		}

		function positionNode(d) {
			return "translate(" + d.x + "," + d.y + ")";
		}
	}
	},
	beforeDestroy() {
    window.removeEventListener('resize', this.resizeCanvas);
  }
};

</script>


<style>
html, body {
  width:  100%;
  height: 100%;
  margin: 0px;
}

.node {
  stroke-width: 2.5px;
  stroke-opacity: .5;
}

.link {
  fill: none;
  stroke: #bbb;
}

.nodetext { 
  pointer-events: none;
  font: 10px sans-serif;
}
</style>
