import * as d3 from "d3";

interface Data {
  category: string;
  value: number;
}

const data: Data[] = [
  { category: "A", value: 30 },
  { category: "B", value: 50 },
  { category: "C", value: 70 },
  { category: "D", value: 80 },
];

const width = 500;
const height = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

//in the svg we have to first select the body and append to it the svg and then width hright
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xScale = d3
  .scaleBand()
  .domain(data.map((d) => d.category))
  .range([0, width - margin.left - margin.right])
  .padding(0.1);

const yScale = d3
  .scaleLinear() //defines the min and max input values for the scale
  .domain([0, d3.max(data, (d) => d.value) || 0])
  .range([height - margin.top - margin.bottom, 0]);

//here this groups all the elements?
svg
  .append("g")
  .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
  .call(d3.axisBottom(xScale));

svg.append("g").call(d3.axisLeft(yScale));

const bars = svg
  .selectAll<SVGRectElement, Data>("rect")
  .data(data, (d: Data) => d.category);

bars
  .enter()
  .append("rect")
  .attr("x", (d) => xScale(d.category) as number)
  .attr("width", xScale.bandwidth()) //defines the width of each band or bar on the x-axis
  .attr("y", (d) => yScale(d.value)) //y attribute -> vertical position of the top of each bar
  .attr("height", (d) => height - margin.top - margin.bottom - yScale(d.value))
  .attr("fill", "steelblue");

bars
  .transition()
  .duration(750)
  .attr("x", (d) => xScale(d.category) as number)
  .attr("width", xScale.bandwidth())
  .attr("y", (d) => yScale(d.value))
  .attr("height", (d) => height - margin.top - margin.bottom - yScale(d.value))
  .attr("fill", "steelblue");
