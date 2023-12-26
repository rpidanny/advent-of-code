const graph = { nodes: [], links: [] };
const g = parseInput(testData.split("\n"));

console.log(g);

for (const node of g.vertices) graph.nodes.push({ id: node, radius: 30 });
for (const edge of g.edges)
  graph.links.push({ source: edge[0], target: edge[1] });

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")
  .call(
    d3
      .zoom()
      .scaleExtent([0.1, 5])
      .on("zoom", () => svg.attr("transform", d3.event.transform)),
  )
  .append("g");

const simulation = d3
  .forceSimulation()
  .force(
    "link",
    d3
      .forceLink()
      .id((d) => d.id)
      .distance(100)
      .strength(1),
  )
  .force("charge", d3.forceManyBody().strength(-100))
  .force(
    "center",
    d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2),
  )
  .force(
    "collide",
    d3
      .forceCollide()
      .radius((d) => d.radius + 15)
      .iterations(10)
      .strength(0.5),
  );

const link = svg
  .append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(graph.links)
  .enter()
  .append("line")
  .attr("class", "link")
  .attr("marker-end", "url(#arrow)");

const node = svg
  .append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(graph.nodes)
  .enter()
  .append("circle")
  .attr("class", "node")
  .attr("r", (d) => d.radius)
  .call(
    d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended),
  );

const label = svg
  .append("g")
  .attr("class", "labels")
  .selectAll("text")
  .data(graph.nodes)
  .enter()
  .append("text")
  .attr("class", "label")
  .text((d) => d.id);

simulation.nodes(graph.nodes).on("tick", ticked);
simulation.force("link").links(graph.links);

function ticked() {
  link
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);

  node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  label.attr("x", (d) => d.x).attr("y", (d) => d.y);
}

function zoomed() {
  svg.attr("transform", d3.event.transform);
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}
