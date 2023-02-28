function getGrade(mark) {
    if (mark < 5.0) {
        return 'F';
    } else if (mark < 6.0) {
        return 'D';
    } else if (mark < 7.0) {
        return 'C';
    } else if (mark < 8.0) {
        return 'B';
    } else {
        return 'A';
    }
}
//creates bar chart
function createBarChart(frequencies) {
    // Remove any previous chart
    d3.select('#chart').selectAll('*').remove();

    
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    
    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width + 900 + margin.left + margin.right)
        .attr('height', height + 900 + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

   
    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(['A', 'B', 'C', 'D', 'F'])
        .padding(0.2);


    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 0.20]);

    const yAxis = d3.axisLeft(yScale)
        .ticks(5)
        .tickFormat(d3.format('.0%'));

    const xAxis = d3.axisBottom(xScale);

    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);


    svg.append('g')
        .call(yAxis);

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -5 - margin.left)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Frequency(%)');

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.top + 20)
        .attr('text-anchor', 'middle')
        .text('Letter Grade');
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 10)
        .attr('text-anchor', 'middle')
        .text('Grade Distribution');

    console.log(frequencies);
   
    svg.selectAll('.bar')
        .data(Object.entries(frequencies))
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d[0]))
        .attr('y', d => yScale(d[1]))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d[1]))
        .attr('fill', d => d[1] > 0.1 ? 'blue' : 'lightblue');
}
function deselectAll() {
    $("#spreadsheet td.selected").removeClass("selected");
    $("#spreadsheet tr.selected").removeClass("selected");
}
function selectRow(rowIndex) {
    console.log("SELECTED index:" + rowIndex);
    deselectAll();

    let frequencies = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
    $("#spreadsheet tbody tr:eq(" + (rowIndex + 1) + ") td").addClass("selected");

    const cells = document.querySelectorAll('#spreadsheet .editable.selected');
    const values = [];
    for (let i = 0; i < cells.length; i++) {
        values.push(cells[i].textContent);
        const grade = getGrade(cells[i].textContent);
        console.log(grade);
        frequencies[grade]++;
    }

    const totalGrades = cells.length;
    for (const grade in frequencies) {
        frequencies[grade] /= totalGrades;
    }


    createBarChart(frequencies);


}


// select a column and highlights 
function selectColumn(colIndex) {
    deselectAll();
    $("#spreadsheet tbody td:nth-child(" + (colIndex + 1) + ")").addClass("selected");
    let frequencies = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
    $("#spreadsheet tbody  td:nth-child(" + (colIndex + 1) + ")").addClass("selected");

    const cells = document.querySelectorAll('#spreadsheet .editable.selected');
    const values = [];
    for (let i = 0; i < cells.length; i++) {
        values.push(cells[i].textContent);
        const grade = getGrade(cells[i].textContent);
        console.log(grade);
        frequencies[grade]++;
    }

    const totalGrades = cells.length;
    for (const grade in frequencies) {
        frequencies[grade] /= totalGrades;
    }


    createBarChart(frequencies);
}


