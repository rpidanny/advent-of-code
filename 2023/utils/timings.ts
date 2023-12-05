import chalk from "chalk";
import prettyMilliseconds from "pretty-ms";

export async function profileRun<T = number>(
  name: string,
  func: () => T,
): Promise<{ result: T; duration: number }> {
  const start = performance.now();
  const result = await func();
  const end = performance.now();
  const duration = end - start;

  console.log(
    `${chalk.magenta(name)}: ${chalk.green(result)} ${chalk.italic.dim(
      `(executed in ${prettyMilliseconds(duration)})`,
    )}`,
  );

  return { result, duration };
}
