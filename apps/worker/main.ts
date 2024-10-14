import { error, log } from 'console';
import { Worker } from 'worker_threads';

let workerCount = 0;

// type FibbonachiWorker = { promise: Promise<number>, workerN: number }

function createWorker(arg: number): {
  promise: Promise<number>;
  workerN: number;
} {
  workerCount++;

  const worker = new Worker('./dist/service.js', { argv: [arg] });
  log(`Worker${workerCount} with Fibonacci(${arg}) started`);

  const promise = new Promise<number>((resolve, reject) => {
    worker.on('message', resolve);
    worker.on('error', reject);
  });

  return { promise, workerN: workerCount };
}

async function runService(): Promise<void> {
  const workers = [createWorker(44), createWorker(45)];

  workers.forEach(({ promise, workerN }) => {
    promise
      .then((data) => log(`Fibbonachi Worker ${workerN} done`, data))
      .catch(error);
  });
}

setInterval(() => {
  log('other operation');
}, 500);

setTimeout(runService, 3000);

// runService().then(log).catch(error)
