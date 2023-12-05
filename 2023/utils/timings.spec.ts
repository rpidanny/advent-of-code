import prettyMilliseconds from "pretty-ms";
import { timeExecution } from "./timings"; // replace with the actual file path

jest.mock("pretty-ms", () => jest.fn((ms) => `${ms} ms`));

class TestClass {
  @timeExecution
  testMethod(): string {
    new Promise((resolve) => setTimeout(resolve, 1000));
    return "mockResult";
  }
}

describe("timeExecution decorator", () => {
  it("should measure execution time correctly", async () => {
    const instance = new TestClass();
    const testMethodSpy = jest.spyOn(instance, "testMethod");
    const consoleLogSpy = jest.spyOn(console, "log");

    consoleLogSpy.mockImplementation(() => {});

    const result = await instance.testMethod();

    expect(testMethodSpy).toHaveBeenCalled();
    expect(result).toBe("mockResult");
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("executed in")
    );
    expect(prettyMilliseconds).toHaveBeenCalled();
  });
});
