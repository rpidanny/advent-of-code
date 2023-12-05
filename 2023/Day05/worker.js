require("ts-node").register();

const { parentPort, workerData } = require("worker_threads");
const { getMinimumLocation } = require("./helpers");

// Function to perform a CPU-bound task
function performCpuBoundTask({ seedStart, seedRangeLength, mappings }) {
  return getMinimumLocation(seedStart, seedRangeLength, mappings);
}

// Perform the CPU-bound task with the provided data
const result = performCpuBoundTask(workerData);

// Send the result back to the main thread
parentPort.postMessage(result);
