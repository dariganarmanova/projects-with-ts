d3 syntax overall procedure

- first define the svg:

1. inside the svg first we select the body and to that body we append svg and we set the width and the height of it
2. after creating the svg we group everything like we just create a g tag for then grouping everything with rect as well

- then we are defining xScale and yScale which are just the shhpes definition

1. we define the height of y and the x axios scale

- scaleBand() for categorical data x axis
- domain definition
- range
- padding

2. y scale

- scaleLinear() height of the y axis
- domain definition
- range

shortly,

1. axes -> axisBottom, axisLeft which define and display the coordinate system
2. scales -> xScale and yScale which map the data values to positions on the coordinate system
3. data binding -> these tell the D3 to prepare for the creation of bar elements according to the data
4. enter selection -> the final touch that creates the rectangular elements placing each other according to the scales and data
