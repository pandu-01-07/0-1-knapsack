const weights = [2, 3, 4, 5];
const values = [3, 4, 5, 6];
const capacity = 5;

let dp;
let i;
let w;
let timer;

function createTable() {

    dp = Array.from(
        { length: weights.length + 1 },
        () => Array(capacity + 1).fill(0)
    );

    let html = "<table>";

    html += "<tr>";
    html += "<th>Item / Capacity</th>";

    for (let j = 0; j <= capacity; j++) {
        html += `<th>${j}</th>`;
    }

    html += "</tr>";

    for (let row = 0; row <= weights.length; row++) {

        html += `<tr><th>${row}</th>`;

        for (let col = 0; col <= capacity; col++) {

            html += `
                <td id="cell-${row}-${col}">0</td>
            `;
        }

        html += "</tr>";
    }

    html += "</table>";

    document.getElementById("table").innerHTML = html;
}

function start() {

    clearTimeout(timer);

    createTable();

    i = 1;
    w = 1;

    document.getElementById("message").innerHTML =
        "Calculating...";

    document.getElementById("result").innerHTML = "";

    visualize();
}

function visualize() {

    if (i > weights.length) {

        document.getElementById("message").innerHTML =
            "Visualization Completed!";

        document.getElementById("result").innerHTML =
            "Maximum Value = " + dp[weights.length][capacity];

        return;
    }

    let cell = document.getElementById(`cell-${i}-${w}`);

    cell.classList.add("current");

    setTimeout(() => {

        if (weights[i - 1] <= w) {

            dp[i][w] = Math.max(
                dp[i - 1][w],
                values[i - 1] +
                dp[i - 1][w - weights[i - 1]]
            );

        } else {

            dp[i][w] = dp[i - 1][w];

        }

        cell.innerHTML = dp[i][w];

        cell.classList.remove("current");
        cell.classList.add("completed");

        w++;

        if (w > capacity) {
            w = 1;
            i++;
        }

        timer = setTimeout(visualize, 600);

    }, 600);
}

function reset() {

    clearTimeout(timer);

    createTable();

    document.getElementById("message").innerHTML =
        "Click Start to begin";

    document.getElementById("result").innerHTML = "";
}