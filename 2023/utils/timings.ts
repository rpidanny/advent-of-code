import prettyMilliseconds from "pretty-ms";

export function timeExecution(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]): Promise<any> {
    const start = performance.now();
    const result = await originalMethod.apply(this, args);
    const end = performance.now();
    const duration = end - start;

    console.log(
      `${propertyKey}: ${result}  - (executed in ${prettyMilliseconds(
        duration
      )})`
    );

    return result;
  };
}
