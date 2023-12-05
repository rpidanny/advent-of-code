import prettyMilliseconds from "pretty-ms";

import { profileRun } from "./timings"; // replace with the actual file path

jest.mock("pretty-ms", () => jest.fn((ms) => `${ms} ms`));

describe("profileRun", () => {
  it("should measure execution time correctly", async () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    const mockFunc = jest.fn(() => "mockResult");

    consoleLogSpy.mockImplementation(() => {});

    const result = await profileRun("mockName", mockFunc);

    expect(mockFunc).toHaveBeenCalled();
    expect(result).toStrictEqual(
      expect.objectContaining({
        result: "mockResult",
        duration: expect.any(Number),
      }),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("executed in"),
    );
    expect(prettyMilliseconds).toHaveBeenCalled();
  });
});
