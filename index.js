const fs = require('fs');

function readInput(filename) {
    const data = fs.readFileSync(filename);
    return JSON.parse(data);
}

function decodeValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points) {
    const k = points.length;
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        let term = points[i].y; // Start with y value
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                // Calculate Lagrange basis polynomial
                term *= (0 - points[j].x) / (points[i].x - points[j].x);
            }
        }
        constantTerm += term; // Sum all terms
    }
    return Math.round(constantTerm); // Round to ensure it's an integer
}

function main() {
    const input = readInput('input.json');
    const n = input.keys.n;
    const k = input.keys.k;

    const points = [];

    // Collect the first k points
    for (let i = 1; i <= n; i++) {
        const base = parseInt(input[i.toString()]["base"]);
        const value = input[i.toString()]["value"];
        const x = i;
        const y = decodeValue(base, value);
        points.push({ x, y });

        if (points.length === k) break; // Stop once we have k points
    }

    const constantTerm = lagrangeInterpolation(points);
    console.log('The constant term (c) is:', constantTerm);
}

main();
