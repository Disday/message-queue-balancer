import { log, time } from "console"
import { argv } from "process"
import { parentPort, workerData } from "worker_threads"

export const fib = (n: number): number => {
  if (n < 0 || !n) return -0

  if (n <= 2) {
    return n - 1
  }

  return fib(n - 1) + fib(n - 2)
}

const begin = process.hrtime.bigint()
const result = fib(+argv[2])
const end = process.hrtime.bigint()

parentPort?.postMessage({ result, time: Number(end - begin) / 10**9 })