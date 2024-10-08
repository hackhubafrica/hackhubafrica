// Define the function (equivalent to f = @(x) (x.^2)/2 + x + 1/2 in MATLAB)
function f(x) {
    return (x * x) / 2 + x + 0.5;  // (x^2)/2 + x + 1/2
}

// Create a range of x values
let xValues = [];
let yValues = [];
for (let x = 0; x <= 3; x += 0.05) {
    xValues.push(x);
    yValues.push(f(x));  // Calculate corresponding y values
}

// Data for the plot
let trace1 = {
    x: xValues,
    y: yValues,
    mode: 'lines',
    name: 'y = (x^2)/2 + x + 1/2',
    line: {color: 'blue', width: 2}
};

// Add the initial condition point (1, 2)
let trace2 = {
    x: [1],
    y: [2],
    mode: 'markers+text',
    name: 'Initial Condition (1, 2)',
    marker: {color: 'red', size: 10},
    text: ['(1, 2)'],
    textposition: 'top right'
};

// Define the layout
let layout = {
    title: 'Solution of the Differential Equation dy/dx = x + 1',
    xaxis: {title: 'x'},
    yaxis: {title: 'y'},
    showlegend: true,
    grid: {rows: 1, columns: 1}
};

// Plot the data using Plotly
let data = [trace1, trace2];
Plotly.newPlot('plot', data, layout);
