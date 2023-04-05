//your JS code here. If required.
const promises = [];

// Create 3 Promises with random time between 1 and 3 seconds
for (let i = 1; i <= 3; i++) {
  const promise = new Promise((resolve) => {
    const time = Math.floor(Math.random() * 3000) + 1000;
    setTimeout(() => {
      resolve(time);
    }, time);
  });
  promises.push(promise);
}

// Add a row that spans 2 columns with the exact text Loading...
const table = document.getElementById("myTable");
const row = table.insertRow();
const cell = row.insertCell();
cell.colSpan = 2;
cell.innerHTML = "Loading...";

// Use Promise.all to wait for all the Promises to resolve
Promise.all(promises)
  .then((times) => {
    // Remove the loading text
    table.deleteRow(0);

    // Populate the table with the required values
    for (let i = 1; i <= 3; i++) {
      const row = table.insertRow();
      const promiseCell = row.insertCell();
      promiseCell.innerHTML = "Promise " + i;
      const timeCell = row.insertCell();
      timeCell.innerHTML = (times[i - 1] / 1000).toFixed(3);
    }

    // Add the total time taken row
    const row = table.insertRow();
    const totalCell = row.insertCell();
    totalCell.innerHTML = "Total";
    const timeSum = times.reduce((acc, curr) => acc + curr, 0);
    const totalTimeCell = row.insertCell();
    totalTimeCell.innerHTML = (timeSum / 1000).toFixed(3);
  })
  .catch((error) => {
    console.log(error);
  });

